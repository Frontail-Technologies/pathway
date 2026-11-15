'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, Plus, X } from 'lucide-react'
import { Rating } from '@/components/shared/rating'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { CompareEntry } from '../api/compare-api'
import { getCollegeInitials, maxComparisonSlots } from '../data/college-compare'
import { comparisonSections, facilityRowIcons, glanceRows, highlightedIndex, rowDiffers, visibleRows, type ComparisonEntry, type ComparisonRowConfig } from '../data/comparison-sections'
import { CollegeCoursePickerDialog, type Selection } from './college-course-picker-dialog'

const grid = 'grid grid-cols-3 md:grid-cols-[13rem_repeat(3,minmax(0,1fr))]'

type Handlers = { onAdd: (selection: Selection) => void; onRemove: (slug: string) => void; onModify: (slug: string, selection: Selection) => void }

function HeaderCell({ entry, excludeSlugs, onRemove, onModify }: { entry: CompareEntry; excludeSlugs: string[]; onRemove: () => void; onModify: (selection: Selection) => void }) {
  const { college, program } = entry
  return (
    <div className="relative flex min-w-0 flex-col items-center gap-1.5 px-2 py-3 text-center md:items-start md:px-4 md:text-left">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${college.shortName} from comparison`}
        className="absolute top-1.5 right-1.5 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 print:hidden"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary md:size-11">{getCollegeInitials(college.shortName)}</span>
      <Link href={college.href} className="line-clamp-2 w-full text-sm font-semibold text-foreground outline-none hover:text-primary focus-visible:text-primary md:pr-6 md:text-[15px]">
        {college.shortName}
      </Link>
      <p className="hidden w-full truncate text-xs text-muted-foreground md:block">{college.location}</p>
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs.filter((slug) => slug !== college.slug)}
        initial={{ collegeSlug: college.slug, program: program.slug }}
        onApply={onModify}
        trigger={
          <button type="button" className="line-clamp-2 w-full cursor-pointer text-xs font-medium text-primary outline-none hover:underline focus-visible:underline print:hidden">
            {program.slug ? `${program.degree} · ${program.course}` : 'Choose course'}
          </button>
        }
      />
    </div>
  )
}

function AddCell({ excludeSlugs, onAdd }: { excludeSlugs: string[]; onAdd: (selection: Selection) => void }) {
  return (
    <div className="flex items-center p-2 md:p-3 print:hidden">
      <CollegeCoursePickerDialog
        excludeSlugs={excludeSlugs}
        onApply={onAdd}
        trigger={
          <button
            type="button"
            className="flex h-full min-h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-sm font-medium text-primary outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Plus className="size-5" aria-hidden="true" />
            Add college
          </button>
        }
      />
    </div>
  )
}

function Value({ row, entry, best }: { row: ComparisonRowConfig; entry: ComparisonEntry; best: boolean }) {
  const value = row.getValue(entry)
  if (row.type === 'rating' && typeof value === 'number') return value ? <Rating value={value} /> : <Missing />
  if (row.type === 'boolean')
    return value ? (
      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground md:text-sm">
        <Check className="size-4 text-primary" aria-hidden="true" />
        Yes
      </span>
    ) : (
      <Missing />
    )
  if (row.type === 'chips' && Array.isArray(value))
    return value.length ? (
      <span className="flex flex-wrap justify-center gap-1 md:justify-start">
        {value.map((chip) => (
          <span key={chip} className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
            {chip}
          </span>
        ))}
      </span>
    ) : (
      <Missing />
    )
  const text = String(value)
  if (!text || text === 'Not available') return <Missing />
  return (
    <span className="flex flex-col items-center gap-1 md:items-start">
      <span className={cn('text-[13px] text-foreground md:text-sm', best && 'font-semibold')}>{text}</span>
      {best ? <span className="rounded bg-primary px-1.5 py-px text-[10px] font-semibold text-primary-foreground">Best</span> : null}
    </span>
  )
}

const Missing = () => <span className="text-sm text-muted-foreground/60">—</span>

function Row({ row, entries }: { row: ComparisonRowConfig; entries: ComparisonEntry[] }) {
  const best = highlightedIndex(row, entries)
  const Icon = facilityRowIcons[row.label]
  return (
    <div className={cn(grid, 'border-t first:border-t-0')}>
      <div className="col-span-3 flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground md:col-span-1 md:bg-transparent md:px-4 md:py-3 md:text-sm md:text-foreground">
        {Icon ? <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
        {row.label}
      </div>
      {Array.from({ length: maxComparisonSlots }, (_, index) => entries[index]).map((entry, index) => (
        <div key={entry?.college.slug ?? `empty-${index}`} className={cn('flex min-w-0 items-center justify-center px-2 py-2.5 text-center md:justify-start md:border-l md:px-4 md:py-3 md:text-left', index > 0 && 'border-l', index === best && 'bg-secondary/50')}>
          {entry ? <Value row={row} entry={entry} best={index === best} /> : null}
        </div>
      ))}
    </div>
  )
}

export function CompareView({ entries, onAdd, onRemove, onModify }: { entries: CompareEntry[] } & Handlers) {
  const [differences, setDifferences] = useState(false)
  const slugs = entries.map((entry) => entry.college.slug)

  const sections = useMemo(() => {
    const all = comparisonSections.flatMap((section) => section.rows)
    const glance = { title: 'At a glance', rows: glanceRows.map((label) => all.find((row) => row.label === label)).filter((row): row is ComparisonRowConfig => Boolean(row)) }
    return [glance, ...comparisonSections]
      .map((section) => ({ title: section.title, rows: visibleRows({ ...section, icon: comparisonSections[0]!.icon }, entries).filter((row) => !differences || entries.length < 2 || rowDiffers(row, entries)) }))
      .filter((section) => section.rows.length)
  }, [entries, differences])

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-header z-20 -mx-4 border-y bg-card shadow-[0_6px_16px_rgba(15,23,42,0.06)] sm:mx-0 sm:rounded-xl sm:border print:static print:shadow-none">
        <div className={grid}>
          <div className="hidden flex-col justify-center gap-2 px-4 py-3 md:flex">
            <p className="text-sm font-semibold text-foreground">
              {entries.length} of {maxComparisonSlots} colleges
            </p>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-muted-foreground print:hidden">
              <Switch checked={differences} onCheckedChange={setDifferences} aria-label="Show only differences" />
              Only differences
            </label>
          </div>
          {Array.from({ length: maxComparisonSlots }, (_, index) => entries[index]).map((entry, index) => (
            <div key={entry?.college.slug ?? `add-${index}`} className={cn('min-w-0 md:border-l', index > 0 && 'border-l')}>
              {entry ? (
                <HeaderCell entry={entry} excludeSlugs={slugs} onRemove={() => onRemove(entry.college.slug)} onModify={(selection) => onModify(entry.college.slug, selection)} />
              ) : index === entries.length ? (
                <AddCell excludeSlugs={slugs} onAdd={onAdd} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground md:hidden print:hidden">
        <Switch checked={differences} onCheckedChange={setDifferences} aria-label="Show only differences" />
        Show only differences
      </label>

      {sections.map((section) => (
        <section key={section.title} className="overflow-hidden rounded-xl border bg-card">
          <h2 className="border-b px-3 py-3 font-heading text-base font-bold text-foreground md:px-4 md:text-lg">{section.title}</h2>
          {section.rows.map((row) => (
            <Row key={row.label} row={row} entries={entries} />
          ))}
        </section>
      ))}

      {differences && sections.length === 0 ? <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">These colleges match on every recorded field.</p> : null}
    </div>
  )
}
