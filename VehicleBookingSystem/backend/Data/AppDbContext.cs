using VehicleBookingSystem.Models;

namespace VehicleBookingSystem.Data
{
    public static class AppDbContext
    {
        public static List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    }
}