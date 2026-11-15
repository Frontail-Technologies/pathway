import { HomeSectionHeading } from './home-section-heading'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { listScholarships } from '@/features/scholarships/api/scholarships-api'
import { ScholarshipRailCard } from '@/features/scholarships/components/scholarship-rail-card'

export async function ScholarshipsClosingSection() {
  const scholarships = await listScholarships({ sort: 'closing-soon', status: 'open,closing-soon', limit: '8' })
    .then((list) => list.items)
    .catch(() => [])
  if (scholarships.length < 3) return null
  return (
    <section className="bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <HomeSectionHeading eyebrow="Scholarships" title="Scholarships closing soon" subtitle="Open now, sorted by deadline" href="/scholarships?status=open,closing-soon&sort=closing-soon" linkLabel="See all scholarships" />
        <HorizontalContentRail ariaLabel="Scholarships closing soon" edgeBleed showControls className="mt-5 sm:mx-0" trackClassName="sm:px-0 sm:scroll-px-0">
          {scholarships.map((scholarship) => (
            <ScholarshipRailCard key={scholarship.slug} scholarship={scholarship} />
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
