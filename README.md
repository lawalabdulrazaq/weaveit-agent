# WeaveIt Agent

AI-powered video generator that transforms code tutorials into professional videos with narration.

## Architecture

```
app/
├── components/          # React components
│   ├── HomePage.tsx    # Landing page
│   ├── AppPage.tsx     # Studio wrapper
│   ├── WeaveItApp.tsx  # Main video generator
│   ├── Navbar.tsx      # Navigation
│   └── Footer.tsx      # Footer
├── studio/             # /studio route
│   └── page.tsx        # Studio page entry
├── api/                # API routes
│   └── generate.ts     # Video generation endpoint
└── layout.tsx          # Root layout + wallet provider

weaveit/weaveit-generator/
├── videoGenerator.ts   # FFmpeg video generation
├── textToSpeech.ts    # Audio synthesis
└── codeAnalyzer.ts    # AI script enhancement

components/
└── wallet-provider.tsx # Solana wallet integration
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Payment**: Solana Web3.js + Wallet Adapter
- **Video**: FFmpeg
- **AI**: Text-to-speech + script analysis
- **UI**: Tailwind CSS + Lucide Icons

## Routes

- `/` - Landing page
- `/studio` - Video generation studio (requires wallet)
