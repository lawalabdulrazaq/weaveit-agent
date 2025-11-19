'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VideoViewerPage({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(0)
  const videoDuration = 720

  const tutorial = {
    id: params.id,
    title: 'Building a React Component Library',
    description: 'Learn how to build and publish a reusable React component library from scratch.',
    category: 'React',
    duration: 12,
    views: 2341,
    likes: 187,
    created: '2 days ago',
    author: 'Alex Johnson',
    chapters: [
      { time: 0, title: 'Introduction' },
      { time: 120, title: 'Project Setup' },
      { time: 300, title: 'Creating Components' },
      { time: 480, title: 'Styling with CSS Modules' },
      { time: 600, title: 'Publishing to npm' },
    ],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-secondary/50 rounded-lg border border-border flex items-center justify-center overflow-hidden relative text-5xl">
            ▶️
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={videoDuration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="w-full h-1 bg-muted rounded-lg cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(videoDuration)}</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
                <p className="text-muted-foreground">{tutorial.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm pb-4 border-b border-border">
              <div>
                <span className="text-muted-foreground">⏱️ </span>
                <span>{tutorial.duration} min</span>
              </div>
              <div>
                <span className="text-muted-foreground">👤 </span>
                <span>{tutorial.author}</span>
              </div>
              <div>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">{tutorial.category}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button className="btn-primary">👍 Like</button>
              <button className="btn-outline">💬 Comment</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">Chapters</h3>
            <div className="space-y-2">
              {tutorial.chapters.map((chapter, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTime(chapter.time)}
                  className="w-full text-left px-3 py-2 rounded-lg transition hover:bg-secondary"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{formatTime(chapter.time)}</span>
                    <span className="font-medium text-sm">{chapter.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="card text-center py-4">
              <p className="text-2xl font-bold neon-glow">{tutorial.views.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-green-400">{tutorial.likes}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Transcript</h3>
        <div className="space-y-3 text-muted-foreground text-sm max-h-48 overflow-y-auto">
          <p><span className="text-primary font-medium">0:00</span> - Welcome to this tutorial on building React component libraries...</p>
          <p><span className="text-primary font-medium">2:00</span> - First, let's set up our project structure using the necessary tools...</p>
          <p><span className="text-primary font-medium">5:00</span> - Now we'll create our first reusable component with proper TypeScript support...</p>
          <p><span className="text-primary font-medium">8:00</span> - Let's add styling using CSS modules for better modularity...</p>
        </div>
      </div>
    </div>
  )
}
