using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarWash.Models
{
    public partial class OrderDetails
    {
        public int OrderId { get; set; }
        public int LineItem { get; set; }
        public int? ServiceId { get; set; }

        public Order Order { get; set; }
        public WashService Service { get; set; }
    }
}
