using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor.DataObj
{
    public class ResponseBase
    {
        public ResponseBase()
        {
            this.ErrorCode = 200;
        }

        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }

        public int ErrorCode { get; set; }

        public string ExceptionMessage { get; set; }
    }
}
