namespace CarWash.Models.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<Box> BoxRepository { get; }
        IRepository<BoxDetails> BoxDetailsRepository { get; }
        IRepository<Order> OrderRepository { get; }
        IRepository<OrderDetails> OrderDetailsRepository { get; }
        IRepository<WashService> WashServiceRepository { get; }
        IRepository<TimeSlot> TimeSlotRepository { get; }
    }
}
