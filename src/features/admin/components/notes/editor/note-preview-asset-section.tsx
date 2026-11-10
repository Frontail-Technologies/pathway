'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Link as LinkIcon, RefreshCw, Trash2, AlertCircle, Info, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NotePreviewAssetSection({
  previewMode,
  setPreviewMode,
  selectedPreviewFile,
  previewAssetUrl,
  previewUrlValue,
  setPreviewUrlValue,
  previewFileError,
  handleSelectPreviewFile,
  handleRemovePreviewFile,
}: {
  previewMode: 'upload' | 'url'
  setPreviewMode: (mode: 'upload' | 'url') => void
  selectedPreviewFile: File | null
  previewAssetUrl: string | null
  previewUrlValue: string
  setPreviewUrlValue: (val: string) => void
  previewFileError: string | null
  handleSelectPreviewFile: (file: File) => void
  handleRemovePreviewFile: () => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleSelectPreviewFile(files[0])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div id="preview-asset" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-semibold text-foreground">Sample preview (optional)</h2>
        </div>

        <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg w-fit border border-border/50 shrink-0">
          <button
            type="button"
            onClick={() => setPreviewMode('upload')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer',
              previewMode === 'upload'
                ? 'bg-card text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('url')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer',
              previewMode === 'url'
                ? 'bg-card text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Link</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,image/*,.pdf"
        onChange={handleFileChange}
        className="sr-only"
        id="note-preview-sample-input"
        aria-label="Upload sample preview excerpt"
      />

      {previewMode === 'upload' && (
        <div className="space-y-3">
          {!selectedPreviewFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
              role="button"
              aria-label="Click to select sample preview excerpt"
              className="border-2 border-dashed border-border/80 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors space-y-1.5"
            >
              <Eye className="w-6 h-6 mx-auto text-muted-foreground/70" />
              <p className="text-sm font-medium text-foreground">
                Choose a sample PDF or image
              </p>
              <p className="text-xs text-muted-foreground">
                PDF or image, up to 25 MB
              </p>
            </div>
          ) : (
            <div className="p-3 bg-muted/20 rounded-lg border border-border/70 flex items-center justify-between gap-3 text-sm">
              <div className="space-y-0.5 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {selectedPreviewFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Not saved until upload is connected
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-7 text-sm"
                >
                  Replace
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePreviewFile}
                  className="h-7 text-sm text-destructive hover:bg-destructive/10"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {previewFileError && (
            <div className="flex items-center gap-1.5 text-[13px] text-destructive font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{previewFileError}</span>
            </div>
          )}
        </div>
      )}

      {previewMode === 'url' && (
        <div className="space-y-1.5 max-w-lg">
          <Label htmlFor="note-preview-url" className="text-sm font-medium text-foreground">
            Sample link
          </Label>
          <div className="flex gap-2">
            <Input
              id="note-preview-url"
              value={previewUrlValue}
              onChange={(e) => setPreviewUrlValue(e.target.value)}
              placeholder="https://.../preview-sample.pdf"
              className="text-sm font-mono"
            />
            {previewUrlValue && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPreviewUrlValue('')}
                className="h-9 px-2 text-sm"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
