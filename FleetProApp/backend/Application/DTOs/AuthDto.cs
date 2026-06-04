using System.ComponentModel.DataAnnotations;

namespace VehicleBook.Application.DTOs
{
    public class LoginUserDto
    {
        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Password { get; set; } = string.Empty;
    }

    public class TokenResponseDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }

    public class RefreshTokenRequestDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }

    public class ForgotPasswordResponseDto
    {
        public string Message { get; set; } = string.Empty;
        public string OtpToken { get; set; } = string.Empty;
    }

    public class VerifyResetOtpRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string Otp { get; set; } = string.Empty;

        [Required]
        public string OtpToken { get; set; } = string.Empty;
    }

    public class VerifyResetOtpResponseDto
    {
        public string ResetToken { get; set; } = string.Empty;
    }

    public class ResetPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string ResetToken { get; set; } = string.Empty;

        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string NewPassword { get; set; } = string.Empty;

        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

}
