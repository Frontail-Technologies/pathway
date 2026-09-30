import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Building, BookOpen, Banknote, Calendar } from 'lucide-react'

export function ScholarshipOverviewSection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <AdminSection title="Scholarship Overview">
      <div className="space-y-4">
        {scholarship.overviewCopy ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {scholarship.overviewCopy}
          </p>
        ) : (
          <div className="p-3.5 rounded-lg bg-muted/30 border border-dashed border-border/80 text-muted-foreground text-xs">
            Standard scheme narrative summary is not configured for this scholarship.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-semibold">
              <Building className="w-3.5 h-3.5 text-primary" />
              <span>Provider & Type</span>
            </div>
            <span className="font-bold text-foreground text-xs block truncate">
              {scholarship.provider}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              {scholarship.providerType}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>Study Level</span>
            </div>
            <span className="font-bold text-foreground text-xs block truncate">
              {scholarship.educationLevels.length > 0
                ? scholarship.educationLevels.join(', ')
                : 'All Levels'}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              {scholarship.streams.length > 0 ? scholarship.streams.join(', ') : 'All Streams'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-semibold">
              <Banknote className="w-3.5 h-3.5 text-primary" />
              <span>Financial Benefit</span>
            </div>
            <span className="font-bold text-foreground text-xs block truncate">
              {scholarship.benefitLabel || '—'}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              {scholarship.benefitType}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-semibold">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Application Window</span>
            </div>
            <span className="font-bold text-foreground text-xs block truncate">
              {scholarship.deadlineDisplay || 'Date Not Recorded'}
            </span>
            <span className="text-[10px] text-muted-foreground capitalize block">
              Status: {scholarship.applicationStatus.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
    </AdminSection>
  )
}
