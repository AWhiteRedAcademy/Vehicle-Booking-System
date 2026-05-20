using Microsoft.AspNetCore.Identity;
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

        public AuthService(
            IUserRepository userRepository,
            IJwtTokenService jwtTokenService,
            JwtSettings jwtSettings)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
            _jwtSettings = jwtSettings;
        }

        public async Task<TokenResponseDto?> LoginAsync(LoginUserDto request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return null;
            }

            var result = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

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
    }
}
