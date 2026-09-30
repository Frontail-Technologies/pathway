import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { ContentTypeBadge } from '../shared/content-type-badge'
import { ContentStatusBadge } from '../shared/content-status-badge'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Calendar, FileText, Link2Off } from 'lucide-react'
import Link from 'next/link'

export function ContentMobileCard({ entry }: { entry: AdminContentEntry }) {
  const date = entry.updatedAt || entry.publishedAt || entry.createdAt

  return (
    <div className="bg-card rounded-xl p-4 border border-border/60 shadow-xs space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <Link
            href={`/admin/content/${entry.id}`}
            className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {entry.title}
          </Link>
          <p className="text-[11px] text-muted-foreground font-mono truncate">/{entry.slug}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <ContentTypeBadge type={entry.type} />
          <ContentStatusBadge status={entry.status} />
        </div>
      </div>

      {entry.excerpt && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {entry.excerpt}
        </p>
      )}

      <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground border-border/60">
            {entry.categoryLabel}
          </Badge>
          {entry.authorName && (
            <span className="text-[11px] text-muted-foreground">By {entry.authorName}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 font-medium">
          <Link2Off className="w-3 h-3 text-muted-foreground/60" />
          <span>Public Page: Not Available</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
        <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
          <Calendar className="w-3 h-3" />
          <span>
            {date
              ? new Date(date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '—'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/content/${entry.id}/edit`}
            className="inline-flex items-center h-7 px-2 text-xs font-medium rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Edit
          </Link>
          <Link
            href={`/admin/content/${entry.id}`}
            className="inline-flex items-center h-7 px-2 text-xs font-medium rounded text-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            Details
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
