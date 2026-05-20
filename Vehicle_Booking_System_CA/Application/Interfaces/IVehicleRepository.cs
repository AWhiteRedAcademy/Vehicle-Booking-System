using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(int userId, string role);
        Task<IEnumerable<Vehicle>> GetAllVehiclesAsync();
        Task<Vehicle?> GetByIdAsync(int id);
        Task AddAsync(Vehicle vehicle);
        void Update(Vehicle vehicle);
        void Delete(Vehicle vehicle);
        Task SaveChangesAsync();
    }
}
