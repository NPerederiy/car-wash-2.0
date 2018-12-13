using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System.Collections.Generic;
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

        public async Task<IEnumerable<WashService>> GetWashServiceByIdAsync(int id)
        {
            return await uow.WashServiceRepository.GetByConditionAsync(x => x.ServiceId.Equals(id));
        }
    }
}
