import * as React from 'react'
import Link from 'next/link'
import type { AdminProgram } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft, BookOpen, ExternalLink, Edit } from 'lucide-react'
import {
  levelBadgeVariant,
  qualityBadgeStyles,
} from '@/features/admin/constants/programs'

export function ProgramDetailHeader({ program }: { program: AdminProgram }) {
  const qualityConfig = qualityBadgeStyles[program.qualityStatus]

  return (
    <div>
      <Link
        href="/admin/programs"
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
        })}
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        Back to Programs
      </Link>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-warning-surface text-warning flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {program.name}
              </h1>
              <Badge variant={levelBadgeVariant} size="sm">
                {program.level}
              </Badge>
              <Badge variant={qualityConfig.variant} size="sm">
                {qualityConfig.label}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>{program.degree}</span>
              <span>•</span>
              <span>{program.stream}</span>
              <span>•</span>
              <span>{program.duration}</span>
              <span>•</span>
              <span>{program.studyMode}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
          {program.hasDetailPage && (
            <Link
              href={`/course/${program.slug}`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'text-xs font-semibold bg-card shadow-xs inline-flex',
              })}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Public Page
            </Link>
          )}

          <Link
            href={`/admin/programs/${program.id}/edit`}
            className={buttonVariants({
              size: 'sm',
              className: 'text-xs font-semibold gap-1.5 shadow-xs inline-flex',
            })}
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Program
          </Link>
        </div>
      </div>
    </div>
  )
}
