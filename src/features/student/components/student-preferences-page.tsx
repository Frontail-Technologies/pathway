'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ChipGroup } from '@/components/shared/student-tool/tool-fields'
import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'
import { useStudentProfile } from '../state/student-profile-provider'
import { DashboardSection } from './dashboard-parts'

const studyGoalOptions = ['Undergraduate study', 'Postgraduate study', 'Entrance exam preparation', 'Explore career options', 'Still deciding']
const streamOptions = ['Engineering', 'Medical', 'Commerce', 'Science', 'Management', 'Design', 'Law', 'Arts / Humanities']
const locationOptions = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Telangana', 'Gujarat']

type PreferenceDraft = { studyGoal: string; streams: string[]; courses: string[]; exams: string[]; locations: string[] }

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((item) => b.includes(item))

export function StudentPreferencesPage() {
  const { hydrated } = useStudentProfile()
  // Seed the form only after the stored demo profile has been read.
  return hydrated ? <PreferencesEditor /> : <div className="h-96 w-full" aria-hidden="true" />
}

function PreferencesEditor() {
  const { profile, updateProfile } = useStudentProfile()
  const initial = useMemo<PreferenceDraft>(
    () => ({ studyGoal: profile.studyGoal ?? '', streams: profile.preferredStreams ?? [], courses: profile.preferredCourses, exams: profile.preferredExams, locations: profile.preferredLocations }),
    [profile],
  )
  const [draft, setDraft] = useState<PreferenceDraft>(initial)

  const dirty = draft.studyGoal !== initial.studyGoal || (['streams', 'courses', 'exams', 'locations'] as const).some((key) => !sameSet(draft[key], initial[key]))
  const toggle = (key: 'streams' | 'courses' | 'exams' | 'locations', value: string) =>
    setDraft((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value] }))

  // Specific courses come from the course fixture, narrowed to the selected streams.
  const courseChoices = useMemo(() => courses.filter((course) => draft.streams.includes(course.stream)).map((course) => course.name), [draft.streams])
  // A course whose stream was just deselected drops out on save so the profile never keeps an orphaned course.
  const save = () => {
    const keptCourses = draft.courses.filter((name) => courseChoices.includes(name) || !courses.some((course) => course.name === name))
    updateProfile({
      ...profile,
      studyGoal: draft.studyGoal || undefined,
      preferredStreams: draft.streams,
      preferredCourses: keptCourses,
      preferredExams: draft.exams,
      preferredLocations: draft.locations,
    })
    setDraft((prev) => ({ ...prev, courses: keptCourses }))
    toast.success('Preferences updated on this device.')
  }

  return (
    <div className="w-full">
      <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Preferences</h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">Tell Pathway what you are planning so your discovery experience can be more relevant.</p>

      <form
        className="mt-4 flex flex-col gap-4 sm:mt-5 sm:gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          save()
        }}
      >
        <DashboardSection title="Study Goal" description="Pick the one that fits best right now.">
          <div role="radiogroup" aria-label="Study goal" className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 xl:grid-cols-5">
            {studyGoalOptions.map((option) => {
              const active = draft.studyGoal === option
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setDraft((prev) => ({ ...prev, studyGoal: active ? '' : option }))}
                  className={`flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-[10px] border px-3 py-1.5 text-left text-[13px] leading-tight outline-none sm:min-h-12 sm:px-4 sm:text-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'border-primary bg-primary/10 font-semibold text-primary' : 'border-border bg-card text-foreground hover:border-primary/40'}`}
                >
                  {option}
                  {active && <Check className="size-4 shrink-0" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </DashboardSection>

        <DashboardSection title="Course / Stream" description="Choose one or more streams, then optionally a specific course.">
          <ChipGroup ariaLabel="Preferred streams" options={streamOptions} selected={draft.streams} onToggle={(value) => toggle('streams', value)} />
          <div className="mt-4 border-t pt-4">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Specific courses (optional)</p>
            {courseChoices.length ? (
              <div className="mt-2">
                <ChipGroup ariaLabel="Preferred courses" options={courseChoices} selected={draft.courses} onToggle={(value) => toggle('courses', value)} />
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">{draft.streams.length ? 'No specific courses are listed for these streams yet.' : 'Select a stream to see specific courses.'}</p>
            )}
          </div>
        </DashboardSection>

        <DashboardSection title="Exams" description="Entrance exams you are preparing for or considering.">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-3 2xl:grid-cols-4" role="group" aria-label="Preferred exams">
            {exams.map((exam) => {
              const active = draft.exams.includes(exam.shortName)
              return (
                <button
                  key={exam.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle('exams', exam.shortName)}
                  className={`flex cursor-pointer items-center gap-2 rounded-[10px] border p-2.5 text-left outline-none sm:gap-3 sm:p-3 transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40'}`}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary sm:size-10 sm:text-[11px]">{exam.shortName.split(' ')[0].slice(0, 4).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${active ? 'text-primary' : 'text-foreground'}`}>{exam.shortName}</span>
                    <span className="block truncate text-xs text-muted-foreground">{exam.studyArea}</span>
                  </span>
                  {active && <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </DashboardSection>

        <DashboardSection title="Preferred Locations" description="States you would consider studying in.">
          <ChipGroup ariaLabel="Preferred locations" options={locationOptions} selected={draft.locations} onToggle={(value) => toggle('locations', value)} />
        </DashboardSection>

        <div className="sticky bottom-0 z-20 -mx-4 flex items-center gap-2 border-t bg-card px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:gap-3 lg:static lg:mx-0 lg:justify-between lg:border-0 lg:bg-transparent lg:p-0">
          <Button
            type="button"
            variant="outline"
            className="h-11 basis-[42%] px-3 text-sm sm:basis-auto sm:px-5"
            nativeButton={false}
            render={<Link href="/student" onClick={(event) => { if (dirty && !window.confirm('Discard your unsaved changes?')) event.preventDefault() }} />}
          >
            Back to Dashboard
          </Button>
          <Button type="submit" variant="cta" className="h-11 flex-1 px-4 text-sm font-semibold sm:flex-none sm:px-6">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  )
}
