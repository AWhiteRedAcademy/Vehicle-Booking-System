using System;
using System.Collections.Generic;
using System.Text;
using Application.Helpers;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMessagePublisher _messagePublisher;

        public VehicleService(IVehicleRepository vehicleRepository, IMessagePublisher messagePublisher)
        {
            _vehicleRepository = vehicleRepository;
            _messagePublisher = messagePublisher;
        }

        public async Task<IEnumerable<VehicleDto>> GetAllVehiclesAsync()
        {
            var vehicles = await _vehicleRepository.GetAllVehiclesAsync();
            return vehicles.Select(MapToDto);
        }

        public async Task<IEnumerable<VehicleDto>> GetVehiclesForUserAsync(int userId, string role)
        {
            var vehicles = await _vehicleRepository.GetVehiclesForUserAsync(userId, role);
            return vehicles.Select(MapToDto);
        }

        public async Task<VehicleDto?> GetVehicleByIdAsync(int id)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);
            return vehicle == null ? null : MapToDto(vehicle);
        }

        public async Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto vehicleDto)
        {
            var vehicle = new Vehicle
            {
                OwnerId = vehicleDto.OwnerId,
                Make = vehicleDto.Make,
                Model = vehicleDto.Model,
                Category = vehicleDto.Category,
                DailyRate = vehicleDto.DailyRate,
                IsAvailable = vehicleDto.IsAvailable,
                LicenseNumber = vehicleDto.LicenseNumber,
                VinNumber = vehicleDto.VinNumber,
                ModelYear = vehicleDto.ModelYear,
            };

            await _vehicleRepository.AddAsync(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            await PublishAuditAsync(
                "VehicleCreated",
                $"Vehicle {vehicle.VehicleId} was created.",
                new Dictionary<string, string>
                {
                    ["vehicleId"] = vehicle.VehicleId.ToString(),
                    ["ownerId"] = vehicle.OwnerId.ToString(),
                    ["status"] = vehicle.IsAvailable,
                    ["licenseNumber"] = vehicle.LicenseNumber
                });

            return MapToDto(vehicle);
        }

        public async Task<bool> UpdateVehicleAsync(int id, UpdateVehicleDto vehicleDto)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);

            if (vehicle == null)
            {
                return false;
            }

            var oldStatus = vehicle.IsAvailable;

            vehicle.OwnerId = vehicleDto.OwnerId;
            vehicle.Make = vehicleDto.Make;
            vehicle.Model = vehicleDto.Model;
            vehicle.Category = vehicleDto.Category;
            vehicle.DailyRate = vehicleDto.DailyRate;
            vehicle.IsAvailable = vehicleDto.IsAvailable;
            vehicle.LicenseNumber = vehicleDto.LicenseNumber;
            vehicle.VinNumber = vehicleDto.VinNumber;
            vehicle.ModelYear = vehicleDto.ModelYear;

            _vehicleRepository.Update(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            if (!string.Equals(oldStatus, vehicle.IsAvailable, StringComparison.OrdinalIgnoreCase))
            {
                await _messagePublisher.PublishAsync(new SystemEventMessage
                {
                    RoutingKey = "vehicle.status.changed",
                    EventType = "VehicleStatusChanged",
                    Category = "VehicleStatusUpdate",
                    Description = $"Vehicle {vehicle.VehicleId} status changed from {oldStatus} to {vehicle.IsAvailable}.",
                    Data = new Dictionary<string, string>
                    {
                        ["vehicleId"] = vehicle.VehicleId.ToString(),
                        ["ownerId"] = vehicle.OwnerId.ToString(),
                        ["oldStatus"] = oldStatus,
                        ["newStatus"] = vehicle.IsAvailable,
                        ["licenseNumber"] = vehicle.LicenseNumber
                    }
                });
            }

            await PublishAuditAsync(
                "VehicleUpdated",
                $"Vehicle {vehicle.VehicleId} was updated.",
                new Dictionary<string, string>
                {
                    ["vehicleId"] = vehicle.VehicleId.ToString(),
                    ["ownerId"] = vehicle.OwnerId.ToString(),
                    ["oldStatus"] = oldStatus,
                    ["newStatus"] = vehicle.IsAvailable,
                    ["licenseNumber"] = vehicle.LicenseNumber
                });

            return true;
        }

        public async Task<bool> DeleteVehicleAsync(int id)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);

            if (vehicle == null)
            {
                return false;
            }

            var deletedVehicleId = vehicle.VehicleId;
            var deletedOwnerId = vehicle.OwnerId;
            var deletedStatus = vehicle.IsAvailable;
            var deletedLicenseNumber = vehicle.LicenseNumber;

            _vehicleRepository.Delete(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            await PublishAuditAsync(
                "VehicleDeleted",
                $"Vehicle {deletedVehicleId} was deleted.",
                new Dictionary<string, string>
                {
                    ["vehicleId"] = deletedVehicleId.ToString(),
                    ["ownerId"] = deletedOwnerId.ToString(),
                    ["status"] = deletedStatus,
                    ["licenseNumber"] = deletedLicenseNumber
                });

            return true;
        }

        private async Task PublishAuditAsync(string eventType, string description, Dictionary<string, string> data)
        {
            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "audit.vehicle",
                EventType = eventType,
                Category = "AuditLog",
                Description = description,
                Data = data
            });
        }


        private static VehicleDto MapToDto(Vehicle vehicle)
        {
            return new VehicleDto
            {
                VehicleId = vehicle.VehicleId,
                OwnerId = vehicle.OwnerId,
                Make = vehicle.Make,
                Model = vehicle.Model,
                Category = vehicle.Category,
                DailyRate = vehicle.DailyRate,
                IsAvailable = vehicle.IsAvailable,
                LicenseNumber = vehicle.LicenseNumber,
                VinNumber = vehicle.VinNumber,
                ModelYear = vehicle.ModelYear,
                OwnerName = vehicle.Owner?.Name ?? string.Empty,
                OwnerEmail = vehicle.Owner?.Email ?? string.Empty,
                OwnerPhone = vehicle.Owner?.PhoneNumber ?? string.Empty,
            };
        }
    }
}
