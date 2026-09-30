import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { Badge } from '@/components/ui/badge'

export function ProgramSourcePanel() {
  return (
    <AdminSection title="Data Source & Sync">
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Source Type</span>
          <span className="font-semibold text-foreground capitalize">
            Manual Catalog
          </span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Sync Status</span>
          <Badge variant="muted" size="xs">
            Manual
          </Badge>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Source Origin</span>
          <span className="text-muted-foreground font-medium">Internal Record</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Incoming Changes</span>
          <span className="text-muted-foreground">None</span>
        </div>
      </div>
    </AdminSection>
  )
}
