import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { UserCheck, ExternalLink } from 'lucide-react'

export function EnquiryContactSection({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-heading text-foreground">
          Student / Contact Details
        </h2>
        {enquiry.isRegisteredStudent && enquiry.studentId && (
          <Link
            href={`/admin/students/${enquiry.studentId}`}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View Student Account</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Contact Name</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">{enquiry.contactName}</span>
            {enquiry.isRegisteredStudent && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold">
                <UserCheck className="w-3 h-3" />
                Registered Student
              </span>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Email Address</span>
          <span className="text-sm font-semibold text-foreground block break-all">
            {enquiry.contactEmail || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Phone Number</span>
          <span className="text-sm font-semibold text-foreground block">
            {enquiry.contactPhone || <span className="text-muted-foreground font-normal">Not provided</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
          <span className="text-muted-foreground font-medium block">Contact Type</span>
          <span className="text-sm font-semibold text-foreground block">
            {enquiry.isRegisteredStudent ? 'Pathway Student Profile' : 'Guest Inquirer'}
          </span>
        </div>
      </div>
    </div>
  )
}
