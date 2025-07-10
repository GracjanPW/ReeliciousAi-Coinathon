using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Business.Data_Objects.Requests
{
    public class UpdateProjectRequest
    {
        public int Id { get; set; }

        public string TtsUrl { get; set; }

        public string CaptionsUrl { get; set; }

        public bool Successful { get; set; }
    }
}
