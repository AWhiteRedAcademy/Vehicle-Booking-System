using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using VehicleBook.Application.Messaging;

namespace VehicleBook.Infrastructure.Messaging
{
    public class RabbitMqEventPublisher : IMessagePublisher
    {
        private readonly RabbitMqOptions _options;
        private readonly ILogger<RabbitMqEventPublisher> _logger;

        public RabbitMqEventPublisher(
            IOptions<RabbitMqOptions> options,
            ILogger<RabbitMqEventPublisher> logger)
        {
            _options = options.Value;
            _logger = logger;
        }

        public Task PublishAsync(SystemEventMessage message, CancellationToken cancellationToken = default)
        {
            if (!_options.Enabled)
            {
                return Task.CompletedTask;
            }

            if (string.IsNullOrWhiteSpace(message.RoutingKey))
            {
                message.RoutingKey = "audit.system";
            }

            try
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

                var body = JsonSerializer.SerializeToUtf8Bytes(message);
                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;
                properties.ContentType = "application/json";

                channel.BasicPublish(
                    exchange: _options.ExchangeName,
                    routingKey: message.RoutingKey,
                    basicProperties: properties,
                    body: body);
            }
            catch (Exception ex)
            {
                // RabbitMQ should not break the main booking/vehicle/user workflow.
                _logger.LogWarning(ex, "RabbitMQ publish failed for event {EventType}.", message.EventType);
            }

            return Task.CompletedTask;
        }
    }
}
