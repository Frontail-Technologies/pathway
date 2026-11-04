'use client'

import { type ReactElement, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { ChevronLeft, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/shared/rating'
import { getComparison, listPickerColleges, type PickerCollege, type ProgramOption } from '../api/compare-api'
import { getCollegeInitials } from '../data/college-compare'

export type Selection = { collegeSlug: string; program: string; college: { name: string; shortName: string; location: string } }

type CollegeCoursePickerDialogProps = {
  excludeSlugs: string[]
  onApply: (selection: Selection) => void
  trigger: ReactElement
  initial?: { collegeSlug: string; program: string }
}


export function CollegeCoursePickerDialog({ excludeSlugs, onApply, trigger, initial }: CollegeCoursePickerDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [collegeSlug, setCollegeSlug] = useState<string | undefined>(initial?.collegeSlug)
  const [degree, setDegree] = useState<string | undefined>()
  const [program, setProgram] = useState<string | undefined>(initial?.program)
  const [step, setStep] = useState<'college' | 'program'>(initial ? 'program' : 'college')
  const collegesQuery = useQuery({ queryKey: queryKeys.comparePickerColleges, queryFn: listPickerColleges, enabled: open, staleTime: 5 * 60_000 })
  const optionsQuery = useQuery({
    queryKey: queryKeys.compareProgramOptions(collegeSlug ?? ''),
    queryFn: () => getComparison([collegeSlug!]).then((result): ProgramOption[] => result.entries[0]?.options ?? []),
    enabled: open && Boolean(collegeSlug),
  })

  useEffect(() => {
    if (!open) return
    setCollegeSlug(initial?.collegeSlug)
    setProgram(initial?.program)
    setDegree(undefined)
    setStep(initial ? 'program' : 'college')
    setQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial?.collegeSlug, initial?.program])

  const optionsData = optionsQuery.data

  const allColleges: PickerCollege[] = collegesQuery.data ?? []
  const college = allColleges.find((item) => item.slug === collegeSlug)
  const available = allColleges.filter((item) => !excludeSlugs.includes(item.slug) || item.slug === initial?.collegeSlug)
  const filtered = query.trim() ? available.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())) : available

  const programOptions = optionsData ?? []
  const activeDegree = degree ?? programOptions.find((option) => option.slug === program)?.degree
  const degreeOptions = useMemo(() => [...new Set(programOptions.map((option) => option.degree))].map((value) => ({ value, label: value })), [programOptions])
  const courseOptions = programOptions.filter((option) => option.degree === activeDegree).map((option) => ({ value: option.slug, label: option.course || option.name }))

  const selectCollege = (slug: string) => {
    setCollegeSlug(slug)
    setDegree(undefined)
    setProgram(undefined)
    setStep('program')
  }

  const canApply = Boolean(college && program && courseOptions.some((option) => option.value === program))

  const handleApply = () => {
    if (!college || !program) return
    onApply({ collegeSlug: college.slug, program, college: { name: college.name, shortName: college.shortName, location: college.location } })
    setOpen(false)
  }

  const retry = (
    <Button variant="outline" size="sm" onClick={() => void (step === 'college' ? collegesQuery.refetch() : optionsQuery.refetch())}>
      Try again
    </Button>
  )

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
              <p className="px-1 pb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Colleges</p>
              {collegesQuery.isError ? (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <p className="text-sm text-muted-foreground">Colleges couldn&apos;t be loaded.</p>
                  {retry}
                </div>
              ) : collegesQuery.isPending ? (
                <p role="status" className="px-1 py-4 text-center text-sm text-muted-foreground">
                  Loading colleges…
                </p>
              ) : filtered.length === 0 ? (
                <p className="px-1 py-4 text-center text-sm text-muted-foreground">No colleges match your search.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {filtered.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => selectCollege(item.slug)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-primary">{getCollegeInitials(item.shortName)}</div>
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
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">{getCollegeInitials(college.shortName)}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{college.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{college.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {optionsQuery.isError ? (
                <div className="mt-4 flex flex-col items-start gap-2">
                  <p className="text-sm text-muted-foreground">This college&apos;s courses couldn&apos;t be loaded.</p>
                  {retry}
                </div>
              ) : optionsQuery.isPending ? (
                <p role="status" className="mt-4 text-sm text-muted-foreground">
                  Loading courses…
                </p>
              ) : programOptions.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No published courses at this college yet.</p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <p className="mb-1.5 text-xs font-semibold text-foreground">Degree</p>
                    <Select
                      items={degreeOptions}
                      value={activeDegree}
                      onValueChange={(value) => {
                        setDegree(value as string)
                        setProgram(undefined)
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
                    <Select items={courseOptions} value={program} onValueChange={(value) => setProgram(value as string)} disabled={!activeDegree}>
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
              )}
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
