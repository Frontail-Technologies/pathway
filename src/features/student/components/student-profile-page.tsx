'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Camera, Check, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, OptionSelect, softInputClass } from '@/components/shared/student-tool/tool-fields'
import {
  OTHER_GOAL,
  applyDraft,
  careerGoalOptions,
  experienceTypeOptions,
  graduationYearOptions,
  hasErrors,
  streamOptions,
  studyLevelOptions,
  toDraft,
  validateDraft,
  type DraftErrors,
  type ProfileDraft,
} from '../data/profile-form'
import { getProfileCompletion, initialsOf, type ProfileFieldKey, type WorkExperienceType } from '../data/student'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useStudentProfile } from '../state/student-profile-provider'
import { DashboardSection, StudentPageHeader } from './dashboard-parts'

const MAX_PHOTO_BYTES = 5 * 1024 * 1024

 
const fieldSection: Partial<Record<ProfileFieldKey, string>> = {
  name: 'personal',
  email: 'personal',
  phone: 'personal',
  city: 'personal',
  studyLevel: 'education',
  stream: 'education',
  graduationYear: 'education',
  careerGoal: 'career-goal',
}
const fieldLabels: Record<ProfileFieldKey, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone number',
  city: 'City',
  studyLevel: 'Study level',
  stream: 'Stream',
  graduationYear: 'Passing year',
  preferredCourse: 'Preferred course',
  preferredExam: 'Preferred exams',
  preferredLocation: 'Preferred study location',
  careerGoal: 'Career goal',
}

export function StudentProfilePage() {
  const { hydrated } = useStudentProfile()
  
  return hydrated ? <ProfileEditor /> : <div className="h-96 w-full" aria-hidden="true" />
}

function ProfileEditor() {
  const { profile, photoUrl, saveProfile, uploadPhoto, removePhoto } = useStudentProfile()
  const [saving, setSaving] = useState(false)
  const [photoBusy, setPhotoBusy] = useState(false)
  const [draft, setDraft] = useState<ProfileDraft>(() => toDraft(profile))
  const [errors, setErrors] = useState<DraftErrors>({})
  const [photoError, setPhotoError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  const completion = getProfileCompletion(profile)
  const saved = useMemo(() => JSON.stringify(toDraft(profile)), [profile])
  const dirty = JSON.stringify(draft) !== saved

  const set = <K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) => setDraft((prev) => ({ ...prev, [key]: value }))
  const updateExperience = (id: string, patch: Partial<ProfileDraft['experience'][number]>) => set('experience', draft.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const onPhoto = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) return setPhotoError('Please choose an image file.')
    if (file.size > MAX_PHOTO_BYTES) return setPhotoError('Please choose an image under 5 MB.')
    setPhotoError('')
    setPhotoBusy(true)
    uploadPhoto(file)
      .then(() => toast.success('Profile photo updated.'))
      .catch((error: unknown) => setPhotoError(error instanceof Error ? error.message : 'The photo could not be uploaded.'))
      .finally(() => setPhotoBusy(false))
  }

  const onRemovePhoto = () => {
    setPhotoBusy(true)
    removePhoto()
      .catch(() => toast.error('Could not remove the photo. Please try again.'))
      .finally(() => setPhotoBusy(false))
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const found = validateDraft(draft)
    setErrors(found)
    if (hasErrors(found)) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setSaving(true)
    saveProfile(applyDraft(profile, draft))
      .then(() => toast.success('Profile saved.'))
      .catch((error: unknown) => {
        if (error instanceof ApiRequestError && Object.keys(error.fields).length) setErrors(error.fields as DraftErrors)
        toast.error(error instanceof Error ? error.message : 'Could not save your profile. Please try again.')
      })
      .finally(() => setSaving(false))
  }

  const experienceError = (id: string) => errors.experience?.[id]

  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <StudentPageHeader
        title="My profile"
        subtitle="Your personal, education and career details"
        action={<span className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-primary">{completion.percent}% complete</span>}
      />

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <form ref={formRef} onSubmit={onSubmit} noValidate className="flex min-w-0 flex-col gap-5">
          <DashboardSection id="personal" className="scroll-mt-section" title="Personal details" art="tutor">
            <div className="flex items-center gap-4">
              <span className="relative flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {photoUrl ? (
                  <Image src={photoUrl} alt="Your profile photo preview" fill className="object-cover" />
                ) : (
                  <span aria-hidden="true">{initialsOf(`${draft.firstName} ${draft.lastName}`) || initialsOf(profile.name)}</span>
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Profile photo</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Choose profile photo" onChange={(event) => onPhoto(event.target.files?.[0])} />
                  <Button type="button" variant="outline" className="h-8 gap-1.5 px-3 text-xs" disabled={photoBusy} onClick={() => fileInput.current?.click()}>
                    <Camera className="size-3.5" aria-hidden="true" />
                    {photoBusy ? 'Uploading…' : photoUrl ? 'Change photo' : 'Upload photo'}
                  </Button>
                  {photoUrl && (
                    <Button type="button" variant="ghost" className="h-8 px-3 text-xs" disabled={photoBusy} onClick={onRemovePhoto}>
                      Remove
                    </Button>
                  )}
                </div>
                {photoError && (
                  <p role="alert" className="mt-1 text-xs text-destructive">
                    {photoError}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" required htmlFor="fp-first" error={errors.firstName}>
                <Input id="fp-first" autoComplete="given-name" className={softInputClass} value={draft.firstName} aria-invalid={!!errors.firstName} onChange={(event) => set('firstName', event.target.value)} />
              </Field>
              <Field label="Last name" required htmlFor="fp-last" error={errors.lastName}>
                <Input id="fp-last" autoComplete="family-name" className={softInputClass} value={draft.lastName} aria-invalid={!!errors.lastName} onChange={(event) => set('lastName', event.target.value)} />
              </Field>
              <Field label="Email" required htmlFor="fp-email">
                <Input id="fp-email" type="email" className={softInputClass} value={draft.email} readOnly aria-readonly="true" />
              </Field>
              <Field label="City" required htmlFor="fp-city" error={errors.city}>
                <Input id="fp-city" autoComplete="address-level2" className={softInputClass} value={draft.city} aria-invalid={!!errors.city} onChange={(event) => set('city', event.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="fp-phone" error={errors.phone}>
                <Input id="fp-phone" type="tel" autoComplete="tel" className={softInputClass} value={draft.phone} aria-invalid={!!errors.phone} onChange={(event) => set('phone', event.target.value)} />
              </Field>
            </div>
          </DashboardSection>

          <DashboardSection id="education" className="scroll-mt-section" title="Education" art="college">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current study level">
                <OptionSelect value={draft.studyLevel} onChange={(value) => set('studyLevel', value)} options={studyLevelOptions} placeholder="Select level" />
              </Field>
              <Field label="School / college" htmlFor="fp-institution">
                <Input id="fp-institution" className={softInputClass} value={draft.institution} placeholder="Name of your school or college" onChange={(event) => set('institution', event.target.value)} />
              </Field>
              <Field label="Course / stream">
                <OptionSelect value={draft.stream} onChange={(value) => set('stream', value)} options={streamOptions} placeholder="Select stream" />
              </Field>
              <Field label="Graduation / passing year">
                <OptionSelect value={draft.graduationYear} onChange={(value) => set('graduationYear', value)} options={graduationYearOptions} placeholder="Select year" />
              </Field>
            </div>
          </DashboardSection>

          <DashboardSection id="career-goal" className="scroll-mt-section" title="Career goal" art="guide">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Career goal / direction">
                <OptionSelect value={draft.goalChoice} onChange={(value) => set('goalChoice', value)} options={[...careerGoalOptions, OTHER_GOAL]} placeholder="Select a direction" />
              </Field>
              {draft.goalChoice === OTHER_GOAL && (
                <Field label="Your goal" required htmlFor="fp-goal" error={errors.goalOther}>
                  <Input id="fp-goal" className={softInputClass} value={draft.goalOther} aria-invalid={!!errors.goalOther} onChange={(event) => set('goalOther', event.target.value)} />
                </Field>
              )}
            </div>
          </DashboardSection>

          <DashboardSection id="experience" className="scroll-mt-section" title="Experience" art="presentation">
            {draft.experience.length === 0 ? (
              <p className="text-sm text-muted-foreground">No internships, jobs or projects added.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {draft.experience.map((item, index) => {
                  const itemError = experienceError(item.id)
                  return (
                    <li key={item.id} className="rounded-xl border bg-muted/30 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">Experience {index + 1}</p>
                        <Button type="button" variant="ghost" className="h-8 gap-1.5 px-2 text-xs text-muted-foreground" onClick={() => set('experience', draft.experience.filter((entry) => entry.id !== item.id))}>
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Organisation" required htmlFor={`exp-org-${item.id}`} error={itemError?.organisation}>
                          <Input id={`exp-org-${item.id}`} className={softInputClass} value={item.organisation} aria-invalid={!!itemError?.organisation} onChange={(event) => updateExperience(item.id, { organisation: event.target.value })} />
                        </Field>
                        <Field label="Role" required htmlFor={`exp-role-${item.id}`} error={itemError?.role}>
                          <Input id={`exp-role-${item.id}`} className={softInputClass} value={item.role} aria-invalid={!!itemError?.role} onChange={(event) => updateExperience(item.id, { role: event.target.value })} />
                        </Field>
                        <Field label="Type">
                          <OptionSelect value={item.type ?? ''} onChange={(value) => updateExperience(item.id, { type: (value || undefined) as WorkExperienceType | undefined })} options={experienceTypeOptions} placeholder="Select type" />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Start" htmlFor={`exp-start-${item.id}`}>
                            <Input id={`exp-start-${item.id}`} className={softInputClass} value={item.start ?? ''} placeholder="e.g. Jun 2025" onChange={(event) => updateExperience(item.id, { start: event.target.value })} />
                          </Field>
                          <Field label="End" htmlFor={`exp-end-${item.id}`}>
                            <Input id={`exp-end-${item.id}`} className={softInputClass} value={item.end ?? ''} placeholder="e.g. Aug 2025" onChange={(event) => updateExperience(item.id, { end: event.target.value })} />
                          </Field>
                        </div>
                        <div className="sm:col-span-2">
                          <Field label="Description" htmlFor={`exp-desc-${item.id}`}>
                            <Textarea id={`exp-desc-${item.id}`} rows={3} className="bg-muted/40" value={item.description ?? ''} onChange={(event) => updateExperience(item.id, { description: event.target.value })} />
                          </Field>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
            <Button type="button" variant="outline" className="mt-4 h-9 gap-1.5 px-3 text-sm" onClick={() => set('experience', [...draft.experience, { id: `exp-${Date.now()}-${draft.experience.length}`, organisation: '', role: '' }])}>
              <Plus className="size-4" aria-hidden="true" />
              Add experience
            </Button>
          </DashboardSection>

          <div className="sticky bottom-0 z-20 -mx-4 flex items-center gap-2 border-t bg-card px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:gap-3 lg:static lg:mx-0 lg:justify-between lg:border-0 lg:bg-transparent lg:p-0">
            <Button
              type="button"
              variant="outline"
              className="web-chrome h-11 basis-[42%] px-3 text-sm sm:basis-auto sm:px-5"
              nativeButton={false}
              render={<Link href="/student" onClick={(event) => { if (dirty && !window.confirm('Discard your unsaved changes?')) event.preventDefault() }} />}
            >
              Back to dashboard
            </Button>
            <Button type="submit" variant="cta" className="h-11 flex-1 px-4 text-sm font-semibold sm:flex-none sm:px-6" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>

        <aside aria-label="Profile completion" className="max-xl:hidden xl:sticky xl:top-20">
          <DashboardSection title="Profile strength" art="verified">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-heading text-2xl font-extrabold text-foreground">{completion.percent}%</p>
              <p className="text-xs text-muted-foreground">
                {completion.filled} of {completion.total} details
              </p>
            </div>
            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completion.percent} aria-label="Profile completion" className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-cta" style={{ width: `${completion.percent}%` }} />
            </div>
            <ul className="mt-4 flex flex-col gap-1 border-t pt-3">
              {completion.missing.length === 0 ? (
                <li className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium text-foreground">
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  Every detail is filled in
                </li>
              ) : (
                completion.missing.map((key) => {
                  const section = fieldSection[key]
                  const className = 'group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40'
                  const body = (
                    <>
                      <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-2 border-primary/40" />
                      <span className="min-w-0 flex-1 font-medium text-foreground group-hover:text-primary">{fieldLabels[key]}</span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    </>
                  )
                  return (
                    <li key={key}>
                      {section ? (
                        <a href={`#${section}`} className={className}>
                          {body}
                        </a>
                      ) : (
                        <Link href="/student/preferences" className={className}>
                          {body}
                        </Link>
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </DashboardSection>
        </aside>
      </div>
    </div>
  )
}
