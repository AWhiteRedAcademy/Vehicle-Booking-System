using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography;
using VehicleBook.Application.Authentication;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly JwtSettings _jwtSettings;
        private readonly IMemoryCache _cache;
        private readonly IEmailSender _emailSender;

        public AuthService(
            IUserRepository userRepository,
            IJwtTokenService jwtTokenService,
            JwtSettings jwtSettings,
            IMemoryCache cache,
            IEmailSender emailSender)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
            _jwtSettings = jwtSettings;
            _cache = cache;
            _emailSender = emailSender;
        }

        public async Task<TokenResponseDto?> LoginAsync(LoginUserDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);
            if (user == null)
            {
                return null;
            }

            var result = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            user.LastLogin = DateTime.UtcNow;

            Console.WriteLine($"LAST LOGIN UPDATED: {user.Email} - {user.LastLogin}");

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return await CreateTokenResponseAsync(user);
        }

        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId);
            if (user == null ||
                user.RefreshToken != request.RefreshToken ||
                user.RefreshTokenExpiryTime == null ||
                user.RefreshTokenExpiryTime <= DateOnly.FromDateTime(DateTime.UtcNow))
            {
                return null;
            }

            return await CreateTokenResponseAsync(user);
        }

        private async Task<TokenResponseDto> CreateTokenResponseAsync(User user)
        {
            user.RefreshToken = _jwtTokenService.CreateRefreshToken();
            user.RefreshTokenExpiryTime = DateOnly.FromDateTime(DateTime.UtcNow.AddHours(_jwtSettings.RefreshTokenExpiryHours));

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return new TokenResponseDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                AccessToken = _jwtTokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken ?? string.Empty
            };
        }

        public async Task<bool> InitiateForgotPasswordAsync(ForgotPasswordRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            var user = await _userRepository.GetByEmailAsync(normalizedEmail);
            
            if (user == null) return true;

            string otpCode = RandomNumberGenerator.GetInt32(100000, 999999).ToString();

            // Set absolute 10-minute expiration window for account recovery
            var cacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(10));
            _cache.Set($"RESET_OTP_{normalizedEmail}", otpCode, cacheOptions);

            string subject = "CarGo Pro - Reset Password OTP";
            string body = $"Your one-time security password verification code is: {otpCode}\nThis code expires in 10 minutes.";
            
            await _emailSender.SendAsync(new[] { user.Email }, subject, body);

            return true;
        }

        public async Task<bool> VerifyResetOtpAsync(VerifyResetOtpDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            string otpKey = $"RESET_OTP_{normalizedEmail}";

            if (!_cache.TryGetValue(otpKey, out string? cachedCode) || cachedCode != request.Code)
            {
                return false; 
            }

            _cache.Remove(otpKey);

            // Establish a temporary 5-minute client execution token rule in memory to allow password reset completion without re-verifying OTP
            var verifiedOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5));
            _cache.Set($"RESET_VERIFIED_{normalizedEmail}", true, verifiedOptions);

            return true;
        }

        public async Task<bool> CompletePasswordResetAsync(ResetPasswordDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            string verificationKey = $"RESET_VERIFIED_{normalizedEmail}";

            if (!_cache.TryGetValue(verificationKey, out bool isVerified) || !isVerified)
            {
                return false; 
            }

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);
            if (user == null) return false;

            //  hash the password string
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, request.NewPassword);

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            _cache.Remove(verificationKey);

            return true;
        }
    }
}

