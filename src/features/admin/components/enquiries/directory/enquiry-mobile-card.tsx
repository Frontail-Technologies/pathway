import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { EnquirySourceBadge } from '../shared/enquiry-source-badge'
import { buttonVariants } from '@/components/ui/button'
import { Eye, UserCheck } from 'lucide-react'

export function EnquiryMobileCard({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border/80 shadow-xs space-y-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <Link
            href={`/admin/enquiries/${enquiry.id}`}
            className="text-sm font-bold text-foreground hover:text-primary transition-colors block truncate"
          >
            {enquiry.subject || `Enquiry #${enquiry.id}`}
          </Link>
          <span className="text-[11px] text-muted-foreground font-mono">
            ID: {enquiry.id}
          </span>
        </div>
        <LeadStatusBadge status={enquiry.status} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <EnquirySourceBadge source={enquiry.source} />
        {enquiry.createdAt && (
          <span className="text-[11px] text-muted-foreground font-mono">
            {enquiry.createdAt}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/60">
        <div>
          <span className="text-[11px] text-muted-foreground block">Contact</span>
          <div className="flex items-center gap-1 font-semibold text-foreground truncate">
            <span>{enquiry.contactName}</span>
            {enquiry.isRegisteredStudent && (
              <UserCheck className="w-3 h-3 text-purple-600 shrink-0" />
            )}
          </div>
        </div>
        <div>
          <span className="text-[11px] text-muted-foreground block">Target</span>
          <span className="font-semibold text-foreground truncate block">
            {enquiry.targetName || 'General Guidance'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Link
          href={`/admin/enquiries/${enquiry.id}`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'flex-1 text-xs font-semibold gap-1.5',
          })}
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </Link>
      </div>
    </div>
  )
}
