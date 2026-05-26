using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VehicleBook.Application.DTOs
{
    public class VehicleDto
    {
        public int VehicleId { get; set; }
        public int OwnerId { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Category { get; set; } = "Sedan";
        public decimal DailyRate { get; set; }
        public string IsAvailable { get; set; } = "Available";
        [StringLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;
        [StringLength(50)]
        public string VinNumber { get; set; } = string.Empty;
        [Range(0, 2100)]
        public int ModelYear { get; set; }
    }

    public class CreateVehicleDto
    {
        [Required]
        public int OwnerId { get; set; }

        [Required]
        [StringLength(120)]
        public string Make { get; set; } = string.Empty;

        [Required]
        [StringLength(120)]
        public string Model { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = "Sedan";

        [Range(0.01, double.MaxValue)]
        public decimal DailyRate { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression("^(Available|In Use|Maintenance)$", ErrorMessage = "IsAvailable must be Available, In Use, or Maintenance.")]
        public string IsAvailable { get; set; } = "Available";

        [StringLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;
        [StringLength(50)]
        public string VinNumber { get; set; } = string.Empty;
        [Range(0, 2100)]
        public int ModelYear { get; set; }
    }

    public class UpdateVehicleDto
    {
        [Required]
        public int OwnerId { get; set; }

        [Required]
        [StringLength(120)]
        public string Make { get; set; } = string.Empty;

        [Required]
        [StringLength(120)]
        public string Model { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = "Sedan";

        [Range(0.01, double.MaxValue)]
        public decimal DailyRate { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression("^(Available|In Use|Maintenance)$", ErrorMessage = "IsAvailable must be Available, In Use, or Maintenance.")]
        public string IsAvailable { get; set; } = "Available";

        [StringLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;
        [StringLength(50)]
        public string VinNumber { get; set; } = string.Empty;
        [Range(0, 2100)]
        public int ModelYear { get; set; }
    }
}
