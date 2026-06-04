using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBook.Domain.Entities
{
    [Table("bookingaudit", Schema = "public")]
    public class BookingAudit
    {
        [Key]
        [Column("auditid")]
        public long AuditId { get; set; }

        [Column("bookingid")]
        public int BookingId { get; set; }

        [Column("companyid")]
        public int? CompanyId { get; set; }

        [Column("vehicleid")]
        public int? VehicleId { get; set; }

        [Column("oldstatus")]
        [StringLength(20)]
        public string? OldStatus { get; set; }

        [Required]
        [Column("newstatus")]
        [StringLength(20)]
        public string NewStatus { get; set; } = string.Empty;

        [Required]
        [Column("eventtype")]
        [StringLength(100)]
        public string EventType { get; set; } = "BookingStatusChanged";

        [Column("message")]
        public string? Message { get; set; }

        [Required]
        [Column("ispublished")]
        public bool IsPublished { get; set; }

        [Column("publishedat")]
        public DateTime? PublishedAt { get; set; }

        [Required]
        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
