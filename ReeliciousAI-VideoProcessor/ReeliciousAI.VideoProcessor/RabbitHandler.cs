using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using ReeliciousAI.VideoProcessor.DataObj;
using System.Configuration;
using System.Drawing;
using System.Globalization;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;

namespace ReeliciousAI.VideoProcessor
{
    public class RabbitHandler
    {
        private static IConnection connection;
        private static IChannel channel;

        private static string _rmqHost = Util.APIUrl.Split("https://").Last();

        private static string _consumeQueue = ConfigurationManager.AppSettings.Get("Consume.Queue");
        private static string _consumeExchange = ConfigurationManager.AppSettings.Get("Consume.Exchange");

        private static string _publishExchange = ConfigurationManager.AppSettings.Get("Publish.Exchange");

        public async Task InitRabbit()
        {
            Console.BackgroundColor = ConsoleColor.DarkYellow;
            Console.WriteLine("Connecting to RabbitMQ...");
            Console.ResetColor();

            try
            {
                ConnectionFactory factory = new ConnectionFactory()
                {
                    HostName = _rmqHost,
                    UserName = ConfigurationManager.AppSettings.Get("RMQ.User"),
                    Password = ConfigurationManager.AppSettings.Get("RMQ.Pass")
                };

                connection = await factory.CreateConnectionAsync();

                //declare consumption exchange
                channel = await connection.CreateChannelAsync();

                #region Consume

                await channel.ExchangeDeclareAsync(_consumeExchange, "topic", true);

                await channel.QueueDeclareAsync(_consumeQueue, true, false, false, null);

                await channel.QueueBindAsync(_consumeQueue, _consumeExchange, "#");

                #endregion

                #region Publish

                await channel.ExchangeDeclareAsync(_publishExchange, "topic", true);

                #endregion

                var consumer = new AsyncEventingBasicConsumer(channel);

                Console.BackgroundColor = ConsoleColor.Green;
                Console.WriteLine("Succesfully connected to RMQ");
                Console.ResetColor();

                consumer.ReceivedAsync += async (ch, args) => ConsumerReceiveAsync(ch, args);
                channel.BasicConsumeAsync(_consumeQueue, false, consumer);
            }

            catch (Exception ex)
            {
                var msg = ex.Message;
                throw ex;
            }
        }

        private async Task ConsumerReceiveAsync(object model, BasicDeliverEventArgs args)
        {
            Console.WriteLine();
            Console.BackgroundColor = ConsoleColor.Green;
            Console.WriteLine("Message received!");
            Console.ResetColor();

            //thread a video processor
            var vidProcessor = new VideoProcessor();

            //de-encode message body
            var body = Encoding.UTF8.GetString(args.Body.ToArray());

            //deserialize message body
            var message = JsonConvert.DeserializeObject<Message>(body);
            Console.WriteLine(message.ProjectId);

            //get project details
            var projectRes = await GetProjectDetails(message.Token, message.ProjectId);

            var project = projectRes.ProjectData;

            string path = vidProcessor.ProcessVideo(project.VideoUrl, message.Speech, message.Subtitles, project.AudioUrl);

            var output = Path.Combine(Util.OutputPath, $"{Guid.NewGuid()}.srt");

            string subtitles_url = await DownloadFile(output, project.CaptionsUrl);

            string path = vidProcessor.ProcessVideo(project.VideoUrl, message.Speech, subtitles_url, project.AudioUrl);

            if (path == null)
            {
                project.Successful = false;
                await UpdateProject(project, message.Token);
                channel.BasicRejectAsync(args.DeliveryTag, args.Redelivered ? false : true);
                return;
            }
            
            //call method to save video
            string? compiledUrl = await SaveFile(path, message.Token);
            if (String.IsNullOrEmpty(compiledUrl))
            {
                project.Successful = false;
                await UpdateProject(project, message.Token);
                channel.BasicRejectAsync(args.DeliveryTag, args.Redelivered ? false : true);
                return;
            }
            
            project.Successful = true;
            project.CompiledUrl = compiledUrl;

            int projectId = await UpdateProject(project, message.Token);

            //send rabbit message
            PublishMessage(JsonConvert.SerializeObject(new { projectId = message.ProjectId }), message.UserId);

            channel.BasicAckAsync(args.DeliveryTag, false);

            return;
        }

        private async Task<string?> SaveFile(string filePath, string token)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token); // :contentReference[oaicite:4]{index=4}

            try
            {
                // Build URL with query param
                byte[] fileBytes = await File.ReadAllBytesAsync(filePath);
                var fileName = Path.GetFileName(filePath);

                var content = new MultipartFormDataContent();
                var fileContent = new ByteArrayContent(fileBytes);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                content.Add(fileContent, "file", fileName);

                var response = await client.PostAsync($"{Util.APIUrl}/storage/save-file", content);
                response.EnsureSuccessStatusCode();

                SaveFileResponse body = await response.Content.ReadFromJsonAsync<SaveFileResponse>();

                if (body != null)
                {
                    return null;
                }
                else if (body.IsSuccessful == true && !String.IsNullOrEmpty(body.FileName))
                {
                    return body.FileName;
                }
                return null;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request failed: {e.Message}");
                return null;
            }
            catch (System.Text.Json.JsonException e)
            {
                Console.WriteLine($"JSON parsing error: {e.Message}");
                return null;
            }

        }

        private async Task<int> UpdateProject(Project project, string token)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            try
            {
                var url = $"{Util.APIUrl}/project/update-project";

                // Send GET and parse JSON directly into a typed object
                var resultUpdate = await client.PutAsJsonAsync(url, project);
                resultUpdate.EnsureSuccessStatusCode();

                ProjectIdReponse projectIdReponse = await resultUpdate.Content.ReadFromJsonAsync<ProjectIdReponse>();
                Console.WriteLine(projectIdReponse.IsSuccessful);
                Console.WriteLine(projectIdReponse.ErrorMessage);

                Console.WriteLine($"ID: {projectIdReponse.ProjectId}");
                return projectIdReponse.ProjectId;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request failed: {e.Message}");
                return 0;
            }
            catch (System.Text.Json.JsonException e)
            {
                Console.WriteLine($"JSON parsing error: {e.Message}");
                return 0;
            }
        }

        private async Task<GetProjectResponse> GetProjectDetails(string token, int projectId)
        {
            HttpClient client = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, Util.APIUrl + $"/project/get-project?projectId={projectId}");
            request.Headers.TryAddWithoutValidation("Authorization", token);

            var response = await client.SendAsync(request);

            return JsonConvert.DeserializeObject<GetProjectResponse>(await response.Content.ReadAsStringAsync());
        }

        private async Task SaveFileToProject(string token, int projectId, Stream file)
        {
            HttpClient client = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, Util.APIUrl + "/project/update-project");
            request.Headers.TryAddWithoutValidation("Authorization", token);
            request.Content = new StreamContent(file);
          
            try
            {
                // Send GET and parse JSON directly into a typed object
                ProjectResponse result = await client.GetFromJsonAsync<ProjectResponse>(url);

                Console.WriteLine($"ID: {result}");
                return result.ProjectData;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request failed: {e.Message}");
                return null;
            }
            catch (System.Text.Json.JsonException e)
            {
                Console.WriteLine($"JSON parsing error: {e.Message}");
                return null;
            }
        }

       private async Task<string> DownloadFile(string filename, string url)
        {

            using (HttpClient client = new HttpClient())
            {
                try
                {
                    byte[] srtData = await client.GetByteArrayAsync(url);
                    await File.WriteAllBytesAsync(filename, srtData);
                    Console.WriteLine("Subtitle downloaded successfully!");
                    return filename;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error downloading subtitle: {ex.Message}");
                    return null;
                }
            }
        }

        private async void PublishMessage(string message, string routingKey)
        {
            var body = Encoding.UTF8.GetBytes(message);

            await channel.BasicPublishAsync(_publishExchange, routingKey, body);
        }

        private bool DeleteFile(string path)
        {
            try
            {
                if (File.Exists(path))
                {
                    File.Delete(path);
                }

                else
                {
                    return false;
                }

                return true;
            }

            catch (Exception ex)
            {
                return false;
            }
        }
    }
}