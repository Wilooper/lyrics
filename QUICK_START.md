# GroqSync Pro - Quick Start Guide

## ⚡ 30-Second Setup

1. **Get API Key** (1 minute)
   - Visit: https://console.groq.com
   - Sign up (free)
   - Copy your API key

2. **Paste Key**
   - Go to the app
   - Paste in "API Configuration" section

3. **Upload Audio**
   - Drag & drop your MP3/WAV file

4. **Generate**
   - Click "Generate Lyrics"
   - Wait ~2 minutes
   - Download or copy your .LRC file

## 📋 Checklist

- [ ] Install dependencies: `npm install`
- [ ] Run locally: `npm run dev`
- [ ] Get Groq API key: https://console.groq.com
- [ ] Paste API key in app
- [ ] Upload audio file
- [ ] Select options (language, separator)
- [ ] Click Generate Lyrics
- [ ] Download .LRC or .TXT file

## ⏱️ Processing Times

| Task | Time |
|------|------|
| Transcription | 30-60 seconds |
| Formatting | <1 second |
| Translation | 20-45 seconds (optional) |
| Separator | +30-40 seconds (optional) |
| **Total** | **~60-120 seconds** |

## 🎯 Best Practices

✅ **DO:**
- Use your own API key for better performance
- Enable vocal separator for complex songs
- Use clear, high-quality audio files
- Test with shorter clips first
- Download .LRC format for best compatibility

❌ **DON'T:**
- Use files larger than 100MB
- Share your API key publicly
- Use heavily compressed audio
- Process for commercial use without checking laws
- Forget to download before leaving the page

## 🔧 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Invalid API key | Get new key from https://console.groq.com |
| File too large | Reduce bitrate or split file |
| Translation failed | Try "Original" language instead |
| Slow processing | Skip separator, skip translation |
| Wrong timing | Enable vocal separator for better accuracy |

## 📱 Keyboard Shortcuts

- **Ctrl/Cmd + C**: Copy to clipboard
- **Drag & Drop**: Upload audio file

## 🌍 Supported Languages

**Translation Available:**
- English
- Hindi
- Spanish
- French
- German
- Japanese

**Original Language**: Auto-detected by Whisper (99+ languages)

## 📥 Download Options

**For Music Players:**
- ✅ Download .LRC (best for sync)

**For Text/Reference:**
- ✅ Download .TXT (lyrics only)

**For Clipboard:**
- ✅ Copy LRC (paste anywhere)

## 🚀 Deployment

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel

# Docker
docker build -t grosync .
docker run -p 3000:3000 grosync
```

## 🔐 Environment Variables

**Required:**
```bash
GROQ_API_KEY=gsk_your_key_here
```

**Optional:**
```bash
PROCESSING_TIMEOUT=180
```

## 📖 Detailed Documentation

- Full Guide: `/SETUP_GUIDE.md`
- Timing System: `/TIMING_VERIFICATION.md`

## ❓ FAQ

**Q: Is it free?**
A: Yes! Groq offers a free tier.

**Q: How accurate is transcription?**
A: 95%+ for clear audio. Use vocal separator for better results.

**Q: What formats are supported?**
A: MP3, WAV, FLAC, OGG, M4A

**Q: Can I use commercial music?**
A: For personal transcription only. Check local laws for commercial use.

**Q: How long can audio files be?**
A: Up to 100MB (~3-5 hours at standard bitrate)

**Q: Can I process multiple files at once?**
A: Process one at a time sequentially.

**Q: Does timing stay accurate after translation?**
A: Yes! 100% timing preservation guaranteed.

## 🎓 How It Works

1. **Upload** → Your audio file
2. **Transcribe** → Whisper converts audio to text + timestamps
3. **Format** → Convert to LRC format `[MM:SS.CC]`
4. **Translate** (optional) → Llama translates while preserving timing
5. **Verify** → System confirms all timing is correct
6. **Download** → Get your .LRC or .TXT file

## 🔗 Useful Links

- **Groq Console**: https://console.groq.com
- **Get API Key**: https://console.groq.com
- **API Documentation**: https://console.groq.com/docs
- **Status Page**: https://status.groq.com

## 📊 What You Get

After processing, you receive:
- ✅ Synchronized lyrics with timing
- ✅ LRC format (standard music player format)
- ✅ Plain text version
- ✅ Total lines count
- ✅ Total duration
- ✅ Character count
- ✅ Copy to clipboard option

## 🎵 Example Output

```lrc
[00:12.34] Welcome to my song
[00:15.67] This is the first verse
[00:20.45] With synchronized timing
[00:23.89] Perfect for music players
[00:28.34] Every line timed perfectly
```

## 💡 Pro Tips

1. **For accuracy**: Use vocal separator option
2. **For speed**: Skip translation, skip separator
3. **For quality**: Upload high-bitrate audio
4. **For testing**: Start with short 30-second clips
5. **For sharing**: Download .LRC format

## ⚙️ System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- 100MB free disk space
- Stable internet connection
- Groq API key (free at https://console.groq.com)

## 🆘 Getting Help

1. Check `/SETUP_GUIDE.md` for detailed documentation
2. Check `/TIMING_VERIFICATION.md` for timing issues
3. Visit Groq API docs: https://console.groq.com/docs
4. Check Groq status: https://status.groq.com

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Ready to Use ✅
