import { AdminNote } from '@/features/admin/data/admin-notes'

export function NoteOverviewSection({ note }: { note: AdminNote }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Overview & Content</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Note Type
          </span>
          <p className="text-xs font-semibold text-foreground">{note.typeMeta.label}</p>
          <p className="text-[10px] text-muted-foreground">{note.typeMeta.description}</p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Public URL Slug
          </span>
          <p className="text-xs font-mono font-semibold text-primary">/notes/{note.slug}</p>
          <p className="text-[10px] text-muted-foreground">Unique canonical resource identifier.</p>
        </div>
      </div>

      {note.shortDescription && (
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Short Description / Excerpt
          </span>
          <p className="text-xs text-foreground leading-relaxed">{note.shortDescription}</p>
        </div>
      )}

      <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Full Description & Contents
        </span>
        {note.description ? (
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {note.description}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">No detailed description provided.</p>
        )}
      </div>
    </div>
  )
}
