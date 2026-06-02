using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Messaging;
using VehicleBook.Application.Services;
using VehicleBook.Domain.Entities;
using VehicleBook.Infrastructure.Data;

namespace VehicleBook.Infrastructure.Notifications
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(AppDbContext context, IEmailSender emailSender, ILogger<NotificationService> logger)
        {
            _context = context;
            _emailSender = emailSender;
            _logger = logger;
        }

        public async Task<IEnumerable<NotificationDto>> GetNotificationsForUserAsync(int userId, int take = 25, CancellationToken cancellationToken = default)
        {
            var safeTake = take <= 0 ? 25 : Math.Min(take, 100);

            var notifications = await _context.Notifications
                .AsNoTracking()
                .Where(notification => notification.UserId == userId)
                .OrderByDescending(notification => notification.CreatedAtUtc)
                .Take(safeTake)
                .ToListAsync(cancellationToken);

            return notifications.Select(MapToDto);
        }

        public async Task<int> GetUnreadCountAsync(int userId, CancellationToken cancellationToken = default)
        {
            return await _context.Notifications
                .AsNoTracking()
                .CountAsync(notification => notification.UserId == userId && !notification.IsRead, cancellationToken);
        }

        public async Task<bool> MarkAsReadAsync(int userId, int notificationId, CancellationToken cancellationToken = default)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(item => item.UserId == userId && item.NotificationId == notificationId, cancellationToken);

            if (notification == null)
            {
                return false;
            }

            if (!notification.IsRead)
            {
                notification.IsRead = true;
                notification.ReadAtUtc = DateTime.UtcNow;
                await _context.SaveChangesAsync(cancellationToken);
            }

            return true;
        }

        public async Task<int> MarkAllAsReadAsync(int userId, CancellationToken cancellationToken = default)
        {
            var notifications = await _context.Notifications
                .Where(item => item.UserId == userId && !item.IsRead)
                .ToListAsync(cancellationToken);

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
                notification.ReadAtUtc = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync(cancellationToken);
            return notifications.Count;
        }

        public async Task HandleSystemEventAsync(SystemEventMessage message, CancellationToken cancellationToken = default)
        {
            switch (message.EventType)
            {
                case "AdminApprovalRequested":
                    await NotifyAdminsAboutPendingUserAsync(message, cancellationToken);
                    break;
                case "AdminApprovalApproved":
                    await NotifyUserApprovedAsync(message, cancellationToken);
                    break;
                case "BookingCreated":
                    await NotifyOwnerAboutBookingAsync(message, cancellationToken);
                    break;
                case "BookingStatusChanged":
                    await NotifyCompanyAboutBookingStatusAsync(message, cancellationToken);
                    break;
                case "BookingDeleted":
                    await NotifyBookingDeletedAsync(message, cancellationToken);
                    break;
                case "VehicleStatusChanged":
                    await NotifyOwnerAboutVehicleStatusAsync(message, cancellationToken);
                    break;
                default:
                    _logger.LogInformation("No notification handler configured for event type {EventType}.", message.EventType);
                    break;
            }
        }

        private async Task NotifyAdminsAboutPendingUserAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var admins = await _context.Users
                .AsNoTracking()
                .Where(user => user.Role == "Admin")
                .ToListAsync(cancellationToken);

            if (admins.Count == 0)
            {
                return;
            }

            var pendingUserId = TryGetInt(message.Data, "userId");
            var pendingName = GetData(message.Data, "name", "A new user");
            var pendingEmail = GetData(message.Data, "email", "No email supplied");

            var title = "New user waiting for approval";
            var body = $"{pendingName} ({pendingEmail}) has registered and needs an admin to assign the correct role.";

            await CreateNotificationsAsync(
                admins.Select(admin => admin.UserId),
                title,
                body,
                "AdminApproval",
                "User",
                pendingUserId,
                cancellationToken);

            await _emailSender.SendAsync(admins.Select(admin => admin.Email), title, body, cancellationToken);
        }

        private async Task NotifyUserApprovedAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var userId = TryGetInt(message.Data, "userId");
            if (userId == null)
            {
                return;
            }

            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(item => item.UserId == userId, cancellationToken);
            if (user == null)
            {
                return;
            }

            var newRole = GetData(message.Data, "newRole", user.Role);
            var title = "Your account has been approved";
            var body = $"Your account has been approved as {newRole}. You can now use the system with your assigned access.";

            await CreateNotificationAsync(user.UserId, title, body, "AdminApproval", "User", user.UserId, cancellationToken);
            await _emailSender.SendAsync([user.Email], title, body, cancellationToken);
        }

        private async Task NotifyOwnerAboutBookingAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var vehicleId = TryGetInt(message.Data, "vehicleId");
            if (vehicleId == null)
            {
                return;
            }

            var vehicle = await _context.Vehicles
                .Include(item => item.Owner)
                .AsNoTracking()
                .FirstOrDefaultAsync(item => item.VehicleId == vehicleId, cancellationToken);

            if (vehicle?.Owner == null)
            {
                return;
            }

            var companyName = await GetUserNameAsync(TryGetInt(message.Data, "companyId"), cancellationToken) ?? "A company";
            var bookingId = TryGetInt(message.Data, "bookingId");
            var startDate = GetData(message.Data, "startDate", "the selected start date");
            var endDate = GetData(message.Data, "endDate", "the selected end date");
            var licenseNumber = string.IsNullOrWhiteSpace(vehicle.LicenseNumber) ? GetData(message.Data, "licenseNumber", string.Empty) : vehicle.LicenseNumber;

            var title = "Your vehicle has been booked";
            var body = $"{companyName} booked your {vehicle.Make} {vehicle.Model} ({licenseNumber}) from {startDate} to {endDate}.";

            await CreateNotificationAsync(vehicle.OwnerId, title, body, "Booking", "Booking", bookingId, cancellationToken);
            await _emailSender.SendAsync([vehicle.Owner.Email], title, body, cancellationToken);
        }

        private async Task NotifyCompanyAboutBookingStatusAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var companyId = TryGetInt(message.Data, "companyId");
            if (companyId == null)
            {
                return;
            }

            var company = await _context.Users.AsNoTracking().FirstOrDefaultAsync(item => item.UserId == companyId, cancellationToken);
            if (company == null)
            {
                return;
            }

            var bookingId = TryGetInt(message.Data, "bookingId");
            var oldStatus = GetData(message.Data, "oldStatus", "previous status");
            var newStatus = GetData(message.Data, "newStatus", "new status");

            var title = "Booking status updated";
            var body = $"Booking {bookingId} changed from {oldStatus} to {newStatus}.";

            await CreateNotificationAsync(company.UserId, title, body, "Booking", "Booking", bookingId, cancellationToken);
            await _emailSender.SendAsync([company.Email], title, body, cancellationToken);
        }

        private async Task NotifyBookingDeletedAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var bookingId = TryGetInt(message.Data, "bookingId");
            var companyId = TryGetInt(message.Data, "companyId");
            var vehicleId = TryGetInt(message.Data, "vehicleId");

            var company = companyId == null
                ? null
                : await _context.Users.AsNoTracking().FirstOrDefaultAsync(item => item.UserId == companyId, cancellationToken);

            var vehicle = vehicleId == null
                ? null
                : await _context.Vehicles.Include(item => item.Owner).AsNoTracking().FirstOrDefaultAsync(item => item.VehicleId == vehicleId, cancellationToken);

            var title = "Booking deleted";
            var body = $"Booking {bookingId} has been deleted.";

            if (company != null)
            {
                await CreateNotificationAsync(company.UserId, title, body, "Booking", "Booking", bookingId, cancellationToken);
                await _emailSender.SendAsync([company.Email], title, body, cancellationToken);
            }

            if (vehicle?.Owner != null)
            {
                await CreateNotificationAsync(vehicle.OwnerId, title, body, "Booking", "Booking", bookingId, cancellationToken);
                await _emailSender.SendAsync([vehicle.Owner.Email], title, body, cancellationToken);
            }
        }

        private async Task NotifyOwnerAboutVehicleStatusAsync(SystemEventMessage message, CancellationToken cancellationToken)
        {
            var ownerId = TryGetInt(message.Data, "ownerId");
            if (ownerId == null)
            {
                return;
            }

            var owner = await _context.Users.AsNoTracking().FirstOrDefaultAsync(item => item.UserId == ownerId, cancellationToken);
            if (owner == null)
            {
                return;
            }

            var vehicleId = TryGetInt(message.Data, "vehicleId");
            var oldStatus = GetData(message.Data, "oldStatus", "previous status");
            var newStatus = GetData(message.Data, "newStatus", "new status");
            var licenseNumber = GetData(message.Data, "licenseNumber", string.Empty);

            var title = "Vehicle status updated";
            var body = $"Vehicle {vehicleId} {licenseNumber} changed from {oldStatus} to {newStatus}.".Replace("  ", " ");

            await CreateNotificationAsync(owner.UserId, title, body, "Vehicle", "Vehicle", vehicleId, cancellationToken);
        }

        private async Task<string?> GetUserNameAsync(int? userId, CancellationToken cancellationToken)
        {
            if (userId == null)
            {
                return null;
            }

            return await _context.Users
                .AsNoTracking()
                .Where(user => user.UserId == userId)
                .Select(user => user.Name)
                .FirstOrDefaultAsync(cancellationToken);
        }

        private async Task CreateNotificationsAsync(IEnumerable<int> userIds, string title, string body, string type, string? entityType, int? entityId, CancellationToken cancellationToken)
        {
            foreach (var userId in userIds.Distinct())
            {
                await CreateNotificationAsync(userId, title, body, type, entityType, entityId, cancellationToken, saveImmediately: false);
            }

            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task CreateNotificationAsync(int userId, string title, string body, string type, string? entityType, int? entityId, CancellationToken cancellationToken, bool saveImmediately = true)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = body,
                Type = type,
                EntityType = entityType,
                EntityId = entityId,
                IsRead = false,
                CreatedAtUtc = DateTime.UtcNow
            };

            await _context.Notifications.AddAsync(notification, cancellationToken);

            if (saveImmediately)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        private static string GetData(Dictionary<string, string> data, string key, string fallback)
        {
            return data.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value) ? value : fallback;
        }

        private static int? TryGetInt(Dictionary<string, string> data, string key)
        {
            if (!data.TryGetValue(key, out var value))
            {
                return null;
            }

            return int.TryParse(value, out var parsedValue) ? parsedValue : null;
        }

        private static NotificationDto MapToDto(Notification notification)
        {
            return new NotificationDto
            {
                NotificationId = notification.NotificationId,
                UserId = notification.UserId,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                EntityType = notification.EntityType,
                EntityId = notification.EntityId,
                IsRead = notification.IsRead,
                CreatedAtUtc = notification.CreatedAtUtc,
                ReadAtUtc = notification.ReadAtUtc
            };
        }
    }
}
