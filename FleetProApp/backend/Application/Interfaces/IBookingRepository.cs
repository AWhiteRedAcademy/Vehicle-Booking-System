using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<IEnumerable<Booking>> GetBookingsByOwnerIdAsync(int ownerId);
        Task<IEnumerable<Booking>> GetCurrentBookingsByCompanyIdAsync(int companyId, DateOnly today);
        Task<IEnumerable<Booking>> GetBookingHistoryByCompanyIdAsync(int companyId, DateOnly today);
        Task<Booking?> GetByIdAsync(int id);
        Task<bool> HasOverlappingBookingAsync(int vehicleId, DateOnly startDate, DateOnly endDate, int? ignoreBookingId = null);
        Task AddAsync(Booking booking);
        void Update(Booking booking);
        void Delete(Booking booking);
        Task<IEnumerable<Booking>> GetActiveAndPendingBookingsAsync(DateOnly date, CancellationToken cancellationToken);
        Task SaveChangesAsync();
    }
}
