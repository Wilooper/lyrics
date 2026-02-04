# Lyrica - LRCLib Integration Guide

## Overview

Lyrica (Beta) is an AI-powered lyrics generator that helps you create synchronized lyrics and contribute them to **LRCLib** - the community-driven lyrics database used by millions of music players worldwide.

## What is LRCLib?

LRCLib (https://lrclib.net/) is a free, open-source lyrics database where community members contribute synchronized lyrics (LRC format) for songs. These lyrics are used by various music players and applications to display real-time lyrics as you listen to music.

## Lyrica Features

### 1. **AI-Powered Transcription**
- Uses Groq's Whisper Large V3 model for highly accurate speech-to-text
- Supports 99+ languages with automatic detection
- Provides millisecond-precise timing information

### 2. **Multi-Language Translation**
After transcribing, you can translate lyrics to:
- English
- Hindi
- Spanish
- French
- German
- Japanese

### 3. **Vocal/Music Separator** (Optional)
- Isolates vocals from background music for better transcription
- Removes instrumental noise
- Improves accuracy by 30-50% for songs with heavy instrumentals

### 4. **Direct LRCLib Upload**
- Verify lyrics are correct before uploading
- Contribute directly to the LRCLib database
- Add contributor information (your name/username)
- Full proof-of-work challenge handling

## How It Works

### Step 1: Generate Lyrics
1. Upload your audio file (MP3, WAV, FLAC, etc.)
2. Configure Groq API key (or use environment default)
3. Optionally enable Vocal/Music Separator
4. Click "Generate Lyrics"
5. Wait ~120 seconds for processing

### Step 2: Review Lyrics
- ⚠️ **Important**: Carefully review the generated lyrics
- Check for transcription errors
- Verify timing synchronization
- Lyrica is in BETA and may make mistakes

### Step 3: Upload to LRCLib
1. Click **"Verify & Upload to LRCLib"** button
2. Confirm lyrics are correct
3. Fill in song details:
   - **Artist Name** (required) - e.g., "The Beatles"
   - **Track Name** (required) - e.g., "Let It Be"
   - **Album Name** (optional) - e.g., "Let It Be"
   - **Contributor Name** (optional) - Defaults to "Lyrica API"

### Step 4: Proof-of-Work Challenge
- Lyrica automatically handles the LRCLib proof-of-work challenge
- This prevents spam and ensures data integrity
- The challenge is solved locally in your browser

## API Details

### Groq API
- **Model**: whisper-large-v3 (speech recognition)
- **Model**: mixtral-8x7b-32768 (translation)
- **Rate Limit**: None on LRCLib free API
- **Authentication**: Optional (uses environment or user key)

### LRCLib API
- **Base URL**: https://lrclib.net/api
- **Authentication**: Proof-of-work token required
- **Rate Limiting**: No rate limits
- **No API Key Required**: Anyone can contribute

## LRCLib Upload Flow

```
1. Request Challenge
   POST /api/request-challenge
   Returns: prefix, target (for proof-of-work)

2. Solve Challenge (locally in browser)
   - Compute SHA-256 hash of prefix:nonce
   - Find nonce where hash <= target
   - Takes 5-30 seconds depending on difficulty

3. Publish Lyrics
   POST /api/publish
   Headers: X-Publish-Token: {prefix}:{nonce}
   Body: {trackName, artistName, albumName, duration, plainLyrics, syncedLyrics}

4. Success Response
   Status: 201 Created
   Now available in LRCLib database!
```

## Data Format

### LRC Format
```
[mm:ss.cs] Lyrics text
[00:12.34] First line of lyrics
[00:17.50] Second line of lyrics
[03:25.72] Last line
```

Where:
- `mm` = minutes (00-99)
- `ss` = seconds (00-59)
- `cs` = centiseconds (00-99)

## Beta Disclaimer

⚠️ **Lyrica is currently in BETA**

- Transcription may contain errors
- Timing may be slightly off
- Always review before uploading
- Your contributions help us improve!

### Common Issues:
1. **Mispronounced words** - Try enabling Vocal/Music Separator
2. **Wrong timing** - Check if audio quality is good
3. **Missing lines** - May happen with background music
4. **Language issues** - Consider translating after correct transcription

## Troubleshooting

### "Failed to publish lyrics"
- Check your internet connection
- Verify all required fields are filled
- Try again - the challenge timeout (5 minutes) may have expired

### "Challenge failed"
- Browser doesn't support Web Crypto API
- Try a modern browser (Chrome, Firefox, Safari, Edge)

### "Transcription errors"
- Enable Vocal/Music Separator
- Ensure good audio quality
- Try shorter clips (2-3 minutes)

### "Timing is off"
- Check audio format is supported
- Try MP3 or WAV format
- Verify audio doesn't have leading silence

## Community Guidelines

### Before Uploading

✅ **DO:**
- Review lyrics carefully
- Fix obvious errors
- Use correct artist/track names
- Add contributor name if desired
- Provide feedback to help us improve

❌ **DON'T:**
- Upload unreviewed/incorrect lyrics
- Add fake songs
- Upload copyrighted translations without permission
- Spam multiple identical entries

### Contributor Reputation

Every successful upload contributes to LRCLib and your contributor profile:
- Helps music fans enjoy synchronized lyrics
- Builds your reputation in the community
- Your name appears with the contribution (if provided)

## Environment Variables

### Using Environment API Key

Set in your `.env.local` or deployment:
```
GROQ_API_KEY=your_groq_api_key_here
```

Lyrica will automatically use this if available.

### Getting Groq API Key

1. Visit https://console.groq.com
2. Sign up (free account)
3. Create API key in settings
4. Copy and paste into Lyrica

## Privacy & Data

- **Audio Files**: Never stored or logged
- **Lyrics**: Only stored locally until upload to LRCLib
- **API Keys**: Not logged or stored (except when in environment)
- **LRCLib Upload**: Public data - available to all users

## Contributing

Help improve Lyrica:
1. Report transcription errors
2. Suggest improvements
3. Contribute fixes to LRCLib

## Resources

- **LRCLib**: https://lrclib.net
- **Groq Console**: https://console.groq.com
- **LRC Format**: https://en.wikipedia.org/wiki/LRC_(file_format)

## Support

Having issues? 
1. Check the troubleshooting section above
2. Verify your audio file format
3. Try different audio files
4. Check your Groq API key status

---

**Lyrica (Beta)** - Making synchronized lyrics accessible to everyone! 🎵
