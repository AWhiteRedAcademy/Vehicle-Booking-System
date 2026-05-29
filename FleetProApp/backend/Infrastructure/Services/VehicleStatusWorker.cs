using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using VehicleBook.Application.Interfaces;

namespace VehicleBook.Infrastructure.Services;


public class VehicleStatusWorker : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly PeriodicTimer _timer = new(TimeSpan.FromHours(1));

    public VehicleStatusWorker(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // 1. RUN IMMEDIATELY ON STARTUP
        try
        {
            using var startupScope = _services.CreateScope();
            var vehicleStatusService = startupScope.ServiceProvider.GetRequiredService<IVehicleStatusService>();

            await vehicleStatusService.UpdateScheduledVehiclesAsync(stoppingToken);
        }
        catch (Exception ex)
        {
            // Log the exception (you can use any logging framework you prefer)
            Console.WriteLine($"Error during initial vehicle status update: {ex.Message}");
        }

        // 2. THEN CONTINUE RUNNING EVERY 1 HOUR
        while (await _timer.WaitForNextTickAsync(stoppingToken) && !stoppingToken.IsCancellationRequested)
        {
            using var scope = _services.CreateScope();
            var vehicleStatusService = scope.ServiceProvider.GetRequiredService<IVehicleStatusService>();

            await vehicleStatusService.UpdateScheduledVehiclesAsync(stoppingToken);
        }
    }

}

