namespace VehicleBook.Application.Services
{
    public interface IEmailSender
    {
        Task SendAsync(IEnumerable<string> recipients, string subject, string body, CancellationToken cancellationToken = default);
    }
}
