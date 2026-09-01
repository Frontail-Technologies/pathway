'use client'

import Image from 'next/image'
import { Plus, X } from 'lucide-react'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import { maxComparisonSlots } from '../data/college-compare'
import type { ComparisonEntry } from '../data/comparison-sections'
import { CollegeCoursePickerDialog, type Selection } from './college-course-picker-dialog'
import { COMPARE_ATTR_COL_WIDTH, COMPARE_GRID_COLS_DATA } from './compare-grid'

type CollegeCompareHeaderRowProps = {
  entries: ComparisonEntry[]
  onRemove: (slug: string) => void
  onAdd: (selection: Selection) => void
  onModify: (previousSlug: string, selection: Selection) => void
  /** Mirrors the comparison body's horizontal `scrollLeft` — see the note on `COMPARE_GRID_COLS_DATA`. */
  scrollLeft: number
}

export function CollegeCompareHeaderRow({ entries, onRemove, onAdd, onModify, scrollLeft }: CollegeCompareHeaderRowProps) {
  const selectedSlugs = entries.map((entry) => entry.college.slug)
  const slots = Array.from({ length: maxComparisonSlots }, (_, index) => entries[index])

  return (
    // Sticky beneath the global header/nav. Mobile top offset (117px) is the
    // measured height of the sticky mobile app header + its compact search
    // row (56px primary row + 1px border + 60px search row) — same figure
    // used by CollegeDetailNav/CourseDetailNav. Desktop/tablet uses the
    // header's own 104px height (64px primary row + 40px nav row) at `md:`.
    //
    // This row deliberately sits OUTSIDE the body's `overflow-x-auto`
    // scroll container (see `compare-grid.ts`) so it can actually stick to
    // the viewport; `overflow-hidden` here is safe (it's this element's
    // own overflow, not an ancestor's) and clips the transformed inner
    // grid to the visible header-bar width.
    <div className="sticky top-[117px] z-20 flex overflow-hidden rounded-t-[10px] border border-b-0 bg-card md:top-26 print:static print:overflow-visible print:rounded-none">
      <div className={`sticky left-0 z-10 flex shrink-0 items-center bg-muted/40 px-3 py-3 text-xs font-semibold text-muted-foreground print:static ${COMPARE_ATTR_COL_WIDTH}`}>
        College
      </div>
      <div className={`grid flex-1 ${COMPARE_GRID_COLS_DATA} print:translate-x-0!`} style={{ transform: `translateX(${-scrollLeft}px)` }}>
        {slots.map((entry, index) =>
          entry ? (
            <FilledHeaderCell
              key={entry.college.slug}
              entry={entry}
              onRemove={() => onRemove(entry.college.slug)}
              onModify={(selection) => onModify(entry.college.slug, selection)}
              excludeSlugs={selectedSlugs}
            />
          ) : (
            <EmptyHeaderCell key={`empty-${index}`} excludeSlugs={selectedSlugs} onAdd={onAdd} />
          )
        )}
      </div>
    </div>
  )
}

function FilledHeaderCell({
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
    <div className="flex flex-col gap-1 border-l border-border/60 bg-card px-3 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-12">
            <Image src={college.logo} alt="" fill sizes="48px" className="object-cover" />
          </div>
          <p className="min-w-0 truncate text-sm font-bold text-foreground">{college.shortName}</p>
        </div>
        <button
          type="button"
          aria-label={`Remove ${college.shortName} from comparison`}
          onClick={onRemove}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 print:hidden"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <p className="truncate text-xs text-muted-foreground">
        {program.degree} · {program.course}
      </p>
      <p className="truncate text-xs text-muted-foreground">{college.location}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        <Rating value={college.rating} />
        {college.verified && <VerifiedBadge />}
      </div>
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs.filter((slug) => slug !== college.slug)}
        initial={{ collegeSlug: college.slug, degree: program.degree, course: program.course }}
        onApply={onModify}
        trigger={
          <button
            type="button"
            className="mt-0.5 w-fit cursor-pointer text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40 print:hidden"
          >
            Modify Selection
          </button>
        }
      />
    </div>
  )
}

function EmptyHeaderCell({ excludeSlugs, onAdd }: { excludeSlugs: string[]; onAdd: (selection: Selection) => void }) {
  return (
    <div className="flex items-center justify-center border-l border-border/60 bg-card px-3 py-3 print:hidden">
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs}
        onApply={onAdd}
        trigger={
          <button
            type="button"
            className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add College
          </button>
        }
      />
    </div>
  )
}
