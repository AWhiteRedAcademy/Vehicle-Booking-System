using Microsoft.EntityFrameworkCore;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;
using VehicleBook.Infrastructure.Data;

namespace VehicleBook.Infrastructure.Repositories
{
    public class BookingAuditRepository : IBookingAuditRepository
    {
        private readonly AppDbContext _context;

        public BookingAuditRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(BookingAudit audit, CancellationToken cancellationToken = default)
        {
            await _context.BookingAudits.AddAsync(audit, cancellationToken);
        }

        public async Task<List<BookingAudit>> GetUnpublishedAsync(int take = 25, CancellationToken cancellationToken = default)
        {
            return await _context.BookingAudits
                .Where(audit => !audit.IsPublished)
                .OrderBy(audit => audit.CreatedAt)
                .Take(take)
                .ToListAsync(cancellationToken);
        }

        public async Task MarkAsPublishedAsync(long auditId, CancellationToken cancellationToken = default)
        {
            var audit = await _context.BookingAudits.FirstOrDefaultAsync(item => item.AuditId == auditId, cancellationToken);
            if (audit == null)
            {
                return;
            }

            audit.IsPublished = true;
            audit.PublishedAt = DateTime.UtcNow;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
