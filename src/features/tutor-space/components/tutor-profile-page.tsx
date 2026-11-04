'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChipGroup, Field } from '@/components/shared/student-tool/tool-fields'
import { DashboardSection } from '@/features/student/components/dashboard-parts'
import { TutorResultCard } from '@/features/tutors/components/tutor-cards'
import { examOptions, languageOptions, levelOptions, modeOptions, previewTutor, subjectOptions, type TutorProfileDraft } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'

type Errors = Partial<Record<'name' | 'headline' | 'subjects' | 'levels' | 'modes', string>>

const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

export function TutorProfilePage() {
  const { state, saveProfile } = useTutorSpace()
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState<TutorProfileDraft>(state.profile)
  const [errors, setErrors] = useState<Errors>({})
  useEffect(() => setDraft(state.profile), [state.profile])

  const dirty = JSON.stringify(draft) !== JSON.stringify(state.profile)
  const set = (patch: Partial<TutorProfileDraft>) => setDraft((current) => ({ ...current, ...patch }))

  const save = () => {
    const next: Errors = {}
    if (!draft.name.trim()) next.name = 'Enter your name.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      toast.error('Please fix the highlighted fields.')
      return
    }
    setSaving(true)
    saveProfile(draft)
      .then(() => toast.success('Profile saved to your account.'))
      .catch((error: unknown) => toast.error(error instanceof Error ? error.message : 'Could not save your profile. Please try again.'))
      .finally(() => setSaving(false))
  }

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Your profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">What students see on your tutor card and profile page.</p>
        </div>

        <DashboardSection title="About you">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name" required htmlFor="tutor-name" error={errors.name}>
              <Input id="tutor-name" value={draft.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!errors.name} autoComplete="name" />
            </Field>
            <Field label="City" htmlFor="tutor-city" hint="Shown for in-person sessions.">
              <Input id="tutor-city" value={draft.city} onChange={(e) => set({ city: e.target.value })} autoComplete="address-level2" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Headline" required htmlFor="tutor-headline" hint="One line, e.g. “Physics tutor for JEE & NEET”." error={errors.headline}>
                <Input id="tutor-headline" value={draft.headline} maxLength={80} onChange={(e) => set({ headline: e.target.value })} aria-invalid={!!errors.headline} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Introduction" htmlFor="tutor-intro" hint={`${draft.intro.length}/400 · How you teach and who you help.`}>
                <Textarea id="tutor-intro" value={draft.intro} maxLength={400} onChange={(e) => set({ intro: e.target.value })} className="min-h-24" />
              </Field>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection title="What you teach">
          <div className="flex flex-col gap-5">
            <Field label="Subjects" required error={errors.subjects}>
              <ChipGroup ariaLabel="Subjects" options={[...subjectOptions]} selected={draft.subjects} onToggle={(v) => set({ subjects: toggle(draft.subjects, v) })} />
            </Field>
            <Field label="Exam preparation">
              <ChipGroup ariaLabel="Exam preparation" options={[...examOptions]} selected={draft.exams} onToggle={(v) => set({ exams: toggle(draft.exams, v) })} />
            </Field>
            <Field label="Class levels" required error={errors.levels}>
              <ChipGroup ariaLabel="Class levels" options={[...levelOptions]} selected={draft.levels} onToggle={(v) => set({ levels: toggle(draft.levels, v) })} />
            </Field>
          </div>
        </DashboardSection>

        <DashboardSection title="How you teach">
          <div className="flex flex-col gap-5">
            <Field label="Teaching mode" required error={errors.modes}>
              <ChipGroup ariaLabel="Teaching mode" options={[...modeOptions]} selected={draft.modes} onToggle={(v) => set({ modes: toggle(draft.modes, v) })} />
            </Field>
            <Field label="Languages">
              <ChipGroup ariaLabel="Languages" options={[...languageOptions]} selected={draft.languages} onToggle={(v) => set({ languages: toggle(draft.languages, v) })} />
            </Field>
          </div>
        </DashboardSection>

        <div className="sticky bottom-0 z-20 -mx-4 flex items-center justify-end gap-2 border-t bg-card/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:mx-0 sm:rounded-[12px] sm:border">
          <span className="mr-auto text-xs text-muted-foreground" aria-live="polite">
            {dirty ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <Button variant="outline" className="h-10 px-4 text-sm" disabled={!dirty} onClick={() => { setDraft(state.profile); setErrors({}) }}>
            Discard
          </Button>
          <Button variant="cta" className="h-10 px-5 text-sm font-semibold" disabled={!dirty || saving} onClick={save}>
            Save Profile
          </Button>
        </div>
      </div>

      <aside aria-label="Listing preview" className="min-w-0 xl:sticky xl:top-20 xl:self-start">
        <DashboardSection title="Live preview" description="How your card appears in tutor listings.">
          <div inert>
            <TutorResultCard tutor={previewTutor(draft)} />
          </div>
        </DashboardSection>
      </aside>
    </div>
  )
}
