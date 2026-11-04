'use client'

import type { ReactNode } from 'react'
import { Bookmark } from 'lucide-react'

export function MobileActionBar({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="h-17 lg:hidden print:hidden" />
      <div role="region" aria-label={label} className="fixed inset-x-0 bottom-(--pw-bottom-nav-h) z-20 border-t bg-card/95 px-4 py-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur supports-[backdrop-filter]:bg-card/85 lg:hidden print:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-2 [&>*]:h-11">{children}</div>
      </div>
    </>
  )
}

export function MobileActionBarSave({ saved, onToggle, entityLabel }: { saved: boolean; onToggle: () => void; entityLabel: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${entityLabel} from saved` : `Save ${entityLabel}`}
      className="flex w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border bg-card outline-none transition-colors active:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Bookmark className={saved ? 'size-5 fill-primary text-primary' : 'size-5 text-muted-foreground'} aria-hidden="true" />
    </button>
  )
}
