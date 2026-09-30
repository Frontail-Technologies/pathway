import Link from 'next/link'
import { ArrowLeft, ExternalLink, Edit, Building2, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { CoachingQualityBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export function CoachingDetailHeader({ provider }: { provider: AdminCoachingProvider }) {
  const isOnline = provider.providerType === 'Online Platform'

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
        <span className="text-foreground font-semibold truncate">{provider.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {isOnline ? <Globe2 className="w-7 h-7" /> : <Building2 className="w-7 h-7" />}
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{provider.name}</h1>
              <Badge variant="muted" size="sm">
                {provider.providerType}
              </Badge>
              <CoachingQualityBadge status={provider.quality.status} />
              <DetailPageBadge hasDetailPage={!!provider.hasDetailPage} />
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl">
              {provider.programLabel || `${provider.location} • ${provider.exams.join(', ')}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {provider.hasDetailPage && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 text-xs"
              nativeButton={false}
              render={<Link href={`/coaching/${provider.slug}`} target="_blank" />}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Public Page
            </Button>
          )}
          <Button
            size="sm"
            className="h-9 gap-1.5 text-xs"
            nativeButton={false}
            render={<Link href={`/admin/tutors-coaching/coaching/${provider.id}/edit`} />}
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Provider
          </Button>
        </div>
      </div>
    </div>
  )
}
