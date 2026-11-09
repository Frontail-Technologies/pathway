'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'

interface SeoSocialSectionProps {
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageMode: 'upload' | 'url'
  ogImagePreviewUrl: string | null
  onOgTitleChange: (value: string) => void
  onOgDescriptionChange: (value: string) => void
  onOgImageChange: (value: string) => void
  onOgImageModeChange: (mode: 'upload' | 'url') => void
  onImageFileSelect: (file: File) => void
  onRemoveImage: () => void
  baselineTitle: string
  baselineDescription: string
}

export function SeoSocialSection({
  ogTitle,
  ogDescription,
  ogImage,
  ogImageMode,
  ogImagePreviewUrl,
  onOgTitleChange,
  onOgDescriptionChange,
  onOgImageChange,
  onOgImageModeChange,
  onImageFileSelect,
  onRemoveImage,
  baselineTitle,
  baselineDescription,
}: SeoSocialSectionProps) {
  return (
    <section id="social" className="scroll-mt-20 space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Social card</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Social title (optional)</Label>
          <Input
            placeholder={ogTitle || baselineTitle || 'Uses the search title'}
            value={ogTitle}
            onChange={(e) => onOgTitleChange(e.target.value)}
            className="h-9 text-sm bg-background"
          />
          <p className="text-[13px] text-muted-foreground">
            Shown when the page is shared. Leave empty to use the search title.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Social description (optional)</Label>
          <Textarea
            placeholder={ogDescription || baselineDescription || 'Uses the search description'}
            value={ogDescription}
            onChange={(e) => onOgDescriptionChange(e.target.value)}
            rows={2}
            className="text-sm bg-background resize-none leading-relaxed"
          />
          <p className="text-[13px] text-muted-foreground">
            Leave empty to use the search description.
          </p>
        </div>

        <div className="space-y-1.5 pt-1">
          <Label className="text-sm font-medium text-foreground">Social image</Label>
          <ImageAssetInput
            mode={ogImageMode}
            onModeChange={onOgImageModeChange}
            selectedFile={null}
            previewUrl={ogImagePreviewUrl}
            fileError={null}
            onSelectFile={onImageFileSelect}
            onRemoveFile={onRemoveImage}
            urlValue={ogImage}
            onUrlChange={onOgImageChange}
            label="Social image"
            inputId="seo-og-image-upload"
            urlInputId="seo-og-image-url"
          />
        </div>
      </div>
    </section>
  )
}
