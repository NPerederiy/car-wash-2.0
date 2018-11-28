using System;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class BoxDetails
    {
        public int BoxId { get; set; }
        public int LineItem { get; set; }
        public int? TimeSlotId { get; set; }

        public Box Box { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}
