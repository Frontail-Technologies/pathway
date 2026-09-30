import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { UserCheck } from 'lucide-react'

export function EnquiryAssignmentPanel({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Lead Assignment
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground">Assigned To</span>
          <span className="font-semibold text-foreground">
            {enquiry.assignedTo || 'Unassigned'}
          </span>
        </div>

        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/60 text-[11px] text-muted-foreground">
          <UserCheck className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <span>
            Team member assignment and routing will be enabled once staff permissions are configured.
          </span>
        </div>
      </div>
    </div>
  )
}
