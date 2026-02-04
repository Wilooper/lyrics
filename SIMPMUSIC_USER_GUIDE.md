# Lyrica + SimpMusic: Complete User Guide

## What is SimpMusic?

**SimpMusic** is a free, open-source music streaming app available on Android that:
- Streams music from YouTube Music for free
- Shows synchronized lyrics while playing songs
- Lets you cache music for offline playback
- Has a clean, simple interface inspired by Spotify
- Is maintained by an open community

**Download**: https://simpmusic.org

## Contributing Your Generated Lyrics

After Lyrica generates lyrics from your audio file, you can contribute them to SimpMusic to help millions of users enjoy synchronized lyrics!

### Step-by-Step: Contributing Lyrics

#### 1. Generate Lyrics in Lyrica

1. Open Lyrica application
2. Paste your Groq API key (or use environment default)
3. Upload an audio file (MP3, WAV, FLAC, etc.)
4. Choose your options:
   - **Language**: Original or translation (English, Hindi, Spanish, French, German, Japanese)
   - **Vocal/Music Separator**: Optional, improves accuracy
5. Click **"Generate Lyrics"**
6. Wait ~120 seconds for processing

#### 2. Review Your Lyrics

Once generated:
- Lyrics appear in a synchronized format `[MM:SS.MS] Lyric text`
- Timestamps show exactly when each line is sung
- **Review carefully** - this is a beta version and may have errors!

#### 3. Scroll to Lyrics

- A blue **"Scroll to Lyrics"** button appears
- Click to smoothly jump to the lyrics section
- Review the full synchronized lyrics

#### 4. Verify & Upload

1. **Click "Verify & Upload to SimpMusic"** button
2. A dialog appears asking: **"Are these lyrics correct?"**
3. Choose:
   - **"No, Regenerate"** - Close and try again
   - **"Yes, Upload to SimpMusic"** - Proceed

#### 5. Enter Song Details

Complete the form with:

| Field | Required | Example |
|-------|----------|---------|
| Artist Name | Yes | The Beatles |
| Track Name | Yes | Let It Be |
| Album Name | Optional | Let It Be |
| Contributor Name | Optional | Your Name |

**Auto-Fill**: If your file is named "Artist - Song.mp3", it auto-fills these fields!

#### 6. Submit

1. Click **"Upload to SimpMusic"**
2. Real-time progress shows:
   - "Uploading lyrics to SimpMusic..."
   - "Sending lyrics to SimpMusic lyrics database..."
3. Wait for completion (usually 5-30 seconds)

#### 7. Success!

When complete:
- Success dialog appears with checkmark
- Message: "Your lyrics have been submitted to SimpMusic"
- Your lyrics are now in the database!

### What Happens Next?

After you submit:

1. **Queued (Immediate)**: Your lyrics are in the queue
2. **Under Review (24-72 hours)**: Community and moderators review
3. **Approved**: Lyrics become available in SimpMusic app
4. **Live**: Millions of SimpMusic users can enjoy them!

## Quality Tips

### Before You Upload

1. **Listen Carefully**
   - Play the audio while reading generated lyrics
   - Check if words match what's sung
   - Look for spelling/punctuation errors

2. **Check Timing**
   - Are lyrics timed when they're actually sung?
   - Watch for timing drift across the song
   - Later lines might be off if early ones are

3. **Use Vocal Separator**
   - If generation seems inaccurate
   - Re-generate with "Vocal/Music Separator" enabled
   - Often improves accuracy significantly

4. **Format Properly**
   - Use correct capitalization
   - Include artist and track name exactly as they appear
   - Add album name if you know it

### Common Issues

**Problem**: Some words are wrong or missing  
**Solution**: 
- Use Vocal/Music Separator when generating
- Audio quality affects accuracy
- You can always try another source

**Problem**: Timing seems off  
**Solution**:
- Listen while reading to verify
- Timing is relative to audio file
- May need to re-generate with better audio

**Problem**: Not sure if it's accurate  
**Solution**:
- Look up official lyrics online
- Compare with known sources
- Ask in SimpMusic community

## Getting Your Groq API Key

1. Visit https://console.groq.com
2. Click **"Sign Up"** or **"Sign In"**
3. Create account (free tier available)
4. Navigate to **"API Keys"**
5. Click **"Create API Key"**
6. Copy the key
7. Paste in Lyrica app

**Free Tier**: Generous free usage for personal projects!

## Tips for Best Results

### Audio File Selection

**Good quality for better lyrics**:
- Clear vocals without heavy background music
- Moderate volume (not too quiet or loud)
- Clean recordings (studio quality preferred)
- Shorter songs process faster

**For best results**:
- Use high-quality audio files (320 kbps or higher)
- Avoid heavily autotuned or distorted vocals
- Test with a short clip first (1-2 minutes)

### File Naming Convention

**Format**: `Artist - Track.mp3`

**Examples**:
- `The Beatles - Let It Be.mp3`
- `Adele - Hello.mp3`
- `Taylor Swift - Anti-Hero.mp3`

**Benefits**:
- Auto-fills artist and track name
- Saves you typing
- Less chance of errors

### Batch Processing

Want to contribute multiple songs?

1. Use consistent file naming
2. Generate lyrics for each
3. Review all before uploading
4. Submit one at a time (or batch if supported)

**Recommendation**: One quality contribution is better than many mistakes!

## Contributing to Community

### Your Impact

Every lyric you contribute helps:
- SimpMusic users enjoy music better
- Non-native speakers learn languages
- Students and karaoke enthusiasts
- Musicians and music producers
- Global music community

### Attribution

When you submit, include your name or username:
- Gets credited in SimpMusic database
- Your contributions are tracked
- Build your reputation in community
- Help others identify good submitters

### Community Standards

Good contributors:
- Submit accurate, reviewed lyrics
- Provide proper song information
- Participate in feedback/corrections
- Help moderate other submissions
- Support open-source mission

## Troubleshooting

### Upload Failed

**Check**:
1. Artist name is filled in
2. Track name is filled in
3. Internet connection is active
4. Try again in a moment

**If still fails**:
- Check browser console (F12)
- Look for error messages
- Try different browser
- Contact support with details

### Lyrics Not Appearing

**Expected**: Takes 24-72 hours for review  
**Why**: Human review ensures quality  
**Status**: Check submission response for tracking ID

### Lyrics Have Mistakes

**After submission**:
- Contact SimpMusic community
- Provide corrections
- Community can rate and update

**Before submission**:
- Regenerate with Vocal Separator
- Review more carefully
- Skip this song, try another

## Advanced Features

### Language Support

**Available translations**:
- English
- Hindi  
- Spanish
- French
- German
- Japanese

**Original Language**: Keep in language sung

**How to use**:
1. Generate lyrics (original language)
2. Choose language from dropdown
3. Click generate again
4. Get translated lyrics with timing preserved!

### Vocal/Music Separator

**What it does**: Isolates vocals from background music

**When to use**:
- Initial generation seems inaccurate
- Lots of background noise/instruments
- Heavy music arrangements

**How much better**: Usually 30-50% improvement in accuracy

**Processing time**: Adds ~20-30 seconds

## FAQ

**Q: Is Lyrica free?**  
A: Yes! You just need a free Groq API key.

**Q: Will my lyrics be sold?**  
A: No. SimpMusic is open-source. Your contribution helps the community.

**Q: Can I edit lyrics after uploading?**  
A: After submission, community handles updates. Quality is reviewed by multiple people.

**Q: What if my lyrics are wrong?**  
A: That's okay! Community can correct them. This is why we ask you to review first.

**Q: How do I see my contributions?**  
A: Check SimpMusic app under contributed/submitted lyrics (feature may be added).

**Q: Can I remove my contribution?**  
A: Contact SimpMusic community. You can request removal or correction.

**Q: What languages are supported?**  
A: Groq supports 99+ languages. Lyrica has 6 pre-loaded translations.

**Q: Is my name public?**  
A: If you add contributor name, yes - in SimpMusic database and app.

**Q: Can I contribute cover songs?**  
A: Yes! As long as lyrics are accurate to the version you're transcribing.

**Q: How often can I contribute?**  
A: As often as you want! No limits, but maintain quality.

## Getting Help

### Resources

- **SimpMusic Website**: https://simpmusic.org
- **SimpMusic GitHub**: https://github.com/ytonly/simpmusic
- **SimpMusic Discord**: Available on main website
- **Groq Console**: https://console.groq.com

### Contact

**For Lyrica issues**: Check browser console for error details  
**For SimpMusic issues**: Contact SimpMusic community  
**For API issues**: Check Groq status page

## Best Practices Summary

✓ Do:
- Review lyrics carefully before uploading
- Use Vocal Separator if accuracy is poor  
- Include your name for attribution
- Check file naming format (Artist - Track)
- Wait for community review (24-72 hours)

✗ Don't:
- Upload unreviewed lyrics (beta has errors!)
- Rush the process
- Submit duplicate songs
- Use offensive content
- Ignore format requirements

## Advanced Tips

### Improve Transcription Accuracy

1. **Pre-process audio**:
   - Normalize volume
   - Remove silence at start/end
   - Fade in/out gently

2. **Try multiple audio sources**:
   - Different bitrates
   - Different years/versions
   - Studio vs. live versions

3. **Use Vocal Separator**:
   - Removes background instruments
   - Focuses on vocal clarity
   - 30-50% accuracy improvement

### Batch Management

1. Queue multiple songs
2. Generate for all (takes time)
3. Review all together
4. Upload highest quality first

### Track Your Contributions

Keep notes:
- Songs you've contributed
- Submission dates
- Any feedback received
- Improvement ideas

## Contributing to Open Source

By contributing to SimpMusic through Lyrica, you're:
- Supporting open-source development
- Helping independent developers
- Building community resources
- Making music better for everyone

**Remember**: Quality over quantity. One perfect submission beats many mistakes!

---

**Happy Contributing!**

Every lyric you contribute makes SimpMusic better for millions of users worldwide.

*Lyrica (Beta) - Powered by Groq AI*  
*Contributing to SimpMusic - The Community Music App*
