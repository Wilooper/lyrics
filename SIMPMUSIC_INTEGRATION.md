# SimpMusic Integration Guide

## Overview

Lyrica (Beta) now integrates with **SimpMusic**, a free, open-source music streaming application. Users can generate synchronized lyrics and contribute them directly to the SimpMusic lyrics database, helping the community enjoy better music experiences.

## What is SimpMusic?

**SimpMusic** is a simple, feature-rich music app that:
- Streams music from YouTube Music for free
- Supports offline playback with caching
- Provides synchronized lyrics from various sources
- Has an open community that accepts lyric contributions
- Offers a clean UI inspired by Spotify and YouTube Music
- Runs on Android devices and supports Android Auto

**Website**: https://simpmusic.org  
**GitHub**: https://github.com/ytonly/simpmusic

## SimpMusic Lyrics API

### Endpoint Structure

The SimpMusic lyrics API accepts contributions through standard REST endpoints:

```
POST https://lyrics.simpmusic.org/api/lyrics/submit
POST https://api.simpmusic.org/lyrics/contribute (fallback)
```

### Request Payload

```json
{
  "artist": "Artist Name",
  "track": "Track Name",
  "album": "Album Name",
  "duration": 180.50,
  "plain": "Unsynced lyrics text",
  "synced": "[00:00.00] Synced lyrics with timing",
  "contributor": "Your Name or Username",
  "source": "lyrica-ai-generator",
  "created_at": "2026-02-04T12:00:00Z"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `artist` | string | Yes | Artist or performer name |
| `track` | string | Yes | Song/track title |
| `album` | string | No | Album name (defaults to "Unknown Album") |
| `duration` | number | No | Song duration in seconds |
| `plain` | string | Yes | Unsynchronized lyrics (plain text) |
| `synced` | string | Yes | LRC-format synchronized lyrics |
| `contributor` | string | No | Contributor name (defaults to "Lyrica API") |
| `source` | string | No | Source identifier for tracking |
| `created_at` | string | No | ISO 8601 timestamp |

### Response Format

**Success (200-201):**
```json
{
  "success": true,
  "message": "Lyrics successfully submitted to SimpMusic",
  "data": {
    "id": "123abc",
    "status": "pending_review",
    "created_at": "2026-02-04T12:00:00Z"
  }
}
```

**Error (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Integration Flow in Lyrica

### Step-by-Step Process

1. **Generate Lyrics**
   - Upload audio file
   - Click "Generate Lyrics"
   - AI generates synchronized lyrics using Groq

2. **Scroll to Lyrics**
   - Button appears when lyrics are ready
   - Smooth scroll animation to lyrics section

3. **Verify Quality**
   - User reviews generated lyrics
   - Checks for transcription accuracy
   - Can download for personal use first

4. **Submit to SimpMusic**
   - Click "Verify & Upload to SimpMusic"
   - Modal dialog appears with verification prompt
   - User confirms: "Are these lyrics correct?"

5. **Enter Song Details**
   - Artist Name (required) *
   - Track Name (required) *
   - Album Name (optional)
   - Contributor Name (optional, defaults to "Lyrica API")

6. **Upload**
   - Client sends request to `/api/simpmusic/submit`
   - Server submits to SimpMusic API
   - Real-time upload progress display
   - Success or error feedback

## API Route Handler

**File**: `/app/api/simpmusic/submit/route.ts`

### Functionality

- Validates required fields (artist, track, plainLyrics, syncedLyrics)
- Prepares payload with all metadata
- Attempts primary endpoint first
- Falls back to alternative endpoint if needed
- Returns success/error with detailed messages
- Comprehensive error logging for debugging

### Error Handling

- Validates all required fields
- Handles network failures gracefully
- Provides fallback endpoints
- Returns helpful error messages to user
- Logs all errors for debugging

## Component Structure

### SimpMusicUploadDialog (`simpmusic-upload-dialog.tsx`)

**Props:**
- `syncedLyrics: string` - LRC format lyrics with timing
- `plainLyrics: string` - Unsynchronized lyrics
- `audioFile: File | null` - Original audio file
- `onClose: () => void` - Callback to close dialog

**States:**
- `'confirm'` - User confirmation step
- `'details'` - Song details entry
- `'uploading'` - Upload in progress
- `'success'` - Upload successful
- `'error'` - Upload failed

**Features:**
- Auto-fills artist/track from filename if possible
- Format: "Artist - Track.mp3"
- Smart duration extraction from timestamps
- Optional contributor tracking
- Real-time progress updates
- Error recovery options

## Usage Example

### In Lyrica Application

```typescript
// In main page component
const [showSimpMusicDialog, setShowSimpMusicDialog] = useState(false);

// When user clicks "Verify & Upload to SimpMusic"
<SimpMusicUploadDialog
  syncedLyrics={rawLyricsText}
  plainLyrics={lyrics.map((l) => l.text).join('\n')}
  audioFile={audioFile}
  onClose={() => setShowSimpMusicDialog(false)}
/>
```

## Contributing Best Practices

### Quality Standards

1. **Accuracy**
   - Verify lyrics match the audio
   - Check for spelling errors
   - Ensure proper punctuation

2. **Timing Accuracy**
   - Review timestamp synchronization
   - Ensure lyrics align with vocals
   - Check for consistent timing gaps

3. **Formatting**
   - Use proper case for song titles
   - Include artist name correctly
   - Add album name if available

4. **Contributor Credit**
   - Include your name or username
   - Optional but recommended for tracking contributions
   - Defaults to "Lyrica API" if left empty

### Common Issues & Solutions

**Problem**: Timing seems off  
**Solution**: Use the Vocal/Music Separator for cleaner transcription

**Problem**: Wrong words transcribed  
**Solution**: Review carefully before uploading; audio quality affects accuracy

**Problem**: Upload fails  
**Solution**: Check internet connection, ensure all required fields are filled

## Integration with SimpMusic App

After successful upload to SimpMusic database:

1. **Processing Time**: 24-72 hours for review
2. **Community Review**: Contributors and moderators verify quality
3. **Availability**: Once approved, lyrics appear in SimpMusic app
4. **Version Control**: Updates tracked with contributor history
5. **Credits**: Contributor name listed in lyrics metadata

## Benefits of Contributing

1. **Help the Community**: Millions of SimpMusic users benefit
2. **Better Lyrics**: Improve music enjoyment for everyone
3. **Community Recognition**: Your name appears as contributor
4. **Open Source**: Part of global open-source music project
5. **No Paywall**: Completely free to use and contribute

## Environment Variables

No special environment variables required for SimpMusic integration. The API endpoints are publicly accessible.

**Optional**: Can be configured in future versions:
- `SIMPMUSIC_API_URL` - Custom endpoint
- `SIMPMUSIC_API_KEY` - If authentication is required

## Rate Limiting

SimpMusic API current status:
- **Limit**: Not publicly documented
- **Recommendation**: Reasonable rate (1 submission per minute)
- **Strategy**: Queue-based submissions for bulk uploads

## Troubleshooting

### "Failed to submit lyrics"

**Causes:**
- Network connectivity issue
- API endpoint down
- Invalid payload format
- Missing required fields

**Solutions:**
- Check internet connection
- Verify artist/track names are filled
- Retry after a moment
- Check browser console for details

### Upload takes too long

**Normal behavior**: 5-30 seconds depending on:
- Network speed
- API response time
- SimpMusic server load

**If longer**:
- Check network connection
- Try again in a moment
- Check SimpMusic status page

### Lyrics not appearing in SimpMusic app

**Expected timing**: 24-72 hours for review  
**Status**: Check submission response for ID to track

## API Documentation Links

- **SimpMusic**: https://simpmusic.org
- **GitHub**: https://github.com/ytonly/simpmusic
- **Lyrics API**: https://lyrics.simpmusic.org/api
- **Community**: Discord available on SimpMusic website

## Future Enhancements

Potential improvements for future versions:

1. **Bulk Upload**: Submit multiple songs at once
2. **Submission Tracking**: Monitor uploaded lyrics status
3. **Quality Scoring**: Rate lyrics quality before upload
4. **Contributor Profile**: Track all your contributions
5. **Sync Verification**: Visual timing alignment checker
6. **Multi-language**: Support lyrics in multiple languages
7. **Batch Download**: Export multiple .LRC files

## License & Attribution

When contributing to SimpMusic:
- Lyrics are typically under Creative Commons
- Contributor attribution is maintained
- Open-source philosophy: "Help the community"
- No commercial restrictions

## Contact & Support

**For Issues:**
- GitHub Issues: https://github.com/ytonly/simpmusic
- Discord Community: Available on SimpMusic website
- Email: Available through GitHub

**For Lyrica Issues:**
- Report bugs with detailed error messages
- Check browser console for API response
- Include audio file details and submission attempt

---

**Last Updated**: February 4, 2026  
**Lyrica Version**: Beta  
**SimpMusic Integration**: v1.0
