import { scholarshipStatusStyles, type ApplicationStatus } from './scholarships'

export type CatalogApplicationStatus = ApplicationStatus | 'not-recorded'

export const applicationStatusStyles: Record<CatalogApplicationStatus, { label: string; className: string }> = {
  ...scholarshipStatusStyles,
  'not-recorded': { label: 'Dates Not Announced', className: 'bg-muted text-muted-foreground' },
}
