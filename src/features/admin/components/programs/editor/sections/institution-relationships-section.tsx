import * as React from 'react'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminProgram } from '@/features/admin/types/programs'

export type InstitutionRelationshipsSectionProps = {
  offerings?: AdminProgram['offerings']
}

export function InstitutionRelationshipsSection({
  offerings,
}: InstitutionRelationshipsSectionProps) {
  const hasOfferings = offerings && offerings.length > 0

  return (
    <section id="relationships" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Institution Relationships
      </h2>

      {hasOfferings ? (
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground block">
            This canonical program is currently offered by {offerings.length} mapped {offerings.length === 1 ? 'institution' : 'institutions'}:
          </span>
          <div className="divide-y divide-border/60 -my-1">
            {offerings.map((off) => (
              <div key={off.slug} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <span className="font-semibold text-foreground truncate block">{off.name}</span>
                  <span className="text-[11px] text-muted-foreground block">{off.city}, {off.state}</span>
                </div>
                <Link
                  href={`/admin/institutions/${off.id}`}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'h-7 px-2 text-xs font-medium',
                  })}
                >
                  <Building2 className="w-3.5 h-3.5 mr-1 text-primary" />
                  View Institution
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground text-xs">
          <Building2 className="w-4 h-4 shrink-0 text-muted-foreground/70" />
          <p>
            No specific institution offerings mapped to this canonical record yet. Institution-specific fee schedules and seat matrices are managed separately.
          </p>
        </div>
      )}
    </section>
  )
}
