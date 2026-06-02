using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleBook.Application.Services;

namespace Vehicle_Booking_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUserNotifications([FromQuery] int take = 25, CancellationToken cancellationToken = default)
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var notifications = await _notificationService.GetNotificationsForUserAsync(userId.Value, take, cancellationToken);
            return Ok(notifications);
        }

        [HttpGet("current/unread-count")]
        public async Task<IActionResult> GetUnreadCount(CancellationToken cancellationToken = default)
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var unreadCount = await _notificationService.GetUnreadCountAsync(userId.Value, cancellationToken);
            return Ok(new { unreadCount });
        }

        [HttpPatch("{notificationId:int}/read")]
        public async Task<IActionResult> MarkAsRead(int notificationId, CancellationToken cancellationToken = default)
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var updated = await _notificationService.MarkAsReadAsync(userId.Value, notificationId, cancellationToken);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("current/read-all")]
        public async Task<IActionResult> MarkAllAsRead(CancellationToken cancellationToken = default)
        {
            var userId = GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var updatedCount = await _notificationService.MarkAllAsReadAsync(userId.Value, cancellationToken);
            return Ok(new { updatedCount });
        }

        private int? GetCurrentUserId()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(userIdValue, out var userId) ? userId : null;
        }
    }
}
