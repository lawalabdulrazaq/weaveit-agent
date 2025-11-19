'use client'

export default function BillingPage() {
  const invoices = [
    { id: 'INV-001', date: 'Jan 15, 2025', amount: '$79.00', status: 'Paid' },
    { id: 'INV-002', date: 'Dec 15, 2024', amount: '$79.00', status: 'Paid' },
    { id: 'INV-003', date: 'Nov 15, 2024', amount: '$79.00', status: 'Paid' },
  ]

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Billing & Payments</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Current Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Plan Type</p>
            <p className="text-2xl font-bold">Professional</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Billing Cycle</p>
            <p className="text-2xl font-bold">Monthly</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Monthly Cost</p>
            <p className="text-2xl font-bold">$79.00</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Next Renewal</p>
            <p className="text-2xl font-bold">Feb 15, 2025</p>
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <button className="btn-secondary">Change Plan</button>
          <button className="btn-outline">Cancel Subscription</button>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Payment Method</h2>
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 border border-primary/30">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium">Visa</span>
          </div>
          <p className="text-lg font-mono mb-8">•••• •••• •••• 4242</p>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Alex Johnson</span>
            <span>Expires 12/26</span>
          </div>
        </div>
        <button className="btn-outline">Update Payment Method</button>
      </div>

      <div className="card border-yellow-500/30 bg-yellow-500/5 space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-500 flex-shrink-0 mt-1 text-xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-yellow-100 mb-1">Payment Method Expiring</h3>
            <p className="text-sm text-yellow-200/80">Your Visa card expires in 2 months. Update it to avoid service interruption.</p>
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Invoice History</h2>
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition">
              <div>
                <p className="font-medium">{invoice.id}</p>
                <p className="text-sm text-muted-foreground">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">{invoice.amount}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                  {invoice.status}
                </span>
                <button className="p-2 hover:bg-border rounded-lg transition">
                  ⬇️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'API Calls Used', value: '1,247 / 10,000', percent: 12 },
          { label: 'Storage Used', value: '24 GB / 100 GB', percent: 24 },
        ].map((stat, idx) => (
          <div key={idx} className="card">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className="font-medium mb-3">{stat.value}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${stat.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
