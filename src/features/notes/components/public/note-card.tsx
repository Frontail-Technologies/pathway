import Image from 'next/image'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { notePrice, type PublicNote } from '../../api/notes-api'
import { noteTypeMap } from '../../types/note'

export function NoteCard({ note, className }: { note: PublicNote; className?: string }) {
  const free = note.pricingType === 'free'
  const meta = [note.subject, note.studyLevel, note.pageCount ? `${note.pageCount} pages` : ''].filter(Boolean).join(' · ')
  return (
    <article className={cn('group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50', className)}>
      <div className="relative flex aspect-[16/9] items-center justify-center bg-secondary">
        {note.coverImageUrl ? <Image src={note.coverImageUrl} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" /> : <FileText className="size-10 text-primary" aria-hidden="true" />}
        <span className={cn('absolute top-3 right-3 rounded-md px-2 py-0.5 text-xs font-semibold', free ? 'bg-card text-primary' : 'bg-cta text-white')}>{notePrice(note)}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[13px] font-medium text-primary">{noteTypeMap[note.noteType]?.label ?? 'Notes'}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">
          <Link href={`/notes/${note.slug}`} className="outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
            {note.title}
          </Link>
        </h3>
        {note.shortDescription ? <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{note.shortDescription}</p> : null}
        {meta ? <p className="mt-auto pt-3 text-[13px] text-muted-foreground">{meta}</p> : null}
      </div>
    </article>
  )
}
