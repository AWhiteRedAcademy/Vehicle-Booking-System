using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Services;

namespace Vehicle_Booking_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> GetAllVehicles()//implement filter by is Available in query params
        {
            var vehicles = await _vehicleService.GetAllVehiclesAsync();
            return Ok(vehicles);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        [HttpGet("user/{userId:int}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetVehiclesForUser(int userId, [FromQuery] string role = "Owner")
        {
            var vehicles = await _vehicleService.GetVehiclesForUserAsync(userId, role);
            return Ok(vehicles);
        }

        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateVehicleDto vehicleDto)
        {
            var vehicle = await _vehicleService.CreateVehicleAsync(vehicleDto);
            return CreatedAtAction(nameof(GetVehicleById), new { id = vehicle.VehicleId }, vehicle);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] UpdateVehicleDto vehicleDto)
        {
            var updated = await _vehicleService.UpdateVehicleAsync(id, vehicleDto);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var deleted = await _vehicleService.DeleteVehicleAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
