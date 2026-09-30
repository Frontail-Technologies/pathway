import { Badge } from '@/components/ui/badge'

interface SeoIndexingBadgeProps {
  robotsIndex?: boolean
  robotsFollow?: boolean
  className?: string
}

export function SeoIndexingBadge({
  robotsIndex,
  robotsFollow,
  className,
}: SeoIndexingBadgeProps) {
  if (robotsIndex === undefined) {
    if (robotsFollow === false) {
      return (
        <Badge
          variant="outline"
          className={`bg-amber-50 text-amber-700 border-amber-200 text-[11px] font-medium ${className || ''}`}
        >
          Nofollow Override
        </Badge>
      )
    }
    return (
      <Badge
        variant="outline"
        className={`bg-slate-50 text-slate-600 border-slate-200 text-[11px] font-medium ${className || ''}`}
      >
        Inherited
      </Badge>
    )
  }

  if (robotsIndex) {
    if (robotsFollow === false) {
      return (
        <Badge
          variant="outline"
          className={`bg-amber-50 text-amber-700 border-amber-200 text-[11px] font-medium ${className || ''}`}
        >
          Index + Nofollow Override
        </Badge>
      )
    }
    return (
      <Badge
        variant="outline"
        className={`bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-medium ${className || ''}`}
      >
        Indexable Override
      </Badge>
    )
  }

  if (robotsFollow === true) {
    return (
      <Badge
        variant="outline"
        className={`bg-rose-50 text-rose-700 border-rose-200 text-[11px] font-medium ${className || ''}`}
      >
        Noindex + Follow Override
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className={`bg-rose-50 text-rose-700 border-rose-200 text-[11px] font-medium ${className || ''}`}
    >
      Noindex Override
    </Badge>
  )
}

