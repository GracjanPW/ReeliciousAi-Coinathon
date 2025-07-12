# ReeliciousAI AI Processor

A Python-based microservice that handles AI-powered script generation and text-to-speech processing for the ReeliciousAI platform. This service processes user prompts to create engaging video scripts and converts them into high-quality audio narration.

## 🎯 Overview

The AI Processor is responsible for:
- **Script Generation**: Creating engaging video scripts from user prompts using Azure OpenAI
- **Text-to-Speech**: Converting generated scripts into natural-sounding audio
- **Speech Recognition**: Transcribing audio to create subtitle files
- **Message Queue Processing**: Asynchronous processing via RabbitMQ
- **File Management**: Handling temporary audio and subtitle files

## 🚀 Features

### AI Script Generation
- **Azure OpenAI Integration**: Uses GPT-4 for intelligent script creation
- **Tone Customization**: Multiple tone options (funny, serious, casual, etc.)
- **Viral Content Optimization**: Scripts designed for short-form video platforms
- **Word Limit Control**: Optimized for 200-word maximum content length

### Text-to-Speech Processing
- **Natural Voice Synthesis**: High-quality audio generation
- **Tone-Aware Narration**: Voice characteristics match script tone
- **Multiple Audio Formats**: MP3 output for compatibility
- **Background Audio Integration**: Support for background music

### Speech Recognition
- **Audio Transcription**: Converts TTS audio to subtitle files
- **SRT Format**: Standard subtitle format for video editing
- **Timing Synchronization**: Accurate subtitle timing with audio

### Asynchronous Processing
- **RabbitMQ Integration**: Message queue for scalable processing
- **Error Handling**: Robust error recovery and retry mechanisms
- **Status Updates**: Real-time progress reporting to main API
- **Resource Management**: Automatic cleanup of temporary files

## 🛠️ Technology Stack

- **Language**: Python 3.11+
- **AI Services**: Azure OpenAI (GPT-4)
- **TTS Engine**: Azure Cognitive Services
- **Speech Recognition**: Whisper API
- **Message Queue**: RabbitMQ with aio-pika
- **HTTP Client**: aiohttp for API communication
- **File Handling**: aiofiles for async file operations
- **Environment**: python-dotenv for configuration

## 📁 Project Structure

```
ReeliciousAi-AIProccessor/
├── main.py                 # Application entry point
├── caller.py               # Main processing logic
├── scripttest.py           # Script generation module
├── tts.py                  # Text-to-speech processing
├── requirements.txt        # Python dependencies
├── vercel.json            # Vercel deployment config
└── utils/
    ├── file_lib.py        # File utility functions
    └── loaders.py         # Data loading utilities
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11 or higher
- Azure OpenAI account with GPT-4 access
- Azure Cognitive Services for TTS
- RabbitMQ server
- Access to ReeliciousAI Main API

## 🔧 Configuration

### Azure OpenAI Setup
- **Resource**: Create Azure OpenAI resource
- **Deployment**: Deploy GPT-4 model
- **API Key**: Configure authentication
- **Endpoint**: Set up custom endpoint URL

### Azure Cognitive Services
- **Speech Service**: Provision Azure Speech Service
- **TTS Voices**: Configure available voice options
- **API Access**: Set up authentication keys

### RabbitMQ Configuration
- **Queue**: `ai-processing-queue` for incoming requests
- **Exchange**: `ai-exchange` for message routing
- **Routing**: Topic-based message distribution
- **Durability**: Persistent queues for reliability

### Key Components

#### Script Generation (`scripttest.py`)
```python
async def scriptgen(prompt, tone):
    """
    Generate engaging video scripts using Azure OpenAI GPT-4
    """
    # Azure OpenAI configuration
    # Prompt template for viral content
    # Tone-aware script generation
```

#### Text-to-Speech (`tts.py`)
```python
async def tts(text, instructions):
    """
    Convert text to speech using Azure Cognitive Services
    """
    # Azure Speech Service integration
    # Voice synthesis with tone matching
    # Audio file generation
```

#### Message Processing (`caller.py`)
```python
async def generate(params):
    """
    Main processing workflow for video content generation
    """
    # 1. Script generation or file retrieval
    # 2. Text-to-speech conversion
    # 3. Audio transcription
    # 4. File upload to main API
    # 5. Project status update
```

## 🔄 Processing Workflow

### 1. Message Reception
- **RabbitMQ Consumer**: Listens for processing requests
- **Message Parsing**: Extracts project ID, prompt, and tone
- **Authentication**: Validates user session tokens

### 2. Script Generation
- **Prompt Processing**: Formats user input for AI model
- **Tone Application**: Applies selected tone to script
- **Content Optimization**: Ensures viral-friendly content
- **Length Control**: Maintains 200-word limit

### 3. Audio Processing
- **TTS Conversion**: Generates natural-sounding audio
- **Voice Selection**: Matches voice to script tone
- **Audio Formatting**: Creates MP3 files for compatibility

### 4. Subtitle Creation
- **Audio Transcription**: Converts TTS audio to text
- **Timing Synchronization**: Aligns subtitles with audio
- **SRT Generation**: Creates standard subtitle format

### 5. File Management
- **Temporary Storage**: Manages local file processing
- **API Upload**: Sends files to main API storage
- **Cleanup**: Removes temporary files after processing

### 6. Status Updates
- **Project Update**: Updates project with audio/subtitle URLs
- **Success Notification**: Sends completion message to queue
- **Error Handling**: Reports failures with detailed messages

## 🔧 Monitoring & Logging

### Log Levels
- **INFO**: Processing steps and status updates
- **ERROR**: Processing failures and exceptions
- **DEBUG**: Detailed processing information

### Key Metrics
- **Processing Time**: Script generation and TTS duration
- **Success Rate**: Percentage of successful processing
- **Error Types**: Categorization of processing failures
- **Queue Depth**: Number of pending messages

## 📄 License

This project is part of the ReeliciousAI platform. See the main repository for license information.

## 🆘 Support

**ReeliciousAI AI Processor** - Powering intelligent content creation with AI 🧠✨ 