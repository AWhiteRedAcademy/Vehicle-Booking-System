using Microsoft.AspNetCore.Identity;
using VehicleBook.Application.Authentication;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;

using System.Security.Cryptography;

namespace VehicleBook.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly JwtSettings _jwtSettings;

        private readonly IEmailSender _emailSender;

        public AuthService(
            IUserRepository userRepository,
            IJwtTokenService jwtTokenService,
            JwtSettings jwtSettings,
              IEmailSender emailSender)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
            _jwtSettings = jwtSettings;
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

        public async Task<ForgotPasswordResponseDto> ForgotPasswordAsync(ForgotPasswordRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var otp = RandomNumberGenerator.GetInt32(100000, 999999).ToString();

            var otpToken = _jwtTokenService.CreatePasswordResetOtpToken(
                normalizedEmail,
                otp);

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user != null)
            {
                var body =
                    $"Hi {user.Name},\n\n" +
                    $"Your CarGo password reset OTP is: {otp}\n\n" +
                    $"This OTP will expire in 10 minutes.\n\n" +
                    $"If you did not request this, you can ignore this email.";

                await _emailSender.SendAsync(
                    new[] { user.Email },
                    "CarGo Password Reset OTP",
                    body);
            }

            return new ForgotPasswordResponseDto
            {
                Message = "If this email exists, a password reset OTP has been sent.",
                OtpToken = otpToken
            };
        }

        public async Task<VerifyResetOtpResponseDto?> VerifyResetOtpAsync(
            VerifyResetOtpRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var isOtpValid = _jwtTokenService.ValidatePasswordResetOtpToken(
                request.OtpToken,
                normalizedEmail,
                request.Otp);

            if (!isOtpValid)
            {
                return null;
            }

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null)
            {
                return null;
            }

            var resetToken = _jwtTokenService.CreatePasswordResetToken(normalizedEmail);

            return new VerifyResetOtpResponseDto
            {
                ResetToken = resetToken
            };
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordRequestDto request)
        {
            if (request.NewPassword != request.ConfirmPassword)
            {
                return false;
            }

            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var emailFromToken = _jwtTokenService.ValidatePasswordResetToken(
                request.ResetToken);

            if (string.IsNullOrWhiteSpace(emailFromToken))
            {
                return false;
            }

            if (!string.Equals(
                    normalizedEmail,
                    emailFromToken,
                    StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null)
            {
                return false;
            }

            var hasher = new PasswordHasher<User>();

            user.PasswordHash = hasher.HashPassword(user, request.NewPassword);

            // Force old sessions to become invalid.
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return true;
        }
    }
}
