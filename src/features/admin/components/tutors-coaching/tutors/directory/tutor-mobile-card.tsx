import Link from 'next/link'
import { ExternalLink, Edit, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { TutorQualityBadge, TutorPortraitBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export function TutorMobileCard({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-start gap-3">
        <TutorPortrait tutor={tutor} className="size-12 rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/admin/tutors-coaching/tutors/${tutor.id}`}
              className="font-bold text-sm text-foreground hover:text-primary transition-colors truncate"
            >
              {tutor.name}
            </Link>
            <TutorQualityBadge status={tutor.quality.status} />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{tutor.headline}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {tutor.subjects?.map((s) => (
          <Badge key={s} variant="info" size="xs">
            {s}
          </Badge>
        ))}
        {tutor.exams?.map((e) => (
          <Badge key={e} variant="outline" size="xs">
            {e}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <TutorPortraitBadge status={tutor.portraitStatus} />
          <DetailPageBadge hasDetailPage={tutor.hasDetailPage} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-10 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${tutor.completeness.percentage}%` }} />
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">{tutor.completeness.percentage}%</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          nativeButton={false}
          render={<Link href={`/admin/tutors-coaching/tutors/${tutor.id}`} />}
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          nativeButton={false}
          render={<Link href={`/admin/tutors-coaching/tutors/${tutor.id}/edit`} />}
        >
          <Edit className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Button>
        {tutor.hasDetailPage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            aria-label={`View public profile for ${tutor.name}`}
            nativeButton={false}
            render={<Link href={`/tutors/${tutor.slug}`} target="_blank" />}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
