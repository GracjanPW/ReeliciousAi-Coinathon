using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Business.Data_Objects.Responses;
using Congen.Storage.Business.Data_Objects.Responses.Social;
using Congen.Storage.Data.Data_Objects.Enums;
using Newtonsoft.Json;

namespace Congen.Storage.Business
{
    public class SocialRepo : ISocialRepo
    {
        private static string InstagramApiVersion = "v21.0";
        private static string InstagramReelApiUrl = $"https://rupload.facebook.com/ig-api-upload/{InstagramApiVersion}/";
        private static string InstagramAppUrl = $"https://graph.instagram.com/{InstagramApiVersion}/";

        public async Task<ResponseBase> PostToInstagram(PostToInstagramRequest request, string accessToken, string userId)
        {
            ResponseBase response = new ResponseBase();

            try
            {
                string mediaType = Enum.GetName(typeof(InstagramMediaTypes), request.MediaType);

                if(String.IsNullOrEmpty(mediaType))
                {
                    response.IsSuccessful = false;
                    response.ErrorMessage = "Invalid media type. Please choose either 1 (VIDEO), 2 (REELS) or 3 (STORIES).";
                    response.ErrorCode = (int)ErrorCodes.InvalidMediaType;
                    return response;
                }

                //create a container
                string containerId = await CreateInstagramContainerAsync(accessToken, userId, request.VideoUrl, mediaType, "Please don't judge this, I'm testing code");

                InstagramContainerStatusResponse statusResponse = new InstagramContainerStatusResponse();

                do
                {
                    //check container status
                    statusResponse = await CheckInstagramContainerStatusAsync(accessToken, containerId);

                    //wait for 5 seconds
                    await Task.Delay(5000);

                    //check status again
                    statusResponse = await CheckInstagramContainerStatusAsync(accessToken, containerId);
                }
                while (statusResponse.status == "IN_PROGRESS");

                if(statusResponse.status == "ERROR")
                {
                    throw new Exception("Your video failed to upload. Check the file type.");
                }

                //publish reel
                string publishedId = await PublishInstagramReelAsync(accessToken, userId, containerId);

                response.IsSuccessful = true;
            }

            catch(Exception ex)
            {
                response.IsSuccessful = false;
                response.ErrorMessage = "Failed to post to Instagram. Please try again later.";
                response.ErrorCode = (int)ErrorCodes.PostToInstagramFailed;
                response.ExceptionMessage = ex.Message;
            }

            return response;
        }

        public async Task<string> CreateInstagramContainerAsync(string accessToken, string userId, string videoUrl, string mediaType, string caption, bool shareToFeed = true)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, $"{InstagramAppUrl}/{userId}/media?media_type=REELS&video_url={videoUrl}&caption={caption}&share_to_feed={shareToFeed}&access_token={accessToken}");

                //request.Headers.Add("Content-Type", "application/json");
                request.Headers.Add("Authorization", "Bearer " + accessToken);

                var response = client.SendAsync(request).Result;
                response.EnsureSuccessStatusCode(); //throw an exception if the status code is negative

                string json = await response.Content.ReadAsStringAsync();

                var idResponse = JsonConvert.DeserializeObject<InstagramIdResponse>(json);

                return idResponse.id;
            }

            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InstagramContainerStatusResponse> CheckInstagramContainerStatusAsync(string accessToken, string containerId)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"{InstagramAppUrl}/{containerId}?fields=status_code,status&access_token={accessToken}");

                request.Headers.Add("Authorization", "Bearer " + accessToken);

                var response = client.SendAsync(request).Result;
                response.EnsureSuccessStatusCode(); //throw an exception if the status code is negative

                string json = await response.Content.ReadAsStringAsync();

                InstagramContainerStatusResponse statusResponse = JsonConvert.DeserializeObject<InstagramContainerStatusResponse>(json);

                return statusResponse;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> PublishInstagramReelAsync(string accessToken, string userId, string containerId)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, $"{InstagramAppUrl}/{userId}/media_publish?creation_id={containerId}&access_token={accessToken}");

                request.Headers.Add("Authorization", "Bearer " + accessToken);

                var response = client.SendAsync(request).Result;
                response.EnsureSuccessStatusCode(); //throw an exception if the status code is negative

                string json = await response.Content.ReadAsStringAsync();

                InstagramIdResponse idResponse = JsonConvert.DeserializeObject<InstagramIdResponse>(json);

                return idResponse.id;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
