using VehicleBook.Application.DTOs;

namespace VehicleBook.Application.Services
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
        
        // Password Reset Methods
        Task<bool> InitiateForgotPasswordAsync(ForgotPasswordRequestDto request);
        Task<bool> VerifyResetOtpAsync(VerifyResetOtpDto request);
        Task<bool> CompletePasswordResetAsync(ResetPasswordDto request);
    }
}
