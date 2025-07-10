using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor.DataObj
{
    public class Message
    {
        public string Token { get; set; }

        public string UserId { get; set; }

        public int ProjectId { get; set; }

        public string Speech { get; set; }

        public string Subtitles { get; set; }
    }
}
