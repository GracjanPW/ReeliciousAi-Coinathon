# ReeliciousAI Main API

The central API service for the ReeliciousAI platform, built with ASP.NET Core. This service handles all core business logic, data management, and orchestrates communication between the frontend, AI processor, and video processor services.

## 🎯 Overview

The Main API serves as the backbone of the ReeliciousAI ecosystem, providing:
- **RESTful API endpoints** for frontend communication
- **File storage management** using Azure Blob Storage
- **Database operations** for projects, users, and services
- **Authentication & authorization** via Clerk integration
- **Message queuing** with RabbitMQ for service orchestration
- **Social media integration** for content publishing

## 🏗️ Architecture

### Solution Structure
```
Congen.Storage/
├── Congen.Storage.Api/           # Main API project
├── Congen.Storage.Business/      # Business logic layer
└── Congen.Storage.Data/          # Data access layer
```

### Key Components

#### API Layer (`Congen.Storage.Api`)
- **RESTful endpoints** for all platform operations
- **CORS configuration** for frontend integration
- **Swagger documentation** for API exploration
- **Middleware setup** for authentication and routing

#### Business Layer (`Congen.Storage.Business`)
- **Repository pattern** implementation
- **Request/Response models** for API communication
- **Service orchestration** logic
- **Data validation** and business rules

#### Data Layer (`Congen.Storage.Data`)
- **Database models** and entities
- **Repository interfaces** and implementations
- **Utility functions** for external services
- **RabbitMQ integration** for message queuing

## 🚀 Features

### Core Functionality
- **Project Management**: Create, update, and manage video projects
- **File Storage**: Azure Blob Storage integration for media files
- **User Management**: Authentication and user session handling
- **Service Orchestration**: Coordinate AI and video processing workflows

### API Endpoints

#### Project Management
- `POST /generate/prompt` - Generate video content from prompts
- `GET /project/get-projects` - Retrieve user projects
- `GET /project/get-project/{id}` - Get specific project details
- `PUT /project/update-project` - Update project status and metadata
- `DELETE /project/delete-project` - Remove projects

#### File Operations
- `POST /storage/save-file` - Upload and store media files
- `GET /storage/get-file` - Retrieve stored files
- `DELETE /storage/delete-file` - Remove stored files

#### Social Media Integration
- `POST /social/instagram/post` - Publish to Instagram
- `GET /social/instagram/status` - Check posting status

#### Authentication
- `POST /auth/validate-session` - Validate user sessions
- Session token management and verification

### External Integrations

#### Azure Blob Storage
- **File upload/download** operations
- **Secure access** with shared key credentials
- **Automatic cleanup** of temporary files

#### RabbitMQ Message Queue
- **Asynchronous processing** for AI and video operations
- **Message routing** between services
- **Error handling** and retry mechanisms

#### Clerk Authentication
- **User session management**
- **Token validation** and verification
- **Secure API access** control

## 🛠️ Technology Stack

- **Framework**: ASP.NET Core 8.0
- **Language**: C# 12.0
- **Database**: SQL Server with Entity Framework
- **Cloud Storage**: Azure Blob Storage
- **Message Queue**: RabbitMQ
- **Authentication**: Clerk
- **Documentation**: Swagger/OpenAPI
- **Logging**: Built-in ASP.NET Core logging

## 📁 Project Structure

```
Congen.Storage/
├── Congen.Storage.Api/
│   ├── Program.cs              # Application entry point
│   ├── appsettings.json        # Configuration
│   └── Properties/             # Launch settings
├── Congen.Storage.Business/
│   ├── Data Objects/
│   │   ├── Requests/           # API request models
│   │   └── Responses/          # API response models
│   ├── IAccountRepo.cs         # Repository interfaces
│   ├── AccountRepo.cs          # Repository implementations
│   └── ServiceRepo.cs          # Service layer
└── Congen.Storage.Data/
    ├── Data Objects/
    │   ├── Models/             # Database entities
    │   ├── Enums/              # System enums
    │   └── RabbitMQ/           # Message models
    └── Util.cs                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- SQL Server (Local or Azure)
- Azure Storage Account
- RabbitMQ Server
- Clerk Account

## 🔧 Configuration

### Database Configuration
- **Connection String**: Configure SQL Server connection
- **Entity Framework**: Automatic migrations and schema management
- **Data Models**: Project, User, Service, and Account entities

### Azure Storage Setup
- **Blob Service Client**: Configured for file operations
- **Shared Key Authentication**: Secure access to storage
- **Container Management**: Automatic file organization

### RabbitMQ Integration
- **Message Routing**: Topic-based message distribution
- **Queue Management**: Automatic queue creation and binding
- **Error Handling**: Dead letter queues and retry logic

#### Video Generation Process
1. **Frontend Request**: User submits video generation request
2. **Project Creation**: API creates project record in database
3. **Message Queue**: Sends processing request to AI processor
4. **Status Updates**: Real-time updates via WebSocket
5. **File Storage**: Stores generated audio and captions
6. **Video Processing**: Triggers video compilation
7. **Completion**: Updates project with final video URL

#### File Management
- **Upload**: Multipart form data handling
- **Storage**: Azure Blob Storage with unique filenames
- **Retrieval**: Secure file access with authentication
- **Cleanup**: Automatic temporary file removal

## 📄 License

This project is part of the ReeliciousAI platform. See the main repository for license information.


**ReeliciousAI Main API** - The backbone of AI-driven content creation 🚀 