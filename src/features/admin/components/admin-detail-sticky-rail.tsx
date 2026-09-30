import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AdminDetailStickyRailProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function AdminDetailStickyRail({
  children,
  className,
  ...props
}: AdminDetailStickyRailProps) {
  return (
    <div
      className={cn(
        'w-full space-y-6 lg:sticky lg:top-20 lg:self-start',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
