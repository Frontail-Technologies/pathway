import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { Clock } from 'lucide-react'

export function ProgramHistorySection() {
  return (
    <AdminSection title="Change History">
      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground">
        <Clock className="w-4 h-4 shrink-0 text-muted-foreground/70" />
        <p className="text-xs leading-relaxed">
          No audit log entries recorded for this academic program yet. Ingestion updates and curriculum revisions will be logged here.
        </p>
      </div>
    </AdminSection>
  )
}
