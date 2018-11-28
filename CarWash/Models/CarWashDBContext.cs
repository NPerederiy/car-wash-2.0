using Microsoft.EntityFrameworkCore;

namespace CarWash.Models
{
    public partial class CarWashDBContext : DbContext
    {
        public virtual DbSet<Box> Boxes { get; set; }
        public virtual DbSet<BoxDetails> BoxDetails { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetails> OrderDetails { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<TimeSlot> TimeSlots { get; set; }
        public virtual DbSet<WashService> WashServices { get; set; }

        public CarWashDBContext(DbContextOptions<CarWashDBContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BoxDetails>(entity =>
            {
                entity.HasKey(e => new { e.BoxId, e.LineItem })
                    .ForSqlServerIsClustered(false);

                entity.Property(e => e.LineItem).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Box)
                    .WithMany(p => p.BoxDetails)
                    .HasForeignKey(d => d.BoxId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BoxDetail__BoxId__46E78A0C");

                entity.HasOne(d => d.TimeSlot)
                    .WithMany(p => p.BoxDetails)
                    .HasForeignKey(d => d.TimeSlotId)
                    .HasConstraintName("FK__BoxDetail__TimeS__47DBAE45");
            });

            modelBuilder.Entity<Box>(entity =>
            {
                entity.HasKey(e => e.BoxId);
            });

            modelBuilder.Entity<OrderDetails>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.LineItem })
                    .ForSqlServerIsClustered(false);

                entity.Property(e => e.LineItem).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderDeta__Order__412EB0B6");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK__OrderDeta__Servi__4222D4EF");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ExecutionDate).HasColumnType("datetime");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Orders__StatusId__3D5E1FD2");

                entity.HasOne(d => d.TimeSlot)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.TimeSlotId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Orders__TimeSlot__3E52440B");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.HasKey(e => e.StatusId);

                entity.Property(e => e.Name)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TimeSlot>(entity =>
            {
                entity.HasKey(e => e.SlotId);
            });

            modelBuilder.Entity<WashService>(entity =>
            {
                entity.HasKey(e => e.ServiceId);

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("money");
            });
        }
    }
}
