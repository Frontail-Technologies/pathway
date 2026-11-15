'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DataTabs({ label, tabs }: { label: string; tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b px-4 [scrollbar-width:none] sm:px-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${label}-${tab.id}-tab`}
            aria-selected={tab.id === current?.id}
            aria-controls={`${label}-${tab.id}-panel`}
            onClick={() => setActive(tab.id)}
            className={cn(
              'h-11 shrink-0 cursor-pointer border-b-2 px-3 text-sm whitespace-nowrap outline-none transition-colors focus-visible:text-primary',
              tab.id === current?.id ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current ? (
        <div role="tabpanel" id={`${label}-${current.id}-panel`} aria-labelledby={`${label}-${current.id}-tab`}>
          {current.content}
        </div>
      ) : null}
    </div>
  )
}
