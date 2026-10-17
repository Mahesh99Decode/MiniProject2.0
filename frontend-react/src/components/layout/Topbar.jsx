import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, Bell, User, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const PAGE_TITLES = {
  '/dashboard':      'Farm Sentinel Dashboard',
  '/recommendation': 'Crop Recommendation Studio',
  '/monitoring':     'Vision Pathology & Crop Doctor',
  '/simulation':     'Yield & Profitability Simulator',
  '/schemes':        'Government Support Schemes',
  '/alerts':         'Smart Farm Alert Center',
  '/profile':        'Farmer Identification & Profile',
}

export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { user, profile } = useAuth()
  const [notificationOpen, setNotificationOpen] = useState(false)

  const title = PAGE_TITLES[pathname] ?? 'KrishiMitra AI'
  const name  = profile?.name ?? user?.displayName ?? 'Rajesh Patil'
  const photo = profile?.photoURL ?? user?.photoURL ?? null
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: mobile menu + breadcrumb title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--color-text-primary)] flex items-center gap-2">
            {title}
            <Badge variant="secondary" className="hidden md:inline-flex text-xs font-medium">
              v2.0 SaaS
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm font-normal text-[var(--color-text-muted)] hidden sm:block">
            KrishiMitra Enterprise Agritech System • Connected to APMC Yard
          </p>
        </div>
      </div>

      {/* Right: notifications dialog + Radix avatar */}
      <div className="flex items-center gap-3">
        <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DialogTrigger asChild>
            <button
              className="relative p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center tabular-nums">
                3
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                <Bell className="w-5 h-5 text-[var(--color-primary)]" />
                Live Farm Alerts
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                Urgent notifications triggered by meteorology radar & sensor nodes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-red-900">Pre-Monsoon Rain Forecast</span>
                  <Badge variant="destructive" className="text-xs">Critical</Badge>
                </div>
                <p className="text-red-800 leading-relaxed text-xs sm:text-sm font-normal">
                  24-35 mm rain expected in next 48 hrs. Postpone loose grain sun drying.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-amber-900">Yellow Rust Warning</span>
                  <Badge variant="warning" className="text-xs">Warning</Badge>
                </div>
                <p className="text-amber-800 leading-relaxed text-xs sm:text-sm font-normal">
                  Mild yellow rust spotted in neighboring taluka. Check bottom wheat leaves.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-emerald-900">Drip Cycle Finished</span>
                  <Badge variant="success" className="text-xs">Completed</Badge>
                </div>
                <p className="text-emerald-800 leading-relaxed text-xs sm:text-sm font-normal">
                  Plot A restored to 64% soil moisture. 2,400L water saved.
                </p>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/alerts"
                  onClick={() => setNotificationOpen(false)}
                  className="text-xs sm:text-sm text-[var(--color-primary)] font-semibold hover:underline"
                >
                  View All 7 Notifications in Alert Center →
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Link
          to="/profile"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-soft)] transition-colors"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={photo || undefined} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <span className="text-sm font-semibold text-[var(--color-text-primary)] block leading-tight">
              {name}
            </span>
            <span className="text-xs text-[var(--color-primary)] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Kisan Verified
            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}
