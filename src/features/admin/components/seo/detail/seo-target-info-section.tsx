import Link from 'next/link'
import { Target, Globe, FileCode2, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoTargetInfoSection({ record }: { record: AdminSeoRecord }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Target Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
            <span className="text-muted-foreground block">Target Type</span>
            <div className="flex items-center gap-1.5 pt-0.5">
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-800">
                {record.targetTypeMeta.label}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground pt-1">
              {record.targetTypeMeta.description}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
            <span className="text-muted-foreground block">Public Route Path</span>
            <div className="flex items-center gap-1.5 pt-0.5">
              <code className="text-xs bg-card px-2 py-0.5 rounded border border-border font-mono text-foreground">
                {record.targetRoutePath}
              </code>
            </div>
            <p className="text-[11px] text-muted-foreground pt-1">
              {record.targetType === 'static_page' ? 'Static application route' : `Canonical entity identifier: ${record.targetId || 'N/A'}`}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/20 border border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {record.targetType === 'static_page' ? (
              <Globe className="w-4 h-4 text-muted-foreground" />
            ) : (
              <FileCode2 className="w-4 h-4 text-muted-foreground" />
            )}
            <div>
              <span className="text-xs font-semibold text-foreground block">
                {record.targetLabel}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {record.targetRoutePath}
              </span>
            </div>
          </div>
          <Link
            href={record.targetRoutePath}
            target="_blank"
            className="h-8 px-2.5 text-xs font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center justify-center text-muted-foreground"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1" />
            Visit
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
