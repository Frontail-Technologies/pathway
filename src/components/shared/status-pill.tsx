import { cn } from '@/lib/utils'

export type DeadlineStatus = 'open' | 'closing-soon' | 'upcoming' | 'closed' | 'always-open'

const tone: Record<DeadlineStatus, string> = {
  open: 'bg-success-surface text-success',
  'closing-soon': 'bg-warning-surface text-warning',
  upcoming: 'bg-secondary text-secondary-foreground',
  closed: 'bg-muted text-muted-foreground',
  'always-open': 'bg-success-surface text-success',
}

const label: Record<DeadlineStatus, string> = {
  open: 'Open',
  'closing-soon': 'Closing soon',
  upcoming: 'Upcoming',
  closed: 'Closed',
  'always-open': 'Always open',
}

const DAY = 86_400_000

export function daysUntil(date: string | Date, now: Date = new Date()) {
  const target = new Date(date)
  if (Number.isNaN(target.getTime())) return null
  const start = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const end = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate())
  return Math.round((end - start) / DAY)
}

export function deadlineStatus(deadline: string | Date | null | undefined, opensAt?: string | Date | null, now: Date = new Date()): DeadlineStatus {
  if (!deadline) return 'always-open'
  const opensIn = opensAt ? daysUntil(opensAt, now) : null
  if (opensIn !== null && opensIn > 0) return 'upcoming'
  const left = daysUntil(deadline, now)
  if (left === null) return 'always-open'
  if (left < 0) return 'closed'
  if (left <= 14) return 'closing-soon'
  return 'open'
}

function daysLabel(days: number) {
  if (days === 0) return 'Last day'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

export function StatusPill({ status, deadline, daysLeft, className }: { status: DeadlineStatus; deadline?: string | Date | null; daysLeft?: number | null; className?: string }) {
  const active = status === 'open' || status === 'closing-soon'
  const left = !active ? null : daysLeft != null ? daysLeft : deadline ? daysUntil(deadline) : null
  const text = left !== null && left >= 0 && left <= 30 ? daysLabel(left) : label[status]
  return <span className={cn('inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold whitespace-nowrap', tone[status], className)}>{text}</span>
}
