'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ApiKeyManager from '@/components/api-key-manager';
import AudioUploadProcessor from '@/components/audio-upload-processor';
import LyricsOutput from '@/components/lyrics-output';
import ProcessingStatus from '@/components/processing-status';
import SimpMusicUploadDialog from '@/components/simpmusic-upload-dialog';
import LRCLibUploadDialog from '@/components/lrclib-upload-dialog'; // Import LRCLibUploadDialog
import { Music, Zap } from 'lucide-react';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('original');
  const [lyrics, setLyrics] = useState<Array<{ time: string; text: string }>>([]);
  const [rawLyricsText, setRawLyricsText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState('');
  const [processingTime, setProcessingTime] = useState(0);
  const [useSeparator, setUseSeparator] = useState(false);
  const [showSimpMusicDialog, setShowSimpMusicDialog] = useState(false);
  const [showLRCLibDialog, setShowLRCLibDialog] = useState(false); // Declare showLRCLibDialog
  const lyricsRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    const ms = Math.floor((seconds % 1) * 100)
      .toString()
      .padStart(2, '0');
    return `[${m}:${s}.${ms}]`;
  };

  const getLanguageName = (lang: string): string => {
    const languages: { [key: string]: string } = {
      original: 'Original',
      en: 'English',
      hi: 'Hindi',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      ja: 'Japanese',
    };
    return languages[lang] || lang;
  };

  const handleProcessAudio = async () => {
    if (!apiKey || !audioFile) {
      setError('Please provide both API key and audio file');
      return;
    }

    setIsProcessing(true);
    setError('');
    setLyrics([]);
    setRawLyricsText('');
    setProcessingTime(0);

    const startTime = Date.now();
    const updateProcessingTime = setInterval(() => {
      setProcessingTime(Math.round((Date.now() - startTime) / 1000));
    }, 1000);

    try {
      // Step 1: Transcribe audio
      setProcessingStep('Transcribing audio with Groq Whisper...');

      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-large-v3');
      formData.append('response_format', 'verbose_json');

      const isEnvKey = apiKey === '[ENV_KEY]';
      const endpoint = isEnvKey
        ? '/api/transcribe'
        : 'https://api.groq.com/openai/v1/audio/transcriptions';

      const transcriptionResponse = await fetch(endpoint, {
        method: 'POST',
        ...(isEnvKey
          ? {}
          : {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }),
        body: formData,
      });

      if (!transcriptionResponse.ok) {
        const errorData = await transcriptionResponse.text();
        throw new Error(
          `Transcription failed: ${transcriptionResponse.status} - ${errorData}`
        );
      }

      const transcriptionData = await transcriptionResponse.json();

      if (
        !transcriptionData.segments ||
        !Array.isArray(transcriptionData.segments)
      ) {
        throw new Error('Invalid transcription response format');
      }

      // Step 2: Format lyrics with timestamps
      setProcessingStep('Formatting lyrics with timing...');

      const formattedLyrics = transcriptionData.segments.map(
        (segment: { start: number; text: string }) => ({
          time: formatTime(segment.start),
          text: segment.text,
        })
      );

      let finalLyrics = formattedLyrics;
      let lyricsText = formattedLyrics
        .map((l: { time: string; text: string }) => `${l.time} ${l.text}`)
        .join('\n');

      // Step 3: Optional translation
      if (language !== 'original') {
        setProcessingStep(`Translating to ${getLanguageName(language)}...`);

        const translationEndpoint = isEnvKey
          ? '/api/translate'
          : 'https://api.groq.com/openai/v1/chat/completions';

        const requestBody = {
          model: 'gemma2-9b-it',
          messages: [
            {
              role: 'system',
              content: `Translate the following lyrics to ${getLanguageName(language)}. KEEP THE TIMESTAMPS EXACTLY AS THEY ARE. Only translate the text part after the timestamp. Output ONLY the translated lyrics in the same format.`,
            },
            {
              role: 'user',
              content: lyricsText,
            },
          ],
          max_tokens: 4096,
        };

        const translationResponse = await fetch(translationEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(isEnvKey ? {} : { Authorization: `Bearer ${apiKey}` }),
          },
          body: JSON.stringify(requestBody),
        });

        if (!translationResponse.ok) {
          const errorData = await translationResponse.text();
          throw new Error(
            `Translation failed: ${translationResponse.status} - ${errorData}`
          );
        }

        const translationData = await translationResponse.json();

        if (
          translationData.choices &&
          translationData.choices[0] &&
          translationData.choices[0].message
        ) {
          lyricsText = translationData.choices[0].message.content;

          // Re-parse the translated lyrics
          finalLyrics = lyricsText
            .split('\n')
            .filter((line: string) => line.trim())
            .map((line: string) => {
              const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
              if (timeMatch) {
                return {
                  time: timeMatch[0],
                  text: line
                    .replace(/\[\d{2}:\d{2}\.\d{2}\]\s*/, '')
                    .trim(),
                };
              }
              return { time: '', text: line };
            })
            .filter((item: { time: string; text: string }) => item.time);
        }
      }

      setLyrics(finalLyrics);
      setRawLyricsText(lyricsText);
      setProcessingStep('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Processing error:', err);
    } finally {
      clearInterval(updateProcessingTime);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <Music className="w-8 h-8 text-background" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Lyrica
              </h1>
              <p className="text-xs text-secondary font-semibold">Beta Version</p>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Generate and contribute synchronized lyrics to SimpMusic
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            ⚠️ Beta - May contain transcription errors. Please review before uploading.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              Average processing: ~120 seconds
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-lg text-sm text-foreground">
              <Music className="w-4 h-4 text-secondary" />
              Vocal/Music Separator for optimal results
            </div>
          </div>

          {/* Information Banners */}
          <Card className="mt-6 border-secondary/30 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <div className="p-4">
              <p className="text-sm text-foreground font-medium mb-2">
                🎵 Contribute to SimpMusic
              </p>
              <p className="text-xs text-muted-foreground">
                After generating lyrics, verify they're correct and upload them to SimpMusic - the community-driven lyrics database. Help other music fans enjoy synchronized lyrics in their favorite players!
              </p>
            </div>
          </Card>

          <Card className="mt-4 border-secondary/30 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <div className="p-4">
              <p className="text-sm text-foreground font-medium mb-2">
                💡 Pro Tip: Use Vocal/Music Separator
              </p>
              <p className="text-xs text-muted-foreground">
                Enable the vocal/music separator option to isolate vocals from background music. This significantly improves transcription accuracy by removing instrumental noise. The separation uses advanced audio processing to extract only the vocal track before transcription.
              </p>
            </div>
          </Card>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Inputs */}
          <div className="md:col-span-2 space-y-6">
            {/* API Key Section */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">API Configuration</h2>
                  <a
                    href="https://console.groq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary text-sm font-medium transition-colors"
                  >
                    Get API Key ↗
                  </a>
                </div>
                <ApiKeyManager apiKey={apiKey} setApiKey={setApiKey} />
              </div>
            </Card>

            {/* Audio Upload Section */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Audio File</h2>
                <AudioUploadProcessor
                  audioFile={audioFile}
                  setAudioFile={setAudioFile}
                />
              </div>
            </Card>

            {/* Settings Section */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Options</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Target Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="original">
                        Original (As sung)
                      </option>
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
                    <input
                      type="checkbox"
                      id="separator"
                      checked={useSeparator}
                      onChange={(e) => setUseSeparator(e.target.checked)}
                      className="w-4 h-4 accent-secondary mt-0.5 flex-shrink-0"
                    />
                    <label
                      htmlFor="separator"
                      className="text-sm flex-1 cursor-pointer"
                    >
                      <div className="font-medium text-foreground">
                        Use Vocal/Music Separator
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Isolates vocals for better transcription accuracy using audio processing
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Process Button */}
            <Button
              onClick={handleProcessAudio}
              disabled={isProcessing || !apiKey || !audioFile}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                'Generate Lyrics'
              )}
            </Button>

            {/* Status Messages */}
            {processingStep && (
              <ProcessingStatus
                step={processingStep}
                elapsedTime={processingTime}
              />
            )}

            {error && (
              <Card className="border-destructive bg-destructive/10">
                <div className="p-4">
                  <p className="text-sm text-destructive font-medium">Error</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {error}
                  </p>
                </div>
              </Card>
            )}

            {processingTime > 0 && !isProcessing && lyrics.length > 0 && (
              <Card className="border-primary/30 bg-primary/5">
                <div className="p-4">
                  <p className="text-sm text-primary font-medium">
                    ✓ Completed in {processingTime} seconds
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Info */}
          <div>
            <Card className="border-border bg-card/50 backdrop-blur-sm h-full">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Quick Guide</h3>
                <div className="space-y-4 flex-1 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">1. API Key</p>
                    <p>
                      Set your Groq API key or use the environment default
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      2. Upload Audio
                    </p>
                    <p>Select your audio file (MP3, WAV, FLAC, etc.)</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      3. Choose Options
                    </p>
                    <p>
                      Select language and enable separator if needed
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      4. Generate
                    </p>
                    <p>Click to process and get synchronized lyrics</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-xs text-muted-foreground">
                    💡 For best results, use your own Groq API key for faster
                    processing and higher rate limits
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Lyrics Output */}
        {lyrics.length > 0 && (
          <div ref={lyricsRef}>
            <LyricsOutput
              lyrics={lyrics}
              rawText={rawLyricsText}
              audioFile={audioFile}
              onScrollToLyrics={() => {
                lyricsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              onVerifyLyrics={() => setShowSimpMusicDialog(true)}
            />
          </div>
        )}

        {/* SimpMusic Upload Dialog */}
        {showSimpMusicDialog && lyrics.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl">
              <SimpMusicUploadDialog
                syncedLyrics={rawLyricsText}
                plainLyrics={lyrics.map((l) => l.text).join('\n')}
                audioFile={audioFile}
                onClose={() => setShowSimpMusicDialog(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
