namespace VehicleBook.Application.Messaging
{
    public class SystemEventMessage
    {
        public string RoutingKey { get; set; } = string.Empty;
        public string EventType { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime OccurredAtUtc { get; set; } = DateTime.UtcNow;
        public Dictionary<string, string> Data { get; set; } = new();
    }
}
