import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { leadStatusMap } from '../shared/enquiry-constants'
import { Info } from 'lucide-react'

export function EnquiryStatusPanel({ enquiry }: { enquiry: AdminEnquiry }) {
  const meta = leadStatusMap[enquiry.status]

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Lead Status
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Current Stage</span>
          <LeadStatusBadge status={enquiry.status} />
        </div>

        {meta?.description && (
          <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
            {meta.description}
          </p>
        )}

        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/30 border border-border/60 text-[11px] text-muted-foreground mt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Status updates require the Admin API.</span>
        </div>
      </div>
    </div>
  )
}
