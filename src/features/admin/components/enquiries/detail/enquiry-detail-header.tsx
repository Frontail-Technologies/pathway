import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { EnquirySourceBadge } from '../shared/enquiry-source-badge'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft, Calendar } from 'lucide-react'

export function EnquiryDetailHeader({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/enquiries"
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'text-xs text-muted-foreground hover:text-foreground gap-1.5 px-2.5',
          })}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Enquiries
        </Link>
      </div>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {enquiry.subject || `Enquiry #${enquiry.id}`}
              </h1>
              <LeadStatusBadge status={enquiry.status} />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <EnquirySourceBadge source={enquiry.source} />
              <span className="text-muted-foreground/50">•</span>
              <span className="font-mono">ID: {enquiry.id}</span>
              {enquiry.createdAt && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{enquiry.createdAt}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
