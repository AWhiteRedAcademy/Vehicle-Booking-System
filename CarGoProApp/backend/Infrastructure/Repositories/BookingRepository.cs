using Microsoft.EntityFrameworkCore;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;
using VehicleBook.Infrastructure.Data;

namespace VehicleBook.Infrastructure.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Booking> _dbSet;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Booking>();
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<Booking>> GetBookingsByOwnerIdAsync(int ownerId)
        {
            return await _dbSet
                .Include(b => b.Vehicle)
                .Where(b => b.Vehicle != null && b.Vehicle.OwnerId == ownerId)
                .ToListAsync();
        }


        public async Task<IEnumerable<Booking>> GetCurrentBookingsByCompanyIdAsync(DateOnly today)
        {
            return await _dbSet
                .Include(b => b.Vehicle)
                    .ThenInclude(v => v!.Owner)
                .AsNoTracking()
                .Where(b => b.EndDate >= today
                    && b.Status != "Cancelled")
                .OrderBy(b => b.StartDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingHistoryByCompanyIdAsync(DateOnly today)
        {
            return await _dbSet
                .Include(b => b.Vehicle)
                    .ThenInclude(v => v!.Owner)
                .AsNoTracking()
                .Where(b => b.EndDate < today || b.Status == "Cancelled")
                .OrderByDescending(b => b.EndDate)
                .ToListAsync();
        }

        public async Task<bool> HasOverlappingBookingAsync(int vehicleId, DateOnly startDate, DateOnly endDate, int? ignoreBookingId = null)
        {
            return await _dbSet.AnyAsync(b =>
                b.VehicleId == vehicleId &&
                (!ignoreBookingId.HasValue || b.BookingId != ignoreBookingId.Value) &&
                b.Status != "Cancelled" &&
                b.StartDate < endDate &&
                startDate < b.EndDate);
        }

        public async Task AddAsync(Booking booking)
        {
            await _dbSet.AddAsync(booking);
        }

        public void Update(Booking booking)
        {
            _dbSet.Update(booking);
        }

        public void Delete(Booking booking)
        {
            _dbSet.Remove(booking);
        }

        public async Task<IEnumerable<Booking>> GetActiveAndPendingBookingsAsync(DateOnly date, CancellationToken cancellationToken)
        {
            var targetDate = date;

            return await _context.Bookings
                .Where(b =>
                    // Condition A: Starts today and isn't cancelled
                    (b.StartDate == targetDate && b.Status != "Cancelled" && b.Status != "Completed")
                    ||
                    // Condition B: Ended in the past but never got updated
                    (b.EndDate < targetDate && (b.Status == "Confirmed" || b.Status == "In Use" || b.Status == "Pending"))
                )
                .ToListAsync(cancellationToken);
        }



        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
