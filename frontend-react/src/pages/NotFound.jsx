import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Primitives'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[var(--color-bg)]">
      <div className="text-6xl mb-4">🌾</div>
      <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)] mb-2">
        Page Not Found
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm mb-6">
        The requested agricultural module or link could not be located in your KrishiMitra workspace.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md">
          <Home className="w-4 h-4" /> Return to Farm Dashboard
        </Button>
      </Link>
    </div>
  )
}
