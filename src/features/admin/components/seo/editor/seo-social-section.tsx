'use client'

import { Share2 } from 'lucide-react'
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
    <section id="social" className="scroll-mt-20 space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Social Sharing (Open Graph)</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Open Graph Title (Optional)</Label>
          <Input
            placeholder={ogTitle || baselineTitle || 'Default to meta title...'}
            value={ogTitle}
            onChange={(e) => onOgTitleChange(e.target.value)}
            className="h-9 text-sm bg-background"
          />
          <p className="text-[13px] text-muted-foreground">
            Custom title for social cards (Facebook, LinkedIn, X). If left empty, falls back to the resolved Meta Title.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Open Graph Description (Optional)</Label>
          <Textarea
            placeholder={ogDescription || baselineDescription || 'Default to meta description...'}
            value={ogDescription}
            onChange={(e) => onOgDescriptionChange(e.target.value)}
            rows={2}
            className="text-sm bg-background resize-none leading-relaxed"
          />
          <p className="text-[13px] text-muted-foreground">
            Custom description for social cards. If left empty, falls back to the resolved Meta Description.
          </p>
        </div>

        <div className="space-y-1.5 pt-1">
          <Label className="text-sm font-medium text-foreground">Social Share Image (OG Image)</Label>
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
            label="OG image"
            inputId="seo-og-image-upload"
            urlInputId="seo-og-image-url"
          />
        </div>
      </div>
    </section>
  )
}
