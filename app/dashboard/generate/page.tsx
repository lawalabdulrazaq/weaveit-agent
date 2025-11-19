'use client'

import { useState } from 'react'

export default function GeneratePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Generate Tutorial</h1>
        <p className="text-muted-foreground">Transform your code into engaging video tutorials</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tutorial Title</label>
          <input
            type="text"
            placeholder="e.g., Building a React Component Library"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe what your tutorial is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Code / Documentation</label>
          <textarea
            placeholder="Paste your code snippets or documentation here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !title || !code}
          className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <span>Generating...</span>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
            </>
          ) : (
            <>
              <span>✨</span>
              Generate Tutorial
            </>
          )}
        </button>
      </div>

      <div className="card border-primary/30">
        <h3 className="font-semibold mb-2">Tips for best results:</h3>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li>• Include clear code snippets with comments</li>
          <li>• Provide context in the description</li>
          <li>• Focus on one concept per tutorial</li>
          <li>• Include expected output or results</li>
        </ul>
      </div>
    </div>
  )
}
