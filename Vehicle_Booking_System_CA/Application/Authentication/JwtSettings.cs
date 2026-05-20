namespace VehicleBook.Application.Authentication
{
    public class JwtSettings
    {
        public string Token { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int AccessTokenExpiryHours { get; set; } = 1;
        public int RefreshTokenExpiryHours { get; set; } = 2;
    }
}
