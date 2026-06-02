namespace VehicleBook.Infrastructure.Notifications
{
    public class SmtpEmailOptions
    {
        public const string SectionName = "Email";

        public bool Enabled { get; set; }
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; } = 587;
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = "FleetPro";
        public bool EnableSsl { get; set; } = true;
    }
}
