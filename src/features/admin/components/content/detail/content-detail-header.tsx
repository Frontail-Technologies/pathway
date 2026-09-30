import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { ContentTypeBadge } from '../shared/content-type-badge'
import { ContentStatusBadge } from '../shared/content-status-badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit3, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

export function ContentDetailHeader({ entry }: { entry: AdminContentEntry }) {
  const date = entry.updatedAt || entry.publishedAt || entry.createdAt

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles & Content</span>
        </Link>
        <Link
          href={`/admin/content/${entry.id}/edit`}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Content</span>
        </Link>
      </div>

      <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <ContentTypeBadge type={entry.type} />
          <ContentStatusBadge status={entry.status} />
          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
            /{entry.slug}
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground tracking-tight">
            {entry.title}
          </h1>
          {entry.excerpt && (
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {entry.excerpt}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-border/50 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
          {entry.authorName && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span>Author: <strong className="text-foreground font-medium">{entry.authorName}</strong></span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground/70" />
            <span>
              Updated:{' '}
              <strong className="text-foreground font-medium">
                {date
                  ? new Date(date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-muted-foreground/70" />
            <span>Category: <strong className="text-foreground font-medium">{entry.categoryLabel}</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
