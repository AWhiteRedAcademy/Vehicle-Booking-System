using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Infrastructure.Messaging
{
    public class BookingAuditPublisherWorker : BackgroundService
    {
        private readonly RabbitMqOptions _options;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<BookingAuditPublisherWorker> _logger;
        private readonly PeriodicTimer _timer = new(TimeSpan.FromSeconds(15));

        public BookingAuditPublisherWorker(
            IOptions<RabbitMqOptions> options,
            IServiceScopeFactory scopeFactory,
            ILogger<BookingAuditPublisherWorker> logger)
        {
            _options = options.Value;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (!_options.Enabled)
            {
                return;
            }

            await PublishPendingAuditRowsAsync(stoppingToken);

            while (await _timer.WaitForNextTickAsync(stoppingToken) && !stoppingToken.IsCancellationRequested)
            {
                await PublishPendingAuditRowsAsync(stoppingToken);
            }
        }

        private async Task PublishPendingAuditRowsAsync(CancellationToken cancellationToken)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var auditRepository = scope.ServiceProvider.GetRequiredService<IBookingAuditRepository>();
                var auditRows = await auditRepository.GetUnpublishedAsync(25, cancellationToken);

                foreach (var audit in auditRows)
                {
                    var message = CreateAuditMessage(audit);
                    PublishToRabbitMq(message);

                    await auditRepository.MarkAsPublishedAsync(audit.AuditId, cancellationToken);
                    await auditRepository.SaveChangesAsync(cancellationToken);
                }
            }
            catch (OperationCanceledException)
            {
                // Normal shutdown.
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Booking audit publisher failed. It will retry on the next run.");
            }
        }

        private void PublishToRabbitMq(SystemEventMessage message)
        {
            var factory = new ConnectionFactory
            {
                HostName = _options.HostName,
                Port = _options.Port,
                UserName = _options.UserName,
                Password = _options.Password,
                DispatchConsumersAsync = false,
                RequestedConnectionTimeout = TimeSpan.FromSeconds(5),
                SocketReadTimeout = TimeSpan.FromSeconds(5),
                SocketWriteTimeout = TimeSpan.FromSeconds(5)
            };

            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            channel.ExchangeDeclare(
                exchange: _options.ExchangeName,
                type: ExchangeType.Topic,
                durable: true,
                autoDelete: false);

            var properties = channel.CreateBasicProperties();
            properties.Persistent = true;
            properties.ContentType = "application/json";

            var body = JsonSerializer.SerializeToUtf8Bytes(message);

            channel.BasicPublish(
                exchange: _options.ExchangeName,
                routingKey: message.RoutingKey,
                basicProperties: properties,
                body: body);
        }

        private static SystemEventMessage CreateAuditMessage(BookingAudit audit)
        {
            return new SystemEventMessage
            {
                RoutingKey = GetRoutingKey(audit.EventType),
                EventType = audit.EventType,
                Category = "BookingNotification",
                Description = audit.Message ?? $"Booking {audit.BookingId} audit event.",
                OccurredAtUtc = audit.CreatedAt,
                Data = new Dictionary<string, string>
                {
                    ["auditId"] = audit.AuditId.ToString(),
                    ["bookingId"] = audit.BookingId.ToString(),
                    ["companyId"] = audit.CompanyId?.ToString() ?? string.Empty,
                    ["vehicleId"] = audit.VehicleId?.ToString() ?? string.Empty,
                    ["oldStatus"] = audit.OldStatus ?? string.Empty,
                    ["newStatus"] = audit.NewStatus,
                    ["status"] = audit.NewStatus,
                    ["createdAt"] = audit.CreatedAt.ToString("O")
                }
            };
        }

        private static string GetRoutingKey(string eventType)
        {
            return eventType switch
            {
                "BookingCreated" => "booking.created",
                "BookingUpdated" => "booking.updated",
                "BookingDeleted" => "booking.deleted",
                "BookingStatusChanged" => "booking.status.changed",
                _ => "audit.booking"
            };
        }
    }
}
