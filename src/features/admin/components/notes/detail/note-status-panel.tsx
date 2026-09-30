import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck } from 'lucide-react'

export function NoteStatusPanel({ note }: { note: AdminNote }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Publication Status
        </h3>
        <Badge variant={note.statusMeta.variant} className="text-xs font-semibold">
          {note.statusMeta.label}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {note.statusMeta.description}
      </p>

      <div className="pt-3 border-t border-border/60 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Scraper-Excluded Asset</span>
        </div>
        <p className="text-[11px] text-muted-foreground/80 pl-6">
          Educational study material is protected and excluded from automated crawler ingestion.
        </p>
      </div>
    </div>
  )
}
