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

        public async Task ForgotPasswordAsync(ForgotPasswordRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            // Do not reveal whether the email exists.
            if (user == null)
            {
                return;
            }

            var otp = RandomNumberGenerator.GetInt32(100000, 999999).ToString();

            var hasher = new PasswordHasher<User>();

            user.PasswordResetOtpHash = hasher.HashPassword(user, otp);
            user.PasswordResetOtpExpiryUtc = DateTime.UtcNow.AddMinutes(10);
            user.PasswordResetTokenHash = null;
            user.PasswordResetTokenExpiryUtc = null;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            var body =
                $"Hi {user.Name},\n\n" +
                $"Your FleetPro password reset OTP is: {otp}\n\n" +
                $"This OTP will expire in 10 minutes.\n\n" +
                $"If you did not request this, you can ignore this email.";

            await _emailSender.SendAsync(
                new[] { user.Email },
                "FleetPro Password Reset OTP",
                body);
        }

        public async Task<VerifyResetOtpResponseDto?> VerifyResetOtpAsync(VerifyResetOtpRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null ||
                string.IsNullOrWhiteSpace(user.PasswordResetOtpHash) ||
                user.PasswordResetOtpExpiryUtc == null ||
                user.PasswordResetOtpExpiryUtc < DateTime.UtcNow)
            {
                return null;
            }

            var hasher = new PasswordHasher<User>();

            var result = hasher.VerifyHashedPassword(
                user,
                user.PasswordResetOtpHash,
                request.Otp.Trim());

            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var resetToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));

            user.PasswordResetTokenHash = hasher.HashPassword(user, resetToken);
            user.PasswordResetTokenExpiryUtc = DateTime.UtcNow.AddMinutes(15);

            // OTP can no longer be reused after verification.
            user.PasswordResetOtpHash = null;
            user.PasswordResetOtpExpiryUtc = null;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

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

            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null ||
                string.IsNullOrWhiteSpace(user.PasswordResetTokenHash) ||
                user.PasswordResetTokenExpiryUtc == null ||
                user.PasswordResetTokenExpiryUtc < DateTime.UtcNow)
            {
                return false;
            }

            var hasher = new PasswordHasher<User>();

            var tokenResult = hasher.VerifyHashedPassword(
                user,
                user.PasswordResetTokenHash,
                request.ResetToken);

            if (tokenResult == PasswordVerificationResult.Failed)
            {
                return false;
            }

            user.PasswordHash = hasher.HashPassword(user, request.NewPassword);

            user.PasswordResetTokenHash = null;
            user.PasswordResetTokenExpiryUtc = null;
            user.PasswordResetOtpHash = null;
            user.PasswordResetOtpExpiryUtc = null;
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return true;
        }
    }
}
