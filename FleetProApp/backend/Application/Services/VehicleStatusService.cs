using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VehicleBook.Application.Interfaces;

namespace VehicleBook.Application.Services;

public class VehicleStatusService : IVehicleStatusService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IVehicleRepository _vehicleRepository;

    public VehicleStatusService(IBookingRepository bookingRepository, IVehicleRepository vehicleRepository)
    {
        _bookingRepository = bookingRepository;
        _vehicleRepository = vehicleRepository;
    }

    public async Task UpdateScheduledVehiclesAsync(CancellationToken cancellationToken)
    {
        // 1. Get today's system date context 
        var today = DateOnly.FromDateTime(DateTime.Today);

        // 2. Fetch all upcoming, active, and pending rows from your repository method
        var relevantBookings = await _bookingRepository.GetActiveAndPendingBookingsAsync(today, cancellationToken);

        foreach (var booking in relevantBookings)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(booking.VehicleId);
            if (vehicle == null) continue;

            // SCENARIO 1: Booking starts today -> Automatically set to "In Use"
            if (booking.StartDate == today && booking.Status == "Pending")
            {
                vehicle.IsAvailable = "In Use";
                booking.Status = "Confirmed"; 

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);
            }

            // SCENARIO 2: Booking ended yesterday or earlier -> Automatically revert to "Available"
            // Change "Completed" to match whatever close status your PostgreSQL constraint accepts
            else if (booking.EndDate < today && booking.Status == "Confirmed")
            {
                vehicle.IsAvailable = "Available";
                booking.Status = "Completed"; 

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);
            }
        }

        // 3. Batch commit all adjustments safely to the PostgreSQL schema
        await _vehicleRepository.SaveChangesAsync(); 
        await _bookingRepository.SaveChangesAsync(); 
    }
}






