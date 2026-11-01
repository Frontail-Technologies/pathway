import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CollegeDetailData } from '../data/college-detail'
import { collegeTabHref } from '../config/college-tabs'
import { CollegeOverviewSection } from './college-overview-section'
import { CollegePreviewCard } from './college-preview-card'
import { CollegeLegacyAnchorRedirect } from './college-legacy-anchor-redirect'

const PREVIEW_ROWS = 3

/**
 * /college/[slug]: the overview plus a short summary of every other tab, each
 * linking into its sub-page (Shiksha's summary-then-drill-down pattern).
 */
export function CollegeOverviewTab({ college }: { college: CollegeDetailData }) {
  const href = (segment: Parameters<typeof collegeTabHref>[1]) => collegeTabHref(college.slug, segment)

  return (
    <>
      <CollegeLegacyAnchorRedirect slug={college.slug} />
      <CollegeOverviewSection college={college} />

      <CollegePreviewCard title="Courses & Fees" href={href('courses')} linkLabel={`View all ${college.courses.length} courses`}>
        <ul className="divide-y rounded-[10px] border bg-card">
          {college.courses.slice(0, PREVIEW_ROWS).map((course) => (
            <li key={course.name} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{course.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {course.level} · {course.duration} · {course.exam}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-foreground">{course.fees}</p>
            </li>
          ))}
        </ul>
      </CollegePreviewCard>

      <CollegePreviewCard title="Admission" href={href('admission')} linkLabel="View admission process">
        <div className="flex flex-wrap gap-2">
          {[...new Set(college.admissions.map((block) => block.exam))].map((exam) => (
            <span key={exam} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
              {exam}
            </span>
          ))}
        </div>
        <ul className="mt-3 divide-y rounded-[10px] border bg-card">
          {college.importantDates.slice(0, PREVIEW_ROWS).map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="shrink-0 font-medium text-muted-foreground">{item.date}</span>
            </li>
          ))}
        </ul>
      </CollegePreviewCard>

      <CollegePreviewCard title="Placements" href={href('placement')} linkLabel="View placement details">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-[10px] border bg-card p-4 sm:grid-cols-4">
          {college.placementMetrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{metric.label}</dt>
              <dd className="mt-0.5 text-base font-semibold text-foreground">{metric.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">Self-reported by the institute; not independently verified.</p>
      </CollegePreviewCard>

      <CollegePreviewCard title="Facilities" href={href('facilities')} linkLabel="View all facilities">
        <div className="flex flex-wrap gap-2">
          {college.facilities.map((facility) => (
            <span key={facility} className="rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground sm:text-sm">
              {facility}
            </span>
          ))}
        </div>
      </CollegePreviewCard>

      {college.scholarships.length > 0 && (
        <CollegePreviewCard title="Scholarships" href={href('scholarships')} linkLabel={`View all ${college.scholarships.length} scholarships`}>
          <ul className="divide-y rounded-[10px] border bg-card">
            {college.scholarships.slice(0, 2).map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3">
                <p className="min-w-0 truncate text-sm font-semibold text-foreground">{item.name}</p>
                <p className="shrink-0 text-sm font-semibold text-foreground">{item.benefit}</p>
              </li>
            ))}
          </ul>
        </CollegePreviewCard>
      )}

      {college.faqs.length > 0 && (
        <CollegePreviewCard title="FAQs" href={href('faqs')} linkLabel={`View all ${college.faqs.length} FAQs`}>
          <Accordion multiple={false}>
            {college.faqs.slice(0, PREVIEW_ROWS).map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-sm font-semibold text-foreground sm:text-[15px]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CollegePreviewCard>
      )}
    </>
  )
}
