import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { FileText, Clock, AlignLeft } from 'lucide-react'

export function ContentBodyPreview({ entry }: { entry: AdminContentEntry }) {
  const bodyText = entry.body || ''
  const wordCount = bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0
  const charCount = bodyText.length
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Content Body & Text</h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <AlignLeft className="w-3.5 h-3.5" />
            {wordCount} words ({charCount} chars)
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            ~{readTimeMin} min read
          </span>
        </div>
      </div>

      {bodyText ? (
        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 font-sans leading-relaxed whitespace-pre-wrap rounded-lg bg-muted/20 p-4 border border-border/40 font-mono text-xs overflow-x-auto">
          {bodyText}
        </div>
      ) : (
        <div className="p-8 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
          No body text has been authored for this entry yet. Click &ldquo;Edit Content&rdquo; to add structured Markdown content.
        </div>
      )}
    </div>
  )
}
