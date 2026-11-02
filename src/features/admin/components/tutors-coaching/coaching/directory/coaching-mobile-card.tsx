import Link from 'next/link'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { CompletenessMeter } from '../../../kit'
import { providerPlace, sentenceCase } from '../../shared/tutor-coaching-constants'
import { QualityStatusBadge } from '../../shared/tutor-status-badge'

export function CoachingMobileCard({ provider }: { provider: AdminCoachingProvider }) {
  return (
    <Link href={`/admin/tutors-coaching/coaching/${provider.id}`} className="block space-y-2.5 rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-foreground">{provider.name}</p>
          <p className="text-[13px] text-muted-foreground">
            {providerPlace(provider)} · {sentenceCase(provider.providerType)}
          </p>
        </div>
        <QualityStatusBadge status={provider.quality.status} />
      </div>
      <CompletenessMeter value={provider.completeness.percentage} />
    </Link>
  )
}
