'use client'

import Link from 'next/link'
import { ArrowRight, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCollegeInitials } from '../data/college-compare'
import { COMPARE_LIMIT, useCompareTray } from '../compare-tray-provider'
import { CollegeCoursePickerDialog } from './college-course-picker-dialog'

export function CompareStarterSection() {
  const { items, add, remove, href } = useCompareTray()
  const slots = Array.from({ length: COMPARE_LIMIT }, (_, index) => items[index])
  const ready = items.length >= 2

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Pick colleges to compare</h2>
      <p className="mt-1 text-sm text-muted-foreground">Add two or three colleges. You can also tap Compare on any college card while browsing.</p>

      <div className="mt-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {slots.map((item, index) => [
          index > 0 ? (
            <span key={`vs-${index}`} aria-hidden="true" className="mx-auto flex size-8 items-center justify-center rounded-full border bg-card text-[11px] font-bold text-muted-foreground">
              VS
            </span>
          ) : null,
          item ? (
            <div key={item.slug} className="flex h-24 items-center gap-3 rounded-lg border border-primary/40 bg-card px-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">{getCollegeInitials(item.shortName)}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">{item.shortName}</span>
                <span className="block truncate text-xs text-muted-foreground">{item.location}</span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${item.shortName}`}
                onClick={() => remove(item.slug)}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <CollegeCoursePickerDialog
              key={`slot-${index}`}
              excludeSlugs={items.map((entry) => entry.slug)}
              onApply={(selection) => add({ slug: selection.collegeSlug, name: selection.college.name, shortName: selection.college.shortName, location: selection.college.location, program: selection.program })}
              trigger={
                <button
                  type="button"
                  className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Plus className="size-5" aria-hidden="true" />
                  Add college
                </button>
              }
            />
          ),
        ])}
      </div>

      {ready ? (
        <Button variant="cta" size="lg" className="mt-5 w-full gap-2 font-semibold sm:w-fit sm:px-8" nativeButton={false} render={<Link href={href} />}>
          Compare colleges
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      ) : (
        <Button variant="cta" size="lg" className="mt-5 w-full font-semibold sm:w-fit sm:px-8" disabled>
          Compare colleges
        </Button>
      )}
    </div>
  )
}
