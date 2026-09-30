import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { Badge } from '@/components/ui/badge'

export function ContentMetadataPanel({ entry }: { entry: AdminContentEntry }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-3.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Article Metadata
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between py-1 border-b border-border/40">
          <span className="text-muted-foreground">Content ID</span>
          <span className="font-mono text-foreground font-semibold">#{entry.id}</span>
        </div>

        <div className="flex justify-between py-1 border-b border-border/40">
          <span className="text-muted-foreground">URL Slug</span>
          <span className="font-mono text-foreground">{entry.slug}</span>
        </div>

        <div className="flex justify-between py-1 border-b border-border/40">
          <span className="text-muted-foreground">Category</span>
          <span className="font-medium text-foreground">{entry.categoryLabel}</span>
        </div>

        {entry.authorName && (
          <div className="flex justify-between py-1 border-b border-border/40">
            <span className="text-muted-foreground">Author</span>
            <span className="font-medium text-foreground">{entry.authorName}</span>
          </div>
        )}

        <div className="flex justify-between py-1 border-b border-border/40">
          <span className="text-muted-foreground">Created</span>
          <span className="text-foreground">
            {entry.createdAt
              ? new Date(entry.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '—'}
          </span>
        </div>

        <div className="flex justify-between py-1 border-b border-border/40">
          <span className="text-muted-foreground">Published</span>
          <span className="text-foreground">
            {entry.publishedAt
              ? new Date(entry.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Not published'}
          </span>
        </div>

        {entry.tags && entry.tags.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-muted-foreground block">Tags</span>
            <div className="flex flex-wrap gap-1">
              {entry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 font-normal border-border/60 bg-muted/40"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
