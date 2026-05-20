using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<Booking?> GetByIdAsync(int id);
        Task<bool> HasOverlappingBookingAsync(int vehicleId, DateOnly startDate, DateOnly endDate, int? ignoreBookingId = null);
        Task AddAsync(Booking booking);
        void Update(Booking booking);
        void Delete(Booking booking);
        Task SaveChangesAsync();
    }
}
