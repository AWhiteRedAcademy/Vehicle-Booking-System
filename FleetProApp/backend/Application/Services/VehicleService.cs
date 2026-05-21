using System;
using System.Collections.Generic;
using System.Text;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
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
                IsAvailable = vehicleDto.IsAvailable
            };

            await _vehicleRepository.AddAsync(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            return MapToDto(vehicle);
        }

        public async Task<bool> UpdateVehicleAsync(int id, UpdateVehicleDto vehicleDto)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);

            if (vehicle == null)
            {
                return false;
            }

            vehicle.OwnerId = vehicleDto.OwnerId;
            vehicle.Make = vehicleDto.Make;
            vehicle.Model = vehicleDto.Model;
            vehicle.Category = vehicleDto.Category;
            vehicle.DailyRate = vehicleDto.DailyRate;
            vehicle.IsAvailable = vehicleDto.IsAvailable;

            _vehicleRepository.Update(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteVehicleAsync(int id)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);

            if (vehicle == null)
            {
                return false;
            }

            _vehicleRepository.Delete(vehicle);
            await _vehicleRepository.SaveChangesAsync();

            return true;
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
                IsAvailable = vehicle.IsAvailable
            };
        }
    }
}
