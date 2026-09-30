import * as React from 'react'
import Link from 'next/link'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { buttonVariants } from '@/components/ui/button'
import { Edit2, FilePlus, ExternalLink, Globe } from 'lucide-react'

export function ScholarshipActionsPanel({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Link
          href={`/admin/scholarships/${scholarship.id}/edit`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold h-8 bg-card',
          })}
        >
          <Edit2 className="w-3.5 h-3.5 mr-2 text-primary" />
          Edit Scholarship Scheme
        </Link>

        <Link
          href={`/admin/scholarships/${scholarship.id}/edit#documents`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold h-8 bg-card',
          })}
        >
          <FilePlus className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          Attach Notification / Circular
        </Link>

        {scholarship.officialApplyUrl && (
          <Link
            href={scholarship.officialApplyUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold h-8 bg-card',
            })}
          >
            <Globe className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            Official Portal Link
          </Link>
        )}

        {scholarship.hasDetailPage && (
          <Link
            href={`/scholarship/${scholarship.slug}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold h-8 bg-card',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            View Public Scheme Page
          </Link>
        )}
      </div>
    </div>
  )
}
