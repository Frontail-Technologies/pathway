import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react'

export function ScholarshipApplicationSection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <AdminSection title="Application Information & Workflow">
      <div className="space-y-4 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Official Application Deadline
            </span>
            <span className="text-sm font-bold text-foreground block">
              {scholarship.deadlineDisplay || 'Date Not Recorded'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {scholarship.officialApplyUrl ? (
              <Link
                href={scholarship.officialApplyUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'text-xs font-semibold h-7 px-2.5 bg-card',
                })}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1 text-primary" />
                Open Official Portal
              </Link>
            ) : (
              <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground border-0">
                Portal Link Not Configured
              </Badge>
            )}
          </div>
        </div>

        {scholarship.importantDates.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Scheduled Cycle Dates
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {scholarship.importantDates.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-muted/20 border border-border/60 space-y-0.5">
                  <span className="text-[10px] text-muted-foreground block">{item.label}</span>
                  <span className="font-bold text-foreground block text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {scholarship.applicationSteps.length > 0 ? (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Step-by-Step Application Procedure
            </span>
            <div className="space-y-2">
              {scholarship.applicationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-muted/20 border border-border/60 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-foreground leading-relaxed text-[11px] font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-lg bg-muted/30 border border-dashed border-border/80 text-muted-foreground text-xs">
            Step-by-step application workflow has not been detailed for this scholarship.
          </div>
        )}

        {scholarship.selectionProcess.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Selection & Review Stages
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {scholarship.selectionProcess.map((proc, idx) => (
                <React.Fragment key={idx}>
                  <Badge
                    variant="secondary"
                    className="text-[11px] font-semibold bg-muted px-2.5 py-1 text-foreground border-0"
                  >
                    {proc}
                  </Badge>
                  {idx < scholarship.selectionProcess.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminSection>
  )
}
