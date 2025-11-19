'use client'

import Link from 'next/link'

export default function LibraryPage() {
  const tutorials = [
    { id: 1, title: 'React Hooks Mastery', category: 'React', published: true, views: 5234 },
    { id: 2, title: 'Next.js Performance Tips', category: 'Next.js', published: true, views: 3421 },
    { id: 3, title: 'TypeScript Advanced Types', category: 'TypeScript', published: true, views: 2187 },
    { id: 4, title: 'Tailwind CSS Grid', category: 'CSS', published: false, views: 0 },
    { id: 5, title: 'GraphQL Basics', category: 'Backend', published: true, views: 1923 },
    { id: 6, title: 'Docker Fundamentals', category: 'DevOps', published: false, views: 0 },
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Tutorial Library</h1>
        <p className="text-muted-foreground">All your created tutorials in one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="card border-border hover:border-primary/30 transition group">
            <div className="h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-lg mb-4 flex items-center justify-center border border-primary/20 text-4xl">
              ▶️
            </div>
            <h3 className="font-semibold mb-2">{tutorial.title}</h3>
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary">{tutorial.category}</span>
              {tutorial.published ? (
                <span className="text-xs text-green-400">{tutorial.views} views</span>
              ) : (
                <span className="text-xs text-muted-foreground">Draft</span>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/videos/${tutorial.id}`} className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition text-center text-sm">
                View
              </Link>
              <button className="px-3 py-2 rounded-lg border border-border hover:bg-secondary transition">
                ✎
              </button>
              <button className="px-3 py-2 rounded-lg border border-border hover:bg-destructive/10 transition text-destructive">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
