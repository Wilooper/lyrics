import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      trackName,
      artistName,
      albumName,
      duration,
      plainLyrics,
      syncedLyrics,
      publishToken,
    } = body;

    if (!publishToken) {
      return NextResponse.json(
        { error: 'Publish token is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://lrclib.net/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Publish-Token': publishToken,
        'User-Agent': 'Lyrica (https://github.com/lyrica-lyrics/lyrica)',
      },
      body: JSON.stringify({
        trackName,
        artistName,
        albumName,
        duration,
        plainLyrics,
        syncedLyrics,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[v0] LRCLib publish error:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[v0] Publish error:', error);
    return NextResponse.json(
      { error: 'Failed to publish lyrics' },
      { status: 500 }
    );
  }
}
