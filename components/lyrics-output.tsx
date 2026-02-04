'use client';

import { useState } from 'react';
import { Copy, Download, Check, ArrowDown, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LyricsOutputProps {
  lyrics: Array<{ time: string; text: string }>;
  rawText: string;
  onScrollToLyrics?: () => void;
  onVerifyLyrics?: () => void;
  audioFile?: File | null;
}

export default function LyricsOutput({
  lyrics,
  rawText,
  onScrollToLyrics,
  onVerifyLyrics,
  audioFile,
}: LyricsOutputProps) {
  const [copied, setCopied] = useState(false);
  const [showTiming, setShowTiming] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadLrc = () => {
    const blob = new Blob([rawText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyrics.lrc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    const textOnly = lyrics
      .map((l) => l.text)
      .join('\n');
    const blob = new Blob([textOnly], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyrics.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">
            Show timing:
          </label>
          <input
            type="checkbox"
            checked={showTiming}
            onChange={(e) => setShowTiming(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {onScrollToLyrics && (
            <Button
              onClick={onScrollToLyrics}
              variant="outline"
              size="sm"
              className="gap-2 border-secondary/30 hover:bg-secondary/10 bg-transparent text-secondary"
            >
              <ArrowDown className="w-4 h-4" />
              Scroll to Lyrics
            </Button>
          )}
          {onVerifyLyrics && audioFile && (
            <Button
              onClick={onVerifyLyrics}
              size="sm"
              className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Upload className="w-4 h-4" />
              Verify & Upload to SimpMusic
            </Button>
          )}
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="gap-2 border-border hover:bg-primary/10 bg-transparent"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy LRC
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadLrc}
            variant="outline"
            size="sm"
            className="gap-2 border-border hover:bg-primary/10 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Download .LRC
          </Button>
          <Button
            onClick={handleDownloadTxt}
            variant="outline"
            size="sm"
            className="gap-2 border-border hover:bg-primary/10 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Download .TXT
          </Button>
        </div>
      </div>

      {/* Lyrics Display */}
      <Card className="border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="max-h-96 overflow-y-auto p-6">
          <div className="font-mono text-sm leading-relaxed space-y-1">
            {lyrics.map((lyric, index) => (
              <div
                key={index}
                className="group hover:bg-primary/5 px-2 py-1 rounded transition-colors"
              >
                {showTiming && (
                  <span className="text-primary font-semibold mr-2 group-hover:text-secondary transition-colors">
                    {lyric.time}
                  </span>
                )}
                <span className="text-foreground">{lyric.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Total Lines</p>
          <p className="text-lg font-semibold text-primary">{lyrics.length}</p>
        </Card>
        <Card className="border-border bg-card/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="text-lg font-semibold text-secondary">
            {lyrics.length > 0
              ? lyrics[lyrics.length - 1].time
              : '[00:00.00]'}
          </p>
        </Card>
        <Card className="border-border bg-card/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Characters</p>
          <p className="text-lg font-semibold text-primary">
            {rawText.length}
          </p>
        </Card>
        <Card className="border-border bg-card/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Format</p>
          <p className="text-lg font-semibold text-secondary">LRC v1.0</p>
        </Card>
      </div>

      {/* Preview Info */}
      <div className="p-4 bg-secondary/5 border border-secondary/30 rounded-lg text-xs text-muted-foreground">
        <p className="mb-2 font-medium text-foreground">
          ⚠️ Lyrica (Beta) - Please Review
        </p>
        <p className="mb-2">
          This is a beta version and may contain transcription errors. Please review the lyrics carefully before uploading to SimpMusic.
        </p>
        <p className="mb-2">
          ✓ Lyrics are synchronized with timing information. You can use these files with LRC-compatible media players.
        </p>
        <p>
          💡 Found an issue? Use the "Verify & Upload to SimpMusic" button to contribute corrections to the community!
        </p>
      </div>
    </div>
  );
}
