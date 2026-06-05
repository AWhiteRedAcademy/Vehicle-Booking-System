using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Authentication
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(User user);
        string CreateRefreshToken();
    }
}
