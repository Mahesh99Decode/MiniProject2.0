import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Primitives'
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const token = await res.user.getIdToken()
      try {
        await api.createUser(token)
      } catch {
        // Handshake error non-fatal
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const token = await res.user.getIdToken()
      try {
        await api.createUser(token)
      } catch {
        // Handshake error non-fatal
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Marketing Hero (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <span className="font-bold text-lg font-[var(--font-display)]">KrishiMitra AI</span>
        </div>

        <div className="max-w-md space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
            Precision Agritech SaaS
          </span>
          <h1 className="text-3xl font-extrabold font-[var(--font-display)] leading-tight">
            Empowering Indian Farmers with Real-Time Artificial Intelligence
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Monitor soil telemetry, diagnose crop diseases via computer vision, and optimize APMC market realization with predictive intelligence.
          </p>
        </div>

        <div className="text-xs text-emerald-200/60">
          © {new Date().getFullYear()} KrishiMitra AI Platforms. All rights reserved.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[var(--color-bg)]">
        <div className="w-full max-w-md space-y-6 bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)]">
              Farmer Login
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Access your personalized agricultural intelligence workspace
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4 text-xs font-semibold text-[var(--color-text-secondary)]">
            <div>
              <label className="block mb-1.5">Registered Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajesh.patil@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label>Password</label>
                <a href="#" className="text-[11px] text-[var(--color-primary)] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-2.5 text-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--color-surface)] px-2 text-[var(--color-text-muted)] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[var(--color-primary)] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
