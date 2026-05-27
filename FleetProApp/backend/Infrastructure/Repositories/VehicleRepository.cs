using Application.Helpers;
using Microsoft.EntityFrameworkCore;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;
using VehicleBook.Infrastructure.Data;

namespace VehicleBook.Infrastructure.Repositories
{

    public class VehicleRepository : IVehicleRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Vehicle> _dbSet;

        public VehicleRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Vehicle>();
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(int userId, string role)
        {
            IQueryable<Vehicle> query = _dbSet;

            if (role.Equals("Owner", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(v => v.OwnerId == userId);
            }
            else if (role.Equals("Company", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(v => v.IsAvailable == "Available");
            }
            else
            {
                return Enumerable.Empty<Vehicle>();
            }

            return await query.ToListAsync();
        }


        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
        {
            IQueryable<Vehicle> dbQuery = _dbSet;
            return await dbQuery.ToListAsync();
        }

        public async Task<Vehicle?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task AddAsync(Vehicle vehicle)
        {
            await _dbSet.AddAsync(vehicle);
        }

        public void Update(Vehicle vehicle)
        {
            _dbSet.Update(vehicle);
        }

        public void Delete(Vehicle vehicle)
        {
            _dbSet.Remove(vehicle);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

