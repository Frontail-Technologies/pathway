import type { LucideIcon } from 'lucide-react'
import { Activity } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AdminEmptyStateProps = {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function AdminEmptyState({ icon: Icon = Activity, title, description, action, className }: AdminEmptyStateProps) {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center px-4 py-10 text-center', className)}>
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
        <Icon className="size-6" strokeWidth={1.8} />
      </div>
      <p className="text-[15px] font-semibold text-foreground">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
