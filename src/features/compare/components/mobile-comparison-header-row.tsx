'use client'

import Image from 'next/image'
import { Plus, X } from 'lucide-react'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { getCollegeInitials, maxComparisonSlots } from '../data/college-compare'
import type { CompareEntry as ComparisonEntry } from '../api/compare-api'
import { CollegeCoursePickerDialog, type Selection } from './college-course-picker-dialog'
import { MOBILE_COMPARE_GRID_COLS } from './compare-grid'

type MobileComparisonHeaderRowProps = {
  entries: ComparisonEntry[]
  onRemove: (slug: string) => void
  onAdd: (selection: Selection) => void
  onModify: (previousSlug: string, selection: Selection) => void
   
  scrollLeft: number
}

export function MobileComparisonHeaderRow({ entries, onRemove, onAdd, onModify, scrollLeft }: MobileComparisonHeaderRowProps) {
  const selectedSlugs = entries.map((entry) => entry.college.slug)
  const slots = Array.from({ length: maxComparisonSlots }, (_, index) => entries[index])

  return (
    
    
    
    
    
    <div className="sticky top-header z-20 overflow-hidden rounded-t-[10px] border border-b-0 bg-card print:hidden">
      <div className={`grid ${MOBILE_COMPARE_GRID_COLS}`} style={{ transform: `translateX(${-scrollLeft}px)` }}>
        {slots.map((entry, index) =>
          entry ? (
            <FilledCell
              key={entry.college.slug}
              entry={entry}
              onRemove={() => onRemove(entry.college.slug)}
              onModify={(selection) => onModify(entry.college.slug, selection)}
              excludeSlugs={selectedSlugs}
            />
          ) : (
            <EmptyCell key={`empty-${index}`} excludeSlugs={selectedSlugs} onAdd={onAdd} />
          )
        )}
      </div>
    </div>
  )
}

function FilledCell({
  entry,
  onRemove,
  onModify,
  excludeSlugs,
}: {
  entry: ComparisonEntry
  onRemove: () => void
  onModify: (selection: Selection) => void
  excludeSlugs: string[]
}) {
  const { college, program } = entry
  return (
    <div className="flex flex-col gap-1 border-l border-border/60 bg-card px-2.5 py-3 first:border-l-0">
      <div className="flex items-start justify-between gap-1">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-secondary">
          {college.logo ? <Image src={college.logo} alt="" fill sizes="36px" className="object-cover" /> : <span className="flex size-full items-center justify-center text-xs font-bold text-primary">{getCollegeInitials(college.shortName)}</span>}
        </div>
        <button
          type="button"
          aria-label={`Remove ${college.shortName} from comparison`}
          onClick={onRemove}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <p className="truncate text-[13px] font-bold text-foreground">{college.shortName}</p>
      <p className="truncate text-[11px] text-muted-foreground">
        {program.degree} · {program.course}
      </p>
      {college.verified && <VerifiedBadge />}
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs.filter((slug) => slug !== college.slug)}
        initial={{ collegeSlug: college.slug, program: program.slug }}
        onApply={onModify}
        trigger={
          <button
            type="button"
            className="mt-0.5 w-fit cursor-pointer text-[11px] font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Modify Selection
          </button>
        }
      />
    </div>
  )
}

function EmptyCell({ excludeSlugs, onAdd }: { excludeSlugs: string[]; onAdd: (selection: Selection) => void }) {
  return (
    <div className="flex items-center justify-center border-l border-border/60 bg-card px-2.5 py-3 first:border-l-0">
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs}
        onApply={onAdd}
        trigger={
          <button
            type="button"
            className="flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-xs font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add
          </button>
        }
      />
    </div>
  )
}
