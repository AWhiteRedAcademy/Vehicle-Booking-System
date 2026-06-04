using VehicleBook.Application.DTOs;

namespace VehicleBook.Application.Services
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);

        Task ForgotPasswordAsync(ForgotPasswordRequestDto request);
        Task<VerifyResetOtpResponseDto?> VerifyResetOtpAsync(VerifyResetOtpRequestDto request);
        Task<bool> ResetPasswordAsync(ResetPasswordRequestDto request);
    }
}
