'use client'

import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'
import { FormSection } from '../shared/content-form'

export function ContentMediaSection({
  mode,
  onModeChange,
  selectedFile,
  previewUrl,
  fileError,
  onSelectFile,
  onRemoveFile,
  urlValue,
  onUrlChange,
}: {
  mode: 'upload' | 'url'
  onModeChange: (mode: 'upload' | 'url') => void
  selectedFile: File | null
  previewUrl: string | null
  fileError: string | null
  onSelectFile: (file: File) => void
  onRemoveFile: () => void
  urlValue: string
  onUrlChange: (url: string) => void
}) {
  return (
    <FormSection id="media" title="Hero image" description="Landscape, 16:9 works best.">
      <ImageAssetInput
        mode={mode}
        onModeChange={onModeChange}
        selectedFile={selectedFile}
        previewUrl={previewUrl}
        fileError={fileError}
        onSelectFile={onSelectFile}
        onRemoveFile={onRemoveFile}
        urlValue={urlValue}
        onUrlChange={onUrlChange}
      />
    </FormSection>
  )
}
