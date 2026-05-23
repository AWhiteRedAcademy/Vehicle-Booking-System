using Application.Helpers;
using Microsoft.EntityFrameworkCore;
using VehicleBook.Application.Interfaces;
using VehicleBook.Domain.Entities;
using VehicleBook.Infrastructure.Data;

namespace VehicleBook.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<User> _dbSet;

        public UserRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<User>();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(UserQueryObject query)
        {
            var users = _dbSet.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.SearchTerm))
            {
                users = users.Where(u =>
                    u.Name.Contains(query.SearchTerm) ||
                    u.Email.Contains(query.SearchTerm));
            }

            if (!string.IsNullOrWhiteSpace(query.Role))
            {
                users = users.Where(u => u.Role == query.Role);
            }

            return await users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            await _dbSet.AddAsync(user);
        }

        public void Update(User user)
        {
            _dbSet.Update(user);
        }

        public void Delete(User user)
        {
            _dbSet.Remove(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
