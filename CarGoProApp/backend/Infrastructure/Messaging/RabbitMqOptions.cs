namespace VehicleBook.Infrastructure.Messaging
{
    public class RabbitMqOptions
    {
        public const string SectionName = "RabbitMq";

        public bool Enabled { get; set; } = true;
        public string HostName { get; set; } = "rabbitmq";
        public int Port { get; set; } = 5672;
        public string UserName { get; set; } = "guest";
        public string Password { get; set; } = "guest";
        public string ExchangeName { get; set; } = "fleetpro.events";
        public string NotificationQueueName { get; set; } = "fleetpro.notifications";
        public string AuditQueueName { get; set; } = "fleetpro.audit";
    }
}
