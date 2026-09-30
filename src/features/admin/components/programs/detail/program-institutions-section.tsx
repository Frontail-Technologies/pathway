import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import type { AdminProgramInstitutionOffering } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Building2, GraduationCap, Banknote } from 'lucide-react'

export function ProgramInstitutionsSection({
  offerings,
}: {
  offerings: AdminProgramInstitutionOffering[]
}) {
  return (
    <AdminSection
      title="Institutions Offering This Program"
      badge={
        <Badge variant="muted" size="xs">
          {offerings.length} {offerings.length === 1 ? 'Offering' : 'Offerings'}
        </Badge>
      }
    >
      {offerings.length > 0 ? (
        <div className="divide-y divide-border/60 -my-2">
          {offerings.map((offering) => (
            <div key={offering.slug} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{offering.name}</span>
                  <Badge variant="muted" size="xs">
                    {offering.type}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {offering.city}, {offering.state} {offering.exam ? `• Exam: ${offering.exam}` : ''} {offering.fees ? `• Baseline Fee: ${offering.fees}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/admissions-fees?institution=${offering.id}`}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'h-7 px-2.5 text-xs font-medium',
                  })}
                >
                  <Banknote className="w-3.5 h-3.5 mr-1 text-success" />
                  Admissions & Fees
                </Link>
                <Link
                  href={`/admin/institutions/${offering.id}`}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'h-7 px-2.5 text-xs font-medium',
                  })}
                >
                  <Building2 className="w-3.5 h-3.5 mr-1 text-primary" />
                  Institution
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground text-xs">
          <GraduationCap className="w-4 h-4 shrink-0 text-muted-foreground/70" />
          <p>
            No specific institutions mapped to this canonical program yet. Relationships can be assigned via Institution Offerings in ADM-07.
          </p>
        </div>
      )}
    </AdminSection>
  )
}
