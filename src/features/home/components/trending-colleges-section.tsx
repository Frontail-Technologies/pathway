import { HomeSectionHeading } from './home-section-heading'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { SourceNote } from '@/components/shared/source-note'
import { listColleges } from '@/features/colleges/api/colleges-api'
import { CollegeCard } from '@/features/colleges/components/college-card'

export async function TrendingCollegesSection() {
  const colleges = await listColleges({ limit: '8', sort: 'ranking' })
    .then((list) => list.items)
    .catch(() => [])
  if (colleges.length < 3) return null
  const year = colleges.find((college) => college.ranking)?.ranking?.year
  return (
    <section className="bg-muted/60 py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <HomeSectionHeading eyebrow="Rankings" title="Top colleges in India" subtitle={year ? `Ranked by NIRF ${year}, with fees and median packages` : undefined} href="/colleges?sort=ranking" linkLabel="See all colleges" />
        <HorizontalContentRail ariaLabel="Top colleges in India" edgeBleed showControls className="mt-5 sm:mx-0" trackClassName="sm:px-0 sm:scroll-px-0">
          {colleges.map((college) => (
            <CollegeCard key={college.slug} college={college} variant="rail" />
          ))}
        </HorizontalContentRail>
        {year ? <SourceNote source="NIRF" year={year} href="https://www.nirfindia.org" className="mt-4" /> : null}
      </div>
    </section>
  )
}
