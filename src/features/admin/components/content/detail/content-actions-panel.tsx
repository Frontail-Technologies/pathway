import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { Button } from '@/components/ui/button'
import { Edit3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ContentActionsPanel({ entry }: { entry: AdminContentEntry }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Link
          href={`/admin/content/${entry.id}/edit`}
          className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Article Content</span>
        </Link>

        <Link
          href="/admin/content"
          className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Content List</span>
        </Link>
      </div>

      <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground leading-relaxed">
        Editorial changes take effect immediately across admin previews.
      </div>
    </div>
  )
}
