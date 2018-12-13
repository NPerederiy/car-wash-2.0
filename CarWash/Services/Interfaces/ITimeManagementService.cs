using System.Threading.Tasks;

namespace CarWash.Services.Interfaces
{
    public interface ITimeManagementService
    {
        Task<string> GetProposedTime(int[] selectedOptions, string timeFrom, string timeTo);
    }
}
