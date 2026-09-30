'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  TUTOR_SUBJECT_OPTIONS,
  TUTOR_EXAM_OPTIONS,
  TUTOR_MODE_OPTIONS,
  TUTOR_LEVEL_OPTIONS,
  TUTOR_LANGUAGE_OPTIONS,
  QUALITY_STATUS_OPTIONS,
  PORTRAIT_STATUS_OPTIONS,
  DETAIL_PAGE_OPTIONS,
} from '../../shared/tutor-coaching-constants'

export type TutorFilterValues = {
  search: string
  subject: string
  exam: string
  mode: string
  level: string
  language: string
  portrait: string
  quality: string
  detailStatus: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'
const selSm = 'h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function TutorFilters({
  values,
  onChange,
  onReset,
  totalCount,
  filteredCount,
}: {
  values: TutorFilterValues
  onChange: (key: keyof TutorFilterValues, value: string) => void
  onReset: () => void
  totalCount: number
  filteredCount: number
}) {
  const isFiltered =
    values.search !== '' ||
    values.subject !== 'All' ||
    values.exam !== 'All' ||
    values.mode !== 'All' ||
    values.level !== 'All' ||
    values.language !== 'All' ||
    values.portrait !== 'All' ||
    values.quality !== 'All' ||
    values.detailStatus !== 'All'

  const secondaryFiltersActiveCount = [
    values.level !== 'All',
    values.language !== 'All',
    values.portrait !== 'All',
    values.detailStatus !== 'All',
  ].filter(Boolean).length

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={values.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Search tutors by name, subject, or exam..."
            className="pl-9 bg-card text-xs h-9 w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={values.subject} onChange={(e) => onChange('subject', e.target.value || 'All')} className={sel}>
            <option value="All">All Subjects</option>
            {TUTOR_SUBJECT_OPTIONS.map((sub: string) => <option key={sub} value={sub}>{sub}</option>)}
          </select>

          <select value={values.exam} onChange={(e) => onChange('exam', e.target.value || 'All')} className={sel}>
            <option value="All">All Exams</option>
            {TUTOR_EXAM_OPTIONS.map((ex: string) => <option key={ex} value={ex}>{ex}</option>)}
          </select>

          <select value={values.mode} onChange={(e) => onChange('mode', e.target.value || 'All')} className={sel}>
            <option value="All">All Modes</option>
            {TUTOR_MODE_OPTIONS.map((m: string) => <option key={m} value={m}>{m}</option>)}
          </select>

          <select value={values.quality} onChange={(e) => onChange('quality', e.target.value || 'All')} className={sel}>
            {QUALITY_STATUS_OPTIONS.map((opt: string) => (
              <option key={opt} value={opt}>{opt === 'All' ? 'All Quality' : opt}</option>
            ))}
          </select>

          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 text-xs bg-card gap-1.5 font-medium cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>More Filters</span>
                  {secondaryFiltersActiveCount > 0 && (
                    <Badge variant="default" size="xs">{secondaryFiltersActiveCount}</Badge>
                  )}
                </Button>
              }
            />
            <PopoverContent align="end" className="w-72 p-4 space-y-3 bg-card border border-border shadow-md">
              <div className="text-xs font-bold text-foreground">Additional Filters</div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground block">Study Level</span>
                <select value={values.level} onChange={(e) => onChange('level', e.target.value || 'All')} className={selSm}>
                  <option value="All">All Study Levels</option>
                  {TUTOR_LEVEL_OPTIONS.map((lvl: string) => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground block">Language</span>
                <select value={values.language} onChange={(e) => onChange('language', e.target.value || 'All')} className={selSm}>
                  <option value="All">All Languages</option>
                  {TUTOR_LANGUAGE_OPTIONS.map((lang: string) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground block">Portrait Asset</span>
                <select value={values.portrait} onChange={(e) => onChange('portrait', e.target.value || 'All')} className={selSm}>
                  {PORTRAIT_STATUS_OPTIONS.map((opt: string) => (
                    <option key={opt} value={opt}>{opt === 'All' ? 'All Portraits' : opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground block">Detail Page Status</span>
                <select value={values.detailStatus} onChange={(e) => onChange('detailStatus', e.target.value || 'All')} className={selSm}>
                  {DETAIL_PAGE_OPTIONS.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </PopoverContent>
          </Popover>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground">{filteredCount}</strong> of {totalCount} tutors
        </span>
      </div>
    </div>
  )
}
