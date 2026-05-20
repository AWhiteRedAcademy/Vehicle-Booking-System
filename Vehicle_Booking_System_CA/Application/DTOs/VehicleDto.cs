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
        public string Category { get; set; } = string.Empty;
        public decimal DailyRate { get; set; }
        public bool IsAvailable { get; set; }
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
        public string Category { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; } = true;
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
        public string Category { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; }
    }
}
