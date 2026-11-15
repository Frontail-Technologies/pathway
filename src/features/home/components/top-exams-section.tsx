import { HomeSectionHeading } from './home-section-heading'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { listExams } from '@/features/exams/api/exams-api'
import { PopularExamTile } from '@/features/exams/components/exam-cards'

export async function TopExamsSection() {
  const exams = await listExams({ sort: 'popular', limit: '24' })
    .then((list) => list.items.filter((exam) => exam.popular).slice(0, 8))
    .catch(() => [])
  if (exams.length < 3) return null
  return (
    <section className="bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <HomeSectionHeading eyebrow="Entrance exams" title="Popular exams" subtitle="Official notices, dates and the colleges that accept them" href="/exams" linkLabel="See all exams" />
        <HorizontalContentRail ariaLabel="Popular exams" edgeBleed showControls className="mt-5 sm:mx-0" trackClassName="sm:px-0 sm:scroll-px-0">
          {exams.map((exam) => (
            <PopularExamTile key={exam.id} exam={exam} className="w-44 shrink-0 snap-start lg:w-[calc((100%-3.75rem)/6)]" />
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
