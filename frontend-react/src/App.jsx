import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

// Layouts
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'

// Pages
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Recommendation from '@/pages/Recommendation'
import Monitoring from '@/pages/Monitoring'
import Schemes from '@/pages/Schemes'
import Alerts from '@/pages/Alerts'
import Simulation from '@/pages/Simulation'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

// Route guard
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--color-text-muted)] text-sm font-medium">Loading KrishiMitra AI…</p>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected — inside AppLayout (sidebar + topbar) */}
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
