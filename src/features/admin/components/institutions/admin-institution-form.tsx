'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { CompletenessMeter, FactList, Panel } from '../kit'

export type InstitutionFormValues = {
  name: string
  type: 'Government' | 'Private' | 'Deemed'
  city: string
  state: string
  approval: string
  description: string
  website: string
  imageUrl: string
}

export type AdminInstitutionFormProps = {
  institution?: AdminInstitution | null
  mode?: 'add' | 'edit'
  onCancel: () => void
}

const TYPE_OPTIONS = [
  { value: 'Government', label: 'Government' },
  { value: 'Private', label: 'Private' },
  { value: 'Deemed', label: 'Deemed' },
]

const defaultValues: InstitutionFormValues = {
  name: '',
  type: 'Government',
  city: '',
  state: '',
  approval: 'UGC Approved',
  description: '',
  website: '',
  imageUrl: '',
}

function initialValuesFor(institution: AdminInstitution | null | undefined, mode: 'add' | 'edit'): InstitutionFormValues {
  if (mode !== 'edit' || !institution) return defaultValues
  return {
    name: institution.name || '',
    type: institution.type || 'Government',
    city: institution.city || '',
    state: institution.state || '',
    approval: institution.approval || 'UGC Approved',
    description: institution.popularCourse ? `Premier institution with popular program: ${institution.popularCourse}` : '',
    website: '',
    imageUrl: '',
  }
}

type Errors = Partial<Record<keyof InstitutionFormValues, string>>

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-[13px] text-destructive">
      {message}
    </p>
  )
}

function RequiredMark() {
  return (
    <span className="text-muted-foreground" aria-hidden="true">
      {' '}
      *
    </span>
  )
}

export function AdminInstitutionForm({ institution, mode = 'add', onCancel }: AdminInstitutionFormProps) {
  const initialValues = React.useMemo(() => initialValuesFor(institution, mode), [institution, mode])
  const [values, setValues] = React.useState<InstitutionFormValues>(initialValues)
  const [errors, setErrors] = React.useState<Errors>({})
  const [imageMode, setImageMode] = React.useState<'upload' | 'url'>('upload')
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
  const [imageFileError, setImageFileError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setValues(initialValues)
    setErrors({})
    setImageMode('upload')
    setSelectedImageFile(null)
    setImagePreviewUrl(null)
    setImageFileError(null)
  }, [initialValues])

  React.useEffect(() => {
    return () => {
      if (imagePreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(imagePreviewUrl)
    }
  }, [imagePreviewUrl])

  const dirty = selectedImageFile !== null || (Object.keys(values) as (keyof InstitutionFormValues)[]).some((key) => values[key] !== initialValues[key])
  useUnsavedChanges(dirty)

  function update<K extends keyof InstitutionFormValues>(key: K, value: InstitutionFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function selectImageFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setImageFileError('Choose an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageFileError('Image files must be 5 MB or smaller.')
      return
    }
    setImageFileError(null)
    setSelectedImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  function removeImageFile() {
    setSelectedImageFile(null)
    setImagePreviewUrl(null)
    setImageFileError(null)
  }

  function validate(): boolean {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Enter the institution name.'
    if (!values.type) next.type = 'Choose a type.'
    if (!values.city.trim()) next.city = 'Enter a city.'
    if (!values.state.trim()) next.state = 'Enter a state.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!validate()) {
      toast.error('Check the highlighted fields')
      return
    }
    toast('Changes not saved', { description: 'Saving institutions needs the admin API, which is not connected yet.' })
  }

  function handleCancel() {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    onCancel()
  }

  const isEdit = mode === 'edit'
  const inputClass = 'h-9 text-sm'

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <form id="institution-form" onSubmit={handleSubmit} noValidate className="space-y-6 lg:col-span-8">
        <Panel title="Basics">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="inst-name" className="text-sm font-medium">
                Name
                <RequiredMark />
              </Label>
              <Input
                id="inst-name"
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="e.g. Indian Institute of Technology Delhi"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'inst-name-error' : undefined}
                className={inputClass}
              />
              <FieldError id="inst-name-error" message={errors.name} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="inst-type" className="text-sm font-medium">
                  Type
                  <RequiredMark />
                </Label>
                <Select items={TYPE_OPTIONS} value={values.type} onValueChange={(value) => update('type', ((value as InstitutionFormValues['type'] | null) ?? 'Government'))}>
                  <SelectTrigger id="inst-type" className="h-9 w-full text-sm" aria-invalid={!!errors.type}>
                    <SelectValue placeholder="Choose a type">{values.type}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="inst-type-error" message={errors.type} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-approval" className="text-sm font-medium">
                  Approval and accreditation
                </Label>
                <Input id="inst-approval" value={values.approval} onChange={(event) => update('approval', event.target.value)} placeholder="e.g. UGC, AICTE" className={inputClass} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inst-desc" className="text-sm font-medium">
                Short description
              </Label>
              <Textarea id="inst-desc" value={values.description} onChange={(event) => update('description', event.target.value)} placeholder="What the institution is known for" rows={3} className="resize-none text-sm" />
              <p className="text-[13px] text-muted-foreground">One or two sentences shown in search results and listings.</p>
            </div>
          </div>
        </Panel>

        <Panel title="Location">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="inst-city" className="text-sm font-medium">
                City
                <RequiredMark />
              </Label>
              <Input id="inst-city" value={values.city} onChange={(event) => update('city', event.target.value)} placeholder="e.g. New Delhi" aria-invalid={!!errors.city} aria-describedby={errors.city ? 'inst-city-error' : undefined} className={inputClass} />
              <FieldError id="inst-city-error" message={errors.city} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inst-state" className="text-sm font-medium">
                State
                <RequiredMark />
              </Label>
              <Input id="inst-state" value={values.state} onChange={(event) => update('state', event.target.value)} placeholder="e.g. Delhi" aria-invalid={!!errors.state} aria-describedby={errors.state ? 'inst-state-error' : undefined} className={inputClass} />
              <FieldError id="inst-state-error" message={errors.state} />
            </div>
          </div>
        </Panel>

        <Panel title="Website and image">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="inst-website" className="text-sm font-medium">
                Official website
              </Label>
              <Input id="inst-website" type="url" value={values.website} onChange={(event) => update('website', event.target.value)} placeholder="https://" className={inputClass} />
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-foreground">Cover image</p>
                <p className="text-[13px] text-muted-foreground">Shown at the top of the public page. Landscape, 16:9 works best.</p>
              </div>
            <ImageAssetInput
              mode={imageMode}
              onModeChange={setImageMode}
              selectedFile={selectedImageFile}
              previewUrl={imagePreviewUrl}
              fileError={imageFileError}
              onSelectFile={selectImageFile}
              onRemoveFile={removeImageFile}
              urlValue={values.imageUrl}
              onUrlChange={(imageUrl) => update('imageUrl', imageUrl)}
              label="Cover image"
              inputId="institution-cover-image-upload"
              urlInputId="institution-cover-image-url"
            />
            </div>
          </div>
        </Panel>
      </form>

      <aside className="space-y-6 lg:sticky lg:top-[4.5rem] lg:col-span-4">
        <Panel>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button type="submit" form="institution-form" className="h-9 flex-1">
                {isEdit ? 'Save changes' : 'Create institution'}
              </Button>
              <Button type="button" variant="outline" className="h-9" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
            <p className="text-[13px] text-muted-foreground">{dirty ? 'You have unsaved changes.' : isEdit ? 'No changes yet.' : 'Fields marked * are required.'}</p>
          </div>
        </Panel>

        <Panel title="Summary">
          <div className="space-y-4">
            <FactList
              columns={1}
              items={[
                { label: 'Name', value: values.name.trim() || <span className="font-normal text-muted-foreground">Not set</span> },
                { label: 'Type', value: values.type },
                {
                  label: 'Location',
                  value: [values.city.trim(), values.state.trim()].filter(Boolean).join(', ') || <span className="font-normal text-muted-foreground">Not set</span>,
                },
              ]}
            />
            {isEdit && institution ? (
              <div>
                <p className="mb-1 text-[13px] text-muted-foreground">Profile completeness</p>
                <CompletenessMeter value={institution.completeness} />
              </div>
            ) : null}
            <p className="text-[13px] text-muted-foreground">Courses, fees and admissions are managed in their own sections once the institution exists.</p>
          </div>
        </Panel>
      </aside>
    </div>
  )
}
