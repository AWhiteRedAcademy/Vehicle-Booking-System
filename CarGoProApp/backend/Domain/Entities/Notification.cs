using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBook.Domain.Entities
{
    [Table("notifications", Schema = "public")]
    public class Notification
    {
        [Key]
        [Column("notificationid")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationId { get; set; }

        [Required]
        [Column("userid")]
        public int UserId { get; set; }

        [Required]
        [StringLength(150)]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [Column("message")]
        public string Message { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        [Column("type")]
        public string Type { get; set; } = "General";

        [StringLength(50)]
        [Column("entitytype")]
        public string? EntityType { get; set; }

        [Column("entityid")]
        public int? EntityId { get; set; }

        [Required]
        [Column("isread")]
        public bool IsRead { get; set; }

        [Required]
        [Column("createdatutc")]
        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

        [Column("readatutc")]
        public DateTime? ReadAtUtc { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}
