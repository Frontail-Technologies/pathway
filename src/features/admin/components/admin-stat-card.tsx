import {
  Building,
  BookOpen,
  Award,
  Users,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react'
import type { AdminKPI } from '../types/dashboard'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

const iconMap: Record<AdminKPI['iconName'], LucideIcon> = {
  Building,
  BookOpen,
  Award,
  Users,
  MessageSquareQuote,
}

const colorStyles: Record<AdminKPI['iconColor'], { bg: string; icon: string }> = {
  blue: { bg: 'bg-primary/10', icon: 'text-primary' },
  amber: { bg: 'bg-warning-surface', icon: 'text-warning' },
  emerald: { bg: 'bg-success-surface', icon: 'text-success' },
  purple: { bg: 'bg-secondary', icon: 'text-secondary-foreground' },
  indigo: { bg: 'bg-accent', icon: 'text-accent-foreground' },
}

export function AdminStatCard({ kpi }: { kpi: AdminKPI }) {
  const Icon = iconMap[kpi.iconName] || Building
  const colors = colorStyles[kpi.iconColor] || colorStyles.blue

  return (
    <Card className="h-full border-0 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
      <CardContent className="flex items-center gap-4">
        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-full',
            colors.bg,
            colors.icon
          )}
          aria-hidden="true"
        >
          <Icon className="size-6" />
        </div>
        <div className="min-w-0 flex-1 basis-0">
          <p className="truncate whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" title={kpi.label}>
            {kpi.label}
          </p>
          <p
            className={cn(
              'text-2xl font-extrabold font-heading tracking-tight mt-0.5',
              kpi.connected ? 'text-foreground' : 'text-muted-foreground/60'
            )}
          >
            {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
