using System;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class WashService
    {
        public WashService()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int LeadTime { get; set; }

        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
