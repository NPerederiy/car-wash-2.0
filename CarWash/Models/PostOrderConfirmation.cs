using Newtonsoft.Json;

namespace CarWash.Models
{
    public class PostOrderConfirmation
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("confirm")]
        public bool Confirm { get; set; }
        [JsonProperty("timeslotId")]
        public int TimeslotId { get; set; }
        [JsonProperty("changedSlots")]
        public int[] ChangedSlotIds { get; set; }
    }
}
