using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VehicleBook.Application.Services;

namespace VehicleBook.Infrastructure.Notifications
{
    public class SmtpEmailSender : IEmailSender
    {
        private readonly SmtpEmailOptions _options;
        private readonly ILogger<SmtpEmailSender> _logger;

        public SmtpEmailSender(IOptions<SmtpEmailOptions> options, ILogger<SmtpEmailSender> logger)
        {
            _options = options.Value;
            _logger = logger;
        }

        public async Task SendAsync(IEnumerable<string> recipients, string subject, string body, CancellationToken cancellationToken = default)
        {
            var recipientList = recipients
                .Where(email => !string.IsNullOrWhiteSpace(email))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();

            if (recipientList.Count == 0)
            {
                return;
            }

            if (!_options.Enabled)
            {
                _logger.LogInformation("Email sending is disabled. Subject: {Subject}. Recipients: {Recipients}", subject, string.Join(", ", recipientList));
                return;
            }

            if (string.IsNullOrWhiteSpace(_options.Host) || string.IsNullOrWhiteSpace(_options.FromEmail))
            {
                _logger.LogWarning("Email sending is enabled but Email:Host or Email:FromEmail is missing.");
                return;
            }

            using var message = new MailMessage
            {
                From = new MailAddress(_options.FromEmail, _options.FromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            foreach (var recipient in recipientList)
            {
                message.To.Add(recipient);
            }

            using var client = new SmtpClient(_options.Host, _options.Port)
            {
                EnableSsl = _options.EnableSsl
            };

            if (!string.IsNullOrWhiteSpace(_options.UserName))
            {
                client.Credentials = new NetworkCredential(_options.UserName, _options.Password);
            }

            try
            {
                await client.SendMailAsync(message, cancellationToken);
                _logger.LogInformation("Notification email sent. Subject: {Subject}. Recipients: {Recipients}", subject, string.Join(", ", recipientList));
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Notification email failed. Subject: {Subject}. Recipients: {Recipients}", subject, string.Join(", ", recipientList));
            }
        }
    }
}
