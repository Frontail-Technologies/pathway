'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCollegeComparisonItem, maxComparisonSlots } from '../data/college-compare'
import { serializeProgramSlug } from '../data/programs'
import { CollegeCoursePickerDialog, type Selection } from './college-course-picker-dialog'

export function CompareStarterSection() {
  const router = useRouter()
  const [selections, setSelections] = useState<(Selection | undefined)[]>(() => Array.from({ length: maxComparisonSlots }, () => undefined))

  const filled = selections.filter((selection): selection is Selection => Boolean(selection))
  const excludeSlugs = filled.map((selection) => selection.collegeSlug)

  const setSlot = (index: number, selection: Selection) => {
    setSelections((prev) => {
      const next = [...prev]
      next[index] = selection
      return next
    })
  }

  const removeSlot = (index: number) => {
    setSelections((prev) => {
      const next = [...prev]
      next[index] = undefined
      return next
    })
  }

  const startComparing = () => {
    if (filled.length === 0) return
    const query = new URLSearchParams({
      colleges: filled.map((selection) => selection.collegeSlug).join(','),
      programs: filled.map((selection) => serializeProgramSlug(selection.degree, selection.course)).join(','),
    }).toString()
    router.push(`/compare/colleges?${query}`)
  }

  return (
    <div className="rounded-[10px] border bg-card p-4 sm:p-5">
      <p className="text-sm font-semibold text-foreground sm:text-[15px]">Start a Comparison</p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Add up to 3 colleges to compare side by side.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {selections.map((selection, index) =>
          selection ? (
            <FilledStarterSlot key={index} selection={selection} onRemove={() => removeSlot(index)} />
          ) : (
            <CollegeCoursePickerDialog
              key={index}
              excludeSlugs={excludeSlugs}
              onApply={(next) => setSlot(index, next)}
              trigger={
                <button
                  type="button"
                  className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Plus className="size-5" aria-hidden="true" />
                  Add College
                </button>
              }
            />
          )
        )}
      </div>

      <Button className="mt-4 h-11 w-full text-sm font-semibold sm:w-fit sm:px-8" disabled={filled.length === 0} onClick={startComparing}>
        Start Comparing
      </Button>
    </div>
  )
}

function FilledStarterSlot({ selection, onRemove }: { selection: Selection; onRemove: () => void }) {
  const college = getCollegeComparisonItem(selection.collegeSlug)
  if (!college) return null

  return (
    <div className="flex h-24 items-center gap-3 rounded-lg border bg-background px-3">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <Image src={college.logo} alt="" fill sizes="44px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{college.shortName}</p>
        <p className="truncate text-xs text-muted-foreground">{college.location}</p>
      </div>
      <button
        type="button"
        aria-label={`Remove ${college.shortName}`}
        onClick={onRemove}
        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
