'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronUp, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCollegeInitials } from '../data/college-compare'
import { COMPARE_LIMIT, useCompareTray } from '../compare-tray-provider'
import { CollegeCoursePickerDialog } from './college-course-picker-dialog'

export function CompareTray() {
  const pathname = usePathname()
  const { items, remove, clear, add, href } = useCompareTray()
  const [open, setOpen] = useState(false)
  if (!items.length || pathname.startsWith('/compare')) return null
  const ready = items.length >= 2
  const slots = Array.from({ length: COMPARE_LIMIT }, (_, index) => items[index])

  const addSlot = (
    <CollegeCoursePickerDialog
      excludeSlugs={items.map((item) => item.slug)}
      onApply={(selection) => add({ slug: selection.collegeSlug, name: selection.college.name, shortName: selection.college.shortName, location: selection.college.location, program: selection.program })}
      trigger={
        <button
          type="button"
          className="flex h-14 w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add college
        </button>
      }
    />
  )

  return (
    <div className="pw-compare-tray pointer-events-none fixed inset-x-0 z-30 px-3 print:hidden">
      <section aria-label="Compare tray" className="pointer-events-auto mx-auto max-w-4xl rounded-2xl border bg-card shadow-[0_12px_40px_rgba(15,23,42,0.18)]">
        <div className={cn('flex items-center gap-3 p-2.5 sm:p-3', open && 'border-b')}>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:hidden"
          >
            <span className="flex -space-x-2">
              {items.map((item) => (
                <span key={item.slug} className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-secondary text-[11px] font-bold text-primary">
                  {getCollegeInitials(item.shortName)}
                </span>
              ))}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">
                Compare {items.length} of {COMPARE_LIMIT}
              </span>
              <span className="block truncate text-xs text-muted-foreground">{ready ? items.map((item) => item.shortName).join(' vs ') : 'Add one more college'}</span>
            </span>
            <ChevronUp className={cn('ml-auto size-4 shrink-0 text-muted-foreground transition-transform', !open && 'rotate-180')} aria-hidden="true" />
          </button>

          <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
            {slots.map((item, index) =>
              item ? (
                <div key={item.slug} className="flex h-14 min-w-0 flex-1 items-center gap-2.5 rounded-lg border px-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-primary">{getCollegeInitials(item.shortName)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{item.shortName}</span>
                    <span className="block truncate text-xs text-muted-foreground">{item.location}</span>
                  </span>
                  <button type="button" onClick={() => remove(item.slug)} aria-label={`Remove ${item.shortName} from compare`} className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40">
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div key={`empty-${index}`} className="min-w-0 flex-1">
                  {addSlot}
                </div>
              ),
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button type="button" onClick={clear} className="hidden h-10 cursor-pointer rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 sm:block">
              Clear
            </button>
            {ready ? (
              <Button variant="cta" className="h-10 gap-1.5 px-4 font-semibold" nativeButton={false} render={<Link href={href} />}>
                Compare
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button variant="cta" className="h-10 px-4 font-semibold" disabled>
                Compare
              </Button>
            )}
          </div>
        </div>

        {open ? (
          <div className="flex flex-col gap-2 p-2.5 lg:hidden">
            {slots.map((item, index) =>
              item ? (
                <div key={item.slug} className="flex h-14 items-center gap-2.5 rounded-lg border px-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-primary">{getCollegeInitials(item.shortName)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{item.location}</span>
                  </span>
                  <button type="button" onClick={() => remove(item.slug)} aria-label={`Remove ${item.shortName} from compare`} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40">
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div key={`empty-${index}`}>{addSlot}</div>
              ),
            )}
            <button type="button" onClick={clear} className="h-10 cursor-pointer rounded-lg text-sm font-medium text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40">
              Clear all
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}
