import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

type ScholarshipTopActionsProps = {
  scholarship: ScholarshipDetailData
  saved: boolean
  onToggleSaved: () => void
}

export function ScholarshipTopActions({ scholarship, saved, onToggleSaved }: ScholarshipTopActionsProps) {
  return (
    <div className="mt-4 border-t pb-1 pt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button variant="outline" className="h-11 gap-1.5 px-6 text-sm font-semibold sm:h-10" onClick={onToggleSaved} aria-pressed={saved}>
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
          {saved ? 'Saved' : 'Save Scholarship'}
        </Button>
        {scholarship.officialApplyUrl && (
          <Button
            variant="cta"
            className="h-11 px-6 text-sm font-semibold sm:h-10"
            nativeButton={false}
            render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}
          >
            Official Apply
          </Button>
        )}
      </div>
      {scholarship.officialApplyUrl && <p className="mt-2 text-xs text-muted-foreground">You&apos;ll continue on the official provider website. Pathway does not process this application.</p>}
    </div>
  )
}
