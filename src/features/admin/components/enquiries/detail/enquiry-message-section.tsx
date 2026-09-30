import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'

export function EnquiryMessageSection({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Message / Inquirer Notes
      </h2>

      <div className="p-4 rounded-lg bg-muted/20 border border-border/60 text-xs">
        {enquiry.message ? (
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {enquiry.message}
          </p>
        ) : (
          <p className="text-muted-foreground italic">
            No specific message text was included with this enquiry request.
          </p>
        )}
      </div>
    </div>
  )
}
