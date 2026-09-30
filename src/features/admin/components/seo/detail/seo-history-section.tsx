import { History, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoHistorySection({ record }: { record: AdminSeoRecord }) {
  const hasTimestamps = Boolean(record.createdAt || record.updatedAt)

  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Change History</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2">
        {hasTimestamps ? (
          <div className="space-y-2 text-xs">
            {record.createdAt && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border/60">
                <span className="text-muted-foreground">Created</span>
                <span className="font-mono text-foreground">{record.createdAt}</span>
              </div>
            )}
            {record.updatedAt && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border/60">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-mono text-foreground">{record.updatedAt}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center bg-muted/10 rounded-lg border border-dashed border-border/80 space-y-1.5">
            <Clock className="w-5 h-5 text-muted-foreground mx-auto" />
            <p className="text-xs font-medium text-foreground">No audit history recorded</p>
            <p className="text-[11px] text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Change history tracking and revision logs require the Admin Event API.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
