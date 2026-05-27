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


        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync(VehicleQueryObject query)
        {
            IQueryable<Vehicle> dbQuery = _dbSet;

            if (!string.IsNullOrEmpty(query.Make))
            {
                dbQuery = dbQuery.Where(v => v.Make.Contains(query.Make));
            }

            if (!string.IsNullOrEmpty(query.Model))
            {
                dbQuery = dbQuery.Where(v => v.Model.Contains(query.Model));
            }

            if (!string.IsNullOrEmpty(query.Category))
            {
                dbQuery = dbQuery.Where(v => v.Category.Contains(query.Category));
            }
            if (!string.IsNullOrEmpty(query.IsAvailable))
            {
                dbQuery = dbQuery.Where(v => v.IsAvailable == query.IsAvailable);
            }

            if (query.OwnerId.HasValue)
            {
                dbQuery = dbQuery.Where(v => v.OwnerId == query.OwnerId.Value);
            }

            if (query.MinDailyRate.HasValue)
            {
                dbQuery = dbQuery.Where(v => v.DailyRate >= query.MinDailyRate.Value);
            }

            if (query.MaxDailyRate.HasValue)
            {
                dbQuery = dbQuery.Where(v => v.DailyRate <= query.MaxDailyRate.Value);
            }

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

