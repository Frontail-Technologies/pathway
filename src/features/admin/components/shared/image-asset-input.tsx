'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Link as LinkIcon, Trash2, RefreshCw, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ImageAssetInput({
  mode,
  onModeChange,
  selectedFile,
  previewUrl,
  fileError,
  onSelectFile,
  onRemoveFile,
  urlValue,
  onUrlChange,
  label = 'Hero image',
  inputId = 'hero-image-upload-input',
  urlInputId = 'content-hero-url',
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
  label?: string
  inputId?: string
  urlInputId?: string
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [urlImageError, setUrlImageError] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onSelectFile(files[0])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onSelectFile(files[0])
    }
  }

  const modeButton = (value: 'upload' | 'url', label: string, Icon: typeof Upload) => (
    <button
      type="button"
      role="radio"
      aria-checked={mode === value}
      onClick={() => onModeChange(value)}
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
        mode === value ? 'bg-card text-foreground ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  )

  const fileActions = (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5">
        <RefreshCw className="size-3.5" aria-hidden="true" />
        Replace
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onRemoveFile} className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive">
        <Trash2 className="size-3.5" aria-hidden="true" />
        Remove
      </Button>
    </div>
  )

  return (
    <div className="space-y-3">
      {/* The caller renders the field label; this is only the source switch. */}
      <div role="radiogroup" aria-label={`${label} source`} className="flex w-fit items-center gap-0.5 rounded-lg bg-muted p-0.5">
        {modeButton('upload', 'Upload', Upload)}
        {modeButton('url', 'From URL', LinkIcon)}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id={inputId} aria-label={`Upload ${label.toLowerCase()}`} />

      {mode === 'upload' && (
        <div className="space-y-3">
          {!selectedFile && !previewUrl ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Choose or drop an image for ${label.toLowerCase()}`}
              className={cn(
                'flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed p-6 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                isDragging ? 'border-primary bg-accent' : 'border-border hover:border-primary/50 hover:bg-muted/40'
              )}
            >
              <Upload className="mb-1 size-5 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm text-foreground">
                <span className="font-medium text-primary">Choose an image</span> or drag it here
              </p>
              <p className="text-[13px] text-muted-foreground">PNG, JPG, WebP or SVG, up to 5 MB</p>
            </div>
          ) : !selectedFile && previewUrl ? (
            <div className="space-y-3">
              <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt={`Current ${label.toLowerCase()}`} className="size-full object-cover" />
              </div>
              {fileActions}
            </div>
          ) : selectedFile ? (
            <div className="space-y-3">
              {previewUrl && (
                <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt={`Selected ${label.toLowerCase()} preview`} className="size-full object-cover" />
                </div>
              )}
              <div className="flex flex-col justify-between gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {formatFileSize(selectedFile.size)} · {selectedFile.type || 'image'}
                  </p>
                </div>
                {fileActions}
              </div>
              <p className="text-[13px] text-muted-foreground">Preview only. Uploading needs file storage, which is not connected yet.</p>
            </div>
          ) : null}

          {fileError && (
            <p className="flex items-center gap-1.5 text-[13px] text-destructive" role="alert">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              {fileError}
            </p>
          )}
        </div>
      )}

      {mode === 'url' && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor={urlInputId} className="text-sm font-medium">
              Image URL
            </Label>
            <div className="flex gap-2">
              <Input
                id={urlInputId}
                value={urlValue}
                onChange={(e) => {
                  setUrlImageError(false)
                  onUrlChange(e.target.value)
                }}
                placeholder="https://… or /images/…"
                className="h-9 text-sm"
              />
              {urlValue && (
                <Button type="button" variant="ghost" onClick={() => onUrlChange('')} className="h-9 text-muted-foreground hover:text-foreground">
                  Clear
                </Button>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground">An HTTPS link or a path to an image on this site.</p>
          </div>

          {urlValue ? (
            <div className="flex aspect-video w-full max-w-md items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
              {urlImageError ? (
                <p className="p-4 text-center text-[13px] text-muted-foreground">This image couldn&apos;t be loaded. Check the URL.</p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={urlValue} alt={`${label} preview`} className="size-full object-cover" onError={() => setUrlImageError(true)} />
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export { ImageAssetInput as ContentHeroMediaInput }
