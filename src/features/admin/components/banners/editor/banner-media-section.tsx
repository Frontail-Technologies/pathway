'use client'

import { Input } from '@/components/ui/input'
import type { BannerPlacement } from '@/features/banners/types/banner'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'
import { placementDimensions } from '../shared/banner-constants'
import { Field, FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

type ImageInputProps = {
  label: string
  hint: string
  mode: 'upload' | 'url'
  onModeChange: (mode: 'upload' | 'url') => void
  selectedFile: File | null
  previewUrl: string | null
  fileError: string | null
  onSelectFile: (file: File) => void
  onRemoveFile: () => void
  urlValue: string
  onUrlChange: (url: string) => void
  inputId: string
}

function ImageInput({ label, hint, inputId, ...props }: ImageInputProps) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[13px] text-muted-foreground">{hint}</p>
      </div>
      <ImageAssetInput {...props} label={label} inputId={inputId} urlInputId={`${inputId}-url`} />
    </div>
  )
}

export function BannerMediaSection({
  placement,
  desktopMode,
  setDesktopMode,
  selectedDesktopFile,
  desktopPreviewUrl,
  desktopUrlValue,
  setDesktopUrlValue,
  desktopFileError,
  handleSelectDesktopFile,
  handleRemoveDesktopFile,
  mobileMode,
  setMobileMode,
  selectedMobileFile,
  mobilePreviewUrl,
  mobileUrlValue,
  setMobileUrlValue,
  mobileFileError,
  handleSelectMobileFile,
  handleRemoveMobileFile,
  formData,
  onChange,
}: {
  placement: BannerPlacement
  desktopMode: 'upload' | 'url'
  setDesktopMode: (mode: 'upload' | 'url') => void
  selectedDesktopFile: File | null
  desktopPreviewUrl: string | null
  desktopUrlValue: string
  setDesktopUrlValue: (val: string) => void
  desktopFileError: string | null
  handleSelectDesktopFile: (file: File) => void
  handleRemoveDesktopFile: () => void
  mobileMode: 'upload' | 'url'
  setMobileMode: (mode: 'upload' | 'url') => void
  selectedMobileFile: File | null
  mobilePreviewUrl: string | null
  mobileUrlValue: string
  setMobileUrlValue: (val: string) => void
  mobileFileError: string | null
  handleSelectMobileFile: (file: File) => void
  handleRemoveMobileFile: () => void
  formData: BannerFormData
  onChange: (key: keyof BannerFormData, value: string) => void
}) {
  return (
    <FormSection id="media" title="Images" description={`Recommended size ${placementDimensions(placement)}`}>
      <ImageInput
        label="Desktop image"
        hint="Shown on tablets and larger screens."
        mode={desktopMode}
        onModeChange={setDesktopMode}
        selectedFile={selectedDesktopFile}
        previewUrl={desktopPreviewUrl}
        fileError={desktopFileError}
        onSelectFile={handleSelectDesktopFile}
        onRemoveFile={handleRemoveDesktopFile}
        urlValue={desktopUrlValue}
        onUrlChange={setDesktopUrlValue}
        inputId="desktop-image-input"
      />

      <div className="border-t border-border pt-4">
        <ImageInput
          label="Mobile image"
          hint="Optional. Without one, phones show the desktop image."
          mode={mobileMode}
          onModeChange={setMobileMode}
          selectedFile={selectedMobileFile}
          previewUrl={mobilePreviewUrl}
          fileError={mobileFileError}
          onSelectFile={handleSelectMobileFile}
          onRemoveFile={handleRemoveMobileFile}
          urlValue={mobileUrlValue}
          onUrlChange={setMobileUrlValue}
          inputId="mobile-image-input"
        />
      </div>

      <Field id="banner-alt" label="Alt text" hint="Describes the image for screen readers.">
        <Input id="banner-alt" value={formData.imageAlt} onChange={(e) => onChange('imageAlt', e.target.value)} className="text-sm" />
      </Field>
    </FormSection>
  )
}
