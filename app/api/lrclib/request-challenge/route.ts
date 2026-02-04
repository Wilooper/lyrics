export async function POST() {
  try {
    const response = await fetch('https://lrclib.net/api/request-challenge', {
      method: 'POST',
      headers: {
        'User-Agent': 'Lyrica (https://github.com/lyrica-lyrics/lyrica)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to request challenge from LRCLib');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('[v0] LRCLib challenge error:', error);
    return Response.json(
      { error: 'Failed to request challenge' },
      { status: 500 }
    );
  }
}
