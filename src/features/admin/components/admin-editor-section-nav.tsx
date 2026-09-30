'use client'

import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AdminEditorSectionNavItem {
  id: string
  label: string
  icon?: LucideIcon
}

export interface AdminEditorSectionNavProps {
  sections: AdminEditorSectionNavItem[]
  activeSectionId: string
  onSectionChange: (id: string) => void
  title?: string
  className?: string
  variant?: 'sidebar' | 'horizontal'
}






 
export function AdminEditorSectionNav({
  sections,
  activeSectionId,
  onSectionChange,
  title = 'Sections',
  className,
  variant = 'sidebar',
}: AdminEditorSectionNavProps) {
  if (variant === 'horizontal') {
    return (
      <nav className={cn('flex items-center gap-1.5 overflow-x-auto border-b border-border/50 pb-2 text-xs font-medium', className)} aria-label={title}>
        {sections.map((item) => {
          const Icon = item.icon
          const isActive = activeSectionId === item.id

          return (
            <Button
              key={item.id}
              type="button"
              variant={isActive ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onSectionChange(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'h-8 shrink-0 gap-1.5 whitespace-nowrap px-3 text-xs font-medium',
                isActive ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}
            >
              {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
              <span>{item.label}</span>
            </Button>
          )
        })}
      </nav>
    )
  }

  return (
    <Card className={cn('sticky top-20 shadow-xs p-2 gap-1', className)}>
      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50">
        {title}
      </div>
      <nav className="space-y-0.5 pt-1" aria-label={title}>
        {sections.map((item) => {
          const Icon = item.icon
          const isActive = activeSectionId === item.id

          return (
            <Button
              key={item.id}
              type="button"
              variant={isActive ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onSectionChange(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'w-full justify-start gap-2.5 px-3 py-2 h-9 text-xs font-medium text-left cursor-pointer transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary font-semibold hover:bg-primary/15 hover:text-primary dark:bg-primary/20'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
              )}
              <span className="truncate">{item.label}</span>
            </Button>
          )
        })}
      </nav>
    </Card>
  )
}
