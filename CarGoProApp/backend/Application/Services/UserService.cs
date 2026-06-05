using Application.Helpers;
using Microsoft.AspNetCore.Identity;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Domain.Entities;


namespace VehicleBook.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessagePublisher _messagePublisher;

        public UserService(IUserRepository userRepository, IMessagePublisher messagePublisher)
        {
            _userRepository = userRepository;
            _messagePublisher = messagePublisher;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync(UserQueryObject query)
        {
            var users = await _userRepository.GetAllUsersAsync(query);
            return users.Select(MapToDto);
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user == null ? null : MapToDto(user);
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto userDto)
        {
            var normalizedEmail = userDto.Email.Trim().ToLowerInvariant();

            var existingUser = await _userRepository.GetByEmailAsync(normalizedEmail);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email address is already in use.");
            }

            var hasher = new PasswordHasher<User>();


            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                Role = userDto.Role
            };

            user.PasswordHash = hasher.HashPassword(user, userDto.Password);

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            if (string.Equals(user.Role, UserRole.Guest.ToString(), StringComparison.OrdinalIgnoreCase))
            {
                await _messagePublisher.PublishAsync(new SystemEventMessage
                {
                    RoutingKey = "admin.approval.requested",
                    EventType = "AdminApprovalRequested",
                    Category = "AdminApprovalNotification",
                    Description = $"New user {user.Name} is waiting for admin approval.",
                    Data = new Dictionary<string, string>
                    {
                        ["userId"] = user.UserId.ToString(),
                        ["name"] = user.Name,
                        ["email"] = user.Email,
                        ["role"] = user.Role
                    }
                });
            }

            await PublishAuditAsync(
                "UserCreated",
                $"User {user.UserId} was created with role {user.Role}.",
                new Dictionary<string, string>
                {
                    ["userId"] = user.UserId.ToString(),
                    ["email"] = user.Email,
                    ["role"] = user.Role
                });

            return MapToDto(user);
        }

        public async Task<bool> UpdateUserAsync(int id, UpdateUserDto userDto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            var oldRole = user.Role;

            user.Name = userDto.Name;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            user.Role = userDto.Role;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            if (string.Equals(oldRole, UserRole.Guest.ToString(), StringComparison.OrdinalIgnoreCase)
                && !string.Equals(user.Role, UserRole.Guest.ToString(), StringComparison.OrdinalIgnoreCase))
            {
                await _messagePublisher.PublishAsync(new SystemEventMessage
                {
                    RoutingKey = "admin.approval.approved",
                    EventType = "AdminApprovalApproved",
                    Category = "AdminApprovalNotification",
                    Description = $"User {user.Name} was approved as {user.Role}.",
                    Data = new Dictionary<string, string>
                    {
                        ["userId"] = user.UserId.ToString(),
                        ["name"] = user.Name,
                        ["email"] = user.Email,
                        ["oldRole"] = oldRole,
                        ["newRole"] = user.Role
                    }
                });
            }

            await PublishAuditAsync(
                "UserUpdated",
                $"User {user.UserId} was updated.",
                new Dictionary<string, string>
                {
                    ["userId"] = user.UserId.ToString(),
                    ["email"] = user.Email,
                    ["oldRole"] = oldRole,
                    ["newRole"] = user.Role
                });

            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            var deletedUserId = user.UserId;
            var deletedEmail = user.Email;
            var deletedRole = user.Role;

            _userRepository.Delete(user);
            await _userRepository.SaveChangesAsync();

            await PublishAuditAsync(
                "UserDeleted",
                $"User {deletedUserId} was deleted.",
                new Dictionary<string, string>
                {
                    ["userId"] = deletedUserId.ToString(),
                    ["email"] = deletedEmail,
                    ["role"] = deletedRole
                });

            return true;
        }

        private async Task PublishAuditAsync(string eventType, string description, Dictionary<string, string> data)
        {
            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "audit.user",
                EventType = eventType,
                Category = "AuditLog",
                Description = description,
                Data = data
            });
        }


        private static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                LastLogin = user.LastLogin
            };
        }
    }
}
