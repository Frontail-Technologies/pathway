import type { LucideIcon } from 'lucide-react'
import { Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AdminEmptyStateProps = {
  icon?: LucideIcon
  title: string
  description?: string
  className?: string
}

export function AdminEmptyState({
  icon: Icon = Activity,
  title,
  description,
  className,
}: AdminEmptyStateProps) {
  return (
    <div className={cn('flex-1 flex flex-col items-center justify-center text-center py-6 px-4', className)}>
      <div
        className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3"
        aria-hidden="true"
      >
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
