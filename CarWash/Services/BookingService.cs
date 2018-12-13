using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task MakeOrder()
        {
            throw new NotImplementedException();
        }
    }
}
