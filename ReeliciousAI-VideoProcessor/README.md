# ReeliciousAI Video Processor

A .NET-based microservice that handles video compilation and editing for the ReeliciousAI platform. This service combines background videos, audio narration, and subtitles to create final video content ready for social media publishing.

## 🎯 Overview

The Video Processor is responsible for:
- **Video Compilation**: Combining multiple media sources into final videos
- **Subtitle Integration**: Adding synchronized subtitles to videos
- **Audio Mixing**: Blending narration with background audio
- **Format Optimization**: Creating videos optimized for social media platforms
- **Quality Control**: Ensuring output meets platform requirements
- **Asynchronous Processing**: Handling video requests via RabbitMQ

## 🚀 Features

### Video Compilation
- **Multi-source Integration**: Combines background video, narration audio, and background music
- **FFmpeg Integration**: Professional-grade video processing using FFmpeg
- **Format Optimization**: Outputs MP4 format optimized for social media
- **Quality Settings**: Configurable video and audio quality parameters

### Subtitle Processing
- **SRT Integration**: Supports standard SRT subtitle format
- **Timing Synchronization**: Accurate subtitle timing with audio
- **Visual Styling**: Customizable subtitle appearance and positioning
- **Multi-language Support**: Framework for multiple language subtitles

### Audio Processing
- **Audio Mixing**: Combines narration and background audio
- **Volume Control**: Automatic audio level balancing
- **Format Compatibility**: Supports various audio input formats
- **Quality Preservation**: Maintains audio quality during processing

### Asynchronous Workflow
- **RabbitMQ Integration**: Message queue for scalable processing
- **Error Handling**: Robust error recovery and retry mechanisms
- **Status Updates**: Real-time progress reporting
- **Resource Management**: Automatic cleanup of temporary files

## 🛠️ Technology Stack

- **Framework**: .NET 8.0
- **Language**: C# 12.0
- **Video Processing**: FFmpeg
- **Message Queue**: RabbitMQ
- **HTTP Client**: HttpClient for API communication
- **JSON Processing**: Newtonsoft.Json
- **File Operations**: System.IO for file management

## 📁 Project Structure

```
ReeliciousAI.VideoProcessor/
├── ReeliciousAI.VideoProcessor/
│   ├── Program.cs              # Application entry point
│   ├── VideoProcessor.cs       # Core video processing logic
│   ├── RabbitHandler.cs        # Message queue handling
│   ├── Util.cs                 # Utility functions
│   ├── App.Config              # Configuration settings
│   └── DataObj/               # Data models
│       ├── Project.cs          # Project data model
│       ├── Message.cs          # RabbitMQ message model
│       └── Response models     # API response structures
└── ReeliciousAI.VideoProcessor.sln
```

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- FFmpeg installed and accessible in PATH
- RabbitMQ server
- Access to ReeliciousAI Main API
- Sufficient disk space for video processing

### Key Components

#### Video Processing (`VideoProcessor.cs`)
```csharp
public string ProcessVideo(string bgVideo, string speech, string subtitles, string bgAudio)
{
    // FFmpeg command construction
    // Multi-source video compilation
    // Audio mixing and subtitle integration
    // Quality optimization and output generation
}
```

#### Message Handling (`RabbitHandler.cs`)
```csharp
public async Task InitRabbit()
{
    // RabbitMQ connection setup
    // Queue and exchange declaration
    // Message consumer configuration
    // Error handling and retry logic
}
```

#### File Management (`Util.cs`)
```csharp
public static async Task<string> DownloadFile(string filename, string url)
{
    // HTTP file download
    // Authentication handling
    // Error recovery
    // Local file management
}
```

## 🔄 Processing Workflow

### 1. Message Reception
- **RabbitMQ Consumer**: Listens for video processing requests
- **Message Parsing**: Extracts project details and file URLs
- **Authentication**: Validates user session tokens
- **Resource Validation**: Checks file availability

### 2. File Preparation
- **Background Video**: Downloads background video file
- **Audio Files**: Retrieves narration and background audio
- **Subtitle File**: Downloads SRT subtitle file
- **Local Storage**: Manages temporary file storage

### 3. Video Compilation
- **FFmpeg Command**: Constructs processing command
- **Multi-source Input**: Combines video and audio sources
- **Subtitle Integration**: Adds synchronized subtitles
- **Audio Mixing**: Blends narration with background audio

### 4. Quality Optimization
- **Codec Selection**: Uses H.264 for video compression
- **Audio Encoding**: AAC format for audio
- **Resolution**: Optimizes for social media platforms
- **File Size**: Balances quality and file size

### 5. Output Generation
- **Final Video**: Creates compiled video file
- **Quality Check**: Validates output file integrity
- **File Upload**: Sends to main API storage
- **Cleanup**: Removes temporary files

### 6. Status Updates
- **Project Update**: Updates project with final video URL
- **Success Notification**: Sends completion message
- **Error Handling**: Reports failures with details

## 🔧 Monitoring & Logging

### Log Levels
- **INFO**: Processing steps and status updates
- **ERROR**: Processing failures and exceptions
- **DEBUG**: Detailed FFmpeg command information

### Key Metrics
- **Processing Time**: Video compilation duration
- **Success Rate**: Percentage of successful processing
- **File Sizes**: Input and output file sizes
- **Queue Depth**: Number of pending video requests

### Performance Optimization
- **Parallel Processing**: Multiple video processing threads
- **Memory Management**: Efficient file handling
- **Disk I/O**: Optimized file read/write operations
- **CPU Usage**: FFmpeg process optimization

## 📄 License

This project is part of the ReeliciousAI platform. See the main repository for license information.

## 🆘 Support

For support and questions:
- Check the FFmpeg documentation
- Review the RabbitMQ integration guide
- Contact the development team

---

**ReeliciousAI Video Processor** - Creating compelling video content with precision 🎬✨ 