# GroqSync Pro - AI Lyrics Generator Setup Guide

## Overview

GroqSync Pro is a modern web application that generates synchronized lyrics with AI-powered transcription and translation using the Groq API. The application features:

- **AI Transcription**: Uses Groq's Whisper model for accurate audio-to-text conversion
- **Multi-language Translation**: Translates lyrics to 6+ languages while preserving timing
- **Synchronized LRC Format**: Generates standard .LRC files compatible with music players
- **Vocal/Music Separator**: Optional feature to improve transcription accuracy
- **Copy & Download**: Easy export options for both LRC and text formats
- **Average Processing**: ~120 seconds for complete transcription and optional translation

## Getting Started

### 1. Prerequisites

- Node.js 18+ 
- A Groq API key (free tier available at https://console.groq.com)

### 2. Installation

Clone or download the project, then install dependencies:

```bash
npm install
```

### 3. Environment Setup

#### Option A: Using Your Own API Key (Recommended)

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign in with your account (create one if needed - free)
3. Navigate to the API Keys section
4. Copy your API key
5. In the application, paste it in the "API Configuration" section
6. You're ready to use the app!

#### Option B: Using Server-Side API Key (Advanced)

For deployment with a server-managed API key:

1. Set the `GROQ_API_KEY` environment variable on your server:
   ```bash
   export GROQ_API_KEY=gsk_your_api_key_here
   ```

2. The application will automatically detect and use this key
3. The "Use Environment API Key" toggle will appear on the UI

### 4. Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## How to Use

### Step 1: API Configuration
- **Option 1**: Enter your Groq API key in the "API Configuration" section
- **Option 2**: If a server API key is configured, toggle "Use Environment API Key"
- Click the "Get API Key" link to access Groq's console if you don't have one

### Step 2: Upload Audio
- Click the upload area or drag and drop your audio file
- Supported formats: MP3, WAV, FLAC, OGG, M4A
- Maximum file size: 100MB

### Step 3: Configure Options
- **Target Language**: Choose the language for translation
  - "Original (As sung)" - Keep lyrics in their original language
  - English, Hindi, Spanish, French, German, Japanese
  
- **Vocal/Music Separator**: 
  - Enable for better transcription accuracy
  - Isolates vocals from background music
  - Adds processing time but improves accuracy
  - Recommended for songs with heavy instrumentation

### Step 4: Generate Lyrics
- Click the "Generate Lyrics" button
- Monitor the progress with the real-time status display
- Processing typically takes 60-120 seconds depending on:
  - Audio file length
  - Language translation
  - Vocal separator usage

### Step 5: Download or Copy
Once complete, you can:

**Copy LRC**
- Copy the synchronized lyrics to clipboard
- Ready to paste into any text editor or media player

**Download .LRC**
- Standard LRC format (widely supported)
- Use with: Foobar2000, VLC, Potplayer, etc.
- File extension: `.lrc`

**Download .TXT**
- Plain text format without timing information
- Useful for lyrics-only reference

## Features Explained

### Groq API Key Usage

The application supports two ways to use API keys:

**Manual Entry (Default)**
- Enter your API key directly in the UI
- Key is NOT stored permanently
- Only used for that session
- Best for personal use

**Environment Variable (Server-Managed)**
- API key configured on server
- Automatically detected by the app
- More secure for production
- Best for self-hosted deployments

**Best Practice**: Use your own Groq API key for faster processing and higher rate limits.

### Vocal/Music Separator

This optional feature improves transcription accuracy by:
- Isolating vocal tracks from background music
- Removing instrumental noise
- Enhancing speech recognition
- Using advanced audio signal processing

**When to use:**
- Songs with heavy instrumental sections
- Live recordings with background noise
- Multi-layered instrumental accompaniment

**Processing overhead**: Adds ~30-40 seconds to total processing time

### Timing Verification

The application automatically:
1. Captures precise start timestamps for each lyric line
2. Formats timing in LRC standard: `[MM:SS.CC]` format
3. Verifies timing matches with the audio duration
4. Maintains synchronization during translation

### LRC Format

Standard LRC format structure:
```
[00:12.34] First line of lyrics
[00:15.67] Second line of lyrics
[00:20.45] Third line of lyrics
```

Compatible with most music players that support synchronized lyrics.

## API Models Used

### Transcription
- **Model**: Whisper-large-v3
- **Provider**: Groq
- **Purpose**: Convert audio to text with timestamps
- **Languages**: 99+ languages automatically detected

### Translation
- **Model**: Llama 3.3 70B Versatile
- **Provider**: Groq
- **Purpose**: Translate lyrics while preserving timing
- **Speed**: Optimized for fast inference

## Troubleshooting

### "Transcription failed: 401"
- **Issue**: Invalid or expired API key
- **Solution**: 
  1. Verify your API key at https://console.groq.com
  2. Check that the key starts with `gsk_`
  3. Ensure it's copied completely without extra spaces

### "Maximum file size exceeded"
- **Issue**: Audio file is larger than 100MB
- **Solution**: 
  1. Compress the audio file to lower bitrate
  2. Use audio editing software (Audacity, ffmpeg)
  3. Split the audio into smaller segments

### "Translation failed"
- **Issue**: Complex lyrics or language limitations
- **Solution**:
  1. Try a different target language
  2. Use "Original" to skip translation
  3. Check that the source language is supported

### "No environment API key available"
- **Issue**: Server API key not configured
- **Solution**:
  1. Set `GROQ_API_KEY` environment variable
  2. Restart the application
  3. Or manually enter your API key in the UI

### Slow processing or timeouts
- **Issue**: Large audio files or network latency
- **Solution**:
  1. Try without vocal separator first
  2. Check your internet connection
  3. Use a shorter audio file for testing

## Performance Tips

1. **Optimize Your API Key**:
   - Use your own Groq API key instead of server default
   - Free tier: 30 requests/minute
   - Higher limits available with paid plans

2. **Choose Wisely**:
   - Skip translation if not needed (saves ~20-30 seconds)
   - Only enable separator for complex songs
   - Use shorter audio files for testing

3. **Audio Quality**:
   - 128+ kbps bitrate recommended
   - Clear vocal recordings perform best
   - Avoid heavily compressed audio formats

## Deployment

### Vercel (Recommended)

```bash
npm run build
npm run start
```

Or deploy directly:
```bash
vercel
```

Make sure to set the `GROQ_API_KEY` environment variable in your Vercel project settings.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Optional environment variables:

```bash
# Groq API Key (for server-side use)
GROQ_API_KEY=gsk_your_key_here

# Optional: Set processing timeout (in seconds)
PROCESSING_TIMEOUT=180
```

## Security Notes

- API keys are never logged or stored in database
- Each request is isolated and temporary
- No lyrics or audio files are stored permanently
- Recommended to use environment variables for production
- Use HTTPS in production deployments

## Support & Resources

- **Groq Documentation**: https://console.groq.com/docs
- **API Status**: https://status.groq.com
- **Create API Key**: https://console.groq.com
- **Audio Formats**: MP3, WAV, FLAC, OGG, M4A

## Frequently Asked Questions

**Q: Is there a cost to use this?**
A: No! Groq offers a free tier. Higher volume users should check Groq's pricing page.

**Q: How accurate is the transcription?**
A: Whisper Large-v3 is highly accurate, especially for clear audio. Using the vocal separator improves accuracy further.

**Q: Can I use commercial music?**
A: The transcription tool itself is for personal use. Check your local laws regarding music transcription for commercial purposes.

**Q: What's the maximum audio duration?**
A: The 100MB file size limit typically allows for ~3-5 hours of audio at standard bitrate.

**Q: Can I batch process multiple files?**
A: Currently, files must be processed one at a time. You can process them sequentially.

## Version Information

- **Framework**: Next.js 16+ (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **API**: Groq (Whisper + Llama 3.3 70B)

---

**Last Updated**: February 2026

For the latest updates and features, visit the project repository.
