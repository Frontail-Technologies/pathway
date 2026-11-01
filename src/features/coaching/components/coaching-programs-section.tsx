import { BookOpen, ChevronRight } from 'lucide-react'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import type { CoachingProgram, CoachingProvider } from '../data/coaching'

 
export function CoachingProgramsSection({ provider }: { provider: CoachingProvider }) {
  if (!provider.programs?.length) return null

  return (
    <section id="programs" className="scroll-mt-section border-b py-8 lg:py-12">
      <DetailSectionHeader icon={BookOpen} title="Popular Courses" />

      <div className="mt-4 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {provider.programs.map((program) => (
          <ProgramCard key={program.name} program={program} />
        ))}
      </div>

      { }
      <HorizontalContentRail ariaLabel={`${provider.name} programs`} edgeBleed className="mt-4 sm:hidden">
        {provider.programs.map((program) => (
          <div key={program.name} className="w-[78vw] shrink-0 snap-start">
            <ProgramCard program={program} />
          </div>
        ))}
      </HorizontalContentRail>
    </section>
  )
}

function ProgramCard({ program }: { program: CoachingProgram }) {
  return (
    <div className="relative flex h-full flex-col rounded-[10px] border bg-card p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <BookOpen className="size-4.5" aria-hidden="true" />
        </span>
        <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
      </div>
      <p className="mt-3 text-[15px] font-bold text-foreground">{program.name}</p>
      {(program.mode || program.courseType) && (
        <p className="mt-0.5 text-xs font-medium text-primary">{[program.mode, program.courseType].filter(Boolean).join(' · ')}</p>
      )}
      <p className="mt-2 flex-1 text-xs leading-5 text-muted-foreground">{program.description}</p>
    </div>
  )
}
