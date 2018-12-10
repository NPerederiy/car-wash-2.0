using Newtonsoft.Json;

namespace CarWash.Models
{
    public class PostSelectedOptionsAndTime
    {
        [JsonProperty("selectedOptionId")]
        public int[] SelectedWashServices { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
    }
}
