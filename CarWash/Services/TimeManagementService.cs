using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarWash.Services
{
    public class TimeManagementService : ITimeManagementService
    {
        private IUnitOfWork uow;
        private readonly int startWorkTime;
        private readonly int step;
        private const int minutesInHour = 60;

        public TimeManagementService(IUnitOfWork uow)
        {
            this.uow = uow;
            startWorkTime = 8;
            step = 5;
        }

        public async Task<string> GetProposedTime(int[] selectedOptions, string timeFrom, string timeTo)
        {
            if (selectedOptions == null || selectedOptions.Length == 0) throw new Exception("Selected options were not received");
            if (timeFrom == null || timeFrom == "") throw new Exception("'timeFrom' field was not received");
            if (timeTo == null || timeTo == "") throw new Exception("'timeTo' field was not received");

            var options = await GetOptionsById(selectedOptions);
            var cellsNeeded = ConvertTimeToCells(CalcTotalTime(options));
            var tfIndex = ConvertTimeToIndex(timeFrom);
            var ttIndex = ConvertTimeToIndex(timeTo);

            if (tfIndex + cellsNeeded > ttIndex) return "";

            var timeslot = await GetTimeSlot(cellsNeeded, tfIndex, ttIndex);

            return ConvertTimeSlotToString(PreOrder(tfIndex, ttIndex, cellsNeeded, timeslot).Result);
        }

        private async Task<List<WashService>> GetOptionsById(int[] selectedOptions)
        {
            var options = new List<WashService>();
            foreach (var id in selectedOptions)
            {
                options.AddRange(await uow.WashServiceRepository.GetByConditionAsync(x => x.ServiceId.Equals(id)));
            }
            return options;
        }

        private int CalcTotalTime(List<WashService> options)
        {
            var time = 0;
            foreach(var o in options)
            {
                time += o.LeadTime;
            }
            return time;
        }

        private int ConvertTimeToCells(int time)
        {
            return time / step;
        }

        private int ConvertTimeToIndex(string time)
        {
            return (SplitAndConvertToMinutes(time) - startWorkTime * minutesInHour) / step;
        }

        private int SplitAndConvertToMinutes(string time)
        {
            var t = time.Split(':');
            return Convert.ToInt32(t[1]) + Convert.ToInt32(t[0]) * minutesInHour;
        } 

        private async Task<TimeSlot> GetTimeSlot(int cellsNeeded, int tfIndex, int ttIndex)
        {
            var avaliableTimeSlots = await uow.TimeSlotRepository.GetByConditionAsync(x =>
                x.IsFree == true &&
                x.CellCount >= cellsNeeded &&
                tfIndex <= x.CellId + x.CellCount &&
                ttIndex >= x.CellId + cellsNeeded - 1
            );

            return avaliableTimeSlots.OrderBy(x => x.CellId).FirstOrDefault();
        }

        private async Task<TimeSlot> PreOrder(int tfi, int tti, int cn, TimeSlot ts)
        {
            // TODO: Add new time slots to appropriate box details
            if ((tfi == ts.CellId && ts.CellCount == cn) || (tti == ts.CellId + cn - 1))
            {
                ts.IsFree = false;
                await uow.TimeSlotRepository.UpdateAsync(ts);
                return ts;
            }
            else if (tfi < ts.CellId)
            {
                var slots = new List<TimeSlot>
                {
                    new TimeSlot()
                    {
                        CellId = ts.CellId,
                        CellCount = cn,
                        IsFree = false
                    },
                    new TimeSlot()
                    {
                        CellId = ts.CellId + cn,
                        CellCount = ts.CellCount - cn,
                        IsFree = true
                    }
                };
                await CreateTimeSlotsAsync(slots);
                await uow.TimeSlotRepository.DeleteAsync(ts);
                return slots.First();
            }
            else if (tfi > ts.CellId)
            {
                var slots = new List<TimeSlot>
                {
                    new TimeSlot()
                    {
                        CellId = tfi,
                        CellCount = cn,
                        IsFree = false
                    },
                    new TimeSlot()
                    {
                        CellId = ts.CellId,
                        CellCount = tfi - ts.CellId,
                        IsFree = true
                    },
                    new TimeSlot()
                    {
                        CellId = tfi + cn,
                        CellCount = ts.CellCount - tfi - cn,
                        IsFree = true
                    }
                };
                await CreateTimeSlotsAsync(slots);
                await uow.TimeSlotRepository.DeleteAsync(ts);
                return slots.First();
            }
            return null;
        }

        private async Task CreateTimeSlotsAsync(List<TimeSlot> slots)
        {
            foreach (var s in slots)
            {
                await uow.TimeSlotRepository.CreateAsync(s);
            }
        }

        private string RollbackPreOrder()
        {

            return "";
        }

        private string ConvertTimeSlotToString(TimeSlot ts)
        {
            if (ts == null) return "";

            var h = ts.CellId * step / minutesInHour;
            var m = ts.CellId * step - h * minutesInHour;
            return $"{AddZeros(h + startWorkTime)}:{AddZeros(m)}";

            string AddZeros(int a)
            {
                return a < 10 ? $"0{a}" : $"{a}";
            }
        }
    }
}
