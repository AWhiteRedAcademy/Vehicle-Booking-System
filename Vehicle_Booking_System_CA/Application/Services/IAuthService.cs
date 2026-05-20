using VehicleBook.Application.DTOs;

namespace VehicleBook.Application.Services
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
    }
}
