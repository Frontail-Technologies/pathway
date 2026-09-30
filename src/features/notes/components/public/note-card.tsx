import { Note, formatINRFromPaise, formatFileSize, noteTypeMap } from '@/features/notes/types/note'
import { Badge } from '@/components/ui/badge'
import { FileText, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function NoteCard({ note }: { note: Note }) {
  const typeMeta = noteTypeMap[note.noteType] || noteTypeMap.other
  const isFree = note.pricingType === 'free'

  return (
    <div className="group rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden">
      <div className="p-5 space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="outline" className="text-[11px] font-medium bg-muted/40">
            {typeMeta.label}
          </Badge>

          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              isFree
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'bg-primary/10 text-primary font-mono'
            }`}
          >
            {formatINRFromPaise(note.pricePaise)}
          </span>
        </div>

        <div className="space-y-1">
          <Link
            href={`/notes/${note.slug}`}
            className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 block leading-snug"
          >
            {note.title}
          </Link>
          {note.shortDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {note.shortDescription}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
          {note.subject && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-md">
              <BookOpen className="w-3 h-3 text-primary" />
              <span>{note.subject}</span>
            </span>
          )}
          {note.studyLevel && (
            <span className="text-[11px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-md capitalize">
              {note.studyLevel}
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>
            {note.downloadableAsset?.pageCount
              ? `${note.downloadableAsset.pageCount} Pages • PDF`
              : 'PDF Document'}
          </span>
        </div>

        <Link
          href={`/notes/${note.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Notes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
