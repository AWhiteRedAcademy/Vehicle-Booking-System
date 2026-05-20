using VehicleBook.Application.DTOs;

namespace VehicleBook.Application.Services
{
    public interface IBookingService
    {
        Task<IEnumerable<BookingDto>> GetAllBookingsAsync();
        Task<BookingDto?> GetBookingByIdAsync(int id);
        Task<BookingDto> CreateBookingAsync(CreateBookingDto bookingDto);
        Task<bool> UpdateBookingAsync(int id, UpdateBookingDto bookingDto);
        Task<bool> DeleteBookingAsync(int id);
    }
}
