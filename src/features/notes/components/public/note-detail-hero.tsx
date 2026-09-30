import { Note, formatINRFromPaise, noteTypeMap } from '@/features/notes/types/note'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export function NoteDetailHero({ note }: { note: Note }) {
  const typeMeta = noteTypeMap[note.noteType] || noteTypeMap.other
  const isFree = note.pricingType === 'free'

  return (
    <div className="bg-muted/30 border-b border-border/60 py-8 sm:py-10">
      <div className="container-shell max-w-6xl mx-auto space-y-4">
        <Link
          href="/notes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notes Directory</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs font-medium bg-card">
                {typeMeta.label}
              </Badge>
              {note.subject && (
                <Badge variant="secondary" className="text-xs font-medium">
                  {note.subject}
                </Badge>
              )}
              {note.studyLevel && (
                <Badge variant="secondary" className="text-xs font-medium capitalize">
                  {note.studyLevel}
                </Badge>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-bold font-heading text-foreground leading-tight">
              {note.title}
            </h1>

            {note.authorName && (
              <p className="text-xs text-muted-foreground">
                Authored by: <span className="text-foreground font-medium">{note.authorName}</span>
                {note.providerName && ` • ${note.providerName}`}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span
              className={`text-base sm:text-lg font-bold px-4 py-1.5 rounded-full ${
                isFree
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : 'bg-primary/10 text-primary font-mono'
              }`}
            >
              {formatINRFromPaise(note.pricePaise)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
