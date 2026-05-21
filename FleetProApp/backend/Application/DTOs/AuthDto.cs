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
}
