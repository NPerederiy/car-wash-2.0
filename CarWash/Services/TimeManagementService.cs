using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        public async Task<(string Time, int SlotId, int[] ChangedSlotIds)> GetProposedTime(int[] selectedOptions, string timeFrom, string timeTo)
        {
            if (selectedOptions == null || selectedOptions.Length == 0) throw new Exception("Selected options were not received");
            if (timeFrom == null || timeFrom == "") throw new Exception("'timeFrom' field was not received");
            if (timeTo == null || timeTo == "") throw new Exception("'timeTo' field was not received");

            var options = await GetOptionsByIdAsync(selectedOptions);
            var cellsNeeded = ConvertTimeToCells(CalcTotalTime(options));
            var tfIndex = ConvertTimeToIndex(timeFrom);
            var ttIndex = ConvertTimeToIndex(timeTo);

            if (tfIndex + cellsNeeded > ttIndex) throw new Exception("The amount of time required is greater than the suggested time interval");

            var timeslot = await GetAvaliableTimeSlotAsync(cellsNeeded, tfIndex, ttIndex);
            var preOrder = MakePreOrder(tfIndex, ttIndex, cellsNeeded, timeslot).Result;

            return (preOrder.timeslot.ToString(startWorkTime, step), preOrder.timeslot.SlotId, preOrder.changedSlots.ToArray());
        }

        private async Task<List<WashService>> GetOptionsByIdAsync(int[] selectedOptions)
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

        private async Task<TimeSlot> GetAvaliableTimeSlotAsync(int cellsNeeded, int tfIndex, int ttIndex)
        {
            var avaliableTimeSlots = await uow.TimeSlotRepository.GetByConditionAsync(x =>
                x.IsFree == true &&
                x.CellCount >= cellsNeeded &&
                tfIndex <= x.CellId + x.CellCount &&
                ttIndex >= x.CellId + cellsNeeded - 1
            );
            return avaliableTimeSlots.OrderBy(x => x.CellId).FirstOrDefault();
        }

        private async Task<TimeSlot> GetTimeSlotByIdAsync(int id)
        {
            var query = await uow.TimeSlotRepository.GetByConditionAsync(x => x.SlotId == id);
            return query.FirstOrDefault();
        }

        private async Task<IEnumerable<TimeSlot>> GetTimeSlotsByIdAsync(params int[] ids)
        {
            var query = await uow.TimeSlotRepository.GetByConditionAsync(x => ids.Contains(x.SlotId));
            return query;
        }

        private async Task<(TimeSlot timeslot, List<int> changedSlots)> MakePreOrder(int tfi, int tti, int cn, TimeSlot ts)
        {
            var changedSlotIds = new List<int>();
            // TODO: Add new time slots to appropriate box details
            if ((tfi == ts.CellId && ts.CellCount == cn) || (tti == ts.CellId + cn - 1))
            {
                ts.IsFree = false;
                uow.TimeSlotRepository.Update(ts);
                changedSlotIds.Add(ts.SlotId);
                return (ts, changedSlotIds);
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
                foreach (var s in slots)
                {
                    changedSlotIds.Add(s.SlotId);
                }
                await CreateTimeSlotsAsync(slots);
                uow.TimeSlotRepository.Delete(ts);
                return (slots.First(), changedSlotIds);
            }
            else if (tfi > ts.CellId)
            {
                var slots = new List<TimeSlot>
                {
                    new TimeSlot()
                    {
                        CellId = ts.CellId,
                        CellCount = tfi - ts.CellId,
                        IsFree = true
                    },
                    new TimeSlot()
                    {
                        CellId = tfi,
                        CellCount = cn,
                        IsFree = false
                    },
                    new TimeSlot()
                    {
                        CellId = tfi + cn,
                        CellCount = ts.CellCount - tfi - cn,
                        IsFree = true
                    }
                };
                await CreateTimeSlotsAsync(slots);
                foreach(var s in slots)
                {
                    changedSlotIds.Add(s.SlotId);
                }
                uow.TimeSlotRepository.Delete(ts);
                return (slots[1] , changedSlotIds);
            }
            return (null, null);
        }

        private async Task CreateTimeSlotsAsync(List<TimeSlot> slots)
        {
            foreach (var s in slots)
            {
                await uow.TimeSlotRepository.CreateAsync(s);
            }
        }

        public async Task RollbackPreOrder(int reservedSlotId, int[] changedSlotIds)
        {
            if (reservedSlotId < 0) throw new Exception("Index out of range exception");
            if (changedSlotIds.Length == 0) throw new Exception("No slot identifiers provided");

            var ts = (await GetTimeSlotsByIdAsync(changedSlotIds).ConfigureAwait(false)).ToList() /*new List<TimeSlot>()*/;
            //foreach (var i in changedSlotIds)
            //{
            //    ts.Add(GetTimeSlotByIdAsync(i).Result);
            //}

            switch (ts.Count())
            {
                case 0:
                    throw new Exception("No slots with such identifiers found");
                case 1:
                    ts[0].IsFree = true;
                    uow.TimeSlotRepository.Update(ts.First());
                    break;
                case 2:
                    if (ts[0].SlotId == reservedSlotId)
                    {
                        ts[0].IsFree = true;
                        if (ts[1].IsFree == true)
                        {
                            Union(ts[0], ts[1]);
                        }
                    }
                    else
                    {
                        ts[1].IsFree = true;
                        if (ts[0].IsFree == true)
                        {
                            Union(ts[0], ts[1]);
                        }
                    }
                    break;
                case 3:
                    if (ts[1].SlotId == reservedSlotId)
                    {
                        ts[1].IsFree = true;
                        if (ts[0].IsFree == true && ts[0].IsFree == false)
                        {
                            Union(ts[0], ts[1]);
                        }
                        if (ts[0].IsFree == false && ts[0].IsFree == true)
                        {
                            Union(ts[1], ts[2]);
                        }
                        if (ts[0].IsFree == true && ts[0].IsFree == true)
                        {
                            var t = Union(ts[0], ts[1]);
                            Union(t, ts[2]);
                        }
                        break;
                    }
                    else
                    {
                        throw new Exception("Incorrect slot ids order. The reserved slot id must be in the middle of ids array");
                    }
                default:
                    throw new Exception("Too many slots. Slot count must be less than 4");
            }
        }

        private TimeSlot Union(TimeSlot ts1, TimeSlot ts2)
        {
            ts1.CellCount += ts2.CellCount;
            uow.TimeSlotRepository.Update(ts1);
            uow.TimeSlotRepository.Delete(ts2);
            return ts1;
        }
    }
}
