using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace VehicleBook.Domain.Entities
{
    [Table("bookings", Schema = "public")]
    public class Booking
    {
        [Key]
        [Column("bookingid")]
        public int BookingId { get; set; }

        [Required]
        [Column("companyid")]
        public int CompanyId { get; set; }

        [Required]
        [Column("vehicleid")]
        public int VehicleId { get; set; }

        [Required]
        [Column("startdate")]
        public DateOnly StartDate { get; set; }

        [Required]
        [Column("enddate")]
        public DateOnly EndDate { get; set; } 

        [Required]
        [Column("totalcost")]
        public decimal TotalCost { get; set; } 

        [Required]
        [StringLength(20)]
        [Column("status")]
        public string Status { get; set; } = "Pending";


        [ForeignKey("CompanyId")]
        public virtual User? Company { get; set; }

        [ForeignKey("VehicleId")]
        public virtual Vehicle? Vehicle { get; set; }
    }
}
