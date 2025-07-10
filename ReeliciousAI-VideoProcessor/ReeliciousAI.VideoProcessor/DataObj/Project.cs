using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor.DataObj
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        public int StatusId { get; set; }

        public string Status { get; set; }

        public Guid CreatorId { get; set; }

        public string Title { get; set; }

        public string Prompt { get; set; }

        public string VideoUrl { get; set; }

        public string AudioUrl { get; set; }

        public string TtsUrl { get; set; }

        public string CaptionsUrl { get; set; }

        public string CompiledUrl { get; set; }

        public bool Successful { get; set; }
    }
}
