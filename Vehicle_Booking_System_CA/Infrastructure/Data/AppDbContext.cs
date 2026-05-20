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
                entity.Property(e => e.Category).HasDefaultValue("TBD");

                entity.ToTable("vehicles", t => t.HasCheckConstraint(
                    "vehicles_category_check",
                    "category = ANY (ARRAY['Sedan', 'Hatchback', 'SUV', 'Convertible', 'Pickup Truck', 'Minivan/MPV']::text[])"
                ));

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
        }
    }
}
