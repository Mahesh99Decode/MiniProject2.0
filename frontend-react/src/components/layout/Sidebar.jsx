import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard, Sprout, ScanSearch, TrendingUp,
  Building2, Bell, User, LogOut, Leaf
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard',      label: 'Dashboard',         icon: LayoutDashboard, section: 'Main' },
  { to: '/recommendation', label: 'Crop Advisory',      icon: Sprout,          section: 'Main' },
  { to: '/monitoring',     label: 'Disease Detection',  icon: ScanSearch,      section: 'Main' },
  { to: '/simulation',     label: 'Yield Predictor',    icon: TrendingUp,      section: 'Main' },
  { to: '/schemes',        label: 'Govt. Schemes',      icon: Building2,       section: 'Info' },
  { to: '/alerts',         label: 'Smart Alerts',       icon: Bell,            section: 'Info', badge: 3 },
  { to: '/profile',        label: 'Profile',            icon: User,            section: 'Account' },
]

const SECTIONS = ['Main', 'Info', 'Account']

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside
      className={[
        'fixed lg:sticky top-0 h-screen w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)]',
        'flex flex-col z-50 transition-transform duration-300 overflow-y-auto',
        'lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="w-9 h-9 bg-[var(--color-primary)] rounded-xl flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div className="overflow-hidden">
          <p className="font-semibold text-[var(--color-text-primary)] text-sm tracking-tight truncate">
            KrishiMitra AI
          </p>
          <p className="text-xs text-[var(--color-text-muted)] truncate">AI Farming System</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col flex-1 px-3 py-4 gap-0.5" aria-label="Dashboard navigation">
        {SECTIONS.map(section => {
          const items = NAV_ITEMS.filter(n => n.section === section)
          return (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] px-3 pt-4 pb-2">
                {section}
              </p>
              {items.map(({ to, label, icon: Icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) => [
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    'relative',
                    isActive
                      ? 'bg-[var(--color-surface-soft)] text-[var(--color-primary)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]',
                  ].join(' ')}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-[20%] bottom-[20%] w-0.5 bg-[var(--color-primary)] rounded-r-full" />
                      )}
                      <Icon className="w-[18px] h-[18px] flex-shrink-0" aria-hidden="true" />
                      <span className="flex-1 truncate leading-normal">{label}</span>
                      {badge && (
                        <span className="min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center tabular-nums">
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          )
        })}
      </nav>

      {/* AI Status + Logout */}
      <div className="px-3 pb-4 flex-shrink-0 flex flex-col gap-2">
        {/* AI Status */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-surface-soft)] border border-[rgba(22,101,52,0.12)] rounded-xl">
          <span
            className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse-ring flex-shrink-0"
            aria-label="Active"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-[var(--color-primary)] truncate">Krishi-AI Sentinel</p>
            <p className="text-xs text-[var(--color-text-muted)]">Active & Monitoring</p>
          </div>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600 transition-colors w-full cursor-pointer"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
