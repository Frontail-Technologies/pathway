import { GraduationCap, ShieldCheck, Users } from 'lucide-react'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import type { CoachingProvider } from '../data/coaching'

const NOTE_ICONS = [Users, ShieldCheck, GraduationCap]

 
export function CoachingFacultySection({ provider }: { provider: CoachingProvider }) {
  if (!provider.facultyNotes?.length) return null

  return (
    <section id="faculty" className="scroll-mt-section border-b py-8 lg:py-12">
      <DetailSectionHeader icon={GraduationCap} title="Faculty & Learning Support" />

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {provider.facultyNotes.map((note, index) => {
          const Icon = NOTE_ICONS[index % NOTE_ICONS.length]
          return (
            <div key={note.title} className="flex h-full flex-col rounded-[10px] border bg-card p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">{note.title}</p>
              <p className="mt-1 flex-1 text-xs leading-5 text-muted-foreground">{note.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
