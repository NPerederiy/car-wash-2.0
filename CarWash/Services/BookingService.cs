using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace CarWash.Services
{
    public class BookingService : IBookingService
    {
        IUnitOfWork uow;

        public BookingService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public Task MakeOrder(string name, string phone, int reservedSlotId)
        {
            throw new NotImplementedException();
        }
    }
}
