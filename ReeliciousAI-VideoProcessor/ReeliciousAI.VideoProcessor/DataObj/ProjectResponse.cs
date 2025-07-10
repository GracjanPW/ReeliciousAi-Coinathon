using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor.DataObj
{
    public class ProjectResponse : ResponseBase
    {
        [Key]
        public Project ProjectData { get; set; }
    }
}
