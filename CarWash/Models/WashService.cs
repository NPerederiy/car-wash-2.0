using Newtonsoft.Json;
using System.Collections.Generic;

namespace CarWash.Models
{
    public partial class WashService
    {
        [JsonProperty("_id")]
        public int ServiceId { get; set; }
        [JsonProperty("_name")]
        public string Name { get; set; }
        [JsonProperty("_descr")]
        public string Description { get; set; }
        [JsonProperty("_price")]
        public decimal Price { get; set; }
        [JsonProperty("_leadTime")]
        public int LeadTime { get; set; }

        public ICollection<OrderDetails> OrderDetails { get; set; }

        public WashService()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }
    }
}
