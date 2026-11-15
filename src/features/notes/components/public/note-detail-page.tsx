import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { KeyValueTable } from '@/components/shared/key-value-table'
import { LandingBody, LandingHeader, LandingSection } from '@/components/shared/landing'
import { Button } from '@/components/ui/button'
import { notePrice, type PublicNoteDetail } from '../../api/notes-api'
import { noteTypeMap } from '../../types/note'

export function NoteDetailPage({ note }: { note: PublicNoteDetail }) {
  const free = note.pricingType === 'free'
  const type = noteTypeMap[note.noteType]?.label ?? 'Notes'

  return (
    <>
      <LandingHeader
        trail={['Home', { label: 'Notes', href: '/notes' }, note.title]}
        title={note.title}
        description={note.shortDescription ?? undefined}
        aside={
          <div className="rounded-xl border bg-card p-4 sm:p-5">
            <p className="text-sm text-muted-foreground">{free ? 'Free to read' : 'One-time price'}</p>
            <p className="mt-1 font-heading text-3xl font-bold text-foreground">{notePrice(note)}</p>
            {note.previewUrl ? (
              <Button variant="cta" size="lg" className="mt-4 w-full gap-2 font-semibold" nativeButton={false} render={<a href={note.previewUrl} target="_blank" rel="noopener noreferrer" />}>
                Open preview
                <ExternalLink className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
            <p className="mt-3 text-[13px] leading-5 text-muted-foreground">{free ? 'Downloads open once your student library is live.' : 'Purchases open once payments are live.'}</p>
          </div>
        }
      />

      <LandingBody>
        {note.description ? (
          <LandingSection title="About these notes">
            <p className="text-[15px] leading-7 whitespace-pre-line text-muted-foreground">{note.description}</p>
          </LandingSection>
        ) : null}

        <LandingSection title="Details">
          <KeyValueTable
            rows={[
              { label: 'Type', value: type },
              { label: 'Subject', value: note.subject },
              { label: 'Study level', value: note.studyLevel },
              { label: 'Stream', value: note.stream },
              { label: 'Pages', value: note.pageCount ? String(note.pageCount) : null },
              { label: 'Author', value: note.authorName },
              { label: 'Provided by', value: note.providerName },
              { label: 'Price', value: notePrice(note) },
            ]}
          />
        </LandingSection>

        {note.exams.length || note.programs.length ? (
          <LandingSection title="Useful for">
            <div className="flex flex-wrap gap-2">
              {note.exams.map((exam) => (
                <Link key={exam.slug} href={`/exam/${exam.slug}`} className="rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-primary hover:underline">
                  {exam.label}
                </Link>
              ))}
              {note.programs.map((program) => (
                <Link key={program.slug} href={`/course/${program.slug}`} className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-foreground hover:underline">
                  {program.label}
                </Link>
              ))}
            </div>
          </LandingSection>
        ) : null}
      </LandingBody>
    </>
  )
}
