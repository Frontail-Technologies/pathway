import Link from 'next/link'
import { ExternalLink, Edit, Eye, Building2, Globe2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { CoachingQualityBadge, DetailPageBadge } from '../../shared/tutor-status-badge'

export function CoachingMobileCard({ provider }: { provider: AdminCoachingProvider }) {
  const isOnline = provider.providerType === 'Online Platform'

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {isOnline ? <Globe2 className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/admin/tutors-coaching/coaching/${provider.id}`}
              className="font-bold text-sm text-foreground hover:text-primary transition-colors truncate"
            >
              {provider.name}
            </Link>
            <CoachingQualityBadge status={provider.quality.status} />
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
            <span>{provider.providerType}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              {provider.state ? `${provider.location}, ${provider.state}` : provider.location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {provider.exams?.map((e) => (
          <Badge key={e} variant="info" size="xs">
            {e}
          </Badge>
        ))}
        {provider.modes?.map((m) => (
          <Badge key={m} variant="outline" size="xs">
            {m}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-border/60">
        <DetailPageBadge hasDetailPage={!!provider.hasDetailPage} />
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-10 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${provider.completeness.percentage}%` }} />
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">{provider.completeness.percentage}%</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          nativeButton={false}
          render={<Link href={`/admin/tutors-coaching/coaching/${provider.id}`} />}
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          nativeButton={false}
          render={<Link href={`/admin/tutors-coaching/coaching/${provider.id}/edit`} />}
        >
          <Edit className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Button>
        {provider.hasDetailPage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            aria-label={`View public page for ${provider.name}`}
            nativeButton={false}
            render={<Link href={`/coaching/${provider.slug}`} target="_blank" />}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
