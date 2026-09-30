'use client'

import * as React from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { ImageAssetInput } from '@/features/admin/components/shared/image-asset-input'

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
    <div id="media" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Featured / Hero Media</h2>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium">16:9 Landscape Recommended</span>
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
      />
    </div>
  )
}
