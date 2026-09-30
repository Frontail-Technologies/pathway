import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit, ExternalLink, Building2 } from 'lucide-react'
import type { AdminProgram } from '@/features/admin/types/programs'

export function ProgramActionsPanel({ program }: { program: AdminProgram }) {
  return (
    <AdminSection title="Admin Actions">
      <div className="space-y-2">
        <Link
          href={`/admin/programs/${program.id}/edit`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
          })}
        >
          <Edit className="w-3.5 h-3.5 mr-2 text-primary" />
          Edit Program Details
        </Link>

        {program.hasDetailPage ? (
          <Link
            href={`/course/${program.slug}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'w-full justify-start text-xs font-semibold bg-card inline-flex',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2 text-primary" />
            Open Public Page
          </Link>
        ) : null}

        <Button
          variant="outline"
          size="sm"
          disabled
          className="w-full justify-between text-xs font-medium text-muted-foreground/60 cursor-not-allowed bg-muted/30"
        >
          <span className="flex items-center">
            <Building2 className="w-3.5 h-3.5 mr-2 opacity-50" />
            Manage Institution Offerings
          </span>
          <span className="text-[10px] opacity-70">ADM-07 Soon</span>
        </Button>
      </div>
    </AdminSection>
  )
}
