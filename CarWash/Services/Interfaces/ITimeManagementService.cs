using System.Threading.Tasks;

namespace CarWash.Services.Interfaces
{
    public interface ITimeManagementService
    {
        Task<(string Time, int SlotId, int[] ChangedSlotIds)> GetProposedTime(int[] selectedOptions, string timeFrom, string timeTo);
        Task RollbackPreOrder(int reservedSlotId, int[] changedSlotIds);
    }
}
