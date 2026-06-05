using Microsoft.EntityFrameworkCore;
using VehicleBook.Domain.Entities;

namespace VehicleBook.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<BookingAudit> BookingAudits { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Role).HasDefaultValue("Guest");
                entity.Property(e => e.RefreshToken).HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique().HasDatabaseName("users_email_key");

                entity.ToTable("users", t => t.HasCheckConstraint(
                    "users_role_check",
                    "role = ANY (ARRAY['Guest', 'Company', 'Owner', 'Admin']::text[])"
                ));
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.Property(e => e.DailyRate).HasPrecision(10, 2);
                entity.Property(e => e.Category).HasDefaultValue("Sedan");
                entity.Property(e => e.IsAvailable)
                    .HasColumnType("status_type")
                    .HasDefaultValueSql("'Available'::status_type");
                entity.Property(e => e.LicenseNumber).HasDefaultValue("");
                entity.Property(e => e.VinNumber).HasDefaultValue("");
                entity.Property(e => e.ModelYear).HasDefaultValue(0);

                entity.ToTable("vehicles", t =>
                {
                    t.HasCheckConstraint(
                        "vehicles_category_check",
                        "category = ANY (ARRAY['Sedan', 'Hatchback', 'SUV', 'Convertible', 'Pickup Truck', 'Minivan/MPV']::text[])"
                    );
                });

                entity.HasOne(v => v.Owner)
                    .WithMany(u => u.Vehicles)
                    .HasForeignKey(v => v.OwnerId)
                    .HasConstraintName("vehicles_ownerid_fkey")
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.TotalCost).HasPrecision(10, 2);
                entity.Property(e => e.Status).HasDefaultValue("Pending");
                entity.Property(e => e.LicenseNumber).HasDefaultValue("");

                entity.ToTable("bookings", t => t.HasCheckConstraint(
                    "bookings_status_check",
                    "status = ANY (ARRAY['Pending', 'Confirmed', 'Cancelled']::text[])"
                ));

                entity.HasOne(b => b.Company)
                    .WithMany(u => u.Bookings)
                    .HasForeignKey(b => b.CompanyId)
                    .HasConstraintName("bookings_companyid_fkey")
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(b => b.Vehicle)
                    .WithMany(v => v.Bookings)
                    .HasForeignKey(b => b.VehicleId)
                    .HasConstraintName("bookings_vehicleid_fkey")
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<BookingAudit>(entity =>
            {
                entity.HasKey(e => e.AuditId);
                entity.Property(e => e.EventType).HasMaxLength(100).HasDefaultValue("BookingStatusChanged");
                entity.Property(e => e.OldStatus).HasMaxLength(20);
                entity.Property(e => e.NewStatus).HasMaxLength(20);
                entity.Property(e => e.IsPublished).HasDefaultValue(false);
                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("NOW()");
                entity.Property(e => e.PublishedAt)
                    .HasColumnType("timestamp with time zone");

                entity.ToTable("bookingaudit", t => t.HasCheckConstraint(
                    "bookingaudit_status_check",
                    "(oldstatus IS NULL OR oldstatus = ANY (ARRAY['Pending', 'Confirmed', 'Approved', 'Rejected', 'Cancelled', 'Completed']::text[])) AND newstatus = ANY (ARRAY['Pending', 'Confirmed', 'Approved', 'Rejected', 'Cancelled', 'Completed']::text[])"
                ));
            });


            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.NotificationId);
                entity.Property(e => e.Title).HasMaxLength(150);
                entity.Property(e => e.Type).HasMaxLength(50).HasDefaultValue("General");
                entity.Property(e => e.EntityType).HasMaxLength(50);
                entity.Property(e => e.IsRead).HasDefaultValue(false);
                entity.Property(e => e.CreatedAtUtc)
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("NOW()");
                entity.Property(e => e.ReadAtUtc)
                    .HasColumnType("timestamp with time zone");

                entity.HasOne(n => n.User)
                    .WithMany()
                    .HasForeignKey(n => n.UserId)
                    .HasConstraintName("notifications_userid_fkey")
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
