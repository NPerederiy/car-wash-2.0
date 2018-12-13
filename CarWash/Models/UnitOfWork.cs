using CarWash.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarWash.Models
{
    public class UnitOfWork<T> : IUnitOfWork where T : DbContext
    {
        public UnitOfWork(T dbContext) => db = dbContext;

        private readonly DbContext db;

        private readonly IRepository<Box> boxRepository;
        private readonly IRepository<BoxDetails> boxDetailsRepository;
        private readonly IRepository<Order> orderRepository;
        private readonly IRepository<OrderDetails> orderDetailsRepository;
        private readonly IRepository<WashService> washServiceRepository;
        private readonly IRepository<TimeSlot> timeslotRepository;

        public IRepository<Box> BoxRepository => boxRepository ?? new Repository<Box>(db);
        public IRepository<BoxDetails> BoxDetailsRepository => BoxDetailsRepository ?? new Repository<BoxDetails>(db);
        public IRepository<Order> OrderRepository => orderRepository ?? new Repository<Order>(db);
        public IRepository<OrderDetails> OrderDetailsRepository => OrderDetailsRepository ?? new Repository<OrderDetails>(db);
        public IRepository<WashService> WashServiceRepository => washServiceRepository ?? new Repository<WashService>(db);
        public IRepository<TimeSlot> TimeSlotRepository => timeslotRepository ?? new Repository<TimeSlot>(db);
    }
}
