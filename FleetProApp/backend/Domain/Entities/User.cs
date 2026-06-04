using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;
using System.Text;

namespace VehicleBook.Domain.Entities
{

    [Table("users", Schema = "public")]
    public class User
    {
        [Key]
        [Column("userid")]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;


        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(50)]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        [StringLength(20)]
        [Column("phone")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        [DataType(DataType.Password)]
        [Column("password")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        [Column("role")]
        public string Role { get; set; } = "Guest";

        [StringLength(255)]
        [Column("refreshtoken")]
        public string? RefreshToken { get; set; }

        [Column("refreshtokenexpirytime")]
        public DateOnly? RefreshTokenExpiryTime { get; set; }

        [Column("lastlogin")]
        public DateTime? LastLogin { get; set; }

        [Column("passwordresetotphash")]
        [StringLength(255)]
        public string? PasswordResetOtpHash { get; set; }

        [Column("passwordresetotpexpiryutc")]
        public DateTime? PasswordResetOtpExpiryUtc { get; set; }

        [Column("passwordresettokenhash")]
        [StringLength(255)]
        public string? PasswordResetTokenHash { get; set; }

        [Column("passwordresettokenexpiryutc")]
        public DateTime? PasswordResetTokenExpiryUtc { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
