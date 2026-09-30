import { Bot, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { SeoIndexingBadge } from '../shared/seo-indexing-badge'

export function SeoStatusPanel({ record }: { record: AdminSeoRecord }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Indexing Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Robots Directive</span>
          <SeoIndexingBadge
            robotsIndex={record.robotsIndex}
            robotsFollow={record.robotsFollow}
          />
        </div>

        <div className="pt-2 border-t border-border/60 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Search Indexing</span>
            <span className="font-medium text-foreground flex items-center gap-1">
              {record.robotsIndex === undefined ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                  Inherited (Allowed)
                </>
              ) : record.robotsIndex ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Allowed (Override)
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Excluded (noindex Override)
                </>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Link Crawling</span>
            <span className="font-medium text-foreground">
              {record.robotsFollow === undefined
                ? 'Inherited (Follow links)'
                : record.robotsFollow
                ? 'Follow links (Override)'
                : 'Nofollow (Override)'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
