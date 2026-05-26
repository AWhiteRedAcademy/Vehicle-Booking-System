using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBook.Domain.Entities
{
    [Table("vehicles", Schema = "public")]
    public class Vehicle
    {
        [Key]
        [Column("vehicleid")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleId { get; set; }

        [Required]
        [Column("ownerid")]
        public int OwnerId { get; set; }

        [Required]
        [StringLength(120)]
        [Column("make")]
        public string Make { get; set; } = string.Empty;

        [Required]
        [StringLength(120)]
        [Column("model")]
        public string Model { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        [Column("category")]
        public string Category { get; set; } = "Sedan";

        [Required]
        [Column("dailyrate")]
        public decimal DailyRate { get; set; }

        [Required]
        [Column("isavailable")]
        public string IsAvailable { get; set; } = "Available";

        [ForeignKey("OwnerId")]
        public virtual User? Owner { get; set; }
         
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        [Required]
        [StringLength(20)]
        [Column("licensenumber")]
        public string LicenseNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        [Column("vinnumber")]
        public string VinNumber { get; set; } = string.Empty;

        [Required]
        [Column("modelyear")]
        public int ModelYear { get; set; }
            
    }
}
