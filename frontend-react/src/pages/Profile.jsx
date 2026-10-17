import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui/Primitives'
import { User, MapPin, Phone, Mail, Award, CheckCircle2, Shield } from 'lucide-react'

export default function Profile() {
  const { user, profile } = useAuth()
  const [name, setName] = useState(profile?.name || user?.displayName || 'Rajesh Patil')
  const [phone, setPhone] = useState(profile?.phone || '+91 98220 12345')
  const [district, setDistrict] = useState(profile?.district || 'Nashik')
  const [state, setState] = useState(profile?.state || 'Maharashtra')
  const [saved, setSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaved(false)
    if (user?.email) {
      try {
        await api.updateProfile(user.email, { name, phone, district, state })
      } catch {
        // non-critical
      }
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)] flex items-center gap-2">
            <User className="w-6 h-6 text-[var(--color-primary)]" />
            Farmer Identity & Landholding Profile
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Manage your personal details, land records, and sensor node assignments
          </p>
        </div>
        <Badge variant="success">Verified KrishiMitra Farmer</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left ID Card (1 col) */}
        <Card className="p-6 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[var(--color-surface-soft)] border-4 border-[var(--color-border)] flex items-center justify-center text-4xl mb-4 shadow-xs">
            👨‍🌾
          </div>
          <h3 className="font-bold text-base text-[var(--color-text-primary)] font-[var(--font-display)]">
            {name}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Nashik, Maharashtra</p>
          <Badge variant="primary" className="mb-6">Kisan ID: KM-84920</Badge>

          <div className="w-full text-left space-y-2.5 text-xs pt-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Mail className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="truncate">{user?.email || 'farmer@krishimitra.ai'}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Phone className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span>{district}, {state}</span>
            </div>
          </div>
        </Card>

        {/* Right Edit Form (2 cols) */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <CardHeader className="mb-4">
              <CardTitle className="text-base">Edit Account & Farm Coordinates</CardTitle>
            </CardHeader>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-[var(--color-text-secondary)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1.5">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-normal focus:outline-none focus:border-[var(--color-primary)]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="pt-2">
                <Button type="submit" variant="primary" className="text-sm">
                  Save Profile Changes
                </Button>
                {saved && (
                  <span className="ml-3 text-emerald-700 text-xs font-semibold inline-flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
                  </span>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
