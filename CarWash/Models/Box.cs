using System;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class Box
    {
        public Box()
        {
            BoxDetails = new HashSet<BoxDetails>();
        }

        public int BoxId { get; set; }
        public TimeSpan? WorkTimeFrom { get; set; }
        public TimeSpan? WorkTimeTo { get; set; }
        public int? WorkerCount { get; set; }

        public ICollection<BoxDetails> BoxDetails { get; set; }
    }
}
