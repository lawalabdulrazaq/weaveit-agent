"use client"

import WeaveItApp from "../components/WeaveItApp"

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* WeaveIt App Component (includes header) */}
      <div className="relative">
        <WeaveItApp />
      </div>
    </div>
  )
}