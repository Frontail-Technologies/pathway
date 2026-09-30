import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { History } from 'lucide-react'

export function ScholarshipHistorySection() {
  return (
    <AdminSection title="Change History & Audit Log">
      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground text-xs">
        <History className="w-4 h-4 shrink-0 text-muted-foreground/70" />
        <p>
          Audit logging will record scholarship scheme revisions, deadline updates, benefit circular modifications, and scraper diff approvals when live persistence is enabled.
        </p>
      </div>
    </AdminSection>
  )
}
