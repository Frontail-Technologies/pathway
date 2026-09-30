import { Badge } from '@/components/ui/badge'
import type { ContentStatus } from '@/features/content/types/content'
import { contentStatusMap } from '@/features/content/types/content'

const contentStatusVariants = {
  published: 'success',
  draft: 'muted',
  archived: 'warning',
} as const

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  const label = contentStatusMap[status]?.label ?? status
  const variant = contentStatusVariants[status] ?? 'muted'

  return <Badge variant={variant} size="sm">{label}</Badge>
}
