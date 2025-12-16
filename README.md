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

<<<<<<< HEAD
## Real-Time Updates

The application uses Server-Sent Events (SSE) for real-time progress updates during content generation.

### Webhook Endpoint

- **Endpoint**: `/api/webhooks/job-update`
- **Purpose**: Handles both progress and completion updates from external services
- **Payload**: Includes `status`, `progress` (percentage), `step` (current processing step)
- **Database**: Only updates for final states (completed/failed); progress is broadcasted without persistence

### Frontend Integration

- **SSE Endpoint**: `/api/jobs/events?jobIds={jobId}`
- **Updates**: Receives real-time updates like progress percentage, current step, and completion status
- **Example**:
  ```javascript
  const eventSource = new EventSource(`/api/jobs/events?jobIds=${jobId}`);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.status === "progress") {
      updateProgressBar(data.progress, data.step);
    } else if (data.status === "completed") {
      showCompletedVideo(data.videoId);
    }
  };
  ```
=======
## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Payment**: Solana Web3.js + Wallet Adapter
- **Video**: FFmpeg
- **AI**: Text-to-speech + script analysis
- **UI**: Tailwind CSS + Lucide Icons

## Routes

- `/` - Landing page
- `/studio` - Video generation studio (requires wallet)
>>>>>>> 3716a395164f458069abaf635fe2628daf51c34f
