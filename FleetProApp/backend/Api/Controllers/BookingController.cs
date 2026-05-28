using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Services;

namespace Vehicle_Booking_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }

        [HttpGet("owner/{ownerId:int}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetBookingsByOwnerId(int ownerId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(loggedInUserId, out var userId) || userId != ownerId)
            {
                return Forbid();
            }

            var bookings = await _bookingService.GetBookingsByOwnerIdAsync(ownerId);
            return Ok(bookings);
        }



        [HttpGet("company/current")]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> GetCurrentCompanyBookings()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(loggedInUserId, out var companyId))
            {
                return Unauthorized();
            }

            var bookings = await _bookingService.GetCurrentCompanyBookingsAsync(companyId);
            return Ok(bookings);
        }

        [HttpGet("company/history")]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> GetCompanyBookingHistory()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(loggedInUserId, out var companyId))
            {
                return Unauthorized();
            }

            var bookings = await _bookingService.GetCompanyBookingHistoryAsync(companyId);
            return Ok(bookings);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }
        
        [HttpPost]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto bookingDto)
        {
            try
            {
                var booking = await _bookingService.CreateBookingAsync(bookingDto);
                return CreatedAtAction(nameof(GetBookingById), new { id = booking.BookingId }, booking);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] UpdateBookingDto bookingDto)
        {
            try
            {
                var updated = await _bookingService.UpdateBookingAsync(id, bookingDto);
                if (!updated)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var deleted = await _bookingService.DeleteBookingAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
