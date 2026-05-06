namespace VehicleBookingSystem.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        public bool IsAvailable { get; set; }
    }
}