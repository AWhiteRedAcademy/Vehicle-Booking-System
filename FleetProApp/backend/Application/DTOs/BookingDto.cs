using System.ComponentModel.DataAnnotations;

namespace VehicleBook.Application.DTOs
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public int CompanyId { get; set; }
        public int VehicleId { get; set; }

        public string LicenseNumber { get; set; } = string.Empty;

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public decimal TotalCost { get; set; }
        public string Status { get; set; } = "Pending";
    }

    public class CreateBookingDto
    {
        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [StringLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        public string Status { get; set; } = "Pending";
    }

        public class UpdateBookingDto
     
   {  
        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [StringLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        public string Status { get; set; } = "Pending";
    }
}