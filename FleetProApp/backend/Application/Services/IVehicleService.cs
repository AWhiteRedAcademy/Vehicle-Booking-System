using System;
using System.Collections.Generic;
using System.Text;
using Application.Helpers;
using VehicleBook.Application.DTOs;

namespace VehicleBook.Application.Services
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleDto>> GetAllVehiclesAsync(VehicleQueryObject query);
        Task<IEnumerable<VehicleDto>> GetVehiclesForUserAsync(int userId, string role);
        Task<VehicleDto?> GetVehicleByIdAsync(int id);
        Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto vehicleDto);
        Task<bool> UpdateVehicleAsync(int id, UpdateVehicleDto vehicleDto);
        Task<bool> DeleteVehicleAsync(int id);
    }
}

