import * as React from 'react'
import Link from 'next/link'
import type { AdminProgram } from '@/features/admin/types/programs'
import { EditorSection, EmptyNote } from '../../shared/section-kit'

export type InstitutionRelationshipsSectionProps = {
  offerings?: AdminProgram['offerings']
}

export function InstitutionRelationshipsSection({ offerings }: InstitutionRelationshipsSectionProps) {
  const list = offerings ?? []
  return (
    <EditorSection id="relationships" title="Institutions">
      {list.length > 0 ? (
        <ul className="divide-y divide-border">
          {list.map((off) => (
            <li key={off.slug} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <Link href={`/admin/institutions/${off.id}`} className="text-sm font-medium text-foreground hover:text-primary hover:underline">
                  {off.name}
                </Link>
                <p className="text-[13px] text-muted-foreground">
                  {off.city}, {off.state}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyNote>No institutions linked yet.</EmptyNote>
      )}
    </EditorSection>
  )
}
