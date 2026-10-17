import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Primitives'
import { Leaf, AlertCircle } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [district, setDistrict] = useState('Nashik')
  const [state, setState] = useState('Maharashtra')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(res.user, { displayName: name })
      const token = await res.user.getIdToken()
      try {
        await api.createUser(token)
        await api.updateProfile(email, { name, district, state })
      } catch {
        // Backend sync non-fatal
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[var(--color-bg)]">
      <div className="w-full max-w-md space-y-6 bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] shadow-xs">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-2">
            <Leaf className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)]">
            Create Farmer Account
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            Join thousands of farmers leveraging KrishiMitra AI
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs font-semibold text-[var(--color-text-secondary)]">
          <div>
            <label className="block mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Patil"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5">Email Address</label>
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
            <label className="block mb-1.5">Create Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1.5">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block mb-1.5">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full py-2.5 text-sm mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Registration →'}
          </Button>
        </form>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-primary)] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
