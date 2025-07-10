using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Business.Data_Objects.Requests
{
    public class PostToInstagramRequest
    {
        public string VideoUrl { get; set; }

        public int MediaType { get; set; }
    }
}
