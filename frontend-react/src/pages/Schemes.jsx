import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui/Primitives'
import { Building2, Search, ExternalLink, Filter, CheckCircle2 } from 'lucide-react'

export default function Schemes() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const schemes = [
    {
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'Financial Aid',
      benefit: '₹6,000 / year in 3 equal installments directly to bank account',
      eligibility: 'All landholding farmer families across India with cultivable land',
      deadline: 'Ongoing Enrollment',
      link: 'https://pmkisan.gov.in',
      tag: 'Direct Cash Transfer'
    },
    {
      title: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - Per Drop More Crop',
      category: 'Irrigation',
      benefit: 'Up to 55% subsidy for small/marginal farmers for Drip & Sprinkler systems',
      eligibility: 'All farmers having valid land ownership and an assured water source',
      deadline: 'Quarterly Application Windows',
      link: 'https://pmksy.gov.in',
      tag: 'Micro-Irrigation'
    },
    {
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Crop Insurance',
      benefit: 'Comprehensive risk coverage for non-preventable natural risks at 1.5% - 2% premium',
      eligibility: 'All farmers growing notified crops in notified areas including sharecroppers',
      deadline: 'Cut-off: 31 July (Kharif) / 31 Dec (Rabi)',
      link: 'https://pmfby.gov.in',
      tag: 'Risk Shield'
    },
    {
      title: 'PM-KUSUM (Solar Agricultural Pumps)',
      category: 'Irrigation',
      benefit: '60% subsidy for installation of stand-alone solar agricultural water pumps',
      eligibility: 'Individual farmers, water user associations, and farmer producer organizations',
      deadline: 'State Quota Based',
      link: 'https://pmkusum.mnre.gov.in',
      tag: 'Solar Energy'
    },
    {
      title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      category: 'Machinery',
      benefit: '40% - 50% financial subsidy on tractors, power tillers, rotavators, and laser levelers',
      eligibility: 'Farmers with land records registered on state agricultural portals',
      deadline: 'Annual Portal Re-opening',
      link: 'https://agrimachinery.nic.in',
      tag: 'Equipment'
    },
    {
      title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'Organic',
      benefit: '₹50,000 per hectare financial assistance for organic conversion and certification',
      eligibility: 'Farmer clusters formed with minimum 20 hectares total landholding',
      deadline: 'Cluster Scheme Ongoing',
      link: 'https://pgsindia-ncof.gov.in',
      tag: 'Organic Farming'
    }
  ]

  const filtered = schemes.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.benefit.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || s.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-[var(--font-display)] text-[var(--color-text-primary)] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[var(--color-primary)]" />
            Government Agricultural Schemes & Subsidies
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Verified central and state government schemes curated for direct farmer benefit
          </p>
        </div>
        <Badge variant="success">Ministry of Agriculture Verified</Badge>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes by name, keyword (e.g. solar, drip, insurance)..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-medium text-[var(--color-text-secondary)]"
          >
            <option value="All">All Categories</option>
            <option value="Financial Aid">Financial Aid</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Crop Insurance">Crop Insurance</option>
            <option value="Machinery">Machinery</option>
            <option value="Organic">Organic</option>
          </select>
        </div>
      </Card>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-5 hover:border-[var(--color-primary)] transition-all">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-surface-soft)] text-[var(--color-primary)] border border-[rgba(22,101,52,0.2)]">
                  {item.category}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] font-medium">
                  {item.tag}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-[var(--font-display)] mb-2.5 leading-snug">
                {item.title}
              </h4>

              <div className="space-y-2 text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)]">
                  <span className="font-bold text-[var(--color-primary)] block mb-0.5">Key Benefit:</span>
                  {item.benefit}
                </div>

                <div className="text-[11px] text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Eligibility: </span>
                  {item.eligibility}
                </div>

                <div className="text-[11px] text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Deadline: </span>
                  {item.deadline}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
