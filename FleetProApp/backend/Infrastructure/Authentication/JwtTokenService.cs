using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using VehicleBook.Application.Authentication;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Infrastructure.Authentication
{
    public class JwtTokenService : IJwtTokenService
    {
        private const string PasswordResetOtpPurpose = "password_reset_otp";
        private const string PasswordResetPurpose = "password_reset";

        private readonly JwtSettings _jwtSettings;

        public JwtTokenService(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }

        public string CreateAccessToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            return CreateJwt(claims, DateTime.UtcNow.AddHours(_jwtSettings.AccessTokenExpiryHours));
        }

        public string CreateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
        }

        public string CreatePasswordResetOtpToken(string email, string otp)
        {
            var normalizedEmail = email.Trim().ToLowerInvariant();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, normalizedEmail),
                new Claim("purpose", PasswordResetOtpPurpose),
                new Claim("otpHash", CreateOtpHash(otp))
            };

            return CreateJwt(claims, DateTime.UtcNow.AddMinutes(10));
        }

        public bool ValidatePasswordResetOtpToken(string otpToken, string email, string otp)
        {
            var principal = ValidateJwt(otpToken);

            if (principal == null)
            {
                return false;
            }

            var purpose = principal.FindFirst("purpose")?.Value;
            var tokenEmail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var storedOtpHash = principal.FindFirst("otpHash")?.Value;

            if (purpose != PasswordResetOtpPurpose)
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(tokenEmail) ||
                string.IsNullOrWhiteSpace(storedOtpHash))
            {
                return false;
            }

            var normalizedEmail = email.Trim().ToLowerInvariant();

            if (!string.Equals(tokenEmail, normalizedEmail, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var incomingOtpHash = CreateOtpHash(otp.Trim());

            return SecureEquals(storedOtpHash, incomingOtpHash);
        }

        public string CreatePasswordResetToken(string email)
        {
            var normalizedEmail = email.Trim().ToLowerInvariant();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, normalizedEmail),
                new Claim("purpose", PasswordResetPurpose)
            };

            return CreateJwt(claims, DateTime.UtcNow.AddMinutes(15));
        }

        public string? ValidatePasswordResetToken(string resetToken)
        {
            var principal = ValidateJwt(resetToken);

            if (principal == null)
            {
                return null;
            }

            var purpose = principal.FindFirst("purpose")?.Value;

            if (purpose != PasswordResetPurpose)
            {
                return null;
            }

            return principal.FindFirst(ClaimTypes.Email)?.Value;
        }

        private string CreateJwt(IEnumerable<Claim> claims, DateTime expires)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwtSettings.Token));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private ClaimsPrincipal? ValidateJwt(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _jwtSettings.Issuer,
                    ValidAudience = _jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_jwtSettings.Token)),
                    ClockSkew = TimeSpan.Zero
                };

                return tokenHandler.ValidateToken(
                    token,
                    validationParameters,
                    out _);
            }
            catch
            {
                return null;
            }
        }

        private string CreateOtpHash(string otp)
        {
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Token);

            using var hmac = new HMACSHA256(key);

            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(otp));

            return Convert.ToBase64String(hash);
        }

        private static bool SecureEquals(string first, string second)
        {
            var firstBytes = Encoding.UTF8.GetBytes(first);
            var secondBytes = Encoding.UTF8.GetBytes(second);

            return firstBytes.Length == secondBytes.Length &&
                   CryptographicOperations.FixedTimeEquals(firstBytes, secondBytes);
        }
    }
}