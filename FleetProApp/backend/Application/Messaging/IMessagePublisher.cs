namespace VehicleBook.Application.Messaging
{
    public interface IMessagePublisher
    {
        Task PublishAsync(SystemEventMessage message, CancellationToken cancellationToken = default);
    }
}
