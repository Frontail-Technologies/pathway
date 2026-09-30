'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Link as LinkIcon, Image as ImageIcon, Trash2, RefreshCw, AlertCircle, Info } from 'lucide-react'
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg w-fit border border-border/50">
        <Button
          type="button"
          variant={mode === 'upload' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('upload')}
          className={cn('h-7 px-2.5 text-xs font-semibold', mode === 'upload' && 'bg-card shadow-xs')}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Image</span>
        </Button>

        <Button
          type="button"
          variant={mode === 'url' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('url')}
          className={cn('h-7 px-2.5 text-xs font-semibold', mode === 'url' && 'bg-card shadow-xs')}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image URL</span>
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        id={inputId}
        aria-label={`Upload ${label} file`}
      />

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
              aria-label={`Click or drag image file to select ${label}`}
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary/20 space-y-2.5',
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border/80 hover:border-primary/50 hover:bg-muted/30 bg-muted/10'
              )}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Upload className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-foreground">
                  Click to choose image or drag & drop here
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PNG, JPG, WebP, SVG • Maximum size 5 MB
                </p>
              </div>
            </div>
          ) : !selectedFile && previewUrl ? (
            <div className="space-y-3">
              <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border/60 bg-muted">
                <img
                  src={previewUrl}
                  alt={`Current ${label}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 text-xs font-medium gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRemoveFile}
                  className="h-8 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>
          ) : selectedFile ? (
            <div className="space-y-3">
              {previewUrl && (
                <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border/60 bg-muted">
                  <img
                    src={previewUrl}
                    alt={`Selected ${label} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-muted/20 rounded-lg border border-border/60 text-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="font-semibold text-foreground truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type || 'image'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs font-medium gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replace</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onRemoveFile}
                    className="h-8 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Info className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                <span>Image selected for local preview. Uploading requires the Admin Storage API.</span>
              </div>
            </div>
          ) : null}

          {fileError && (
            <div className="flex items-center gap-1.5 text-[11px] text-destructive font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}
        </div>
      )}

      {mode === 'url' && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor={urlInputId} className="text-xs font-semibold">
              {label} URL
            </Label>
            <div className="flex gap-2">
              <Input
                id={urlInputId}
                value={urlValue}
                onChange={(e) => {
                  setUrlImageError(false)
                  onUrlChange(e.target.value)
                }}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="text-xs font-mono"
              />
              {urlValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onUrlChange('')}
                  className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Enter a valid HTTPS image URL or static asset path.
            </p>
          </div>

          {urlValue ? (
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground block">Live Image Preview</span>
              <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border/60 bg-muted flex items-center justify-center">
                {urlImageError ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Unable to load image from URL. Please check the URL syntax.
                  </div>
                ) : (
                  <img
                    src={urlValue}
                    alt={`${label} preview`}
                    className="w-full h-full object-cover"
                    onError={() => setUrlImageError(true)}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
              No hero image selected.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { ImageAssetInput as ContentHeroMediaInput }
