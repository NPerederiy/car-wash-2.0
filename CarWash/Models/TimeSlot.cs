using System;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class TimeSlot
    {
        public TimeSlot()
        {
            BoxDetails = new HashSet<BoxDetails>();
            Orders = new HashSet<Order>();
        }

        public int SlotId { get; set; }
        public int CellId { get; set; }
        public int CellCount { get; set; }
        public bool IsFree { get; set; }

        public ICollection<BoxDetails> BoxDetails { get; set; }
        public ICollection<Order> Orders { get; set; }

        public string ToString(int startWorkTime, int step)
        {
            var minutesInHour = 60;

            if (CellId < 0) return "";

            var h = CellId * step / minutesInHour;
            var m = CellId * step - h * minutesInHour;
            return $"{AddZeros(h + startWorkTime)}:{AddZeros(m)}";

            string AddZeros(int a)
            {
                return a < 10 ? $"0{a}" : $"{a}";
            }
        }
    }
}
