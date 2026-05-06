using Microsoft.AspNetCore.Mvc;
using VehicleBookingSystem.Models;
using VehicleBookingSystem.Data;
using VehicleBookingSystem.Controllers;

namespace VehicleBookingSystem.Services
{
    public class VehicleService
    {
        public List<Vehicle> GetAll()
        {
            return AppDbContext.Vehicles.ToList();
        }

        // public Vehicle Add(Vehicle vehicle)
        // {

        // }
    }
}


