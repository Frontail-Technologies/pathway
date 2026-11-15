import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'

const points: { art: SpotArtName; title: string; text: string }[] = [
  { art: 'sources', title: 'Official sources', text: 'NIRF, JoSAA, NTA, NSP and AISHE' },
  { art: 'verified', title: 'Source on every number', text: 'See where each figure comes from' },
  { art: 'open', title: 'No paywalls or pop-ups', text: 'Read everything without signing up' },
  { art: 'updated', title: 'Updated regularly', text: 'New notices and ranks as they publish' },
]

export function TrustStrip() {
  return (
    <section aria-label="Why Pathway" className="border-y bg-card">
      <div className="container-shell grid grid-cols-1 gap-x-6 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="flex items-center gap-3">
            <SpotArt name={point.art} className="size-12" />
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
