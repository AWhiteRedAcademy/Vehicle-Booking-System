using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Authentication
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(User user);
        string CreateRefreshToken();

        string CreatePasswordResetOtpToken(string email, string otp);
        bool ValidatePasswordResetOtpToken(string otpToken, string email, string otp);

        string CreatePasswordResetToken(string email);
        string? ValidatePasswordResetToken(string resetToken);
    }
}