'use client'

import { type ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/shared/rating'
import { collegeComparisonItems, getCollegeComparisonItem } from '../data/college-compare'
import { collegeDegrees, coursesByDegree, type Degree } from '../data/programs'

export type Selection = { collegeSlug: string; degree: Degree; course: string }

type CollegeCoursePickerDialogProps = {
  excludeSlugs: string[]
  onApply: (selection: Selection) => void
  trigger: ReactElement
  /** Pre-fills the picker for "Modify Selection" — undefined for a fresh "Add College". */
  initial?: Selection
}

export function CollegeCoursePickerDialog({ excludeSlugs, onApply, trigger, initial }: CollegeCoursePickerDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [collegeSlug, setCollegeSlug] = useState<string | undefined>(initial?.collegeSlug)
  const [degree, setDegree] = useState<Degree | undefined>(initial?.degree)
  const [course, setCourse] = useState<string | undefined>(initial?.course)
  const [step, setStep] = useState<'college' | 'program'>(initial ? 'program' : 'college')

  // Re-seed every time the dialog opens, so "Modify Selection" always starts from that slot's current selection.
  useEffect(() => {
    if (!open) return
    setCollegeSlug(initial?.collegeSlug)
    setDegree(initial?.degree)
    setCourse(initial?.course)
    setStep(initial ? 'program' : 'college')
    setQuery('')
  }, [open, initial])

  const college = collegeSlug ? getCollegeComparisonItem(collegeSlug) : undefined
  const availableColleges = collegeComparisonItems.filter((item) => !excludeSlugs.includes(item.slug) || item.slug === initial?.collegeSlug)
  const filteredColleges = query.trim() ? availableColleges.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())) : availableColleges

  const degreeOptions = collegeSlug ? collegeDegrees[collegeSlug].map((value) => ({ value, label: value })) : []
  const courseOptions = degree ? coursesByDegree[degree].map((value) => ({ value, label: value })) : []

  const selectCollege = (slug: string) => {
    setCollegeSlug(slug)
    setDegree(undefined)
    setCourse(undefined)
    setStep('program')
  }

  const canApply = Boolean(collegeSlug && degree && course)

  const handleApply = () => {
    if (!collegeSlug || !degree || !course) return
    onApply({ collegeSlug, degree, course })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent showCloseButton className="flex max-h-[85dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:h-150">
        <DialogHeader className="shrink-0 border-b p-4">
          <DialogTitle>Select College &amp; Course</DialogTitle>
        </DialogHeader>

        {step === 'college' ? (
          <>
            <div className="shrink-0 p-4 pb-3">
              <div className="flex h-10 items-center gap-2 rounded-lg border bg-card px-3 transition-colors focus-within:border-primary">
                <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search College"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <p className="px-1 pb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Suggested Colleges</p>
              {filteredColleges.length === 0 ? (
                <p className="px-1 py-4 text-center text-sm text-muted-foreground">No colleges match your search.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {filteredColleges.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => selectCollege(item.slug)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image src={item.logo} alt="" fill sizes="36px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.location} · {item.type}
                        </p>
                      </div>
                      <Rating value={item.rating} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <button
                type="button"
                onClick={() => setStep('college')}
                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <ChevronLeft className="size-3.5" aria-hidden="true" />
                Change College
              </button>

              {college && (
                <div className="mt-3">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Selected College</p>
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image src={college.logo} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{college.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{college.location}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3">
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-foreground">Degree</p>
                  <Select
                    items={degreeOptions}
                    value={degree}
                    onValueChange={(value) => {
                      setDegree(value as Degree)
                      setCourse(undefined)
                    }}
                  >
                    <SelectTrigger className="w-full data-[size=default]:h-10">
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" alignItemWithTrigger={false}>
                      {degreeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="mb-1.5 text-xs font-semibold text-foreground">Course</p>
                  <Select items={courseOptions} value={course} onValueChange={(value) => setCourse(value as string)} disabled={!degree}>
                    <SelectTrigger className="w-full data-[size=default]:h-10">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" alignItemWithTrigger={false}>
                      {courseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end border-t bg-muted/30 p-3">
              <Button variant="cta" className="h-10 px-6 text-sm font-semibold" disabled={!canApply} onClick={handleApply}>
                Apply
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
