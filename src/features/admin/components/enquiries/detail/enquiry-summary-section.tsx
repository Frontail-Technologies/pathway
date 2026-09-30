import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'

export function EnquirySummarySection({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Enquiry Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Enquiry Source</span>
          <span className="text-sm font-semibold text-foreground block">{enquiry.sourceLabel}</span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Subject / Query Type</span>
          <span className="text-sm font-semibold text-foreground block">
            {enquiry.subject || 'General Counselling Request'}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Target Educational Entity</span>
          <span className="text-sm font-semibold text-foreground block">
            {enquiry.targetName || 'General Guidance'}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Priority Level</span>
          <span className="text-sm font-semibold text-foreground block capitalize">
            {enquiry.priority || 'Standard'}
          </span>
        </div>
      </div>
    </div>
  )
}
