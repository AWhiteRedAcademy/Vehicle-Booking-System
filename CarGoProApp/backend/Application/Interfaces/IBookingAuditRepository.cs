using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Interfaces
{
    public interface IBookingAuditRepository
    {
        Task AddAsync(BookingAudit audit, CancellationToken cancellationToken = default);
        Task<List<BookingAudit>> GetUnpublishedAsync(int take = 25, CancellationToken cancellationToken = default);
        Task MarkAsPublishedAsync(long auditId, CancellationToken cancellationToken = default);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
