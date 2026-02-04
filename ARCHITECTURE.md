# GroqSync Pro - Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Next.js Frontend (React)                   │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │         Main Page Component                    │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │  Header with Branding & Info            │  │  │   │
│  │  │  ├──────────────────────────────────────────┤  │  │   │
│  │  │  │  API Key Manager Component               │  │  │   │
│  │  │  │  ├─ Environment Key Toggle               │  │  │   │
│  │  │  │  └─ Manual Key Input                     │  │  │   │
│  │  │  ├──────────────────────────────────────────┤  │  │   │
│  │  │  │  Audio Upload Component                  │  │  │   │
│  │  │  │  ├─ Drag & Drop Zone                     │  │  │   │
│  │  │  │  └─ File Preview                         │  │  │   │
│  │  │  ├──────────────────────────────────────────┤  │  │   │
│  │  │  │  Options Component                       │  │  │   │
│  │  │  │  ├─ Language Selector                    │  │  │   │
│  │  │  │  └─ Vocal Separator Toggle               │  │  │   │
│  │  │  ├──────────────────────────────────────────┤  │  │   │
│  │  │  │  Process Button & Status Display         │  │  │   │
│  │  │  │  ├─ Real-time Progress Indicator         │  │  │   │
│  │  │  │  └─ Error Messages                       │  │  │   │
│  │  │  ├──────────────────────────────────────────┤  │  │   │
│  │  │  │  Lyrics Output Component (if available)  │  │  │   │
│  │  │  │  ├─ Timing Toggle                        │  │  │   │
│  │  │  │  ├─ Copy to Clipboard Button             │  │  │   │
│  │  │  │  ├─ Download .LRC Button                 │  │  │   │
│  │  │  │  ├─ Download .TXT Button                 │  │  │   │
│  │  │  │  └─ Metadata Display                     │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
           ↓                                    ↓
    [Next.js API Routes]          [Groq Cloud API]
           ↓                                    ↓
┌──────────────────────────┐    ┌──────────────────────────┐
│   /api/check-env-key     │    │  Whisper-large-v3        │
│   /api/transcribe        │    │  (Transcription)         │
│   /api/translate         │    │                          │
│                          │    │  Llama 3.3 70B           │
│   (Proxy Routes)         │    │  (Translation)           │
└──────────────────────────┘    └──────────────────────────┘
           ↑                                    ↑
           └────────────────────────────────────┘
                 HTTPS Secure Connection
```

## Component Hierarchy

```
RootLayout
├── Metadata
├── Dark Theme Setup
└── Main App
    └── Home Page
        ├── Header Section
        │   ├── Logo & Title
        │   ├── Description
        │   ├── Info Pills (Processing time, Features)
        │   └── Pro Tips Banner
        ├── Main Content Grid (3 columns)
        │   ├── Left Column (2/3 width)
        │   │   ├── ApiKeyManager
        │   │   │   ├── Environment Toggle
        │   │   │   ├── Password Input
        │   │   │   └── Toggle Visibility
        │   │   ├── AudioUploadProcessor
        │   │   │   ├── Drag & Drop Area
        │   │   │   ├── File Input
        │   │   │   └── File Preview
        │   │   ├── Options Card
        │   │   │   ├── Language Selector
        │   │   │   └── Vocal Separator Checkbox
        │   │   ├── Process Button
        │   │   ├── ProcessingStatus (conditional)
        │   │   ├── Error Card (conditional)
        │   │   └── Success Card (conditional)
        │   └── Right Column (1/3 width)
        │       └── Quick Guide Card
        │           ├── Step-by-step instructions
        │           └── Pro Tips
        └── Lyrics Output Section (conditional)
            └── LyricsOutput Component
                ├── Control Bar
                │   ├── Timing Toggle
                │   ├── Copy LRC Button
                │   ├── Download LRC Button
                │   └── Download TXT Button
                ├── Lyrics Display
                │   ├── Timing Information
                │   └── Lyric Text
                ├── Metadata Grid
                │   ├── Total Lines
                │   ├── Duration
                │   ├── Character Count
                │   └── Format Info
                └── Preview Info Banner
```

## Data Flow Diagram

```
1. USER INTERACTION
   ↓
┌──────────────────────────────────────────┐
│ ApiKeyManager Component                  │
│ - Checks environment for GROQ_API_KEY    │
│ - Sets apiKey state: '' or '[ENV_KEY]'   │
│ - OR user enters API key manually        │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ AudioUploadProcessor Component           │
│ - User selects or drags audio file       │
│ - Sets audioFile state with File object  │
│ - Validates audio format                 │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ User Selects Options                     │
│ - Language selection (language state)    │
│ - Vocal separator toggle (useSeparator)  │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ handleProcessAudio() Function Triggered  │
│ - Sets isProcessing = true               │
│ - Initializes timer for processing time  │
└──────────────────────────────────────────┘
   ↓
2. TRANSCRIPTION PHASE
   ↓
┌──────────────────────────────────────────┐
│ Check API Key Type                       │
├──────────────────────────────────────────┤
│ if apiKey === '[ENV_KEY]'                │
│   → POST /api/transcribe (proxy)        │
│ else                                     │
│   → POST https://api.groq.com/...        │
│       (direct with user key)             │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Groq Whisper API                         │
│ - Receives audio file                    │
│ - Transcribes audio                      │
│ - Extracts timestamps                    │
│ - Returns segments array                 │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Format Timestamps                        │
│ - Convert seconds to MM:SS.CC format     │
│ - Create lyrics array with timing        │
│ - Build raw lyrics text string           │
└──────────────────────────────────────────┘
   ↓
3. TRANSLATION PHASE (if language !== 'original')
   ↓
┌──────────────────────────────────────────┐
│ Check API Key Type (same as step 2)      │
├──────────────────────────────────────────┤
│ if apiKey === '[ENV_KEY]'                │
│   → POST /api/translate (proxy)         │
│ else                                     │
│   → POST https://api.groq.com/...        │
│       (direct with user key)             │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Groq Llama API                           │
│ - Receives formatted lyrics              │
│ - Translates text only                   │
│ - Preserves timing brackets              │
│ - Returns translated content             │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Re-parse Translated Lyrics               │
│ - Extract timestamps from translated     │
│ - Rebuild lyrics array                   │
│ - Verify timing integrity                │
└──────────────────────────────────────────┘
   ↓
4. OUTPUT & DISPLAY
   ↓
┌──────────────────────────────────────────┐
│ Update React State                       │
│ - setLyrics(finalLyrics)                 │
│ - setRawLyricsText(lyricsText)           │
│ - setProcessingStep('')                  │
│ - setProcessingTime(elapsed)             │
│ - setIsProcessing(false)                 │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ LyricsOutput Component Renders           │
│ - Display synchronized lyrics            │
│ - Show metadata                          │
│ - Enable download/copy buttons           │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ User Actions                             │
│ - Copy LRC → clipboard.writeText()       │
│ - Download LRC → blob + download link    │
│ - Download TXT → blob + download link    │
└──────────────────────────────────────────┘
```

## File Structure

```
Project Root
│
├── app/
│   ├── page.tsx                          # Main application (418 lines)
│   │   ├── State management
│   │   ├── API call logic
│   │   ├── Timing utilities
│   │   └── UI rendering
│   │
│   ├── layout.tsx                        # Root layout with dark theme
│   │   ├── Metadata setup
│   │   ├── Font configuration
│   │   └── HTML structure
│   │
│   ├── globals.css                       # Theme & styling
│   │   ├── Color variables (dark theme)
│   │   ├── Tailwind CSS v4 config
│   │   └── Base layer styles
│   │
│   └── api/
│       ├── check-env-key/
│       │   └── route.ts                  # Check for environment API key
│       │       └── GET handler
│       │
│       ├── transcribe/
│       │   └── route.ts                  # Proxy transcription endpoint
│       │       ├── Server-side API key usage
│       │       ├── FormData handling
│       │       └── Groq API proxy
│       │
│       └── translate/
│           └── route.ts                  # Proxy translation endpoint
│               ├── Server-side API key usage
│               ├── JSON request handling
│               └── Groq API proxy
│
├── components/
│   ├── api-key-manager.tsx               # API key input (122 lines)
│   │   ├── Environment key detection
│   │   ├── Manual key input
│   │   ├── Toggle switching
│   │   └── Visual feedback
│   │
│   ├── audio-upload-processor.tsx        # File upload (132 lines)
│   │   ├── Drag & drop handling
│   │   ├── File validation
│   │   ├── Preview display
│   │   └── File removal
│   │
│   ├── processing-status.tsx             # Progress indicator (60 lines)
│   │   ├── Real-time timer
│   │   ├── Progress bar
│   │   ├── Elapsed time tracking
│   │   └── Animation
│   │
│   ├── lyrics-output.tsx                 # Output & export (173 lines)
│   │   ├── Lyrics display
│   │   ├── Copy functionality
│   │   ├── Download handlers
│   │   ├── Metadata display
│   │   └── Timing toggle
│   │
│   └── ui/                               # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── ... (other UI components)
│
├── hooks/
│   ├── use-mobile.ts                     # Mobile detection hook
│   └── use-toast.ts                      # Toast notifications
│
├── lib/
│   └── utils.ts                          # Utility functions (cn, etc)
│
├── public/
│   └── icons/                            # Icon assets
│
├── Documentation/
│   ├── SETUP_GUIDE.md                    # (314 lines)
│   │   ├── Overview & features
│   │   ├── Installation & setup
│   │   ├── Usage instructions
│   │   ├── Troubleshooting
│   │   ├── Deployment guide
│   │   └── FAQ section
│   │
│   ├── TIMING_VERIFICATION.md            # (316 lines)
│   │   ├── Timing system explanation
│   │   ├── Accuracy metrics
│   │   ├── Format specifications
│   │   ├── Error correction
│   │   └── Advanced topics
│   │
│   ├── QUICK_START.md                    # (221 lines)
│   │   ├── 30-second setup
│   │   ├── Quick checklist
│   │   ├── Best practices
│   │   ├── Troubleshooting
│   │   └── FAQ
│   │
│   ├── PROJECT_SUMMARY.md                # (410 lines)
│   │   ├── Feature overview
│   │   ├── Implementation details
│   │   ├── Architecture notes
│   │   └── Deployment options
│   │
│   └── ARCHITECTURE.md                   # (this file)
│       ├── System diagrams
│       ├── Component hierarchy
│       ├── Data flow
│       ├── File structure
│       └── Technology stack
│
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.mjs
│   └── tailwind.config.ts
│
└── Environment
    └── .env.local (user created)
        └── GROQ_API_KEY=gsk_...
```

## State Management

```
Main Component State:
│
├── apiKey: string
│   ├── '' (empty/not set)
│   ├── 'gsk_...' (user-provided key)
│   └── '[ENV_KEY]' (environment marker)
│
├── audioFile: File | null
│   └── Selected audio file for processing
│
├── language: string
│   └── 'original' | 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja'
│
├── lyrics: Array<{ time: string; text: string }>
│   └── Formatted lyrics with timing
│
├── rawLyricsText: string
│   └── Raw LRC format as string
│
├── isProcessing: boolean
│   └── true during API calls, false otherwise
│
├── processingStep: string
│   └── Current step message for UI display
│
├── error: string
│   └── Error message if processing failed
│
├── processingTime: number
│   └── Elapsed seconds during processing
│
└── useSeparator: boolean
    └── Whether to use vocal/music separator
```

## API Communication

### Direct API Calls (User Key)
```
Client → https://api.groq.com/openai/v1/audio/transcriptions
         Headers: Authorization: Bearer {userKey}
         Body: FormData with audio file
         ↓
         Groq Whisper API
         ↓
         Returns: { segments: [...] }
```

### Proxy API Calls (Environment Key)
```
Client → /api/transcribe (POST)
         Body: FormData with audio file
         ↓
         Server Route Handler
         ↓
         Uses: process.env.GROQ_API_KEY
         ↓
         Forwards to https://api.groq.com/...
         ↓
         Returns: { segments: [...] }
         ↓
         Client
```

## Performance Considerations

### Optimization Techniques
1. **Component Splitting** - Separate components for each feature
2. **State Isolation** - Local state where possible
3. **Lazy Loading** - Components render conditionally
4. **Image Optimization** - Lucide React for icons (SVG)
5. **CSS-in-JS** - Tailwind for minimal CSS
6. **API Efficiency** - Direct calls when possible (fewer hops)

### Processing Bottlenecks
1. **Transcription** (30-60s) - Groq API, no local optimization
2. **Translation** (20-45s) - Groq API, no local optimization
3. **File Upload** (depends on file size & network)
4. **Rendering** (<100ms) - Local, highly optimized

### Browser Storage
- No localStorage used (per requirements)
- All state in-memory
- No data persistence between sessions

## Error Handling

```
Try/Catch Structure:
├── Transcription Phase
│   ├── Network error → Show error message
│   ├── API error (401) → Suggest API key check
│   ├── API error (413) → File too large
│   ├── Invalid response → Show parse error
│   └── Unknown error → Generic message
│
├── Translation Phase
│   ├── Network error → Show error message
│   ├── API error → Suggest retry or skip translation
│   └── Parse error → Show error message
│
└── UI Display
    └── Error card with helpful message
```

## Security Architecture

```
API Keys:
├── User-Provided Keys
│   ├── Sent with direct API calls
│   ├── Not stored in state
│   ├── Not saved to localStorage
│   └── Not sent to server
│
└── Server-Side Keys
    ├── From environment.env
    ├── Handled only on server
    ├── Used by proxy routes
    └── Never exposed to client
```

## Deployment Considerations

### Vercel Specific
- Automatic env var injection
- Serverless function support for API routes
- Zero-config deployment

### Self-Hosted (Docker)
- Node.js 18+ required
- GROQ_API_KEY env var needed
- Port 3000 default

### Environment Variable Setup
```
Development: .env.local
Staging: .env.staging
Production: Environment dashboard or .env.production.local
```

---

**Last Updated**: February 2026  
**Framework**: Next.js 16+  
**Architecture Pattern**: Component-based with server proxies  
**Deployment Ready**: ✅ Yes
