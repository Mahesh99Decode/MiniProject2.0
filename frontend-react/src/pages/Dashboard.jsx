import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ChatbotWidget from '@/components/ui/ChatbotWidget'
import {
  Sprout, Droplets, Wind, Compass, CloudRain, Sun,
  AlertTriangle, ArrowUpRight, ArrowDownRight, CheckCircle2,
  Calendar, MapPin, Sparkles, Activity, FileText, Camera, ShieldCheck
} from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [activePlot, setActivePlot] = useState('A')
  const [weatherData, setWeatherData] = useState(null)
  const [soilData, setSoilData] = useState(null)
  const [loading, setLoading] = useState(true)

  const farmerName = profile?.name || user?.displayName || 'Rajesh Patil'

  useEffect(() => {
    async function loadData() {
      try {
        const lat = 19.9975
        const lon = 73.7898
        const [w, s] = await Promise.allSettled([
          api.getWeather(lat, lon),
          api.getSoil(lat, lon, 'Nashik')
        ])

        if (w.status === 'fulfilled' && w.value?.success) {
          setWeatherData(w.value)
        }
        if (s.status === 'fulfilled' && s.value) {
          setSoilData(s.value)
        }
      } catch (err) {
        console.error('Failed to load telemetry:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const plots = {
    A: {
      name: 'Kalyansona Golden Wheat • Sector 2A',
      sown: '15 Nov 2025',
      harvest: '20 Mar 2026',
      canopy: '91%',
      chlorophyll: '46.2',
      weed: '< 2%',
      img: '/assets/images/crop-sample-1.jpg',
      status: 'Optimal Health'
    },
    B: {
      name: 'Pusa Bold Yellow Mustard • Sector 1B',
      sown: '28 Oct 2025',
      harvest: '15 Feb 2026',
      canopy: '84%',
      chlorophyll: '42.8',
      weed: '< 4%',
      img: '/assets/images/crop-sample-2.jpg',
      status: 'Flowering Stage'
    },
    C: {
      name: 'Desi Chana Chickpeas • Sector 3C',
      sown: '05 Dec 2025',
      harvest: '05 Apr 2026',
      canopy: '78%',
      chlorophyll: '39.5',
      weed: '< 1%',
      img: '/assets/images/crop-sample-1.jpg',
      status: 'Pod Development'
    }
  }

  const currentPlot = plots[activePlot]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ── TOP HERO STATUS RIBBON ── */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]" />
        
        <div className="space-y-2 pl-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)]">
              Good Morning, {farmerName} 👋
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-soft)] text-[var(--color-primary)] font-medium border border-[rgba(22,101,52,0.15)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              Green Valley Plot #1 • Nashik, Maharashtra
            </span>
            <Badge variant="success" className="gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Krishi-AI Sentinel: Active
            </Badge>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              Today: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/recommendation">
            <Button variant="default">
              <Sprout className="w-4 h-4" /> New Crop Plan
            </Button>
          </Link>
          <Link to="/monitoring">
            <Button variant="secondary">
              <Camera className="w-4 h-4" /> Crop Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 4 KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Farm Health Index</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center font-bold">
              🌿
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-text-primary)]">94%</span>
            <Badge variant="success">↗ +3.8%</Badge>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Optimal crop vigor across all 3 active zones</p>
          <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--color-primary)] h-full rounded-full" style={{ width: '94%' }} />
          </div>
        </Card>

        {/* KPI 2 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Current Crop Cycle</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              🌾
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)] truncate">Wheat (HD-2967)</span>
            <Badge variant="outline">Day 48/120</Badge>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Vegetative stage • 22 days to flowering</p>
          <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-600 h-full rounded-full" style={{ width: '40%' }} />
          </div>
        </Card>

        {/* KPI 3 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Soil Quality Score</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              🧪
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-text-primary)]">
              {soilData?.pH ? `${Math.round(95 - Math.abs(soilData.pH - 7) * 8)}%` : '88%'}
            </span>
            <Badge variant="success">pH {soilData?.pH ? soilData.pH.toFixed(1) : '6.8'} (Optimal)</Badge>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Nitrogen adequate • Potassium rich</p>
          <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: '88%' }} />
          </div>
        </Card>

        {/* KPI 4 */}
        <Card className="flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Moisture & Irrigation</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              💧
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-text-primary)]">
              {weatherData?.humidity ? `${weatherData.humidity}%` : '64%'}
            </span>
            <Badge variant="info">Hydrated</Badge>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">Next drip cycle: 06:00 AM Tomorrow</p>
          <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '64%' }} />
          </div>
        </Card>
      </div>

      {/* ── SPLIT SECTION: WEATHER & SOIL INTELLIGENCE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Integrated Weather & Climate Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" /> Agro-Climate Live Sentinel
                </CardTitle>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Live readings for {weatherData?.location || 'Nashik, Maharashtra'} • Real-time telemetry
                </p>
              </div>
              <Badge variant="success">✅ Optimal for Spraying</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mb-6">
              <div className="sm:col-span-5 flex items-center gap-4 bg-[var(--color-surface-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                <div className="text-4xl">☀️</div>
                <div>
                  <div className="text-3xl font-extrabold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                    {weatherData?.temperature ? Math.round(weatherData.temperature) : 28}°C
                  </div>
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    {weatherData?.description || 'Clear Sky & Warm Sunlight'}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-7 grid grid-cols-2 gap-3">
                <div className="bg-[var(--color-surface-soft)] p-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Humidity</span>
                    <span className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                      {weatherData?.humidity ? `${weatherData.humidity}%` : '62%'}
                    </span>
                  </div>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
                  <Wind className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Wind Speed</span>
                    <span className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                      {weatherData?.windSpeed ? `${weatherData.windSpeed} km/h` : '9 km/h'}
                    </span>
                  </div>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
                  <Compass className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Pressure</span>
                    <span className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                      {weatherData?.pressure ? `${weatherData.pressure} hPa` : '1012 hPa'}
                    </span>
                  </div>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
                  <CloudRain className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Rain Risk</span>
                    <span className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                      {weatherData?.rainfall || 0} mm (Low)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Agro Advisory Banner */}
            <div className="p-3.5 bg-[var(--color-surface-soft)] border-l-4 border-[var(--color-primary)] rounded-r-xl text-xs flex items-start gap-3">
              <span className="text-base flex-shrink-0">🌾</span>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                <strong className="text-[var(--color-primary)] font-bold">AI Agro-Advisory:</strong> Gentle breeze and optimal temperature present an excellent window for foliar fertilizer application before 11:30 AM today.
              </p>
            </div>
          </Card>

          {/* Active Plots & Crop Diagnostics using Radix Tabs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[var(--color-primary)]" /> Field Diagnostics & Active Plots
                </CardTitle>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Select farm sector to inspect current vegetative metrics
                </p>
              </div>
              <Link to="/monitoring" className="text-xs text-[var(--color-primary)] hover:underline font-semibold flex items-center gap-1">
                Vision Scanner →
              </Link>
            </div>

            <Tabs value={activePlot} onValueChange={setActivePlot} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="A">Plot A: Wheat HD-2967</TabsTrigger>
                <TabsTrigger value="B">Plot B: Mustard Pusa</TabsTrigger>
                <TabsTrigger value="C">Plot C: Chana JG-11</TabsTrigger>
              </TabsList>

              <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-[var(--color-border)]">
                <img
                  src={currentPlot.img}
                  alt={currentPlot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <h4 className="font-bold text-sm mb-1">{currentPlot.name}</h4>
                  <div className="flex flex-wrap gap-3 text-xs text-emerald-200">
                    <span>🌱 Sown: {currentPlot.sown}</span>
                    <span>⏳ Harvest: {currentPlot.harvest}</span>
                    <span>🛡️ Status: {currentPlot.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center mb-2">
                <div className="p-3 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border)]">
                  <div className="text-lg font-bold font-[var(--font-mono)] text-[var(--color-primary)]">{currentPlot.canopy}</div>
                  <div className="text-[10px] font-semibold uppercase text-[var(--color-text-muted)] tracking-wider">Canopy Cover</div>
                </div>
                <div className="p-3 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border)]">
                  <div className="text-lg font-bold font-[var(--font-mono)] text-[var(--color-primary)]">{currentPlot.chlorophyll}</div>
                  <div className="text-[10px] font-semibold uppercase text-[var(--color-text-muted)] tracking-wider">Chlorophyll (SPAD)</div>
                </div>
                <div className="p-3 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border)]">
                  <div className="text-lg font-bold font-[var(--font-mono)] text-[var(--color-primary)]">{currentPlot.weed}</div>
                  <div className="text-[10px] font-semibold uppercase text-[var(--color-text-muted)] tracking-wider">Weed Index</div>
                </div>
              </div>
            </Tabs>
          </Card>
        </div>

        {/* Right Stack (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Soil Intelligence Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" /> Soil Telemetry & NPK Status
              </CardTitle>
              <Badge variant="secondary">AI Verified</Badge>
            </div>

            <div className="p-4 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border)] flex items-center justify-between mb-5">
              <div>
                <span className="text-xs text-[var(--color-text-muted)] block">Composite Soil Health</span>
                <span className="text-2xl font-extrabold font-[var(--font-mono)] text-[var(--color-primary)]">
                  {soilData?.pH ? `${Math.round(95 - Math.abs(soilData.pH - 7) * 8)}%` : '88%'}
                </span>
                <p className="text-[11px] text-emerald-700 font-medium">Class A Agricultural Soil</p>
              </div>
              <div className="text-right text-xs space-y-1">
                <div><span className="text-[var(--color-text-muted)]">pH Level: </span><strong className="text-[var(--color-text-primary)]">{soilData?.pH ? soilData.pH.toFixed(1) : '6.8'}</strong></div>
                <div><span className="text-[var(--color-text-muted)]">Organic Carbon: </span><strong className="text-[var(--color-text-primary)]">0.74%</strong></div>
                <div><span className="text-[var(--color-text-muted)]">EC: </span><strong className="text-[var(--color-text-primary)]">0.42 dS/m</strong></div>
              </div>
            </div>

            {/* N-P-K Macro Nutrient Meters */}
            <div className="space-y-3.5 mb-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Nitrogen (N)</span>
                  <span className="font-mono text-[var(--color-text-muted)]">{soilData?.Nitrogen ? `${Math.round(soilData.Nitrogen)} kg/ha` : '142 kg/ha • Adequate'}</span>
                </div>
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Phosphorus (P)</span>
                  <span className="font-mono text-[var(--color-text-muted)]">{soilData?.Phosphorus ? `${Math.round(soilData.Phosphorus)} kg/ha` : '48 kg/ha • Optimal'}</span>
                </div>
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Potassium (K)</span>
                  <span className="font-mono text-[var(--color-text-muted)]">{soilData?.Potassium ? `${Math.round(soilData.Potassium)} kg/ha` : '198 kg/ha • High'}</span>
                </div>
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>

            <Link to="/recommendation">
              <Button variant="secondary" className="w-full text-xs">
                View Full Soil Health Card & Advisory →
              </Button>
            </Link>
          </Card>

          {/* Quick AI Action Hub */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Farm AI Action Hub
              </CardTitle>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/recommendation" className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:border-[var(--color-primary)] hover:shadow-xs transition-all flex flex-col justify-between">
                <div className="text-xl mb-1">🌱</div>
                <div>
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">Crop Matcher</h5>
                  <p className="text-[11px] text-[var(--color-text-muted)]">Soil-climate matching</p>
                </div>
              </Link>

              <Link to="/monitoring" className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:border-[var(--color-primary)] hover:shadow-xs transition-all flex flex-col justify-between">
                <div className="text-xl mb-1">📷</div>
                <div>
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">Crop Doctor</h5>
                  <p className="text-[11px] text-[var(--color-text-muted)]">Leaf disease scan</p>
                </div>
              </Link>

              <Link to="/simulation" className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:border-[var(--color-primary)] hover:shadow-xs transition-all flex flex-col justify-between">
                <div className="text-xl mb-1">🧠</div>
                <div>
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">Yield Predictor</h5>
                  <p className="text-[11px] text-[var(--color-text-muted)]">ML harvest tonnage</p>
                </div>
              </Link>

              <Link to="/schemes" className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:border-[var(--color-primary)] hover:shadow-xs transition-all flex flex-col justify-between">
                <div className="text-xl mb-1">🏛️</div>
                <div>
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">Govt Subsidies</h5>
                  <p className="text-[11px] text-[var(--color-text-muted)]">PM-KISAN eligibility</p>
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ── BOTTOM SPLIT: MANDI PRICES & RECENT ALERTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mandi Commodity Rates */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-lg">
                📈 Live APMC Mandi Rates
              </CardTitle>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Nashik Yard • Updated 1 hour ago</p>
            </div>
            <Badge variant="outline">Verified</Badge>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <h5 className="text-sm font-bold text-[var(--color-text-primary)]">Wheat (Gehun)</h5>
                  <p className="text-xs text-[var(--color-text-muted)]">Sharbati / Lokwan Variety</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                  ₹2,420 <span className="text-xs font-normal text-[var(--color-text-muted)]">/ Qtl</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +₹45 (1.9%)
                </span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌼</span>
                <div>
                  <h5 className="text-sm font-bold text-[var(--color-text-primary)]">Mustard (Sarson)</h5>
                  <p className="text-xs text-[var(--color-text-muted)]">Black Mustard Grade A</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                  ₹5,680 <span className="text-xs font-normal text-[var(--color-text-muted)]">/ Qtl</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +₹120 (2.1%)
                </span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌰</span>
                <div>
                  <h5 className="text-sm font-bold text-[var(--color-text-primary)]">Chickpea (Chana)</h5>
                  <p className="text-xs text-[var(--color-text-muted)]">Desi Chana Medium Seed</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                  ₹5,890 <span className="text-xs font-normal text-[var(--color-text-muted)]">/ Qtl</span>
                </div>
                <span className="text-[11px] font-semibold text-rose-600 flex items-center justify-end">
                  <ArrowDownRight className="w-3.5 h-3.5" /> -₹15 (0.3%)
                </span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🫘</span>
                <div>
                  <h5 className="text-sm font-bold text-[var(--color-text-primary)]">Soybean</h5>
                  <p className="text-xs text-[var(--color-text-muted)]">Yellow Soybean JS-335</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-[var(--font-mono)] text-[var(--color-text-primary)]">
                  ₹4,750 <span className="text-xs font-normal text-[var(--color-text-muted)]">/ Qtl</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +₹80 (1.7%)
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-Time Smart Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Active Farm Alerts
              </CardTitle>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Automated surveillance stream</p>
            </div>
            <Link to="/alerts" className="text-xs text-[var(--color-primary)] hover:underline font-semibold">
              View All (7) →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/70 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div>
                <h5 className="text-xs font-bold text-red-900">Pre-Monsoon Rain Forecast</h5>
                <p className="text-xs text-red-800 leading-relaxed mt-0.5">
                  Scattered showers likely in 48 hours. Postpone loose grain drying and safeguard harvested stock.
                </p>
                <span className="text-[10px] text-red-600 font-medium mt-1 block">1 hr ago • Meteorological Radar</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🛡️</span>
              <div>
                <h5 className="text-xs font-bold text-amber-900">Aphid Sentinel Warning</h5>
                <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
                  Neighboring taluka reported mild rust incidence. Inspect lower wheat leaves during morning walk.
                </p>
                <span className="text-[10px] text-amber-600 font-medium mt-1 block">3 hrs ago • Pest Sentinel</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">✅</span>
              <div>
                <h5 className="text-xs font-bold text-emerald-900">Drip Irrigation Cycle Completed</h5>
                <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
                  Plot A moisture level restored to 64%. System saved ~2,400L of water using smart scheduling.
                </p>
                <span className="text-[10px] text-emerald-600 font-medium mt-1 block">Today, 06:45 AM • Smart Drip</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Chatbot Assistant */}
      <ChatbotWidget />
    </div>
  )
}
