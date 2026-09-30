'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Info, AlertCircle } from 'lucide-react'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'

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

export function AdminInstitutionForm({
  institution,
  mode = 'add',
  onCancel,
}: AdminInstitutionFormProps) {
  const [values, setValues] = React.useState<InstitutionFormValues>(defaultValues)
  const [errors, setErrors] = React.useState<Partial<Record<keyof InstitutionFormValues, string>>>({})
  const [submitNotice, setSubmitNotice] = React.useState<string | null>(null)
  const [imageMode, setImageMode] = React.useState<'upload' | 'url'>('upload')
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
  const [imageFileError, setImageFileError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setSubmitNotice(null)
    setErrors({})
    if (mode === 'edit' && institution) {
      setValues({
        name: institution.name || '',
        type: institution.type || 'Government',
        city: institution.city || '',
        state: institution.state || '',
        approval: institution.approval || 'UGC Approved',
        description: institution.popularCourse ? `Premier institution with popular program: ${institution.popularCourse}` : '',
        website: '',
        imageUrl: '',
      })
    } else {
      setValues(defaultValues)
    }
    setImageMode('upload')
    setSelectedImageFile(null)
    setImagePreviewUrl(null)
    setImageFileError(null)
  }, [institution, mode])

  React.useEffect(() => {
    return () => {
      if (imagePreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

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
    const newErrors: Partial<Record<keyof InstitutionFormValues, string>> = {}
    if (!values.name.trim()) newErrors.name = 'Institution name is required'
    if (!values.type) newErrors.type = 'Institution type is required'
    if (!values.city.trim()) newErrors.city = 'City is required'
    if (!values.state.trim()) newErrors.state = 'State is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitNotice('Saving institutions requires the Admin API. Demo editor — changes are not persisted.')
  }

  const isEdit = mode === 'edit'
  const title = isEdit ? 'Edit Institution' : 'Add New Institution'
  const description = isEdit
    ? `Update catalog details for ${institution?.name || 'institution'}`
    : 'Create a new college or university record in the catalog'
  const closeForm = onCancel

  const formContent = (
    <>
        <div className="px-6 py-5 border-b border-border/80 shrink-0 text-left">
          <h1 className="text-lg font-bold font-heading text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {submitNotice && (
            <div className="p-3.5 rounded-lg bg-secondary text-secondary-foreground flex items-start gap-2.5 border border-primary/15">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs font-medium leading-relaxed">
                {submitNotice}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Basic Information
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="inst-name" className="text-xs font-semibold">
                Institution Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="inst-name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="e.g. Indian Institute of Technology Delhi"
                className="text-xs"
              />
              {errors.name && (
                <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="inst-type" className="text-xs font-semibold">
                  Institution Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  items={[
                    { value: 'Government', label: 'Government' },
                    { value: 'Private', label: 'Private' },
                    { value: 'Deemed', label: 'Deemed' },
                  ]}
                  value={values.type}
                  onValueChange={(val) =>
                    setValues({ ...values, type: (val as 'Government' | 'Private' | 'Deemed') || 'Government' })
                  }
                >
                  <SelectTrigger id="inst-type" className="w-full text-xs">
                    <SelectValue placeholder="Select type">
                      {values.type || 'Select type'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Deemed">Deemed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.type}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-approval" className="text-xs font-semibold">
                  Approval & Accreditation
                </Label>
                <Input
                  id="inst-approval"
                  value={values.approval}
                  onChange={(e) => setValues({ ...values, approval: e.target.value })}
                  placeholder="e.g. UGC / AICTE"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inst-desc" className="text-xs font-semibold">
                Short Description
              </Label>
              <Textarea
                id="inst-desc"
                value={values.description}
                onChange={(e) => setValues({ ...values, description: e.target.value })}
                placeholder="Key highlights and academic focus of the institution..."
                rows={3}
                className="text-xs resize-none"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="inst-city" className="text-xs font-semibold">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="inst-city"
                  value={values.city}
                  onChange={(e) => setValues({ ...values, city: e.target.value })}
                  placeholder="e.g. New Delhi"
                  className="text-xs"
                />
                {errors.city && (
                  <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-state" className="text-xs font-semibold">
                  State <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="inst-state"
                  value={values.state}
                  onChange={(e) => setValues({ ...values, state: e.target.value })}
                  placeholder="e.g. Delhi"
                  className="text-xs"
                />
                {errors.state && (
                  <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.state}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Public Identity & Media
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="inst-website" className="text-xs font-semibold">
                Official Website
              </Label>
              <Input
                id="inst-website"
                type="url"
                value={values.website}
                onChange={(e) => setValues({ ...values, website: e.target.value })}
                placeholder="https://..."
                className="text-xs"
              />
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
              onUrlChange={(imageUrl) => setValues({ ...values, imageUrl })}
              label="Institution cover image"
              inputId="institution-cover-image-upload"
              urlInputId="institution-cover-image-url"
            />
          </div>

          <div className="pt-2">
            <div className="flex flex-row justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={closeForm}
                className="text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="text-xs font-semibold"
              >
                {isEdit ? 'Save Institution' : 'Create Institution'}
              </Button>
            </div>
          </div>
        </form>
    </>
  )

  return <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-xs">{formContent}</div>
}
