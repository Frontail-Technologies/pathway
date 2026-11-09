'use client'

import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AdminEditorSectionNavItem {
  id: string
  label: string
  icon?: LucideIcon
  complete?: boolean
}

export interface AdminEditorSectionNavProps {
  sections: AdminEditorSectionNavItem[]
  activeSectionId: string
  onSectionChange: (id: string) => void
  title?: string
  className?: string
  variant?: 'sidebar' | 'horizontal'
}

function StepNumber({ index, active, complete }: { index: number; active: boolean; complete?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums transition-colors',
        active ? 'bg-primary text-primary-foreground' : complete ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground',
      )}
      aria-hidden="true"
    >
      {complete && !active ? <Check className="size-3.5" strokeWidth={2.5} /> : index + 1}
    </span>
  )
}

export function AdminEditorSectionNav({ sections, activeSectionId, onSectionChange, title = 'Sections', className, variant = 'sidebar' }: AdminEditorSectionNavProps) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((item) => item.id === activeSectionId),
  )

  if (variant === 'horizontal') {
    return (
      <nav className={cn('flex items-center gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)} aria-label={title}>
        {sections.map((item, index) => {
          const isActive = activeSectionId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                isActive ? 'bg-primary/10 font-semibold text-primary' : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <StepNumber index={index} active={isActive} complete={item.complete} />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          )
        })}
      </nav>
    )
  }

  return (
    <div className={cn('sticky top-[4.5rem] rounded-xl border border-border bg-card p-2 shadow-sm', className)}>
      <div className="flex items-baseline justify-between px-3 pt-1.5 pb-2">
        <span className="text-[13px] font-medium text-muted-foreground">{title}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          Step {activeIndex + 1} of {sections.length}
        </span>
      </div>
      <nav className="flex flex-col gap-0.5" aria-label={title}>
        {sections.map((item, index) => {
          const Icon = item.icon
          const isActive = activeSectionId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'flex h-10 w-full items-center gap-3 rounded-lg px-2.5 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <StepNumber index={index} active={isActive} complete={item.complete} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {Icon ? <Icon className={cn('size-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground/70')} aria-hidden="true" /> : null}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
