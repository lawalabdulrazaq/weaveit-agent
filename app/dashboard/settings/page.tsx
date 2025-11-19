'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex@example.com')
  const [bio, setBio] = useState('Content creator and developer educator')
  const [notifications, setNotifications] = useState({
    email: true,
    newsletter: true,
    updates: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="card space-y-6">
        <h2 className="text-2xl font-bold">Profile</h2>

        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30 text-4xl">
            📷
          </div>
          <button className="btn-outline">Change Avatar</button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="card space-y-6">
        <h2 className="text-2xl font-bold">Notifications</h2>

        {[
          { key: 'email', label: 'Email Notifications', description: 'Receive updates about your tutorials and account' },
          { key: 'newsletter', label: 'Newsletter', description: 'Get weekly tips and industry updates' },
          { key: 'updates', label: 'Product Updates', description: 'Be notified about new WeaveIt features' },
        ].map((notif) => (
          <div key={notif.key} className="flex items-start justify-between py-4 border-b border-border last:border-0">
            <div>
              <h4 className="font-medium">{notif.label}</h4>
              <p className="text-sm text-muted-foreground">{notif.description}</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[notif.key as keyof typeof notifications]}
                onChange={(e) => setNotifications({ ...notifications, [notif.key]: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${notifications[notif.key as keyof typeof notifications] ? 'bg-primary' : 'bg-muted'}`}></div>
            </label>
          </div>
        ))}
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <p className="text-muted-foreground">Manage your API keys for third-party integrations</p>
        <button className="btn-secondary">Generate New Key</button>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Billing</h2>
        <div className="space-y-2">
          <p className="font-medium">Current Plan: Professional</p>
          <p className="text-muted-foreground">Next billing date: January 15, 2025</p>
          <button className="btn-outline">Manage Subscription</button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="btn-primary flex items-center gap-2 disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : <>💾 Save Changes</>}
      </button>
    </div>
  )
}
