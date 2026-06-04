using System.Text;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using VehicleBook.Application.Messaging;
using VehicleBook.Application.Services;

namespace VehicleBook.Infrastructure.Messaging
{
    public class RabbitMqEventConsumer : BackgroundService
    {
        private readonly RabbitMqOptions _options;
        private readonly ILogger<RabbitMqEventConsumer> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public RabbitMqEventConsumer(
            IOptions<RabbitMqOptions> options,
            ILogger<RabbitMqEventConsumer> logger,
            IServiceScopeFactory scopeFactory)
        {
            _options = options.Value;
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (!_options.Enabled)
            {
                return;
            }

            while (!stoppingToken.IsCancellationRequested)
            {
                IConnection? connection = null;
                IModel? channel = null;

                try
                {
                    var factory = new ConnectionFactory
                    {
                        HostName = _options.HostName,
                        Port = _options.Port,
                        UserName = _options.UserName,
                        Password = _options.Password,
                        DispatchConsumersAsync = true,
                        RequestedConnectionTimeout = TimeSpan.FromSeconds(5),
                        SocketReadTimeout = TimeSpan.FromSeconds(5),
                        SocketWriteTimeout = TimeSpan.FromSeconds(5)
                    };

                    connection = factory.CreateConnection();
                    channel = connection.CreateModel();

                    channel.ExchangeDeclare(
                        exchange: _options.ExchangeName,
                        type: ExchangeType.Topic,
                        durable: true,
                        autoDelete: false);

                    DeclareAndBindQueue(
                        channel,
                        _options.NotificationQueueName,
                        [
                            "booking.created",
                            "booking.updated",
                            "booking.status.changed",
                            "booking.deleted",
                            "vehicle.status.changed",
                            "admin.approval.requested",
                            "admin.approval.approved",
                            "audit.booking"
                        ]);

                    DeclareAndBindQueue(
                        channel,
                        _options.AuditQueueName,
                        ["audit.*"]);

                    StartConsumer(channel, _options.NotificationQueueName, "Notification", processNotifications: true);
                    StartConsumer(channel, _options.AuditQueueName, "Audit", processNotifications: false);

                    _logger.LogInformation("RabbitMQ consumer started. Exchange: {ExchangeName}", _options.ExchangeName);

                    await Task.Delay(Timeout.Infinite, stoppingToken);
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "RabbitMQ consumer connection failed. Retrying in 10 seconds.");
                    await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                }
                finally
                {
                    try
                    {
                        channel?.Close();
                        connection?.Close();
                    }
                    catch
                    {
                        // Ignore close errors during shutdown/retry.
                    }

                    channel?.Dispose();
                    connection?.Dispose();
                }
            }
        }

        private void DeclareAndBindQueue(IModel channel, string queueName, IEnumerable<string> routingKeys)
        {
            channel.QueueDeclare(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);

            foreach (var routingKey in routingKeys)
            {
                channel.QueueBind(
                    queue: queueName,
                    exchange: _options.ExchangeName,
                    routingKey: routingKey);
            }
        }

        private void StartConsumer(IModel channel, string queueName, string consumerName, bool processNotifications)
        {
            var consumer = new AsyncEventingBasicConsumer(channel);

            consumer.Received += async (_, eventArgs) =>
            {
                var body = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
                _logger.LogInformation("RabbitMQ {ConsumerName} event received from {QueueName}: {Body}", consumerName, queueName, body);

                try
                {
                    if (processNotifications)
                    {
                        var message = JsonSerializer.Deserialize<SystemEventMessage>(body, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                        if (message != null)
                        {
                            using var scope = _scopeFactory.CreateScope();
                            var notificationService = scope.ServiceProvider.GetRequiredService<INotificationService>();
                            await notificationService.HandleSystemEventAsync(message);
                        }
                    }

                    channel.BasicAck(eventArgs.DeliveryTag, multiple: false);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "RabbitMQ {ConsumerName} event failed from {QueueName}.", consumerName, queueName);
                    channel.BasicNack(eventArgs.DeliveryTag, multiple: false, requeue: false);
                }
            };

            channel.BasicConsume(
                queue: queueName,
                autoAck: false,
                consumer: consumer);
        }
    }
}