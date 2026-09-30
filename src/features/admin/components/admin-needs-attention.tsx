import { getNeedsAttentionTasks } from '../data/admin-stats'
import { AlertTriangle, Info, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ADMIN_ATTENTION_PRESENTATION } from '../constants/dashboard'

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  neutral: Layers,
}

export function AdminNeedsAttention() {
  const tasks = getNeedsAttentionTasks()

  return (
    <div className="divide-y divide-border/60 flex-1 flex flex-col justify-between">
      {tasks.map((task) => {
        const Icon = iconMap[task.severity] || Info
        const styles = ADMIN_ATTENTION_PRESENTATION[task.severity]

        return (
          <div
            key={task.id}
            className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-muted/60',
                styles.iconColor
              )}
              aria-hidden="true"
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                  {task.title}
                </p>
                <Badge
                  variant="secondary"
                  className={cn('text-[11px] font-semibold shrink-0 px-2 py-0.5 h-auto', styles.badgeClass)}
                >
                  {task.badgeText}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-medium text-primary">
                  {task.actionLabel}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
