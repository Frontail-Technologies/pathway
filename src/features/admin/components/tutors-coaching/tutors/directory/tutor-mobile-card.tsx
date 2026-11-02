import Link from 'next/link'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { CompletenessMeter } from '../../../kit'
import { QualityStatusBadge } from '../../shared/tutor-status-badge'

export function TutorMobileCard({ tutor }: { tutor: AdminTutor }) {
  return (
    <Link href={`/admin/tutors-coaching/tutors/${tutor.id}`} className="block space-y-2.5 rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <TutorPortrait tutor={tutor} className="size-9 shrink-0 rounded-full" />
          <div className="min-w-0">
            <p className="font-medium text-foreground">{tutor.name}</p>
            <p className="truncate text-[13px] text-muted-foreground">{[...tutor.subjects.slice(0, 2), ...tutor.exams.slice(0, 1)].join(' · ')}</p>
          </div>
        </div>
        <QualityStatusBadge status={tutor.quality.status} />
      </div>
      <CompletenessMeter value={tutor.completeness.percentage} />
    </Link>
  )
}
