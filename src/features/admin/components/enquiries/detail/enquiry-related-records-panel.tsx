import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink, UserCheck, Building } from 'lucide-react'

export function EnquiryRelatedRecordsPanel({ enquiry }: { enquiry: AdminEnquiry }) {
  const hasStudent = !!enquiry.studentId
  const hasTarget = !!enquiry.targetAdminUrl

  if (!hasStudent && !hasTarget) {
    return (
      <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Related Records
        </h3>
        <p className="text-xs text-muted-foreground">
          No linked platform records found for this enquiry.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Related Records
      </h3>

      <div className="space-y-2">
        {hasStudent && (
          <Link
            href={`/admin/students/${enquiry.studentId}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
            })}
          >
            <UserCheck className="w-3.5 h-3.5 text-purple-600" />
            <span className="truncate">Student: {enquiry.contactName}</span>
          </Link>
        )}

        {hasTarget && enquiry.targetAdminUrl && (
          <Link
            href={enquiry.targetAdminUrl}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold gap-2 shadow-2xs',
            })}
          >
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span className="truncate">Target: {enquiry.targetName}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
