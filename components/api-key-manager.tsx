'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ApiKeyManagerProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export default function ApiKeyManager({
  apiKey,
  setApiKey,
}: ApiKeyManagerProps) {
  const [showKey, setShowKey] = useState(false);
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [isUsingEnv, setIsUsingEnv] = useState(false);

  useEffect(() => {
    // Check if API key is available from environment
    const checkEnvKey = async () => {
      try {
        const response = await fetch('/api/check-env-key');
        const data = await response.json();
        if (data.hasKey) {
          setHasEnvKey(true);
          setIsUsingEnv(true);
          setApiKey('[ENV_KEY]'); // Special marker to use env key
        }
      } catch (error) {
        console.log('No environment API key available');
      }
    };

    checkEnvKey();
  }, [setApiKey]);

  const toggleUseEnv = () => {
    if (hasEnvKey) {
      const newState = !isUsingEnv;
      setIsUsingEnv(newState);
      if (newState) {
        setApiKey('[ENV_KEY]'); // Special marker to use env key
        console.log('[v0] Switched to environment API key');
      } else {
        setApiKey(''); // Clear if switching to manual
        console.log('[v0] Switched to manual API key entry');
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Environment Key Toggle */}
      {hasEnvKey && (
        <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
          <input
            type="checkbox"
            id="use-env"
            checked={isUsingEnv}
            onChange={toggleUseEnv}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="use-env" className="text-sm flex-1 cursor-pointer">
            <div className="font-medium text-foreground">
              Use Environment API Key
            </div>
            <div className="text-xs text-muted-foreground">
              Detected from server configuration
            </div>
          </label>
        </div>
      )}

      {/* Manual API Key Input */}
      {!isUsingEnv && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Groq API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full px-4 py-2 pr-10 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your free API key at{' '}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary font-medium"
            >
              console.groq.com
            </a>
          </p>
        </div>
      )}

      {isUsingEnv && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground font-medium">
            ✓ Using environment API key
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your API key is securely stored on the server
          </p>
        </div>
      )}
    </div>
  );
}
