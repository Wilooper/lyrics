import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      artist,
      track,
      album,
      duration,
      plainLyrics,
      syncedLyrics,
      contributor,
      timestamp,
    } = body;

    // Validate required fields
    if (!artist || !track || !plainLyrics || !syncedLyrics) {
      return NextResponse.json(
        { message: 'Missing required fields: artist, track, plainLyrics, syncedLyrics' },
        { status: 400 }
      );
    }

    // Submit to SimpMusic lyrics API
    // Based on standard lyrics API patterns
    const payload = {
      artist: artist.trim(),
      track: track.trim(),
      album: album || 'Unknown Album',
      duration: duration || 0,
      plain: plainLyrics,
      synced: syncedLyrics,
      contributor: contributor || 'Lyrica API',
      source: 'lyrica-ai-generator',
      created_at: timestamp || new Date().toISOString(),
    };

    console.log('[v0] Submitting to SimpMusic:', {
      artist: payload.artist,
      track: payload.track,
      contributor: payload.contributor,
    });

    // Send to SimpMusic API endpoint
    // The endpoint structure is based on typical REST lyrics API patterns
    const response = await fetch('https://lyrics.simpmusic.org/api/lyrics/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Lyrica-AI-Generator/1.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[v0] SimpMusic API error:', errorText);

      // Fallback: If the main endpoint doesn't work, try alternative endpoint
      const fallbackResponse = await fetch('https://api.simpmusic.org/lyrics/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Lyrica-AI-Generator/1.0',
        },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!fallbackResponse?.ok) {
        throw new Error(`SimpMusic API returned ${response.status}: ${response.statusText}`);
      }

      const result = await fallbackResponse.json();
      return NextResponse.json({
        success: true,
        message: 'Lyrics successfully submitted to SimpMusic',
        data: result,
      });
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Lyrics successfully submitted to SimpMusic',
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] Error submitting to SimpMusic:', error);

    return NextResponse.json(
      {
        success: false,
        message: `Failed to submit lyrics: ${message}`,
      },
      { status: 500 }
    );
  }
}
