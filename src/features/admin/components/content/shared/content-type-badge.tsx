import { Badge } from '@/components/ui/badge'
import type { ContentType } from '@/features/content/types/content'
import { contentTypeMap } from '@/features/content/types/content'

const contentTypeVariants = {
  article: 'info',
  guide: 'success',
  news: 'info',
  explainer: 'warning',
} as const

export function ContentTypeBadge({ type }: { type: ContentType }) {
  const label = contentTypeMap[type]?.label ?? type
  const variant = contentTypeVariants[type] ?? 'muted'

  return <Badge variant={variant} size="sm">{label}</Badge>
}
