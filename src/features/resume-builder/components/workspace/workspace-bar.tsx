import Link from 'next/link'
import type { ReactNode } from 'react'

export const onBlueOutline = 'border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'

export function WorkspaceBar({ children }: { children?: ReactNode }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 bg-primary px-3 text-primary-foreground sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Link href="/" className="rounded-md font-heading text-lg font-extrabold outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60">
          Pathway
        </Link>
        <span className="text-primary-foreground/50" aria-hidden="true">
          /
        </span>
        <span className="truncate text-sm font-semibold">Resume Builder</span>
      </div>
      {children ? <div className="flex shrink-0 items-center gap-2 sm:gap-3">{children}</div> : null}
    </header>
  )
}
