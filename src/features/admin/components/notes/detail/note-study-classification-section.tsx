import { AdminNote } from '@/features/admin/data/admin-notes'
import { formatStream, formatStudyLevel } from '@/features/notes/types/note'

export function NoteStudyClassificationSection({ note }: { note: AdminNote }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Academic Classification</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Subject
          </span>
          <p className="text-xs font-semibold text-foreground">{note.subject || 'Not specified'}</p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Study Level
          </span>
          <p className="text-xs font-semibold text-foreground">
            {formatStudyLevel(note.studyLevel)}
          </p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Stream / Field
          </span>
          <p className="text-xs font-semibold text-foreground">{formatStream(note.stream)}</p>
        </div>
      </div>

      {(note.authorName || note.providerName) && (
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1 text-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Provenance / Authorship
          </span>
          <p className="text-foreground font-medium">
            {note.authorName} {note.providerName ? `(${note.providerName})` : ''}
          </p>
        </div>
      )}
    </div>
  )
}
