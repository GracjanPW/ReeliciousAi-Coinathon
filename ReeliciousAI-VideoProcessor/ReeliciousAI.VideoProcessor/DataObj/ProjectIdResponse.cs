using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor.DataObj
{
    public class ProjectIdReponse : ResponseBase
    {
        [Key]
        public int ProjectId { get; set; }
    }
}
