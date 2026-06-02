using VehicleBook.Application.DTOs;
using VehicleBook.Application.Interfaces;
using VehicleBook.Application.Messaging;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMessagePublisher _messagePublisher;

        public BookingService(
            IBookingRepository bookingRepository,
            IVehicleRepository vehicleRepository,
            IMessagePublisher messagePublisher)
        {
            _bookingRepository = bookingRepository;
            _vehicleRepository = vehicleRepository;
            _messagePublisher = messagePublisher;
        }

        public async Task<IEnumerable<BookingDto>> GetAllBookingsAsync()
        {
            var bookings = await _bookingRepository.GetAllBookingsAsync();
            return bookings.Select(MapToDto);
        }

        public async Task<BookingDto?> GetBookingByIdAsync(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            return booking == null ? null : MapToDto(booking);
        }

        public async Task<IEnumerable<BookingDto>> GetBookingsByOwnerIdAsync(int ownerId)
        {
            var bookings = await _bookingRepository.GetBookingsByOwnerIdAsync(ownerId);
            return bookings.Select(MapToDto);
        }

        public async Task<IEnumerable<CompanyBookingDto>> GetCurrentCompanyBookingsAsync(int companyId)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var bookings = await _bookingRepository.GetCurrentBookingsByCompanyIdAsync(companyId, today);
            return bookings.Select(booking => MapToCompanyBookingDto(booking, today));
        }

        public async Task<IEnumerable<CompanyBookingDto>> GetCompanyBookingHistoryAsync(int companyId)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var bookings = await _bookingRepository.GetBookingHistoryByCompanyIdAsync(companyId, today);
            return bookings.Select(booking => MapToCompanyBookingDto(booking, today));
        }

        public async Task<BookingDto> CreateBookingAsync(CreateBookingDto bookingDto)
        {
            if (bookingDto.StartDate >= bookingDto.EndDate)
            {
                throw new ArgumentException("Start date must be before end date.");
            }

            var vehicle = await _vehicleRepository.GetByIdAsync(bookingDto.VehicleId);
            if (vehicle == null)
            {
                throw new ArgumentException("Vehicle not found.");
            }

            if (vehicle.IsAvailable != "Available")
            {
                throw new ArgumentException("Vehicle is not available for booking.");
            }

            var hasOverlap = await _bookingRepository.HasOverlappingBookingAsync(
                bookingDto.VehicleId,
                bookingDto.StartDate,
                bookingDto.EndDate);

            if (hasOverlap)
            {
                throw new ArgumentException("Vehicle is already booked for these dates.");
            }

            var days = bookingDto.EndDate.DayNumber - bookingDto.StartDate.DayNumber;

            var booking = new Booking
            {
                CompanyId = bookingDto.CompanyId,
                VehicleId = bookingDto.VehicleId,
                StartDate = bookingDto.StartDate,
                EndDate = bookingDto.EndDate,
                TotalCost = bookingDto.TotalCost > 0 ? bookingDto.TotalCost : vehicle.DailyRate * days,
                Status = bookingDto.Status,
                LicenseNumber = string.IsNullOrWhiteSpace(bookingDto.LicenseNumber) ? vehicle.LicenseNumber : bookingDto.LicenseNumber,
            };

            await _bookingRepository.AddAsync(booking);
            await _bookingRepository.SaveChangesAsync();

            await PublishBookingCreatedAsync(booking, vehicle);
            await PublishAuditAsync(
                "BookingCreated",
                $"Booking {booking.BookingId} was created for vehicle {booking.VehicleId}.",
                new Dictionary<string, string>
                {
                    ["bookingId"] = booking.BookingId.ToString(),
                    ["companyId"] = booking.CompanyId.ToString(),
                    ["vehicleId"] = booking.VehicleId.ToString(),
                    ["status"] = booking.Status
                });

            return MapToDto(booking);
        }

        public async Task<bool> UpdateBookingAsync(int id, UpdateBookingDto bookingDto)
        {
            if (bookingDto.StartDate >= bookingDto.EndDate)
            {
                throw new ArgumentException("Start date must be before end date.");
            }

            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null)
            {
                return false;
            }

            var vehicle = await _vehicleRepository.GetByIdAsync(bookingDto.VehicleId);
            if (vehicle == null)
            {
                throw new ArgumentException("Vehicle not found.");
            }

            if (vehicle.IsAvailable != "Available")
            {
                throw new ArgumentException("Vehicle is not available for booking.");
            }

            var hasOverlap = await _bookingRepository.HasOverlappingBookingAsync(
                bookingDto.VehicleId,
                bookingDto.StartDate,
                bookingDto.EndDate,
                id);

            if (hasOverlap)
            {
                throw new ArgumentException("Vehicle is already booked for these dates.");
            }

            var days = bookingDto.EndDate.DayNumber - bookingDto.StartDate.DayNumber;
            var oldStatus = booking.Status;

            booking.CompanyId = bookingDto.CompanyId;
            booking.VehicleId = bookingDto.VehicleId;
            booking.StartDate = bookingDto.StartDate;
            booking.EndDate = bookingDto.EndDate;
            booking.TotalCost = vehicle.DailyRate * days;
            booking.Status = bookingDto.Status;
            booking.LicenseNumber = string.IsNullOrWhiteSpace(bookingDto.LicenseNumber) ? vehicle.LicenseNumber : bookingDto.LicenseNumber;

            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            if (!string.Equals(oldStatus, booking.Status, StringComparison.OrdinalIgnoreCase))
            {
                await PublishBookingStatusChangedAsync(booking, oldStatus, booking.Status);
            }

            await PublishAuditAsync(
                "BookingUpdated",
                $"Booking {booking.BookingId} was updated.",
                new Dictionary<string, string>
                {
                    ["bookingId"] = booking.BookingId.ToString(),
                    ["companyId"] = booking.CompanyId.ToString(),
                    ["vehicleId"] = booking.VehicleId.ToString(),
                    ["oldStatus"] = oldStatus,
                    ["newStatus"] = booking.Status
                });

            return true;
        }

        public async Task<bool> DeleteBookingAsync(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null)
            {
                return false;
            }

            var deletedBookingId = booking.BookingId;
            var deletedCompanyId = booking.CompanyId;
            var deletedVehicleId = booking.VehicleId;
            var deletedStatus = booking.Status;

            _bookingRepository.Delete(booking);
            await _bookingRepository.SaveChangesAsync();

            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "booking.deleted",
                EventType = "BookingDeleted",
                Category = "BookingNotification",
                Description = $"Booking {deletedBookingId} was deleted.",
                Data = new Dictionary<string, string>
                {
                    ["bookingId"] = deletedBookingId.ToString(),
                    ["companyId"] = deletedCompanyId.ToString(),
                    ["vehicleId"] = deletedVehicleId.ToString(),
                    ["status"] = deletedStatus
                }
            });

            await PublishAuditAsync(
                "BookingDeleted",
                $"Booking {deletedBookingId} was deleted.",
                new Dictionary<string, string>
                {
                    ["bookingId"] = deletedBookingId.ToString(),
                    ["companyId"] = deletedCompanyId.ToString(),
                    ["vehicleId"] = deletedVehicleId.ToString()
                });

            return true;
        }


        private async Task PublishBookingCreatedAsync(Booking booking, Vehicle vehicle)
        {
            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "booking.created",
                EventType = "BookingCreated",
                Category = "BookingNotification",
                Description = $"Booking {booking.BookingId} was created for {vehicle.Make} {vehicle.Model}.",
                Data = new Dictionary<string, string>
                {
                    ["bookingId"] = booking.BookingId.ToString(),
                    ["companyId"] = booking.CompanyId.ToString(),
                    ["vehicleId"] = booking.VehicleId.ToString(),
                    ["licenseNumber"] = booking.LicenseNumber,
                    ["startDate"] = booking.StartDate.ToString("yyyy-MM-dd"),
                    ["endDate"] = booking.EndDate.ToString("yyyy-MM-dd"),
                    ["status"] = booking.Status,
                    ["totalCost"] = booking.TotalCost.ToString()
                }
            });
        }

        private async Task PublishBookingStatusChangedAsync(Booking booking, string oldStatus, string newStatus)
        {
            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "booking.status.changed",
                EventType = "BookingStatusChanged",
                Category = "BookingStatusUpdate",
                Description = $"Booking {booking.BookingId} status changed from {oldStatus} to {newStatus}.",
                Data = new Dictionary<string, string>
                {
                    ["bookingId"] = booking.BookingId.ToString(),
                    ["companyId"] = booking.CompanyId.ToString(),
                    ["vehicleId"] = booking.VehicleId.ToString(),
                    ["oldStatus"] = oldStatus,
                    ["newStatus"] = newStatus
                }
            });
        }

        private async Task PublishAuditAsync(string eventType, string description, Dictionary<string, string> data)
        {
            await _messagePublisher.PublishAsync(new SystemEventMessage
            {
                RoutingKey = "audit.booking",
                EventType = eventType,
                Category = "AuditLog",
                Description = description,
                Data = data
            });
        }


        private static CompanyBookingDto MapToCompanyBookingDto(Booking booking, DateOnly today)
        {
            var vehicle = booking.Vehicle;
            var owner = vehicle?.Owner;

            return new CompanyBookingDto
            {
                BookingId = booking.BookingId,
                CompanyId = booking.CompanyId,
                VehicleId = booking.VehicleId,
                Make = vehicle?.Make ?? string.Empty,
                Model = vehicle?.Model ?? string.Empty,
                Category = vehicle?.Category ?? string.Empty,
                LicenseNumber = vehicle?.LicenseNumber ?? booking.LicenseNumber,
                OwnerName = owner?.Name ?? string.Empty,
                OwnerEmail = owner?.Email ?? string.Empty,
                OwnerPhone = owner?.PhoneNumber ?? string.Empty,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                TotalCost = booking.TotalCost,
                DailyRate = vehicle?.DailyRate ?? 0,
                Status = booking.Status,
                CurrentBooking = GetCurrentBookingStatus(booking, today)
            };
        }

        private static string GetCurrentBookingStatus(Booking booking, DateOnly today)
        {
            if (booking.Status == "Cancelled")
            {
                return "Cancelled";
            }

            if (booking.EndDate < today)
            {
                return "Completed";
            }

            if (booking.Status == "Pending")
            {
                return "Pending";
            }

            if (booking.StartDate <= today && booking.EndDate >= today)
            {
                return "Active";
            }

            return "Upcoming";
        }

        private static BookingDto MapToDto(Booking booking)
        {
            return new BookingDto
            {
                BookingId = booking.BookingId,
                CompanyId = booking.CompanyId,
                VehicleId = booking.VehicleId,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                TotalCost = booking.TotalCost,
                Status = booking.Status,
                LicenseNumber = booking.LicenseNumber
            };
        }
    }
}
