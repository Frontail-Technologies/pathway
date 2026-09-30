'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { bannerPlacementMap, BannerPlacement } from '@/features/banners/types/banner'
import type { BannerFormData } from './use-banner-editor'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'

function MediaInputItem({
  label,
  description,
  mode,
  onModeChange,
  selectedFile,
  previewUrl,
  fileError,
  onSelectFile,
  onRemoveFile,
  urlValue,
  onUrlChange,
  inputId,
}: {
  label: string
  description: string
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
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4">
      <div>
        <h3 className="text-xs font-bold text-foreground">{label}</h3>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>

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
        label={label}
        inputId={inputId}
        urlInputId={`${inputId}-url`}
      />
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
  const placementMeta = bannerPlacementMap[placement] || {
    label: 'Custom Placement',
    surface: 'Custom',
    recommendedWidth: 1200,
    recommendedHeight: 400,
    ratioLabel: '3:1',
    dimensionsLabel: '1200 x 400 px - 3:1',
    description: 'Custom placement surface',
  }

  return (
    <div id="media" className="space-y-5 rounded-xl border-0 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 className="text-sm font-bold text-foreground">Creative & Media Assets</h2>
        <Badge variant="muted" size="sm">
          Recommended: {placementMeta.dimensionsLabel}
        </Badge>
      </div>

      <div className="space-y-4">
        <MediaInputItem
          label="Desktop Banner Image"
          description="Primary background or hero artwork rendered on tablet and desktop screens."
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

        <MediaInputItem
          label="Mobile Banner Image"
          description="Alternate artwork crop for compact mobile viewports. If omitted, desktop artwork is used."
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

        <div className="space-y-1.5">
          <Label htmlFor="banner-alt" className="text-xs font-semibold text-foreground">
            Accessibility Alt Text
          </Label>
          <Input
            id="banner-alt"
            value={formData.imageAlt}
            onChange={(e) => onChange('imageAlt', e.target.value)}
            placeholder="e.g. Promotional illustration for Engineering College Predictor tool"
            className="text-xs"
          />
          <p className="text-[10px] text-muted-foreground">
            Descriptive text for screen readers and search accessibility.
          </p>
        </div>
      </div>
    </div>
  )
}
