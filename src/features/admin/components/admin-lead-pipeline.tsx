'use client'

import { getLeadPipelineStages } from '../data/admin-stats'

export function AdminLeadPipeline() {
  const stages = getLeadPipelineStages()

  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div className="space-y-3 pt-1">
        {stages.map((stage) => (
          <div key={stage.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">{stage.label}</span>
              <span className="text-muted-foreground tabular-nums font-medium">—</span>
            </div>
            <div className="h-1.5 w-full bg-muted/60 rounded-full" aria-hidden="true" />
          </div>
        ))}
      </div>

    </div>
  )
}
