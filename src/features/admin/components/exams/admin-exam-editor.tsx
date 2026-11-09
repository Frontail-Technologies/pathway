'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CalendarClock, ClipboardCheck, FileText, Info, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import type { Exam } from '@/features/exams/data/exams'
import { logAdminActivity } from '@/features/admin/data/admin-activity'
import { examLevelOptions, examScopeOptions, examStudyAreaOptions, examToFormValues, readExamEdits, saveExamEdit, type ExamFormValues } from '@/features/admin/data/admin-exams'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminEditorSectionNav } from '../admin-editor-section-nav'
import { AdminEditorLayout } from '../shared/admin-editor-layout'
import { AdminPageHeader } from '../kit'
import { DemoNote, Field, FormSection, FormSelect, PairRowsEditor, ToggleRow } from '../demo/demo-form'
import { AdminFormFooter } from '../admin-form-footer'

const SECTIONS = [
  { id: 'basics', label: 'Basics', icon: Info },
  { id: 'dates', label: 'Dates & process', icon: CalendarClock },
  { id: 'eligibility', label: 'Eligibility', icon: ClipboardCheck },
  { id: 'pattern', label: 'Pattern', icon: FileText },
  { id: 'seo', label: 'SEO', icon: Search },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const toOptions = <T extends string>(values: readonly T[]) => values.map((value) => ({ value, label: value }))

type Errors = Partial<Record<'name' | 'shortName' | 'slug' | 'description', string>>

function validate(values: ExamFormValues): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Enter the full exam name.'
  if (!values.shortName.trim()) errors.shortName = 'Enter a short name, e.g. JEE Main.'
  if (!values.slug.trim()) errors.slug = 'Enter a URL slug.'
  else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) errors.slug = 'Use lowercase letters, numbers and hyphens only.'
  if (!values.description.trim()) errors.description = 'Add a one-line listing description.'
  return errors
}

export function AdminExamEditor({ exam, mode }: { exam?: Exam; mode: 'add' | 'edit' }) {
  const router = useRouter()
  const [values, setValues] = React.useState<ExamFormValues>(() => examToFormValues(exam))
  const [baseline, setBaseline] = React.useState(() => JSON.stringify(examToFormValues(exam)))
  const [errors, setErrors] = React.useState<Errors>({})
  const [activeSection, setActiveSection] = React.useState('basics')
  const [slugTouched, setSlugTouched] = React.useState(mode === 'edit')

  React.useEffect(() => {
    if (!exam) return
    const stored = readExamEdits()[exam.id]
    if (stored) {
      setValues(stored.values)
      setBaseline(JSON.stringify(stored.values))
    }
  }, [exam])

  const dirty = JSON.stringify(values) !== baseline
  useUnsavedChanges(dirty)

  const set = <K extends keyof ExamFormValues>(key: K, value: ExamFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    if (key in errors) setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const cancelHref = exam ? `/admin/exams/${exam.id}` : '/admin/exams'
  const cancel = () => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(cancelHref)
  }

  const goTo = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Check the highlighted fields')
      goTo('basics')
      return
    }
    if (mode === 'edit' && exam) {
      saveExamEdit(exam.id, values)
      logAdminActivity({ area: 'Exams', action: 'Updated', label: values.shortName, href: `/admin/exams/${exam.id}` })
      setBaseline(JSON.stringify(values))
      toast.success(`${values.shortName} saved`, { description: 'Demo: changes are saved on this device only.' })
      router.push(`/admin/exams/${exam.id}`)
    } else {
      logAdminActivity({ area: 'Exams', action: 'Created', label: values.shortName })
      setBaseline(JSON.stringify(values))
      toast.success(`${values.shortName} created`, { description: 'Demo: the exam is not added to the catalogue; the action is recorded in the activity log on this device.' })
      router.push('/admin/exams')
    }
  }

  const fieldIds: Record<keyof Errors, string> = { name: 'exam-name', shortName: 'exam-short', slug: 'exam-slug', description: 'exam-description' }
  const fieldError = (key: keyof Errors) => (errors[key] ? { 'aria-invalid': true as const, 'aria-describedby': `${fieldIds[key]}-error` } : {})

  return (
    <form id="exam-editor-form" onSubmit={submit} className="space-y-5" noValidate>
      <AdminPageHeader
        back={exam ? { href: `/admin/exams/${exam.id}`, label: exam.shortName } : { href: '/admin/exams', label: 'Exams' }}
        title={mode === 'edit' ? `Edit ${exam?.shortName ?? 'exam'}` : 'Add exam'}
        description={mode === 'edit' ? 'Update the listing and the content of the public exam page.' : 'Create a listing for an entrance exam.'}
        meta={<DemoNote />}
      />

      <AdminEditorLayout navigation={<AdminEditorSectionNav sections={SECTIONS} activeSectionId={activeSection} onSectionChange={goTo} />}>
        <FormSection id="basics" title="Basics" description="How the exam appears in listings and search.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="exam-name" label="Full name" required error={errors.name} className="sm:col-span-2">
              <Input
                id="exam-name"
                value={values.name}
                onChange={(event) => set('name', event.target.value)}
                placeholder="Joint Entrance Examination Main"
                className="h-9"
                {...fieldError('name')}
              />
            </Field>
            <Field id="exam-short" label="Short name" required error={errors.shortName}>
              <Input
                id="exam-short"
                value={values.shortName}
                onChange={(event) => {
                  set('shortName', event.target.value)
                  if (!slugTouched) set('slug', slugify(event.target.value))
                }}
                placeholder="JEE Main"
                className="h-9"
                {...fieldError('shortName')}
              />
            </Field>
            <Field id="exam-slug" label="URL slug" required error={errors.slug} hint={values.slug ? `/exam/${values.slug}` : 'Used in the public page address.'}>
              <Input
                id="exam-slug"
                value={values.slug}
                onChange={(event) => {
                  setSlugTouched(true)
                  set('slug', event.target.value)
                }}
                placeholder="jee-main"
                className="h-9 font-mono text-[13px]"
                {...fieldError('slug')}
              />
            </Field>
            <Field id="exam-area" label="Study area">
              <FormSelect id="exam-area" value={values.studyArea} onChange={(v) => set('studyArea', v)} options={toOptions(examStudyAreaOptions)} />
            </Field>
            <Field id="exam-level" label="Level">
              <FormSelect id="exam-level" value={values.level} onChange={(v) => set('level', v)} options={toOptions(examLevelOptions)} />
            </Field>
            <Field id="exam-scope" label="Scope">
              <FormSelect id="exam-scope" value={values.scope} onChange={(v) => set('scope', v)} options={toOptions(examScopeOptions)} />
            </Field>
            <Field id="exam-body" label="Conducting body">
              <Input id="exam-body" value={values.conductingBody} onChange={(event) => set('conductingBody', event.target.value)} placeholder="National Testing Agency" className="h-9" />
            </Field>
            <Field id="exam-description" label="Listing description" required error={errors.description} className="sm:col-span-2">
              <Textarea id="exam-description" rows={2} value={values.description} onChange={(event) => set('description', event.target.value)} {...fieldError('description')} />
            </Field>
            <Field id="exam-long" label="Page introduction" hint="Shown at the top of the public exam page." className="sm:col-span-2">
              <Textarea id="exam-long" rows={3} value={values.longDescription} onChange={(event) => set('longDescription', event.target.value)} />
            </Field>
          </div>
          <div className="space-y-4 border-t border-border pt-4">
            <ToggleRow title="Public page" description="Publish a detail page at /exam/<slug>. Off keeps the exam in listings only." control={<Switch checked={values.hasDetailPage} onCheckedChange={(v) => set('hasDetailPage', v)} aria-label="Public page" />} />
            <ToggleRow title="Popular" description="Show the exam in popular exam lists." control={<Switch checked={values.popular} onCheckedChange={(v) => set('popular', v)} aria-label="Popular" />} />
          </div>
        </FormSection>

        <FormSection id="dates" title="Dates & process" description="Pathway doesn't track live dates; point students to the official notification.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="exam-official" label="Official website" hint="Where dates and notifications are published.">
              <Input id="exam-official" type="url" value={values.officialUrl} onChange={(event) => set('officialUrl', event.target.value)} placeholder="https://" className="h-9" />
            </Field>
            <Field id="exam-dates" label="Dates note" hint="e.g. Session 1 usually in January.">
              <Input id="exam-dates" value={values.datesNote} onChange={(event) => set('datesNote', event.target.value)} className="h-9" />
            </Field>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Process steps</p>
            <PairRowsEditor idPrefix="exam-step" rows={values.processSteps} onChange={(rows) => set('processSteps', rows)} aLabel="Step title" bLabel="Step detail" aPlaceholder="Step" bPlaceholder="What the student does" addLabel="Add step" emptyText="No process steps yet." />
          </div>
        </FormSection>

        <FormSection id="eligibility" title="Eligibility" description="Rules students check before registering.">
          <PairRowsEditor idPrefix="exam-elig" rows={values.eligibility} onChange={(rows) => set('eligibility', rows)} aLabel="Criterion" bLabel="Requirement" aPlaceholder="Qualification" bPlaceholder="Class 12 with PCM" addLabel="Add criterion" emptyText="No eligibility rules yet." />
        </FormSection>

        <FormSection id="pattern" title="Pattern" description="Exam format and the subjects it covers.">
          <PairRowsEditor idPrefix="exam-pattern" rows={values.pattern} onChange={(rows) => set('pattern', rows)} aLabel="Attribute" bLabel="Value" aPlaceholder="Mode" bPlaceholder="Computer-based test" addLabel="Add row" emptyText="No pattern details yet." />
          <Field id="exam-syllabus" label="Syllabus subjects" hint="Separate subjects with commas.">
            <Input id="exam-syllabus" value={values.syllabus} onChange={(event) => set('syllabus', event.target.value)} placeholder="Physics, Chemistry, Mathematics" className="h-9" />
          </Field>
        </FormSection>

        <FormSection id="seo" title="SEO" description="Title and description search engines show for the public page.">
          <Field id="exam-seo-title" label="Meta title" hint={`${values.seoTitle.length} of 60 characters`}>
            <Input id="exam-seo-title" value={values.seoTitle} onChange={(event) => set('seoTitle', event.target.value)} className="h-9" />
          </Field>
          <Field id="exam-seo-description" label="Meta description" hint={`${values.seoDescription.length} of 160 characters`}>
            <Textarea id="exam-seo-description" rows={3} value={values.seoDescription} onChange={(event) => set('seoDescription', event.target.value)} />
          </Field>
          <div className="rounded-lg border border-border p-4">
            <p className="text-[13px] text-muted-foreground">Search preview</p>
            <p className="mt-2 truncate text-sm font-medium text-primary">{values.seoTitle || values.shortName || 'Exam title'}</p>
            <p className="truncate text-[13px] text-success">pathway · /exam/{values.slug || 'slug'}</p>
            <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{values.seoDescription || values.description || 'Meta description'}</p>
          </div>
        </FormSection>

        <AdminFormFooter formId="exam-editor-form" submitLabel={mode === 'edit' ? 'Save changes' : 'Create exam'} onCancel={cancel} />
      </AdminEditorLayout>
    </form>
  )
}
