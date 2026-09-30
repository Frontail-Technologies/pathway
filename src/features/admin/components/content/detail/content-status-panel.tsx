import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { ContentStatusBadge } from '../shared/content-status-badge'
import { contentStatusMap } from '@/features/content/types/content'

export function ContentStatusPanel({ entry }: { entry: AdminContentEntry }) {
  const statusInfo = contentStatusMap[entry.status]

  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Publication State
        </h3>
        <ContentStatusBadge status={entry.status} />
      </div>

      <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
        <p className="leading-relaxed">
          {statusInfo?.description || 'Editorial state managed within the Pathway CMS.'}
        </p>
      </div>
    </div>
  )
}
