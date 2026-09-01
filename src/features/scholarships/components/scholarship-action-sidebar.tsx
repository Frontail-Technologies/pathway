import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scholarshipStatusStyles } from '../data/scholarships'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

type ScholarshipActionSidebarProps = {
  scholarship: ScholarshipDetailData
  saved: boolean
  onToggleSaved: () => void
}

/**
 * "Application Summary" — deliberately titled and shaped around applying
 * (status/deadline/benefit/eligible level + apply/save), not Course Detail's
 * "Explore Colleges" discovery-sidebar pattern.
 */
export function ScholarshipActionSidebar({ scholarship, saved, onToggleSaved }: ScholarshipActionSidebarProps) {
  const status = scholarshipStatusStyles[scholarship.status]

  return (
    <div className="rounded-[10px] border bg-card p-4">
      <p className="text-[15px] font-semibold text-foreground">Application Summary</p>

      <div className="mt-3 flex flex-col gap-2.5 border-t pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Deadline</span>
          <span className="font-semibold text-foreground">{scholarship.deadlineDisplay}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Benefit</span>
          <span className="font-semibold text-foreground">{scholarship.benefitLabel}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Eligible Level</span>
          <span className="font-semibold text-foreground">{scholarship.educationLevels.join(' / ')}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t pt-4">
        {scholarship.officialApplyUrl && (
          <Button variant="cta" className="h-10 w-full text-sm font-semibold" nativeButton={false} render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}>
            Official Apply
          </Button>
        )}
        <Button variant="outline" className="h-10 w-full gap-1.5 text-sm font-semibold" onClick={onToggleSaved} aria-pressed={saved}>
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
          {saved ? 'Saved' : 'Save Scholarship'}
        </Button>
      </div>

      <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">Verify current criteria on the provider&apos;s official website before applying.</p>
    </div>
  )
}
