using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace MicroSoft.Domain
{
    [DataContract]
    public class Post
    {
        [JsonProperty("postId")] 
        public int PostId { get; set; }
        [JsonProperty("postTitle")] 
        public string PostTitle { get; set; }
        [JsonProperty("postContent")] 
        public string PostContent { get; set; }
        [JsonProperty("postPublisher")] 
        public string PostPublisher { get; set; }
    }
}