using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;
using VehicleBook.Application.Authentication;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Application.Services;
using VehicleBook.Infrastructure.Services;
using VehicleBook.Infrastructure.Authentication;
using VehicleBook.Infrastructure.Data;
using VehicleBook.Infrastructure.Repositories;
using VehicleBook.Infrastructure.Messaging;
using VehicleBook.Infrastructure.Notifications;

namespace Vehicle_Booking_System
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddMemoryCache();
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter only the JWT access token. Swagger will add Bearer automatically.",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    BearerFormat = "JWT"
                });

                options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("bearer", document)] = []
                });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.Configure<RabbitMqOptions>(builder.Configuration.GetSection(RabbitMqOptions.SectionName));
            builder.Services.Configure<SmtpEmailOptions>(builder.Configuration.GetSection(SmtpEmailOptions.SectionName));
            builder.Services.AddSingleton<IMessagePublisher, RabbitMqEventPublisher>();

            var jwtSettings = new JwtSettings
            {
                Token = builder.Configuration["AppSettings:Token"] ?? string.Empty,
                Issuer = builder.Configuration["AppSettings:Issuer"] ?? string.Empty,
                Audience = builder.Configuration["AppSettings:Audience"] ?? string.Empty,
                AccessTokenExpiryHours = int.TryParse(builder.Configuration["AppSettings:AccessTokenExpiryHours"], out var accessHours) ? accessHours : 1,
                RefreshTokenExpiryHours = int.TryParse(builder.Configuration["AppSettings:RefreshTokenExpiryHours"], out var refreshHours) ? refreshHours : 2
            };

            if (string.IsNullOrWhiteSpace(jwtSettings.Token))
            {
                throw new InvalidOperationException("JWT token signing key is missing from AppSettings:Token.");
            }

            builder.Services.AddSingleton(jwtSettings);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwtSettings.Issuer,
                        ValidateAudience = true,
                        ValidAudience = jwtSettings.Audience,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Token)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            builder.Services.AddAuthorization();

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
            builder.Services.AddScoped<IBookingRepository, BookingRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IVehicleService, VehicleService>();
            builder.Services.AddScoped<IBookingService, BookingService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
            builder.Services.AddScoped<IVehicleStatusService, VehicleStatusService>();
            builder.Services.AddScoped<INotificationService, NotificationService>();
            builder.Services.AddScoped<IEmailSender, SmtpEmailSender>();

            builder.Services.AddHostedService<VehicleStatusWorker>();
            builder.Services.AddHostedService<RabbitMqEventConsumer>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowFrontend");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
