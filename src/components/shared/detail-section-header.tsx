import type { ComponentType, ReactNode } from 'react'

type DetailSectionHeaderProps = {
  icon?: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  title: string
  action?: ReactNode
}

 
export function DetailSectionHeader({ icon: Icon, title, action }: DetailSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground sm:text-[22px]">
        {Icon && <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />}
        {title}
      </h2>
      {action}
    </div>
  )
}
