import Link from 'next/link'
import { ArrowLeft, Edit2, Globe, FileCode2, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { SeoIndexingBadge } from '../shared/seo-indexing-badge'

export function SeoDetailHeader({ record }: { record: AdminSeoRecord }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/admin/seo"
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>SEO Metadata</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {record.targetLabel}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              {record.targetLabel}
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-800 border-slate-200"
            >
              {record.targetTypeMeta.label}
            </Badge>
            <SeoIndexingBadge
              robotsIndex={record.robotsIndex}
              robotsFollow={record.robotsFollow}
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {record.targetType === 'static_page' ? (
              <Globe className="w-3.5 h-3.5" />
            ) : (
              <FileCode2 className="w-3.5 h-3.5" />
            )}
            <span className="font-mono">{record.targetRoutePath}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={record.targetRoutePath}
            target="_blank"
            className="h-9 px-3 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center justify-center shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Public Page
          </Link>
          <Link
            href={`/admin/seo/${record.id}/edit`}
            className="h-9 px-3.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit Override
          </Link>
        </div>
      </div>
    </div>
  )
}
