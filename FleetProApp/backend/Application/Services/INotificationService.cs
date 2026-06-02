using VehicleBook.Application.DTOs;
using VehicleBook.Application.Messaging;

namespace VehicleBook.Application.Services
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetNotificationsForUserAsync(int userId, int take = 25, CancellationToken cancellationToken = default);
        Task<int> GetUnreadCountAsync(int userId, CancellationToken cancellationToken = default);
        Task<bool> MarkAsReadAsync(int userId, int notificationId, CancellationToken cancellationToken = default);
        Task<int> MarkAllAsReadAsync(int userId, CancellationToken cancellationToken = default);
        Task HandleSystemEventAsync(SystemEventMessage message, CancellationToken cancellationToken = default);
    }
}
