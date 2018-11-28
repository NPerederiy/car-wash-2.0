using System;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int OrderId { get; set; }
        public int StatusId { get; set; }
        public int TimeSlotId { get; set; }
        public DateTime ExecutionDate { get; set; }
        public DateTime CreatedDate { get; set; }

        public Status Status { get; set; }
        public TimeSlot TimeSlot { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
