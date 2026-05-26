using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Helpers
{
    public class VehicleQueryObject
    {
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? Category { get; set; }
        public string? IsAvailable { get; set; }
        public int? OwnerId { get; set; }
        public decimal? MinDailyRate { get; set; }
        public decimal? MaxDailyRate { get; set; }
    }
}
