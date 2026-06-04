using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Services;

public class VehicleStatusService : IVehicleStatusService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IVehicleRepository _vehicleRepository;
    private readonly IBookingAuditRepository _bookingAuditRepository;
    private readonly IMessagePublisher _messagePublisher;

    public VehicleStatusService(
        IBookingRepository bookingRepository,
        IVehicleRepository vehicleRepository,
        IBookingAuditRepository bookingAuditRepository,
        IMessagePublisher messagePublisher)
    {
        _bookingRepository = bookingRepository;
        _vehicleRepository = vehicleRepository;
        _bookingAuditRepository = bookingAuditRepository;
        _messagePublisher = messagePublisher;
    }

    public async Task UpdateScheduledVehiclesAsync(CancellationToken cancellationToken)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        var messages = new List<SystemEventMessage>();

        var relevantBookings = await _bookingRepository.GetActiveAndPendingBookingsAsync(today, cancellationToken);

        foreach (var booking in relevantBookings)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(booking.VehicleId);
            if (vehicle == null)
            {
                continue;
            }

            var oldVehicleStatus = vehicle.IsAvailable;
            var oldBookingStatus = booking.Status;

            if (booking.StartDate == today && booking.Status == "Pending")
            {
                vehicle.IsAvailable = "In Use";
                booking.Status = "Confirmed";

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);

                messages.Add(CreateVehicleStatusChangedMessage(vehicle.VehicleId, vehicle.OwnerId, oldVehicleStatus, vehicle.IsAvailable, booking.BookingId));
                messages.Add(CreateBookingStatusChangedMessage(booking.BookingId, booking.CompanyId, booking.VehicleId, oldBookingStatus, booking.Status));

                await AddBookingAuditAsync(booking, oldBookingStatus, booking.Status, cancellationToken);
            }
            else if (booking.EndDate < today && booking.Status == "Confirmed")
            {
                vehicle.IsAvailable = "Available";
                booking.Status = "Completed";

                _vehicleRepository.Update(vehicle);
                _bookingRepository.Update(booking);

                messages.Add(CreateVehicleStatusChangedMessage(vehicle.VehicleId, vehicle.OwnerId, oldVehicleStatus, vehicle.IsAvailable, booking.BookingId));
                messages.Add(CreateBookingStatusChangedMessage(booking.BookingId, booking.CompanyId, booking.VehicleId, oldBookingStatus, booking.Status));

                await AddBookingAuditAsync(booking, oldBookingStatus, booking.Status, cancellationToken);
            }
        }

        await _vehicleRepository.SaveChangesAsync();
        await _bookingRepository.SaveChangesAsync();
        await _bookingAuditRepository.SaveChangesAsync(cancellationToken);

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

    private async Task AddBookingAuditAsync(Booking booking, string oldStatus, string newStatus, CancellationToken cancellationToken)
    {
        await _bookingAuditRepository.AddAsync(new BookingAudit
        {
            BookingId = booking.BookingId,
            CompanyId = booking.CompanyId,
            VehicleId = booking.VehicleId,
            OldStatus = oldStatus,
            NewStatus = newStatus,
            EventType = "BookingStatusChanged",
            Message = $"Booking {booking.BookingId} status changed from {oldStatus} to {newStatus} automatically.",
            IsPublished = false,
            CreatedAt = DateTime.UtcNow
        }, cancellationToken);
    }
}
