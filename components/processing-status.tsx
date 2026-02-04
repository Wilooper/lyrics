'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProcessingStatusProps {
  step: string;
  elapsedTime: number;
}

export default function ProcessingStatus({
  step,
  elapsedTime,
}: ProcessingStatusProps) {
  const [displayTime, setDisplayTime] = useState(elapsedTime);
  const [estimatedRemaining, setEstimatedRemaining] = useState(120 - elapsedTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime((prev) => prev + 1);
      setEstimatedRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-medium text-foreground">{step}</p>
              <Zap className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="w-full bg-border/30 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-1000"
                  style={{
                    width: `${Math.min(100, (displayTime / 120) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Elapsed: {displayTime}s</span>
                <span>Est. remaining: {Math.max(0, estimatedRemaining)}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
