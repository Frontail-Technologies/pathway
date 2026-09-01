'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Bookmark, Building2, CalendarDays, GraduationCap, IndianRupee, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SponsoredBadge } from '@/components/shared'
import { getDaysRemaining, type ScholarshipListItem } from '../data/scholarships'

const statusStyles: Record<ScholarshipListItem['status'], { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-success-surface text-success' },
  'closing-soon': { label: 'Closing Soon', className: 'bg-warning-surface text-warning' },
  upcoming: { label: 'Upcoming', className: 'bg-secondary text-primary' },
  closed: { label: 'Closed', className: 'bg-muted text-muted-foreground' },
}

export function ScholarshipResultCard({ scholarship }: { scholarship: ScholarshipListItem }) {
  const [saved, setSaved] = useState(false)
  const status = statusStyles[scholarship.status]
  const daysRemaining = scholarship.status === 'closing-soon' ? getDaysRemaining(scholarship.deadline) : null

  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'Scholarship saved to your list.' : 'Scholarship removed from saved items.')
  }

  const summary = [scholarship.educationLevels[0], scholarship.streams[0] ?? 'All Streams', scholarship.states[0] ?? 'All India'].filter(Boolean).join(' · ')

  return (
    <article className="rounded-[10px] border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
            {scholarship.providerInitials}
          </div>
          <div className="min-w-0">
            {/* Name stays alone on its own line as the strongest card text — the
                featured badge lives on the provider line below so it never
                competes with the title (correction pass rule 4). */}
            <h3 className="text-base font-bold text-foreground">{scholarship.name}</h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
              <span className="flex items-center gap-1">
                <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                {scholarship.provider} · <span className="font-medium text-foreground">{scholarship.providerType}</span>
              </span>
              {scholarship.featured && <SponsoredBadge />}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={saved ? 'Remove from saved scholarships' : 'Save scholarship'}
          aria-pressed={saved}
          onClick={toggleSaved}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-2.5">
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{summary}</span>
      </div>

      {/* Compact 2-column grid on mobile (Benefit/Deadline, then Eligibility/Applicable),
          4-column single row on desktop — same data, density chosen per viewport rather
          than one grid squeezed to fit both. */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-3 sm:mt-4 sm:grid-cols-4 sm:pt-4">
        <DetailBlock icon={IndianRupee} label="Benefit" value={scholarship.benefitLabel} />
        <DetailBlock icon={CalendarDays} label="Application Deadline" value={scholarship.deadlineDisplay} helper={daysRemaining !== null ? `Closing in ${daysRemaining} days` : undefined} />
        <DetailBlock icon={GraduationCap} label="Key Eligibility" value={scholarship.shortEligibility.join(' · ')} />
        <DetailBlock icon={MapPin} label="Applicable" value={scholarship.states[0] ?? 'All India'} />
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t pt-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
        <div />
        <div className="grid grid-cols-2 gap-2 sm:flex">
          {/* Scholarship Detail (SCH-02) doesn't exist yet. Rendered as an unmistakably
              non-interactive, visually secondary affordance — outline (not solid Blue),
              disabled (pointer-events-none + not-allowed cursor + reduced opacity via the
              shared Button primitive) — never a button that reads as a working action.
              Swap back to the normal solid-Blue primary action once SCH-02 exists. */}
          <Button variant="outline" className="h-11 px-4 text-sm text-muted-foreground sm:h-10 sm:flex-none" disabled title="Scholarship detail page coming soon">
            View Details
          </Button>
          {scholarship.officialApplyUrl && (
            <Button
              variant="cta"
              className="h-11 px-4 text-sm sm:h-10 sm:flex-none"
              nativeButton={false}
              render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}
            >
              Official Apply
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

function DetailBlock({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof IndianRupee
  label: string
  value: string
  helper?: string
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-xs tracking-wide text-muted-foreground uppercase">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-balance text-foreground">{value}</p>
      {helper && <p className="mt-0.5 text-xs font-medium text-warning">{helper}</p>}
    </div>
  )
}
