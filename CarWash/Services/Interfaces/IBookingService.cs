using System.Threading.Tasks;

namespace CarWash.Services.Interfaces
{
    public interface IBookingService
    {
        Task MakeOrder(string name, string phone, int reservedSlotId);
    }
}
