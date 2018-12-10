using CarWash.Models;
using CarWash.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarWash.Services
{
    public class TimeManagementService
    {
        private readonly IRepository<WashService> washServices;
        private readonly IRepository<TimeSlot> timeSlots;
        private readonly int startWorkTime;
        private readonly int step;
        private const int minutesInHour = 60;

        public TimeManagementService(CarWashDBContext context)
        {
            washServices = new Repository<WashService>(context);
            timeSlots = new Repository<TimeSlot>(context);
            startWorkTime = 8;
            step = 5;
        }

        public async Task<string> GetProposedTime(int[] selectedOptions, string timeFrom, string timeTo)
        {
            if (selectedOptions == null) throw new Exception("Selected options were not received");
            if (timeFrom == null) throw new Exception("'timeFrom' field was not received");
            if (timeTo == null) throw new Exception("'timeTo' field was not received");

            var options = await GetOptionsById(selectedOptions);
            var cellsNeeded = ConvertTimeToCells(CalcTotalTime(options));
            var tfIndex = ConvertTimeToIndex(timeFrom);
            var ttIndex = ConvertTimeToIndex(timeTo);

            var avaliableTimeSlots = await GetTimeSlot(cellsNeeded);
            var timeslot = (from x in avaliableTimeSlots
                           where x.CellId + cellsNeeded <= ttIndex
                           orderby x.CellId
                           select x).FirstOrDefault();
                           //where x.CellId >= tfIndex

            return ConvertTimeSlotToString(timeslot);
        }

        private async Task<List<WashService>> GetOptionsById(int[] selectedOptions)
        {
            var options = new List<WashService>();
            foreach (var id in selectedOptions)
            {
                options.AddRange(await washServices.GetByConditionAsync(x => x.ServiceId.Equals(id)));
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

        private async Task<IEnumerable<TimeSlot>> GetTimeSlot(int cellsNeeded)
        {
            return await timeSlots.GetByConditionAsync(x => x.IsFree == true && x.CellCount >= cellsNeeded);
        }

        private string ConvertTimeSlotToString(TimeSlot ts)
        {
            var h = ts.CellId * step / minutesInHour;
            var m = ts.CellId * step - h;
            return $"{AddZeros(h)}:{AddZeros(m)}";

            string AddZeros(int a)
            {
                return a < 10 ? $"0{a}" : $"{a}";
            }
        }
    }
}
