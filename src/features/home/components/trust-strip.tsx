import { BadgeCheck, Ban, FileCheck2, RefreshCw } from 'lucide-react'

const points = [
  { icon: FileCheck2, title: 'Official sources', text: 'NIRF, JoSAA, NTA, NSP and AISHE' },
  { icon: BadgeCheck, title: 'Source on every number', text: 'See where each figure comes from' },
  { icon: Ban, title: 'No paywalls or pop-ups', text: 'Read everything without signing up' },
  { icon: RefreshCw, title: 'Updated regularly', text: 'New notices and ranks as they publish' },
]

export function TrustStrip() {
  return (
    <section aria-label="Why Pathway" className="border-y bg-card">
      <div className="container-shell grid grid-cols-1 gap-x-6 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="flex items-start gap-3">
            <point.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">{point.title}</p>
              <p className="text-[13px] text-muted-foreground">{point.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
