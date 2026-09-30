import * as React from 'react'
import Link from 'next/link'
import {
  type AdminProgramOffering,
} from '@/features/admin/data/admin-admissions-fees'
import { buttonVariants } from '@/components/ui/button'
import { Edit2, Building2, BookOpen, ExternalLink } from 'lucide-react'

export function AdmissionsFeesActionsPanel({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Link
          href={`/admin/admissions-fees/${offering.id}/edit`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold gap-2',
          })}
        >
          <Edit2 className="w-3.5 h-3.5 text-primary" />
          Edit Admissions & Fees
        </Link>

        <Link
          href={`/admin/institutions/${offering.institutionId}`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-medium gap-2',
          })}
        >
          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
          Institution Admin
        </Link>

        <Link
          href={`/admin/programs/${offering.programId}`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-medium gap-2',
          })}
        >
          <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
          Program Taxonomy Admin
        </Link>

        {offering.institutionSlug === 'iit-delhi' && (
          <Link
            href={`/college/${offering.institutionSlug}`}
            target="_blank"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'w-full justify-start text-xs font-medium text-muted-foreground hover:text-foreground gap-2',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            Public College Page
          </Link>
        )}

        {offering.programSlug === 'btech-computer-science' && (
          <Link
            href={`/course/${offering.programSlug}`}
            target="_blank"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'w-full justify-start text-xs font-medium text-muted-foreground hover:text-foreground gap-2',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            Public Course Detail
          </Link>
        )}
      </div>
    </div>
  )
}
