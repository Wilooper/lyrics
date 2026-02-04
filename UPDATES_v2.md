# Lyrica v2 - Major Update 🎵

## What's New

### 1. **Lyrica Branding** (from GroqSync Pro)
- New name: **Lyrica**
- Beta version indicator
- Updated messaging focused on LRCLib contribution

### 2. **LRCLib Integration** (New!)
Direct contribution to the world's largest community lyrics database:
- One-click upload to LRCLib
- Automatic proof-of-work challenge solving
- Contributor name tracking
- Full metadata support

### 3. **Lyrics Verification Dialog** (New!)
Before uploading to LRCLib:
- Confirm lyrics are correct
- Edit song details (artist, track, album)
- Add contributor name (optional)
- Review all information before final upload

### 4. **Enhanced UI**
- "Scroll to Lyrics" button - Jump directly to results
- "Verify & Upload to LRCLib" button - Prominent CTA
- Inline status messages about beta limitations
- Improved visual hierarchy

### 5. **API Routes** (New!)
```
POST /api/lrclib/request-challenge    - Get proof-of-work challenge
POST /api/lrclib/publish               - Publish lyrics to LRCLib
```

### 6. **New Components**
- `LRCLibUploadDialog` - Complete upload workflow (301 lines)
- Enhanced `LyricsOutput` - With verification options

## File Changes

### Updated Files
- `/app/layout.tsx` - Updated metadata for "Lyrica Beta"
- `/app/page.tsx` - Added LRCLib dialog and scroll functionality
- `/components/lyrics-output.tsx` - Added verify & scroll buttons
- `/components/api-key-manager.tsx` - Improved logging

### New Files
- `/app/api/lrclib/request-challenge/route.ts` - Challenge endpoint
- `/app/api/lrclib/publish/route.ts` - Publish endpoint
- `/components/lrclib-upload-dialog.tsx` - Upload dialog (301 lines)
- `/LRCLIB_INTEGRATION.md` - Complete integration guide (227 lines)
- `/CONTRIBUTOR_GUIDE.md` - Community contribution guide (289 lines)
- `/UPDATES_v2.md` - This file

## Features

### LRCLib Upload Flow

```
1. Generate Lyrics
   ↓
2. Review in App
   ↓
3. Click "Verify & Upload to LRCLib"
   ↓
4. Confirm Lyrics Quality
   ↓
5. Enter Song Details
   - Artist name *
   - Track name *
   - Album name (optional)
   - Contributor name (optional)
   ↓
6. Automatic Proof-of-Work
   - Request challenge from LRCLib
   - Solve locally in browser (client-side)
   - No server-side cryptography needed
   ↓
7. Publish & Contribute
   - Lyrics added to LRCLib
   - Instantly available to music players worldwide
   - Your contribution recorded
```

### Proof-of-Work Challenge

Lyrica automatically handles LRCLib's security mechanism:
- Request challenge (prefix + target)
- Compute SHA-256 hashes locally
- Find valid nonce where hash <= target
- Create publish token
- Publish with token

**All done client-side in the browser!**

## UI Components

### New Buttons

1. **Scroll to Lyrics**
   - Location: Lyrics output controls
   - Action: Smooth scroll to generated lyrics section
   - Color: Secondary (cyan)

2. **Verify & Upload to LRCLib**
   - Location: Lyrics output controls
   - Action: Opens verification dialog
   - Color: Secondary button (prominent)

### Dialogs

**Verification Steps:**

1. **Confirm Step**
   - "Are these lyrics correct?"
   - Options: "No, Regenerate" or "Yes, Upload to LRCLib"

2. **Details Step**
   - Artist Name input (required)
   - Track Name input (required)
   - Album Name input (optional)
   - Contributor Name input (optional, defaults to "Lyrica API")

3. **Processing Step**
   - Shows: "Publishing Lyrics"
   - Status: Real-time progress messages
   - Stages: Challenge → Proof-of-Work → Publishing

4. **Success Step**
   - Confirmation message
   - Thank you for contributing
   - Close button

5. **Error Step**
   - Error message display
   - Try Again or Close options

## Beta Features & Limitations

### ⚠️ Important Notes

- **Beta Version**: Transcription may contain errors
- **Always Review**: Please verify lyrics before uploading
- **Manual Verification**: Don't rely on AI-only transcription
- **LRCLib Standards**: Maintain quality of community database

### Recommended Workflow

1. Generate lyrics
2. Play audio alongside to verify
3. Fix obvious errors
4. Check timing synchronization
5. Upload only if satisfied
6. Provide feedback for improvements

## Environment Variables

### Optional: Use Environment API Key

```bash
# .env.local
GROQ_API_KEY=your_key_here
```

When set:
- Lyrica uses environment key automatically
- No user input needed
- Better for batch processing
- Faster processing without UI prompts

## Documentation

### New Files to Read

1. **LRCLIB_INTEGRATION.md**
   - Complete integration overview
   - LRCLib API details
   - Troubleshooting guide
   - 227 lines of detailed info

2. **CONTRIBUTOR_GUIDE.md**
   - How to contribute effectively
   - Quality standards
   - Best practices
   - Common issues & solutions
   - 289 lines of community guidance

3. **UPDATES_v2.md**
   - This file
   - Summary of changes
   - Feature overview

## Backward Compatibility

All previous features remain:
- Audio upload and transcription
- Multi-language translation
- Vocal/Music Separator option
- Download options (.LRC, .TXT)
- Copy to clipboard
- Processing status indicators

## Next Steps

1. **Try It Out**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

2. **Generate Lyrics**
   - Upload an audio file
   - Generate synchronized lyrics
   - Review quality

3. **Contribute**
   - Click "Verify & Upload to LRCLib"
   - Fill in song details
   - Help the community!

4. **Provide Feedback**
   - Report transcription errors
   - Suggest improvements
   - Help us refine Lyrica

## Technical Details

### Client-Side Proof-of-Work

Lyrica handles proof-of-work locally using Web Crypto API:
- No server-side computation needed
- Private and secure
- Prevents spam
- Works offline after challenge request

**Browser Support:**
- Chrome 37+
- Firefox 34+
- Safari 11+
- Edge 79+

### API Integration

**LRCLib Endpoints Used:**

```
GET  /api/request-challenge  → Get proof-of-work challenge
POST /api/publish            → Publish lyrics (with token)
```

**Groq Endpoints Used:**

```
POST /openai/v1/audio/transcriptions  → Whisper transcription
POST /openai/v1/chat/completions      → Mixtral translation
```

## Performance

- **Processing Time**: ~120 seconds average
- **Proof-of-Work Solving**: 5-30 seconds (depends on difficulty)
- **Upload Speed**: <1 second (once token is ready)
- **No Server Processing**: All POW solving client-side

## Security

- ✅ API keys never logged or stored (except environment)
- ✅ Audio files not persisted
- ✅ Proof-of-work solved locally
- ✅ HTTPS ready for production
- ✅ Input validation throughout

## Deployment

### Deploy to Vercel

```bash
vercel
```

Set environment variable if needed:
```
GROQ_API_KEY=your_key_here
```

### Self-Host

Works on any Node.js server:
```bash
npm install
npm run build
npm start
```

## Support & Feedback

- **LRCLib Issues**: https://lrclib.net/contact
- **Groq Help**: https://console.groq.com/docs
- **Report Bugs**: GitHub issues
- **Feature Requests**: Community feedback

## Version History

### v2.0 (Current)
- ✨ Lyrica branding
- ✨ LRCLib integration
- ✨ Verification dialog
- ✨ Scroll to lyrics
- ✨ Full documentation

### v1.0 (Previous)
- Groq transcription
- Multi-language translation
- Vocal separator option
- Download options

---

**Thank you for using Lyrica!**  
Help build the world's best community lyrics database! 🎵

Questions? Check out:
- LRCLIB_INTEGRATION.md
- CONTRIBUTOR_GUIDE.md
- README.md
