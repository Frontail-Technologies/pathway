import Link from 'next/link'
import { Globe, FileCode2, Edit2, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { SeoIndexingBadge } from '../shared/seo-indexing-badge'

export function SeoMobileCard({ record }: { record: AdminSeoRecord }) {
  return (
    <Card className="shadow-none border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            {record.targetType === 'static_page' ? (
              <Globe className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            ) : (
              <FileCode2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            )}
            <div>
              <Link
                href={`/admin/seo/${record.id}`}
                className="text-xs font-semibold text-foreground hover:text-primary transition-colors block"
              >
                {record.targetLabel}
              </Link>
              <span className="text-[11px] font-mono text-muted-foreground block truncate">
                {record.targetRoutePath}
              </span>
            </div>
          </div>
          <SeoIndexingBadge
            robotsIndex={record.robotsIndex}
            robotsFollow={record.robotsFollow}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-foreground line-clamp-1">
              {record.effectiveTitle}
            </span>
            {record.resolvedMetadata.isOverrideTitle && (
              <Badge
                variant="outline"
                className="text-[9px] px-1 py-0 bg-blue-50 text-blue-700 border-blue-200 shrink-0 font-medium"
              >
                Override
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {record.effectiveDescription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
          <Badge
            variant="secondary"
            className="text-[10px] bg-slate-100 text-slate-800 border-slate-200"
          >
            {record.targetTypeMeta.label}
          </Badge>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/seo/${record.id}`}
              className="h-7 text-xs px-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center text-muted-foreground"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              View
            </Link>
            <Link
              href={`/admin/seo/${record.id}/edit`}
              className="h-7 text-xs px-2.5 font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1" />
              Edit
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
