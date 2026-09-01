import type { ScholarshipDetailData } from '../data/scholarship-detail'

/**
 * "About this Scholarship" — deliberately just the explanatory paragraph.
 * Benefit/Deadline/Status/Level/Stream/Location already live in
 * `ScholarshipOpportunitySnapshot` near the top, so this section adds
 * context rather than repeating the same facts in a second grid (unlike
 * Course Detail's Overview, which pairs its copy with its own fact grid).
 */
export function ScholarshipAboutSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="overview" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">About this Scholarship</h2>
      <p className="mt-2.5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{scholarship.overviewCopy}</p>
    </section>
  )
}
