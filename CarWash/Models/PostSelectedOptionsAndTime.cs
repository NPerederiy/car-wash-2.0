﻿using Newtonsoft.Json;

namespace CarWash.Models
{
    public class PostSelectedOptionsAndTime
    {
        [JsonProperty("selectedOptionId")]
        public int[] SelectedWashServices { get; set; }
        [JsonProperty("timeFrom")]
        public string TimeFrom { get; set; }
        [JsonProperty("timeTo")]
        public string TimeTo { get; set; }
    }
}
