import { Badge } from '@/components/ui/badge'
import type { ReviewSource } from '@/features/admin/data/admin-reviews'
import { reviewSourceMap } from '@/features/admin/data/admin-reviews'
import { Globe, GraduationCap } from 'lucide-react'

const sourceConfig: Record<
  ReviewSource,
  { bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  google: {
    bg: 'bg-blue-50/70',
    text: 'text-blue-700',
    border: 'border-blue-200/60',
    icon: Globe,
  },
  pathway: {
    bg: 'bg-indigo-50/70',
    text: 'text-indigo-700',
    border: 'border-indigo-200/60',
    icon: GraduationCap,
  },
}

export function ReviewSourceBadge({
  source,
  showLabel = true,
}: {
  source: ReviewSource
  showLabel?: boolean
}) {
  const config = sourceConfig[source] || sourceConfig.google
  const meta = reviewSourceMap[source]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold ${config.bg} ${config.text} ${config.border}`}
    >
      <Icon className="w-3 h-3" />
      <span>{showLabel ? meta?.shortLabel ?? source : source}</span>
    </Badge>
  )
}
