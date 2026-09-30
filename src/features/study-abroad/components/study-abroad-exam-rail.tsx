import { SectionHeader } from '@/components/shared/section-header'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { studyAbroadExams } from '../data/study-abroad'

 
export function StudyAbroadExamRail() {
  return (
    <div id="exams" className="scroll-mt-24">
      <SectionHeader title="Exams for Study Abroad" description="Commonly encountered exams." />
      <HorizontalContentRail ariaLabel="Exams for study abroad" edgeBleed className="mt-4" trackClassName="sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0">
        {studyAbroadExams.map((exam) => (
          <div key={exam.name} className="flex w-32 shrink-0 snap-start flex-col items-center rounded-[12px] border bg-card p-3.5 text-center shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:w-auto">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{exam.name.slice(0, 4)}</span>
            <p className="mt-2.5 text-sm font-bold text-foreground">{exam.name}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-primary">{exam.category}</p>
          </div>
        ))}
      </HorizontalContentRail>
    </div>
  )
}
