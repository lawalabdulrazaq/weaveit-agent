'use client'

import { useState } from 'react'

export default function ApiPage() {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const apiKey = 'sk_live_51234567890abcdefghijklmnop'
  const apiEndpoint = 'https://api.weaveit.dev/v1'

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">API & SDK</h1>
        <p className="text-muted-foreground">Integrate WeaveIt into your applications</p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">API Key</h2>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm flex items-center justify-between">
          <span className={showKey ? 'text-foreground' : 'text-muted-foreground'}>
            {showKey ? apiKey : '••••••••••••••••••••••••••••••••'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 hover:bg-border rounded-lg transition"
            >
              {showKey ? '🙈' : '👁️'}
            </button>
            <button
              onClick={() => handleCopy(apiKey)}
              className="p-2 hover:bg-border rounded-lg transition"
            >
              📋
            </button>
          </div>
        </div>
        <button className="btn-outline">🔄 Regenerate Key</button>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">API Endpoint</h2>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm flex items-center justify-between">
          <span>{apiEndpoint}</span>
          <button
            onClick={() => handleCopy(apiEndpoint)}
            className="p-2 hover:bg-border rounded-lg transition"
          >
            📋
          </button>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">JavaScript/TypeScript</h3>
            <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`import { WeaveIt } from '@weaveit/sdk';

const client = new WeaveIt({
  apiKey: 'sk_live_...'
});

const tutorial = await client.tutorials.generate({
  title: 'My Tutorial',
  code: 'console.log("Hello");'
});`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Python</h3>
            <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`from weaveit import WeaveIt

client = WeaveIt(api_key='sk_live_...')

tutorial = client.tutorials.generate(
  title='My Tutorial',
  code='print("Hello")'
)`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">cURL</h3>
            <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`curl -X POST ${apiEndpoint}/tutorials \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{"title":"Tutorial"}'`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="card border-primary/30">
        <h3 className="font-semibold mb-2">Need help?</h3>
        <p className="text-muted-foreground mb-4">Check out our comprehensive API documentation for detailed endpoints and examples.</p>
        <a href="#" className="text-primary hover:opacity-80 font-medium">
          Read the full API docs →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'API Calls (This Month)', value: '1,247' },
          { label: 'Rate Limit', value: '10,000/month' },
          { label: 'Average Response Time', value: '125ms' },
        ].map((stat, idx) => (
          <div key={idx} className="card text-center">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold neon-glow">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
