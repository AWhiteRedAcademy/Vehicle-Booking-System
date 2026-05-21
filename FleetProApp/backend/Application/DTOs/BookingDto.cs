using System.ComponentModel.DataAnnotations;

namespace VehicleBook.Application.DTOs
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public int CompanyId { get; set; }
        public int VehicleId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public decimal TotalCost { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class CreateBookingDto
    {
        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "Pending";
    }

    public class UpdateBookingDto
    {
        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "Pending";
    }
}
