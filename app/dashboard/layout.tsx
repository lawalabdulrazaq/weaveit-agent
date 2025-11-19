'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-secondary/50 border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground">W</span>
              </div>
              <span className="font-bold text-foreground">WeaveIt</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
          >
            <span>🏠</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/dashboard/generate"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>➕</span>
            {sidebarOpen && <span>Generate</span>}
          </Link>
          <Link
            href="/dashboard/library"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>📚</span>
            {sidebarOpen && <span>Library</span>}
          </Link>
          <Link
            href="/dashboard/videos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>▶️</span>
            {sidebarOpen && <span>Videos</span>}
          </Link>
          <Link
            href="/dashboard/api"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>&lt;/&gt;</span>
            {sidebarOpen && <span>API</span>}
          </Link>
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>💳</span>
            {sidebarOpen && <span>Billing</span>}
          </Link>
        </nav>

        <div className="p-4 space-y-2 border-t border-border">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <span>⚙️</span>
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition text-left">
            <span>→</span>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-secondary/50 flex items-center px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
