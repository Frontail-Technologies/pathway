import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import type { CoachingProvider } from '../data/coaching'

 
export function CoachingLocationSection({ provider }: { provider: CoachingProvider }) {
  const cityLabel = provider.state ? `${provider.location}, ${provider.state}` : provider.location

  return (
    <section id="location" className="scroll-mt-section border-b py-8 lg:py-12">
      <DetailSectionHeader icon={MapPin} title="Location" />

      <div className="mt-4 overflow-hidden rounded-[10px] border bg-card">
        <div className="relative h-40 overflow-hidden bg-[color-mix(in_srgb,var(--secondary)_55%,var(--background))]">
          <svg className="absolute inset-0 size-full" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 H400" stroke="var(--border)" strokeWidth="2" />
            <path d="M0 110 H400" stroke="var(--border)" strokeWidth="2" />
            <path d="M90 0 V160" stroke="var(--border)" strokeWidth="2" />
            <path d="M260 0 V160" stroke="var(--border)" strokeWidth="2" />
            <path d="M0 0 L160 160" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M400 20 L220 160" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
          <span className="absolute top-3 left-3 rounded-md bg-card/90 px-2 py-1 text-[11px] font-semibold text-foreground shadow-sm">{cityLabel}</span>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-md">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="size-4" aria-hidden="true" />
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{cityLabel}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Exact address not available yet.</p>
          </div>
          <Button variant="outline" className="h-9 shrink-0 px-4 text-sm" disabled title="Map integration is coming soon">
            View on Maps
          </Button>
        </div>
      </div>
    </section>
  )
}
