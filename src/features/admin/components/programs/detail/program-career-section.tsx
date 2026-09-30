import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Briefcase } from 'lucide-react'
import { type CourseDetailData } from '@/features/courses/data/course-detail'

export function ProgramCareerSection({
  careerMetrics,
  careers,
  careerAreas,
}: {
  careerMetrics?: CourseDetailData['careerMetrics']
  careers?: CourseDetailData['careers']
  careerAreas: string[]
}) {
  const hasCareerData = (careers && careers.length > 0) || careerAreas.length > 0
  if (!hasCareerData) return null

  return (
    <AdminSection title="Career Information & Outcomes">
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-warning-surface border border-warning/20 flex items-center gap-2.5 text-warning">
          <AlertCircle className="w-4 h-4 text-warning shrink-0" />
          <span className="text-xs font-medium">
            Career outcome metrics and salary range claims lack recorded external source • Requires source review
          </span>
        </div>

        {careerMetrics && careerMetrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {careerMetrics.map((cm) => (
              <div key={cm.label} className="p-3 rounded-lg bg-muted/40 space-y-1">
                <span className="text-[11px] text-muted-foreground font-medium block">{cm.label}</span>
                <span className="text-sm font-extrabold text-foreground block">{cm.value}</span>
              </div>
            ))}
          </div>
        )}

        {careers && careers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {careers.map((career) => (
              <div key={career.role} className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  <span>{career.role}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{career.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {careerAreas.map((area) => (
              <Badge key={area} variant="muted">
                {area}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </AdminSection>
  )
}
