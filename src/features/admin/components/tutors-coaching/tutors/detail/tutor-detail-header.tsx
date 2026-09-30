import Link from 'next/link'
import { ArrowLeft, ExternalLink, Edit, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { TutorQualityBadge, TutorPortraitBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export function TutorDetailHeader({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/admin/tutors-coaching"
          className="hover:text-foreground transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tutors & Coaching
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold truncate">{tutor.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-5 shadow-xs">
        <div className="flex items-start gap-4">
          <TutorPortrait tutor={tutor} className="size-16 rounded-xl shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{tutor.name}</h1>
              <TutorQualityBadge status={tutor.quality.status} />
              <TutorPortraitBadge status={tutor.portraitStatus} />
              <DetailPageBadge hasDetailPage={tutor.hasDetailPage} />
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl">{tutor.headline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {tutor.hasDetailPage && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 text-xs"
              nativeButton={false}
              render={<Link href={`/tutors/${tutor.slug}`} target="_blank" />}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Public Profile
            </Button>
          )}
          <Button
            size="sm"
            className="h-9 gap-1.5 text-xs"
            nativeButton={false}
            render={<Link href={`/admin/tutors-coaching/tutors/${tutor.id}/edit`} />}
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Tutor
          </Button>
        </div>
      </div>
    </div>
  )
}
