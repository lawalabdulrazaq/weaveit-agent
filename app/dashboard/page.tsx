'use client'

import Link from 'next/link'

export default function DashboardPage() {
  const recentTutorials = [
    { id: 1, title: 'React Hooks Tutorial', status: 'Published', views: 2341, date: '2 days ago' },
    { id: 2, title: 'Next.js API Routes', status: 'Draft', views: 0, date: '1 day ago' },
    { id: 3, title: 'TypeScript Basics', status: 'Published', views: 1823, date: '5 days ago' },
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to WeaveIt</h1>
        <p className="text-muted-foreground">Create your next tutorial or explore your library</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/generate" className="card border-primary/30 hover:border-primary/60 transition cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition text-xl">
              ➕
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Create New Tutorial</h3>
          <p className="text-muted-foreground">Generate a professional tutorial from code or documentation</p>
        </Link>

        <Link href="/dashboard/library" className="card border-border hover:border-primary/30 transition cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
              ▶️
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Browse Library</h3>
          <p className="text-muted-foreground">View and manage all your created tutorials</p>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Tutorials</h2>
        <div className="space-y-3">
          {recentTutorials.map((tutorial) => (
            <div key={tutorial.id} className="card border-border hover:border-primary/30 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className={`px-2 py-1 rounded ${tutorial.status === 'Published' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {tutorial.status}
                    </span>
                    <span>{tutorial.views} views</span>
                    <span>{tutorial.date}</span>
                  </div>
                </div>
                <Link href={`/dashboard/videos/${tutorial.id}`} className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Views', value: '12,847' },
          { label: 'Tutorials Created', value: '23' },
          { label: 'API Calls', value: '1,247' },
        ].map((stat, idx) => (
          <div key={idx} className="card">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold neon-glow">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
