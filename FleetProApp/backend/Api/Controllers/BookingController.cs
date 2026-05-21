using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

            var createBookingDto = new CreateBookingDto
            {

                //   // User does NOT send role
                // System decides the role
                CompanyId = bookingDto.CompanyId,
                VehicleId = bookingDto.VehicleId,
                StartDate = bookingDto.StartDate,
                EndDate = bookingDto.EndDate,
                Status = bookingDto.Status
            };
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
