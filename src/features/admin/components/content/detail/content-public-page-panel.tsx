import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { Link2Off } from 'lucide-react'

export function ContentPublicPagePanel({ entry }: { entry: AdminContentEntry }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Public Discovery Surface
      </h3>

      <div className="rounded-lg p-3 bg-muted/40 border border-border/60 space-y-2">
        <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-xs">
          <Link2Off className="w-3.5 h-3.5 shrink-0" />
          <span>Public Page: Not Available</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          There is currently no implemented public editorial or article route for this platform. Editorial publishing lifecycle and public routing remain separate concerns.
        </p>
      </div>
    </div>
  )
}
