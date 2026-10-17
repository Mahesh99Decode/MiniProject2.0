import { Link } from 'react-router-dom'
import { Button, Card, Badge } from '@/components/ui/Primitives'
import {
  Leaf, Sun, CloudRain, Sprout, Brain, TrendingUp,
  ScanSearch, Building2, ShieldCheck, ArrowRight, CheckCircle2,
  Users, Award, Smartphone
} from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base font-[var(--font-display)] text-[var(--color-text-primary)]">
              KrishiMitra AI
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold text-[var(--color-primary)] bg-[var(--color-surface-soft)] px-2 py-0.5 rounded-full border border-[rgba(22,101,52,0.15)]">
              Agritech SaaS 2.0
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
          <a href="#features" className="hover:text-[var(--color-primary)] transition-colors">Platform Features</a>
          <a href="#agents" className="hover:text-[var(--color-primary)] transition-colors">AI Sentinel System</a>
          <a href="#workflow" className="hover:text-[var(--color-primary)] transition-colors">How It Works</a>
          <Link to="/schemes" className="hover:text-[var(--color-primary)] transition-colors">Govt Schemes</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Get Started Free
            </Button>
          </Link>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="pt-16 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-soft)] border border-[rgba(22,101,52,0.15)] text-[var(--color-primary)] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
              Autonomous Multi-Agent Agriculture Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-[var(--font-display)] text-[var(--color-text-primary)] tracking-tight leading-[1.15]">
              Empowering Indian Farmers With Next-Gen <span className="text-[var(--color-primary)]">Agro-AI Co-Pilots</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              KrishiMitra combines real-time weather radar, soil sensor metrics, deep-learning plant vision pathology, and APMC market predictors to boost yields and farmer incomes.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/dashboard">
                <Button variant="primary" size="lg" className="px-6 text-sm">
                  Launch Live Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/monitoring">
                <Button variant="secondary" size="lg" className="px-6 text-sm">
                  Try Crop Doctor Scanner 📷
                </Button>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-[var(--color-border)] grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-primary)]">94.8%</div>
                <div className="text-xs text-[var(--color-text-muted)] font-medium">Vision Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-primary)]">4+</div>
                <div className="text-xs text-[var(--color-text-muted)] font-medium">Specialized AI Agents</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-primary)]">24/7</div>
                <div className="text-xs text-[var(--color-text-muted)] font-medium">Crop Sentinel Watch</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Preview */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
              <img
                src="/assets/images/ai-farming.png"
                alt="AI Farming Assistant"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS SECTION ── */}
      <section id="features" className="py-20 bg-[var(--color-surface)] border-y border-[var(--color-border)] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-surface-soft)] px-3 py-1 rounded-full border border-[rgba(22,101,52,0.15)]">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)]">
              Intelligent Farming Assistance Built for India
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Every tool is engineered with localized crop calendars, native language support, and real-time agricultural telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                🌦️
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Hyperlocal Agro-Weather
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Hourly microclimate telemetry with rain probabilities, humidity, and optimal foliar spray window alerts.
              </p>
            </Card>

            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                🌱
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Crop Recommendation Studio
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Predictive crop matching algorithms factoring in soil pH, NPK balance, water availability, and harvest profitability.
              </p>
            </Card>

            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                📷
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Computer Vision Pathology
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Snap or upload plant leaf photos to identify rust, blight, or pests instantly with dosage recommendations.
              </p>
            </Card>

            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                🧠
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Yield & Revenue Simulator
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                ML regression modeling to forecast quintal yields, irrigation water savings, and net profit margins per acre.
              </p>
            </Card>

            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                📈
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Live APMC Mandi Rates
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Direct spot pricing from local APMC yards in Nashik, Maharashtra for timely grain selling decisions.
              </p>
            </Card>

            <Card className="p-6 hover:border-[var(--color-primary)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] flex items-center justify-center text-2xl mb-4">
                🏛️
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2">
                Government Subsidies Portal
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Curated list of PM-KISAN, PMKSY drip irrigation, and PMFBY crop insurance benefits with direct application links.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--color-text-primary)] text-white/80 py-12 px-6 lg:px-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">KrishiMitra AI Platforms</span>
          </div>

          <p className="text-white/50 text-center md:text-left">
            Built for Indian Farmers • Modern Agritech SaaS Architecture
          </p>

          <div className="flex gap-4 text-white/70">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/schemes" className="hover:text-white">Schemes</Link>
            <Link to="/login" className="hover:text-white">Farmer Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
