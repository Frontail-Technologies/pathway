import type { ScholarshipDetailData } from '../api/scholarships-api'







 
export function ScholarshipAboutSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="overview" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">About this Scholarship</h2>
      <p className="mt-2.5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{scholarship.overviewCopy}</p>
    </section>
  )
}
