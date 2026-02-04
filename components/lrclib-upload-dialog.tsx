'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Upload, CheckCircle, Loader } from 'lucide-react';

interface LRCLibUploadDialogProps {
  syncedLyrics: string;
  plainLyrics: string;
  audioFile: File | null;
  onClose: () => void;
}

// Proof of work solver for LRCLib challenge
async function solveChallenge(prefix: string, target: string): Promise<string> {
  let nonce = 0;
  const encoder = new TextEncoder();

  while (true) {
    const data = encoder.encode(`${prefix}:${nonce}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();

    if (hashHex <= target) {
      return nonce.toString();
    }

    nonce++;
    if (nonce % 10000 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}

export default function LRCLibUploadDialog({
  syncedLyrics,
  plainLyrics,
  audioFile,
  onClose,
}: LRCLibUploadDialogProps) {
  const [step, setStep] = useState<'confirm' | 'details' | 'uploading' | 'success' | 'error'>(
    'confirm'
  );
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [contributorName, setContributorName] = useState('Lyrica API');
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  const getDuration = (): number => {
    if (!audioFile) return 0;
    // Extract duration from the last timestamp in syncedLyrics
    const matches = syncedLyrics.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/g);
    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const timeMatch = lastMatch.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
      if (timeMatch) {
        const minutes = parseInt(timeMatch[1], 10);
        const seconds = parseInt(timeMatch[2], 10);
        const centiseconds = parseInt(timeMatch[3], 10);
        return minutes * 60 + seconds + centiseconds / 100;
      }
    }
    return 0;
  };

  const handleConfirm = () => {
    // Pre-fill artist and track from filename if possible
    if (audioFile) {
      const fileName = audioFile.name.replace(/\.[^/.]+$/, ''); // Remove extension
      const parts = fileName.split(' - ');
      if (parts.length === 2) {
        setArtistName(parts[0]);
        setTrackName(parts[1]);
      } else {
        setTrackName(fileName);
      }
    }
    setStep('details');
  };

  const handleUpload = async () => {
    if (!artistName.trim() || !trackName.trim()) {
      setError('Artist name and track name are required');
      return;
    }

    setStep('uploading');
    setError('');
    setUploadProgress('Requesting challenge from LRCLib...');

    try {
      // Step 1: Request challenge
      const challengeRes = await fetch('/api/lrclib/request-challenge', {
        method: 'POST',
      });

      if (!challengeRes.ok) {
        throw new Error('Failed to request challenge');
      }

      const { prefix, target } = await challengeRes.json();
      setUploadProgress('Solving proof of work challenge...');

      // Step 2: Solve challenge
      const nonce = await solveChallenge(prefix, target);
      const publishToken = `${prefix}:${nonce}`;

      setUploadProgress('Publishing lyrics to LRCLib...');

      // Step 3: Publish lyrics
      const publishRes = await fetch('/api/lrclib/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackName: trackName.trim(),
          artistName: artistName.trim(),
          albumName: albumName.trim() || 'Unknown Album',
          duration: getDuration(),
          plainLyrics,
          syncedLyrics,
          publishToken,
        }),
      });

      if (!publishRes.ok) {
        const errorData = await publishRes.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || 'Failed to publish lyrics');
      }

      setUploadProgress('Lyrics published successfully!');
      setStep('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('[v0] Upload error:', err);
      setError(message);
      setStep('error');
    }
  };

  if (step === 'confirm') {
    return (
      <Card className="p-6 max-w-lg mx-auto">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Verify Lyrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are these lyrics correct? If yes, you can contribute them to LRCLib to help other music
              enthusiasts. Contributors earn reputation points!
            </p>
            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                No, Regenerate
              </Button>
              <Button onClick={handleConfirm} className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Yes, Upload to LRCLib
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (step === 'details') {
    return (
      <Card className="p-6 max-w-lg mx-auto">
        <h3 className="font-semibold text-lg mb-4">Song Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Artist Name *</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="e.g., The Beatles"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Track Name *</label>
            <input
              type="text"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              placeholder="e.g., Let It Be"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Album Name (optional)</label>
            <input
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="e.g., Let It Be"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contributor Name (optional)</label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Your name or username"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Defaults to "Lyrica API" if left empty
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setStep('confirm')} variant="outline" className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Upload to LRCLib
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (step === 'uploading') {
    return (
      <Card className="p-6 max-w-lg mx-auto">
        <div className="text-center">
          <Loader className="w-8 h-8 text-secondary mx-auto mb-4 animate-spin" />
          <p className="font-medium mb-2">Publishing Lyrics</p>
          <p className="text-sm text-muted-foreground">{uploadProgress}</p>
        </div>
      </Card>
    );
  }

  if (step === 'success') {
    return (
      <Card className="p-6 max-w-lg mx-auto bg-gradient-to-br from-secondary/10 to-secondary/5">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Success!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your lyrics have been published to LRCLib. Thank you for contributing to the lyrics library!
          </p>
          <Button onClick={onClose} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Close
          </Button>
        </div>
      </Card>
    );
  }

  if (step === 'error') {
    return (
      <Card className="p-6 max-w-lg mx-auto bg-gradient-to-br from-destructive/10 to-destructive/5">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Upload Failed</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="flex gap-3">
            <Button
              onClick={() => setStep('details')}
              variant="outline"
              className="flex-1"
            >
              Try Again
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}
