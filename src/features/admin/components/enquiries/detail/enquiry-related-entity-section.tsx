import Link from 'next/link'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { ExternalLink, Building2, BookOpen, User, GraduationCap } from 'lucide-react'

export function EnquiryRelatedEntitySection({ enquiry }: { enquiry: AdminEnquiry }) {
  const getEntityIcon = (type?: string) => {
    switch (type) {
      case 'college':
        return <Building2 className="w-4 h-4 text-blue-600" />
      case 'course':
        return <BookOpen className="w-4 h-4 text-amber-600" />
      case 'tutor':
        return <User className="w-4 h-4 text-emerald-600" />
      case 'coaching':
        return <GraduationCap className="w-4 h-4 text-purple-600" />
      default:
        return null
    }
  }

  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-heading text-foreground">
          Target Institution / Entity
        </h2>
        {enquiry.targetAdminUrl && (
          <Link
            href={enquiry.targetAdminUrl}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View in Admin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border/60 space-y-2">
        <div className="flex items-center gap-2">
          {getEntityIcon(enquiry.entityType)}
          <span className="text-sm font-bold text-foreground">
            {enquiry.targetName || 'General Platform Counselling'}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          {enquiry.entityType ? (
            <div className="flex items-center gap-2 pt-1">
              <span className="capitalize font-medium text-foreground">
                Domain: {enquiry.entityType}
              </span>
              {enquiry.entityId && (
                <>
                  <span>•</span>
                  <span className="font-mono">Slug/ID: {enquiry.entityId}</span>
                </>
              )}
            </div>
          ) : (
            <p className="pt-1">
              This is a platform-wide general academic counselling request without a specific target institution.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
