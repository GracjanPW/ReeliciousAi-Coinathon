# ReeliciousAI Frontend

A modern, responsive web application built with Next.js 15 that serves as the user interface for the ReeliciousAI platform - an AI-powered content creation platform for generating viral short-form videos.

## 🎯 Overview

The frontend provides a comprehensive interface for users to:
- Generate AI-powered video scripts
- Select and manage video clips from a brain rot clip library
- Create and edit video projects with automated editing features
- Publish content directly to social platforms (TikTok, Instagram, YouTube Shorts)
- Mint content as NFTs on Zora blockchain
- Track performance analytics across all published content

## Click here to be redirected to [Zora](https://github.com/GracjanPW/ReeliciousAi-Coinathon/blob/master/ReeliciousAI_Frontend/src/app/(zora)/api/zora/route.ts) implementation
```typescript
// Zora SDK Integration
import { createCoin, DeployCurrency } from "@zoralabs/coins-sdk";

// Mint video as NFT
const coinParams = {
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  payoutRecipient: account.address,
  currency: DeployCurrency.ZORA,
  chainId: base.id,
};

const result = await createCoin(coinParams, walletClient, publicClient);
```


## 🚀 Features

### Landing Page
- **Hero Section**: Showcases the AI-powered content creation platform
- **All-in-One Platform**: Highlights key features like script generation, clip library, automated editing
- **How It Works**: Step-by-step guide explaining the content creation process
- **Registration**: User onboarding and authentication

### Platform Dashboard
- **Project Management**: Create, view, and manage video projects
- **Template System**: Pre-built templates for different content types
- **Real-time Updates**: WebSocket integration for live project status updates
- **Credit System**: Track and manage user credits for AI services

### Content Creation
- **Script Generation**: AI-powered script creation with customizable tones
- **Video Templates**: Extensive library of trending clips and templates
- **Background Audio**: Audio selection and management
- **Tone Selection**: Multiple tone options for content personalization

### Social Integration
- **Multi-platform Publishing**: Direct publishing to TikTok, Instagram, YouTube Shorts
- **Zora NFT Minting**: Blockchain integration for content monetization
- **Performance Analytics**: Track engagement, views, and growth metrics

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **Authentication**: NextAuth.js with Clerk integration
- **State Management**: React Query for server state
- **Real-time**: RabbitMQ WebSocket client
- **Blockchain**: Zora SDK for NFT minting
- **Database**: MSSQL with custom adapter

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (Auth)/            # Authentication pages
│   ├── (LandingPage)/     # Landing page components
│   ├── (Platform)/        # Main platform dashboard
│   └── (zora)/           # Zora blockchain integration
├── components/            # Reusable UI components
├── auth/                 # Authentication configuration
├── db/                   # Database client and adapters
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── rabbit/               # RabbitMQ WebSocket listener
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Access to the ReeliciousAI backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReeliciousAI_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Authentication
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   
   # Clerk Authentication
   CLERK_SECRET_KEY=your-clerk-secret
   CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   
   # API Configuration
   API_URL=https://your-api-url.com
   
   # RabbitMQ Configuration
   RBBT_WS_URL=your-rabbitmq-websocket-url
   RBBT_VHOST=your-vhost
   RBBT_USERNAME=your-username
   RBBT_PASSWORD=your-password
   
   # Zora Configuration
   ZORA_API_KEY=your-zora-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **Authentication**: NextAuth.js with Clerk integration for secure user management
- **Real-time Updates**: RabbitMQ WebSocket integration for live project status
- **Video Processing**: Integration with AI processor and video processor services
- **Blockchain**: Zora SDK integration for NFT minting capabilities

## 🔧 Configuration

### Database
The frontend connects to a MSSQL database using a custom adapter for user sessions and project data.

### API Integration
- **Main API**: Handles project management, file storage, and user operations
- **AI Processor**: Manages script generation and text-to-speech processing
- **Video Processor**: Handles video compilation and editing

### Real-time Features
WebSocket integration with RabbitMQ provides real-time updates for:
- Project status changes
- Processing completion notifications
- Live credit balance updates

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are set in your production environment:
- Authentication keys
- API endpoints
- Database connection strings
- RabbitMQ configuration
- Zora blockchain settings

## 📄 License

This project is part of the ReeliciousAI platform. See the main repository for license information.

## 🆘 Support

For support and questions:
- Check the main repository documentation
- Review the API documentation
- Contact the development team

---

**ReeliciousAI Frontend** - Powering the future of AI-driven content creation 🎬✨
