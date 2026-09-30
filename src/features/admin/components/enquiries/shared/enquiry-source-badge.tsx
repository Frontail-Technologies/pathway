import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { EnquirySource } from '@/features/admin/data/admin-enquiries'
import { enquirySourceMap } from '@/features/admin/data/admin-enquiries'

export function EnquirySourceBadge({
  source,
  className,
}: {
  source: EnquirySource | string
  className?: string
}) {
  const label = enquirySourceMap[source as EnquirySource]?.label ?? source

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[11px] font-medium px-2 py-0.5 bg-muted/50 text-foreground border-border/80',
        className
      )}
    >
      {label}
    </Badge>
  )
}
