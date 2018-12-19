using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarWash.Services
{
    public class WashOptionService : IWashOptionService
    {
        IUnitOfWork uow;

        public WashOptionService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<IEnumerable<WashService>> GetWashServicesAsync()
        {
            return await uow.WashServiceRepository.GetAllAsync();
        }

        public async Task<WashService> GetWashServiceByIdAsync(int id)
        {
            if (id < 1) throw new ArgumentException("ID must be greater than zero");
            var options = await uow.WashServiceRepository.GetByConditionAsync(x => x.ServiceId.Equals(id));
            return options.FirstOrDefault();
        }
    }
}
