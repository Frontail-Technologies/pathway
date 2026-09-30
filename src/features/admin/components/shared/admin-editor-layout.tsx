import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AdminEditorLayoutProps = {
  navigation: ReactNode
  children: ReactNode
  mobileActions?: ReactNode
  className?: string
  contentClassName?: string
}

export function AdminEditorLayout({
  navigation,
  children,
  mobileActions,
  className,
  contentClassName,
}: AdminEditorLayoutProps) {
  return (
    <>
      <div className={cn('grid grid-cols-1 items-start gap-6 lg:grid-cols-12', className)}>
        <aside className="hidden self-start lg:sticky lg:top-20 lg:col-span-3 lg:block">{navigation}</aside>
        <div className={cn('space-y-6 lg:col-span-9', contentClassName)}>{children}</div>
      </div>
      {mobileActions}
    </>
  )
}
