import { applicationStatusStyles as scholarshipStatusStyles } from '../data/status'
import type { ScholarshipDetailData } from '../api/scholarships-api'





 
export function ScholarshipOpportunitySnapshot({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const status = scholarshipStatusStyles[scholarship.status]

  return (
    <div className="mt-4 rounded-[10px] border bg-secondary/40 p-4">
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
        <SnapshotItem label="Benefit" value={scholarship.benefitLabel} emphasize />
        <SnapshotItem label="Deadline" value={scholarship.deadlineDisplay} emphasize />
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Status</p>
          <span className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
        </div>
        <SnapshotItem label="Level" value={scholarship.educationLevels.join(' / ')} />
        <SnapshotItem label="Stream" value={scholarship.streams.join(' / ') || 'All Streams'} />
        <SnapshotItem label="Location" value={scholarship.applicableLocations.join(', ')} />
      </div>
    </div>
  )
}

function SnapshotItem({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className={`mt-0.5 text-balance text-foreground ${emphasize ? 'text-base font-bold sm:text-lg' : 'text-sm font-semibold sm:text-[15px]'}`}>{value}</p>
    </div>
  )
}
