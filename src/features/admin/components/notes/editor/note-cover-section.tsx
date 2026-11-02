'use client'

import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'

export function NoteCoverSection({
  coverMode,
  setCoverMode,
  selectedCoverFile,
  coverPreviewUrl,
  coverUrlValue,
  setCoverUrlValue,
  coverFileError,
  handleSelectCoverFile,
  handleRemoveCoverFile,
}: {
  coverMode: 'upload' | 'url'
  setCoverMode: (mode: 'upload' | 'url') => void
  selectedCoverFile: File | null
  coverPreviewUrl: string | null
  coverUrlValue: string
  setCoverUrlValue: (val: string) => void
  coverFileError: string | null
  handleSelectCoverFile: (file: File) => void
  handleRemoveCoverFile: () => void
}) {
  return (
    <div id="cover" className="space-y-5 rounded-lg border border-border bg-card p-5 sm:p-6">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Cover image</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Shown on the note card.
        </p>
      </div>

      <ImageAssetInput
        mode={coverMode}
        onModeChange={setCoverMode}
        selectedFile={selectedCoverFile}
        previewUrl={coverPreviewUrl}
        fileError={coverFileError}
        onSelectFile={handleSelectCoverFile}
        onRemoveFile={handleRemoveCoverFile}
        urlValue={coverUrlValue}
        onUrlChange={setCoverUrlValue}
        label="Note cover image"
        inputId="note-cover-input"
        urlInputId="note-cover-url"
      />
    </div>
  )
}
