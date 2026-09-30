import { AdminNote } from '@/features/admin/data/admin-notes'
import { formatDateTimeSafe } from '@/features/notes/types/note'
import { History } from 'lucide-react'

export function NoteHistorySection({ note }: { note: AdminNote }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-bold text-foreground">Provenance & History</h2>
      </div>

      <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-2 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Created:</span>
          <span className="font-mono text-foreground">
            {formatDateTimeSafe(note.createdAt)}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Last Updated:</span>
          <span className="font-mono text-foreground">
            {formatDateTimeSafe(note.updatedAt)}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Management Domain:</span>
          <span className="font-medium text-foreground">Educational Study Material</span>
        </div>
      </div>
    </div>
  )
}
