import { Badge } from '@/components/ui/badge'
import type { PromotionKind } from '@/features/admin/data/admin-promotions'
import { Sparkles, DollarSign } from 'lucide-react'

export function PromotionKindBadge({
  kind,
}: {
  kind: PromotionKind
}) {
  if (kind === 'sponsored') {
    return (
      <Badge
        variant="outline"
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-purple-50 text-purple-700 border-purple-200/70"
      >
        <DollarSign className="w-3 h-3 text-purple-600" />
        <span>Sponsored</span>
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border-amber-200/70"
    >
      <Sparkles className="w-3 h-3 text-amber-600" />
      <span>Featured</span>
    </Badge>
  )
}
