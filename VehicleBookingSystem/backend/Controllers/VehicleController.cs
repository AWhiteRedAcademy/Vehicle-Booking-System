using Microsoft.AspNetCore.Mvc;
using VehicleBookingSystem.Data;
using VehicleBookingSystem.Models;

namespace VehicleBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
       
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(AppDbContext.Vehicles);
        }

        
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var vehicle = AppDbContext.Vehicles.FirstOrDefault(v => v.Id == id);

            if (vehicle == null)
                return NotFound("Vehicle not found");

            return Ok(vehicle);
        }

   
        [HttpPost]
        public IActionResult Create([FromBody] Vehicle vehicle)
        {
            vehicle.Id = AppDbContext.Vehicles.Count + 1;
            AppDbContext.Vehicles.Add(vehicle);

            return Ok(vehicle);
        }

       
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Vehicle updatedVehicle)
        {
            var vehicle = AppDbContext.Vehicles.FirstOrDefault(v => v.Id == id);

            if (vehicle == null)
                return NotFound("Vehicle not found");

            vehicle.Make = updatedVehicle.Make;
            vehicle.Model = updatedVehicle.Model;
            vehicle.RegistrationNumber = updatedVehicle.RegistrationNumber;
            vehicle.IsAvailable = updatedVehicle.IsAvailable;

            return Ok(vehicle);
        }

      
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var vehicle = AppDbContext.Vehicles.FirstOrDefault(v => v.Id == id);

            if (vehicle == null)
                return NotFound("Vehicle not found");

            AppDbContext.Vehicles.Remove(vehicle);

            return Ok("Vehicle deleted successfully");
        }
    }
}