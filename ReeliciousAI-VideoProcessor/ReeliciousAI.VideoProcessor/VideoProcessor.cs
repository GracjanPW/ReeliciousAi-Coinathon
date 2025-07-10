using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text;

namespace ReeliciousAI.VideoProcessor
{
    public class VideoProcessor
    {
        public string ProcessVideo(string bgVideo, string speech, string subtitles, string bgAudio)
        {
            try
            {
                var output = Path.Combine(Util.OutputPath, $"{Guid.NewGuid()}.mp4");
                string subtitlesForFfmpeg = subtitles.Replace(@"\", "/").Replace(":", "\\:"); ;
              
                string args =
                    $"-i \"{bgVideo}\" -i \"{speech}\" -i \"{bgAudio}\""
                    + $" -vf \"subtitles=filename='{subtitlesForFfmpeg}'\""
                    + $" -filter_complex \"[1:a][2:a]amix=inputs=2:duration=first:dropout_transition=3[aout]\" "
                    + " -map 0:v"
                    + " -map \"[aout]\""
                    + " -c:v libx264 -c:a aac"
                    + " -shortest"
                    + $" -loglevel error -nostats \"{output}\"";

                using var proc = new Process
                var processInfo = new ProcessStartInfo
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = Util.FFMPEG,
                        Arguments = args,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                var errSb = new StringBuilder();
                proc.ErrorDataReceived += (s, e) => {
                    if (e.Data != null) errSb.AppendLine(e.Data);
                };

                proc.Start(processInfo);
                proc.BeginErrorReadLine();
                proc.WaitForExit();

                if (proc.ExitCode != 0)
                {
                    Console.WriteLine("FFmpeg error:\n" + errSb);
                    return null;
                }
                else
                {
                    Console.WriteLine("FFmpeg succeeded. Output -> " + output);
                    return output;
                }
            }

            catch
            {
                return null;
            }
        }
    }
}