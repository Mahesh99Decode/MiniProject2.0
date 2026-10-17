import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui/Primitives'
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, CloudRain, Clock } from 'lucide-react'

export default function Alerts() {
  const [filter, setFilter] = useState('All')

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Pre-Monsoon Rain & Strong Winds Forecast',
      desc: 'Local meteorological radar projects 24-35 mm rain with gusty winds (up to 38 km/h) in Nashik district over the next 48 hours. Postpone loose grain sun-drying and safeguard open grain storage bags.',
      time: '1 hour ago',
      source: 'Agro-Meteorological Sentinel',
      status: 'Active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Yellow Rust Sentinel Warning',
      desc: 'Adjoining taluka reported mild yellow rust incidence in HD-2967 wheat fields. Closely inspect bottom canopy leaves during morning rounds for orange-yellow pustule clusters.',
      time: '3 hours ago',
      source: 'Pest Surveillance Network',
      status: 'Active'
    },
    {
      id: 3,
      type: 'info',
      title: 'Automated Drip Cycle Executed',
      desc: 'Sector 2A smart drip irrigation valve ran for 45 minutes from 06:00 AM to 06:45 AM. Soil moisture replenished to optimal 64%. Saved an estimated 2,400 liters of water.',
      time: 'Today, 06:45 AM',
      source: 'Irrigation Telemetry Hub',
      status: 'Resolved'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Mandatory Zinc Sulfate Booster Due',
      desc: 'Vegetative timeline indicates Day 52 for Plot A Wheat. Apply 0.5% Zinc Sulphate spray this weekend to maximize spikelet counts and prevent early yellowing.',
      time: 'Yesterday',
      source: 'Crop Health Scheduler',
      status: 'Pending'
    },
    {
      id: 5,
      type: 'info',
      title: 'APMC Market Spike: Mustard +₹120/Qtl',
      desc: 'Nashik APMC yard recorded sharp increase in demand for black mustard seed (Grade A). High spot price of ₹5,680/Qtl is expected to remain firm through this week.',
      time: 'Yesterday',
      source: 'Mandi Price Monitor',
      status: 'Info'
    }
  ]

  const filtered = alerts.filter(a => {
    if (filter === 'All') return true
    if (filter === 'Critical') return a.type === 'critical'
    if (filter === 'Warning') return a.type === 'warning'
    if (filter === 'Info') return a.type === 'info'
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[var(--color-primary)]" />
            Smart Farm Alerts & Radar
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Real-time advisory streams covering severe weather, pest surveillance, and market spikes
          </p>
        </div>
        <div className="flex gap-2">
          {['All', 'Critical', 'Warning', 'Info'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className={`p-5 flex items-start gap-4 transition-all ${
              item.type === 'critical'
                ? 'border-red-200 bg-red-50/40 hover:border-red-400'
                : item.type === 'warning'
                ? 'border-amber-200 bg-amber-50/40 hover:border-amber-400'
                : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {item.type === 'critical' && <ShieldAlert className="w-6 h-6 text-red-600" />}
              {item.type === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
              {item.type === 'info' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-[var(--font-display)]">
                  {item.title}
                </h4>
                <span className="text-[11px] text-[var(--color-text-muted)] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.time}
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {item.desc}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-0.5 rounded-md border border-[var(--color-border)]">
                  {item.source}
                </span>
                <Badge
                  variant={item.type === 'critical' ? 'error' : item.type === 'warning' ? 'warning' : 'success'}
                  className="text-[10px]"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
