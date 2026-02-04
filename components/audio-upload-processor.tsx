'use client';

import React from "react"

import { useRef, useState } from 'react';
import { Upload, Music, Trash2 } from 'lucide-react';

interface AudioUploadProcessorProps {
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
}

export default function AudioUploadProcessor({
  audioFile,
  setAudioFile,
}: AudioUploadProcessorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');

  const handleFile = (file: File) => {
    if (file.type.startsWith('audio/')) {
      setAudioFile(file);
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2));
    } else {
      alert('Please select an audio file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setAudioFile(null);
    setFileName('');
    setFileSize('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept="audio/*"
        className="hidden"
      />

      {!audioFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="p-3 bg-primary/10 rounded-lg mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="font-medium text-foreground mb-1">
              Drag and drop your audio file
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse (Max 100MB)
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Supported formats: MP3, WAV, FLAC, OGG, M4A
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/30 rounded-lg">
          <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{fileName}</p>
            <p className="text-sm text-muted-foreground">
              {fileSize} MB
            </p>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-destructive/20 rounded-lg text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        💡 Tip: Use the vocal/music separator option for better transcription
        accuracy
      </p>
    </div>
  );
}
