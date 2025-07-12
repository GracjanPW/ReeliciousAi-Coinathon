# ZORA SUBMISSION - ReeliciousAI - AI-Powered Content Creation Platform

> **Create viral short format videos with AI on ZORA** 🎬✨

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Dev%20Environment-blue?style=for-the-badge&logo=vercel)](https://dev.reeliciousai.com/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Zora%20NFT-purple?style=for-the-badge)](https://zora.co/)

## 🎯 Overview

ReeliciousAI is a comprehensive AI-powered content creation platform that enables users to generate viral short-form videos for social media platforms. The platform combines advanced AI script generation, automated video editing, and blockchain integration to create a complete content creation ecosystem.

### 🌟 Key Features

- **🤖 AI Script Generation**: Create engaging video scripts with customizable tones
- **🎬 Automated Video Editing**: Combine scripts with trending clips automatically
- **📱 Multi-platform Publishing**: Direct publishing to TikTok, Instagram, YouTube Shorts
- **💎 Zora NFT Integration**: Mint your content as NFTs for additional monetization
- **📊 Performance Analytics**: Track engagement and growth metrics
- **⚡ Real-time Processing**: Live status updates and progress tracking


## 🚀 Live Platform

**Experience ReeliciousAI in action:** [https://dev.reeliciousai.com/](https://dev.reeliciousai.com/)

The live development environment showcases:
- **Landing Page**: Platform overview and feature highlights
- **User Dashboard**: Project management and content creation tools
- **Real-time Processing**: Live status updates during video generation
- **Zora Integration**: NFT minting capabilities for content monetization

## 💎 Zora Blockchain Integration

### NFT Content Monetization

ReeliciousAI integrates with [Zora](https://zora.co/) to enable content creators to mint their videos as NFTs, creating additional revenue streams:

#### Key Zora Features
- **🎨 Content NFTs**: Mint your AI-generated videos as unique NFTs
- **💰 Revenue Sharing**: Earn from NFT sales and royalties
- **🌐 Decentralized Storage**: Content stored on IPFS for permanence
- **🎯 Creator Economy**: Direct monetization of viral content

##  Click here to be redirected to Technical Implementation - [Frontend](https://github.com/GracjanPW/ReeliciousAi-Coinathon/tree/master/ReeliciousAI_Frontend)

### Zora technical implementation can be found in the frontend folder [Frontend](https://github.com/GracjanPW/ReeliciousAi-Coinathon/tree/master/ReeliciousAI_Frontend)

#### NFT Creation Workflow
1. **Video Generation**: AI creates viral video content
2. **Metadata Creation**: Generate NFT metadata with video file
3. **IPFS Upload**: Store video and metadata on decentralized storage
4. **Zora Minting**: Create NFT on Zora blockchain
5. **Revenue Distribution**: Automatic royalty distribution to creators

## 📁 Repository Structure

```
ReeliciousAI-Coinathon/
├── ReeliciousAI_Frontend/          # Next.js 15 Web Application
│   ├── src/app/                    # App Router & Pages
│   ├── components/                  # Reusable UI Components
│   ├── auth/                       # Authentication (NextAuth + Clerk)
│   └── lib/zora.ts                 # Zora Blockchain Integration
│
├── ReeliciousAI-MainAPI/           # ASP.NET Core API Service
│   ├── Congen.Storage.Api/         # RESTful API Endpoints
│   ├── Congen.Storage.Business/    # Business Logic Layer
│   └── Congen.Storage.Data/        # Data Access Layer
│
├── ReeliciousAi-AIProccessor/      # Python AI Processing Service
│   ├── main.py                     # RabbitMQ Message Consumer
│   ├── caller.py                   # Main Processing Logic
│   ├── scripttest.py               # Azure OpenAI Script Generation
│   └── tts.py                      # Text-to-Speech Processing
│
└── ReeliciousAI-VideoProcessor/    # .NET Video Compilation Service
    ├── VideoProcessor.cs            # FFmpeg Video Processing
    ├── RabbitHandler.cs             # Message Queue Handling
    └── Util.cs                      # Utility Functions
```

## 🔄 Complete Workflow

### 1. Content Creation
```
User Input → AI Script Generation → Text-to-Speech → Video Compilation → Final Video
```

### 2. Social Media Publishing
```
Final Video → Platform Optimization → Direct Publishing → Performance Analytics
```

### 3. NFT Monetization
```
Final Video → Metadata Creation → IPFS Upload → Zora Minting → Revenue Distribution
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: NextAuth.js + Clerk
- **Blockchain**: Zora SDK for NFT minting
- **Real-time**: RabbitMQ WebSocket integration

### Backend Services
- **Main API**: ASP.NET Core 8.0 with SQL Server
- **AI Processor**: Python 3.11+ with Azure OpenAI
- **Video Processor**: .NET 8.0 with FFmpeg
- **Message Queue**: RabbitMQ for service orchestration
- **Storage**: Azure Blob Storage for media files

### AI & ML
- **Script Generation**: Azure OpenAI GPT-4
- **Text-to-Speech**: Azure Cognitive Services
- **Speech Recognition**: Whisper API
- **Video Processing**: FFmpeg with custom filters

### Blockchain
- **Platform**: Zora Protocol
- **Network**: Base (Coinbase L2)
- **Storage**: IPFS for decentralized content storage
- **SDK**: @zoralabs/coins-sdk

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and .NET 8.0 SDK
- Python 3.11+ and FFmpeg
- Azure OpenAI and Cognitive Services accounts
- RabbitMQ server
- Zora API access

## 🎯 Key Features Deep Dive

### AI-Powered Content Creation
- **Script Generation**: GPT-4 powered script creation with tone customization
- **Viral Optimization**: Content designed for maximum social media engagement
- **Tone Selection**: Multiple tone options (funny, serious, casual, etc.)
- **Word Limit Control**: Optimized for short-form video platforms

### Automated Video Processing
- **Multi-source Integration**: Combines background video, narration, and music
- **Subtitle Synchronization**: Automatic subtitle timing and styling
- **Audio Mixing**: Professional-grade audio blending
- **Format Optimization**: Outputs optimized for social media platforms

### Real-time User Experience
- **Live Status Updates**: WebSocket integration for real-time progress
- **Project Management**: Create, edit, and manage video projects
- **Template System**: Pre-built templates for different content types
- **Credit System**: Track and manage AI processing credits

### Blockchain Integration
- **Zora NFT Minting**: Direct NFT creation from generated content
- **Revenue Sharing**: Automatic royalty distribution
- **Decentralized Storage**: IPFS integration for permanent content storage
- **Creator Economy**: New monetization opportunities for content creators

## 📊 Performance & Scalability

### Processing Pipeline
- **Asynchronous Processing**: RabbitMQ message queue for scalable operations
- **Parallel Processing**: Multiple video processing threads
- **Error Recovery**: Robust error handling and retry mechanisms
- **Resource Management**: Automatic cleanup of temporary files

### Monitoring & Analytics
- **Real-time Metrics**: Processing time, success rates, queue depth
- **Performance Tracking**: Video generation and compilation statistics
- **Error Monitoring**: Detailed error categorization and reporting
- **User Analytics**: Engagement and growth metrics

### Production Deployment
- **Frontend**: Vercel deployment with environment variables
- **Main API**: Azure App Service or Docker containers
- **AI Processor**: Azure Functions or containerized deployment
- **Video Processor**: High-performance VMs with FFmpeg

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Zora Protocol**: For blockchain integration and NFT capabilities
- **Azure OpenAI**: For AI-powered script generation
- **FFmpeg**: For professional video processing
- **RabbitMQ**: For reliable message queuing
- **Next.js Team**: For the excellent React framework

---

**ReeliciousAI** - Powering the future of AI-driven content creation with blockchain monetization 🚀💎

*Experience the platform live at [https://dev.reeliciousai.com/](https://dev.reeliciousai.com/)* 