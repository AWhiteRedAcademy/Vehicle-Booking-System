using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;

namespace VehicleBook.Application.Services;

public class VehicleStatusService : IVehicleStatusService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IVehicleRepository _vehicleRepository;
    private readonly IMessagePublisher _messagePublisher;

    public VehicleStatusService(
        IBookingRepository bookingRepository,
        IVehicleRepository vehicleRepository,
        IMessagePublisher messagePublisher)
    {
        _bookingRepository = bookingRepository;
        _vehicleRepository = vehicleRepository;
        _messagePublisher = messagePublisher;
    }

    public async Task UpdateScheduledVehiclesAsync(CancellationToken cancellationToken)
    {
        // 1. Get today's system date context 
        var today = DateOnly.FromDateTime(DateTime.Today);
        var messages = new List<SystemEventMessage>();

        // 2. Fetch all upcoming, active, and pending rows from your repository method
        var relevantBookings = await _bookingRepository.GetActiveAndPendingBookingsAsync(today, cancellationToken);

        foreach (var booking in relevantBookings)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(booking.VehicleId);
            if (vehicle == null) continue;

            var oldVehicleStatus = vehicle.IsAvailable;
            var oldBookingStatus = booking.Status;

            // SCENARIO 1: Booking starts today -> Automatically set to "In Use"
            if (booking.StartDate == today && booking.Status == "Pending")
            {
                vehicle.IsAvailable = "In Use";
                booking.Status = "Confirmed";

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);

                messages.Add(CreateVehicleStatusChangedMessage(vehicle.VehicleId, vehicle.OwnerId, oldVehicleStatus, vehicle.IsAvailable, booking.BookingId));
                messages.Add(CreateBookingStatusChangedMessage(booking.BookingId, booking.CompanyId, booking.VehicleId, oldBookingStatus, booking.Status));
                messages.Add(CreateAuditMessage("ScheduledVehicleStatusUpdated", $"Vehicle {vehicle.VehicleId} and booking {booking.BookingId} were automatically updated."));
            }

            // SCENARIO 2: Booking ended yesterday or earlier -> Automatically revert to "Available"
            // Change "Completed" to match whatever close status your PostgreSQL constraint accepts
            else if (booking.EndDate < today && booking.Status == "Confirmed")
            {
                vehicle.IsAvailable = "Available";
                booking.Status = "Completed";

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);

                messages.Add(CreateVehicleStatusChangedMessage(vehicle.VehicleId, vehicle.OwnerId, oldVehicleStatus, vehicle.IsAvailable, booking.BookingId));
                messages.Add(CreateBookingStatusChangedMessage(booking.BookingId, booking.CompanyId, booking.VehicleId, oldBookingStatus, booking.Status));
                messages.Add(CreateAuditMessage("ScheduledVehicleStatusUpdated", $"Vehicle {vehicle.VehicleId} and booking {booking.BookingId} were automatically updated."));
            }
        }

        // 3. Batch commit all adjustments safely to the PostgreSQL schema
        await _vehicleRepository.SaveChangesAsync();
        await _bookingRepository.SaveChangesAsync();

        foreach (var message in messages)
        {
            await _messagePublisher.PublishAsync(message, cancellationToken);
        }
    }

    private static SystemEventMessage CreateVehicleStatusChangedMessage(int vehicleId, int ownerId, string oldStatus, string newStatus, int bookingId)
    {
        return new SystemEventMessage
        {
            RoutingKey = "vehicle.status.changed",
            EventType = "VehicleStatusChanged",
            Category = "VehicleStatusUpdate",
            Description = $"Vehicle {vehicleId} status changed from {oldStatus} to {newStatus}.",
            Data = new Dictionary<string, string>
            {
                ["vehicleId"] = vehicleId.ToString(),
                ["ownerId"] = ownerId.ToString(),
                ["bookingId"] = bookingId.ToString(),
                ["oldStatus"] = oldStatus,
                ["newStatus"] = newStatus
            }
        };
    }

    private static SystemEventMessage CreateBookingStatusChangedMessage(int bookingId, int companyId, int vehicleId, string oldStatus, string newStatus)
    {
        return new SystemEventMessage
        {
            RoutingKey = "booking.status.changed",
            EventType = "BookingStatusChanged",
            Category = "BookingStatusUpdate",
            Description = $"Booking {bookingId} status changed from {oldStatus} to {newStatus}.",
            Data = new Dictionary<string, string>
            {
                ["bookingId"] = bookingId.ToString(),
                ["companyId"] = companyId.ToString(),
                ["vehicleId"] = vehicleId.ToString(),
                ["oldStatus"] = oldStatus,
                ["newStatus"] = newStatus
            }
        };
    }

    private static SystemEventMessage CreateAuditMessage(string eventType, string description)
    {
        return new SystemEventMessage
        {
            RoutingKey = "audit.vehicle-status",
            EventType = eventType,
            Category = "AuditLog",
            Description = description
        };
    }

}
