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

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
