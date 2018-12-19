using CarWash.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarWash.Services.Interfaces
{
    public interface IWashOptionService
    {
        Task<IEnumerable<WashService>> GetWashServicesAsync();
        Task<WashService> GetWashServiceByIdAsync(int id);
    }
}
