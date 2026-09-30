import { Target, Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoTargetPanel({ record }: { record: AdminSeoRecord }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Target</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <div>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider block">
            Target Page / Entity
          </span>
          <p className="text-xs font-semibold text-foreground pt-0.5">
            {record.targetLabel}
          </p>
        </div>

        <div className="pt-2 border-t border-border/60 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type</span>
            <Badge variant="secondary" className="text-[11px] bg-slate-100 text-slate-800">
              {record.targetTypeMeta.label}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Kind</span>
            <span className="font-medium text-foreground flex items-center gap-1">
              <Layers className="w-3 h-3 text-muted-foreground" />
              {record.targetTypeMeta.entityKind === 'static' ? 'Static Route' : 'Canonical Entity'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Canonical URL</span>
            <span className="font-mono text-[11px] text-foreground truncate max-w-[140px]">
              {record.effectiveCanonical}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
