using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReeliciousAI.VideoProcessor
{
    public static class Util
    {
        public static string APIUrl = ConfigurationManager.AppSettings.Get("APIUrl");

        public static string FFMPEG = ConfigurationManager.AppSettings.Get("FFMPEG-DIR");

        public static string OutputPath = ConfigurationManager.AppSettings.Get("VideoProcessing-DIR");
    }
}
