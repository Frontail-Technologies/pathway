'use client'

import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCompareTray, type TrayCollege } from '../compare-tray-provider'

export function CompareToggle({ college, variant = 'inline', className }: { college: TrayCollege; variant?: 'inline' | 'button'; className?: string }) {
  const { has, toggle } = useCompareTray()
  const active = has(college.slug)
  const Icon = active ? Check : Plus
  return (
    <button
      type="button"
      onClick={() => toggle(college)}
      aria-pressed={active}
      aria-label={active ? `Remove ${college.name} from compare` : `Add ${college.name} to compare`}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center gap-1.5 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
        variant === 'button' ? 'h-(--control-h) rounded-lg border px-3 text-sm' : 'h-8 rounded-md px-2 text-sm',
        active ? 'border-primary bg-secondary text-primary' : 'text-muted-foreground hover:text-primary',
        variant === 'button' && !active && 'bg-card',
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {active ? 'Added to compare' : 'Compare'}
    </button>
  )
}
