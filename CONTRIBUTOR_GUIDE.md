# Lyrica Contributor Guide

## Welcome to the Lyrica Community! 🎵

Lyrica makes it easy to contribute synchronized lyrics to **LRCLib**, helping millions of music listeners enjoy real-time lyrics in their favorite players.

## What Are Synchronized Lyrics?

Synchronized lyrics (LRC format) display the song's lyrics in real-time, synchronized with the music:

```
[00:12.34] First line appears at 12.34 seconds
[00:17.50] Second line appears at 17.50 seconds
[00:22.00] And so on...
```

These work with:
- Spotify (with LRC plugins)
- Apple Music
- Music players (VLC, foobar2000, etc.)
- Music streaming apps worldwide

## Getting Started

### 1. Install/Access Lyrica
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### 2. Set Up Groq API
1. Visit https://console.groq.com
2. Create a free account
3. Generate API key
4. Copy into Lyrica

### 3. Upload Audio
1. Find a song without lyrics in LRCLib
2. Download or extract the audio
3. Upload to Lyrica
4. Wait ~120 seconds

### 4. Review & Contribute
1. Carefully check all lyrics
2. Verify timing is accurate
3. Click "Verify & Upload to LRCLib"
4. Fill in song details
5. Publish!

## Quality Standards

### ✅ Acceptable Contributions

- **Accurate transcription**: No obvious spelling errors
- **Good timing**: Lyrics sync within 0.5 seconds of actual speech
- **Complete lyrics**: Full song (or clear instrumental sections)
- **Correct metadata**: Artist, track, and album names match
- **Correct format**: Proper LRC format with timing

### ⚠️ Review Before Uploading

Always check:

1. **Spelling**
   - [ ] No obvious typos
   - [ ] Proper noun capitalization (artist names, place names)
   - [ ] Correct use of contractions (it's vs its, don't vs dont)

2. **Timing**
   - [ ] First line timing is ~1-2 seconds into song
   - [ ] Lines sync with actual lyrics (±0.5 seconds acceptable)
   - [ ] No major jumps in timing
   - [ ] Final line timing near end of song

3. **Format**
   - [ ] `[MM:SS.CS]` format (MM=minutes, SS=seconds, CS=centiseconds)
   - [ ] One line per lyric (not multiple lyrics per line)
   - [ ] No duplicate lines
   - [ ] All lines have valid timing

4. **Metadata**
   - [ ] Artist name is correct
   - [ ] Track/song name is correct
   - [ ] Album name is accurate (if known)

### ❌ Unacceptable Content

- Unreviewed/AI-only lyrics without manual verification
- Incorrect artist or song names
- Corrupted or incomplete timing
- Offensive or copyrighted translated content
- Duplicate submissions of same song/artist

## Common Correction Cases

### Case 1: Obvious Transcription Error
**Wrong**: "I'm wanna dance tonight"  
**Correct**: "I wanna dance tonight"
→ Fix and upload!

### Case 2: Timing Slightly Off
```
[00:12.34] Line of lyrics      ← Should be [00:12.50]
[00:17.50] Another line        ← Correct
```
→ Adjust timing and upload

### Case 3: Missing Instrumental Section
```
[00:00.00] Verse 1
[00:20.00] Chorus
[01:00.00] Verse 2              ← If instrumental section, skip it
[01:20.00] Chorus 2
```
→ OK to skip pure instrumental sections

### Case 4: Unclear/Slurred Words
**Heard**: "I believe I can something"  
**Actual**: "I believe I can fly"
→ Use external lyrics source to verify, correct, then upload

## Troubleshooting Tips

### Poor Transcription Quality

**Problem**: Many words are wrong or nonsensical

**Solutions**:
1. **Enable Vocal/Music Separator**
   - Removes background music noise
   - Improves accuracy 30-50%
   - Takes extra 20-30 seconds

2. **Use Better Audio Quality**
   - Convert to MP3 or WAV
   - Ensure audio is not compressed/distorted
   - Try different source file

3. **Extract Vocal Track**
   - Use audio editing software (Audacity, FFmpeg)
   - Isolate just the vocal track
   - Re-upload

### Timing Issues

**Problem**: Lyrics don't sync with actual singing

**Solutions**:
1. Check if audio has leading silence
2. Verify audio quality and format
3. Try shorter clips (2-3 minutes)
4. Manually verify by playing audio

### Upload Fails

**Problem**: "Failed to publish lyrics" error

**Solutions**:
1. Verify all required fields filled:
   - [ ] Artist name (required)
   - [ ] Track name (required)
   - [ ] Song duration correct

2. Check internet connection (stable needed)

3. Wait and retry (challenge expires in 5 minutes)

## Best Practices

### 1. Song Selection
```
Priority: Songs with NO lyrics on LRCLib
1. New/upcoming songs
2. Indie/underground artists
3. Non-English songs
4. Covers of popular songs
5. Regional/local music
```

### 2. Batch Processing
- Process 5-10 songs per session
- Take breaks every 2-3 hours
- Quality > Quantity

### 3. Documentation
- Keep notes of common errors
- Report patterns to help improve Lyrica
- Help other contributors

### 4. Community Standards
- Be respectful when reporting errors
- Help new contributors learn
- Share tips and tricks
- Celebrate contributions

## Useful Resources

### External Verification
When unsure about lyrics:
- **Genius.com**: Popular lyrics database
- **AZLyrics.com**: Alternative source
- **Google** "artist name + song name lyrics"

### Audio Tools
- **Audacity** (free): Audio editing
- **FFmpeg** (free): Audio conversion
- **mp3cut.net** (free): Online audio cutter

### LRC Editors
- **Edit LRC online**: https://www.lrcget.net/
- **Timing adjustment**: Manual or auto-sync tools

## Recognition & Rewards

### Contributor Profile
- Your name appears with contributions
- Build reputation in community
- Recognition for quality work

### Badges & Achievements
- 🥉 Bronze: 10 contributions
- 🥈 Silver: 50 contributions
- 🥇 Gold: 100+ contributions

### Community Benefits
- Access to contributor-only features
- Early access to new Lyrica features
- Direct communication with LRCLib team

## Frequently Asked Questions

**Q: Can I contribute cover versions?**
A: Yes! If by different artist or significantly different arrangement.

**Q: What about remix versions?**
A: Different mixing but same lyrics = OK. Reworded remix = New submission.

**Q: Can I fix existing lyrics?**
A: Yes! Submit improved version. LRCLib tracks all versions.

**Q: Is there a limit to contributions?**
A: No limits! Contribute as much as you want.

**Q: Do I get paid?**
A: This is volunteer community work. You get recognition and help music fans!

**Q: Can I delete my contributions?**
A: Contact LRCLib support directly. They handle administrative requests.

**Q: What about copyrighted lyrics?**
A: Transcribed lyrics for non-commercial use are typically allowed. Check local laws.

## Code of Conduct

✅ DO:
- Submit quality, verified work
- Help other contributors
- Report improvements ideas
- Be patient with beta features
- Ask questions when unsure

❌ DON'T:
- Submit unverified AI-only work
- Spam or duplicate submissions
- Plagiarize others' work
- Upload malicious content
- Harass other contributors

## Getting Help

1. **Technical Issues**: Check README.md
2. **LRCLib Issues**: Visit https://lrclib.net/contact
3. **Feature Requests**: Open GitHub issue
4. **General Help**: See LRCLIB_INTEGRATION.md

## Share Your Success!

Found a bug? Made a great discovery? Help others!
- Share tips in the community
- Report issues clearly
- Celebrate milestones

---

Thank you for helping build the world's best community lyrics database! 🎵✨

**Start Contributing**: Upload your first song today!
