using Azure.Core;
using Azure.Identity;
using Azure.Storage;
using Azure.Storage.Blobs;
using Clerk.Net.AspNetCore.Security;
using Clerk.Net.Client.Models;
using Clerk.Net.DependencyInjection;
using Congen.Storage.Business;
using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Business.Data_Objects.Responses;
using Congen.Storage.Data;
using Congen.Storage.Data.Data_Objects.Enums;
using Congen.Storage.Data.Data_Objects.Models;
using Congen.Storage.Data.Data_Objects.RabbitMQ;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Azure;
using Microsoft.Extensions.Primitives;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System.Linq.Expressions;
using System.Reflection.Metadata;

#region Configuration

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IStorageRepo, StorageRepo>();
builder.Services.AddScoped<IServiceRepo, ServiceRepo>();
builder.Services.AddScoped<IAccountRepo, AccountRepo>();
builder.Services.AddScoped<IProjectRepo, ProjectRepo>();
builder.Services.AddScoped<ISocialRepo, SocialRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IAuthRepo, AuthRepo>();
builder.Services.AddHttpContextAccessor();
ConfigurationManager configuration = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://dev.reeliciousai.com")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});


// Increase form value count limit to account for audio files
builder.Services.Configure<FormOptions>(options =>
{
    options.ValueCountLimit = int.MaxValue;
});

// Initialise Azure Identity and blob service client
Util.InitBlobStorageClient(configuration["Azure:StorageAccountUrl"], new StorageSharedKeyCredential(configuration["Azure:StorageAccountName"], configuration["Azure:SharedKey"]));
await Util.InitRabbit(configuration["Rabbit:User"], configuration["Rabbit:Password"]);

//Setup Connection String
Util.SetConnectionString(configuration.GetConnectionString("DevConnectionString"));

// i dont know where to put this, shoot me

var app = builder.Build();


// Handle OPTIONS requests before authentication
app.Use(async (context, next) =>
{
    var origin = context.Request.Headers.Origin.FirstOrDefault();

    List<String> allowedOrigins = new List<string>([
        "http://localhost:3000",
        "https://dev.reeliciousai.com"
    ]);

    if (allowedOrigins.Contains(origin))
    {
        if (context.Request.Method == "OPTIONS")
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", origin);
            context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Authorization, Content-Type");
            context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            context.Response.StatusCode = 200;
            await context.Response.WriteAsync("OK");
            return;
        }
    }

    await next();
});

app.UseCors("AllowAll");
// app.UseAuthentication(); will add back when i move auth to middleware
//app.UseAuthorization(); // Add if you plan to use authorization policies
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

#endregion

#region Blob

app.MapGet("/storage/get-service-files", (int type, IHttpContextAccessor context, IServiceRepo repo, IAuthRepo authRepo) =>
{
    ServiceResponse response = new ServiceResponse();

    try
    {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }

        response.ServiceData = repo.GetServiceFiles(type);

        response.IsSuccessful = true;
    }

    catch (Exception ex)
    {
        response.ErrorCode = 500;
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
    }

    return response;
})
.WithName("Get Service Files")
.WithOpenApi();

app.MapGet("/storage/get-file", async (string fileName, IHttpContextAccessor context, IStorageRepo repo, IAuthRepo authRepo, IUserRepo userRepo) =>
{
    string text = "";

    try
    {
        //get auth from headers
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            throw new Exception("Invalid session token");
        }
        
        NUser user = userRepo.GetUserById(session.UserId);
        var file = repo.GetFile(user.Id, fileName);

        //get text from file
        StreamReader reader = new StreamReader(file);
        text = reader.ReadToEnd();
    }

    catch (Exception ex)
    {
        return "";
    }

    return text;
})
.WithName("Get File")
.WithOpenApi();

app.MapGet("/storage/get-files", async (string[] fileNames, IHttpContextAccessor context, IStorageRepo repo, IAuthRepo authRepo, IUserRepo userRepo) =>
{
    Stream[] files = new Stream[fileNames.Length];

    try
    {
        //get auth from headers
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            throw new Exception("Invalid session token");
        }

        NUser user = userRepo.GetUserById(session.UserId);

        files = repo.GetFiles(user.Id, fileNames);
    }

    catch (Exception ex)
    {
        return files;
    }

    return files;
})
.WithName("Get Files")
.WithOpenApi();

app.MapPost("/storage/save-file", async (IHttpContextAccessor context, IStorageRepo repo, IAuthRepo authRepo) =>
{
    SaveFileResponse response = new SaveFileResponse();

    try
    {
        //get auth from headers
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }

        IFormFile file = context.HttpContext.Request.Form.Files.FirstOrDefault();

        if (file == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INCLUDE FILE IN FORM REQUEST!";

            return response;
        }

        if (!file.FileName.Contains("."))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INCLUDE FILE EXTENSION IN FILE NAME!";

            return response;
        }

        string extension = file.FileName.Split('.').LastOrDefault();

        Stream stream = file.OpenReadStream();

        string fileName = repo.SaveFile(session.UserId.ToString(), stream, extension);

        if (String.IsNullOrEmpty(fileName))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.FileNotFound;
            response.ErrorMessage = "FILE NOT FOUND: UPLOADED FILE NOT SAVED IN BLOB!";
            return response;
        }

        response.FileName = fileName;
        response.IsSuccessful = true;
    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }

    return response;
})
.WithName("Save File")
.WithOpenApi();

#endregion

#region AI

app.MapPost("/generate/file", async (int tone, string videoName, string audioName, IHttpContextAccessor context, IStorageRepo repo, IAuthRepo authRepo, IUserRepo userRepo) =>
{
    ResponseBase response = new ResponseBase();

    try
    {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }
        

        var toneName = Enum.GetName(typeof(Tones), tone);

        if (String.IsNullOrEmpty(toneName))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INVALID TONE VALUE!";
            return response;
        }

        IFormFile file = context.HttpContext.Request.Form.Files.FirstOrDefault();

        if (file == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INCLUDE FILE IN FORM REQUEST!";

            return response;
        }

        if (!file.FileName.Contains("."))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INCLUDE FILE EXTENSION IN FILE NAME!";

            return response;
        }

        string extension = file.FileName.Split('.').LastOrDefault();

        Stream stream = file.OpenReadStream();

        //save file to blob so it can be referenced later on
        string fileName = repo.SaveFile(session.UserId.ToString(), stream, extension);

        if (String.IsNullOrEmpty(fileName))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.FileNotFound;
            response.ErrorMessage = "FILE NOT FOUND: UPLOADED FILE NOT SAVED IN BLOB!";
            return response;
        }

        var message = new Message()
        {
            Tone = toneName,
            VideoName = videoName,
            AudioName = audioName,
            FileName = fileName,
            AccessToken = session.Token,
            UserId = session.UserId.ToString()
        };

        await Util.SendMessage(JsonConvert.SerializeObject(message), session.UserId.ToString());

        response.IsSuccessful = true;
    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }

    return response;
})
.WithName("Generate AI With File")
.WithOpenApi();

app.MapPost("/generate/prompt", async (GenerateVideoRequest request, IHttpContextAccessor context, IStorageRepo repo, IProjectRepo projectRepo, IUserRepo userRepo, IAuthRepo authRepo) =>
{
    PromptResponse response = new PromptResponse();

    try
    {
        //get auth from headers
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }

        var toneName = Enum.GetName(typeof(Tones), request.Tone);

        if (String.IsNullOrEmpty(toneName))
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.BadRequest;
            response.ErrorMessage = "BAD REQUEST: INVALID TONE VALUE!";
            return response;
        }

        Project data = new Project();
        data.AudioUrl = request.Audio;
        data.VideoUrl = request.Video;
        data.Prompt = request.Prompt;
        data.CreatorId = session.UserId;
        data.Title = "untitled";


        int projectId = projectRepo.CreateProject(data);

        var message = new Message()
        {
            Tone = toneName,
            ProjectId = projectId,
            Prompt = request.Prompt,
            AccessToken = session.Token,
            UserId = session.UserId.ToString()
        };

        //send message to rabbitmq
        await Util.SendMessage(JsonConvert.SerializeObject(message), session.UserId.ToString());

        response.ProjectId = projectId;
        response.IsSuccessful = true;
    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }

    return response;
})
.WithName("Generate AI With Prompt")
.WithOpenApi();

#endregion

#region Projects

app.MapGet("/project/get-project", (int projectId, IHttpContextAccessor context, IProjectRepo repo, IAuthRepo authRepo) => {
    ProjectResponse response = new ProjectResponse();

    try
    {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }

        // get project by id if belongs to user
        Project project = repo.GetProject(projectId, session.UserId);

        if (project.Id == 0)
        {
            throw new Exception("No project found.");
        }

        response.ProjectData = project;
        response.IsSuccessful = true;

    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }
    return response;
})
.WithName("Get project")
.WithOpenApi();

app.MapGet("/project/get-projects", (IHttpContextAccessor context, IProjectRepo repo, IAuthRepo authRepo) => {
    ProjectsResponse response = new ProjectsResponse();

    try
    {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }

        // get projects belonging to user
        List<Project> projects = repo.GetProjects(session.UserId);

        response.ProjectsData = projects;
        response.IsSuccessful = true;
    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }
    return response;
})
.WithName("Get projects")
.WithOpenApi();

app.MapPut("/project/update-project", (UpdateProjectRequest request, IHttpContextAccessor context, IProjectRepo repo, IAuthRepo authRepo) => {
    ProjectIdReponse response = new ProjectIdReponse();

    try {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }
        // TODO: condionally update based on if ai generation was successful or if failed
        int projectId = repo.UpdateProject(request);

        if (projectId == 0 ) {
            throw new Exception("Couldn't update project");
        }

        response.IsSuccessful = true;
        response.ProjectId = projectId;

    } catch (Exception ex) {
        response.IsSuccessful = false;
        response.ErrorCode = 500;
        response.ErrorMessage = ex.Message;
    }
    return response;
})
.WithName("Update project")
.WithOpenApi();

app.MapDelete("/project/delete-project", ([FromBody] DeleteProjectRequest request, IHttpContextAccessor context, IProjectRepo projectRepo, IAuthRepo authRepo) => {
    ProjectIdReponse response = new ProjectIdReponse();
    
    try
    {
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }
    
        // TODO: delete files associated with the project
        projectRepo.DeleteProject(request.Id, session.UserId);

        response.IsSuccessful = true;
        response.ProjectId = request.Id;
    } 
    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorCode = 500;
        response.ErrorMessage = ex.Message;
    }
    return response;
})
.WithName("Delete project")
.WithOpenApi();

#endregion

#region Social

app.MapPost("/social/instagram/post", async (PostToInstagramRequest request, IHttpContextAccessor context, ISocialRepo repo, IAuthRepo authRepo) =>
{
    ResponseBase response = new ResponseBase();

    try
    {
        //get auth from headers
        string authToken = Auth.getTokenFromRequest(context);

        NSession session = Auth.VerifySessionToken(authToken, authRepo);

        if (session == null)
        {
            response.IsSuccessful = false;
            response.ErrorCode = (int)ErrorCodes.Unauthorized;
            response.ErrorMessage = "Invalid session token";
            return response;
        }
      
        //get access token + userId from DB
        string accessToken = "";
        string userId = "";

        response = await repo.PostToInstagram(request, accessToken, userId);
    }

    catch (Exception ex)
    {
        response.IsSuccessful = false;
        response.ErrorMessage = ex.Message;
        response.ErrorCode = 500;
    }

    return response;
})
.WithName("Post to Instagram")
.WithOpenApi();

#endregion

app.Run();

/*
 * 
 * Service layer (Program Layer). => takes in requests (.Api)
 * Business layer (Apllication Layer). stores request and response object and executes business logic
 * Data layer (Access Layer). => Stores data objects/contracts and reads from database (blob).
 * 
 */


 public class Auth
{
    public static string? getTokenFromRequest(IHttpContextAccessor context)
    {
        string? authToken = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        if (string.IsNullOrEmpty(authToken))
        {
            authToken = context.HttpContext.Request.Cookies["authjs.session-token"];
        }

        if (string.IsNullOrEmpty(authToken))
        {
            authToken = context.HttpContext.Request.Cookies["__Secure-authjs.session-token"];
        }

        if (!string.IsNullOrEmpty(authToken) && authToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            authToken = authToken.Substring("Bearer ".Length).Trim();
        }

        if (string.IsNullOrEmpty(authToken))
        {
            return null;
        }
        return authToken;
    }   
    public static NSession VerifySessionToken(string token, IAuthRepo authRepo)
    {
        if (token == null)
        {
            return null;
        }

        NSession session = authRepo.GetSession(token);

        if (session == null)
        {

            return null;
        }

        if (session.Expires < DateTimeOffset.UtcNow)
        {

            return null;
        }
        return session;
    }
}