'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Upload, RefreshCw, Trash2, AlertCircle, Info, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatFileSize } from '@/features/notes/types/note'

export function NotePdfAssetSection({
  selectedPdfFile,
  pdfFileError,
  handleSelectPdfFile,
  handleRemovePdfFile,
}: {
  selectedPdfFile: File | null
  pdfFileError: string | null
  handleSelectPdfFile: (file: File) => void
  handleRemovePdfFile: () => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleSelectPdfFile(files[0])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleSelectPdfFile(files[0])
    }
  }

  return (
    <div id="pdf-asset" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Downloadable PDF Asset (Protected)</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Attach the full educational PDF note document for student access and entitlement downloads.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="sr-only"
        id="note-pdf-upload-input"
        aria-label="Upload downloadable PDF document"
      />

      <div className="space-y-3">
        {!selectedPdfFile ? (
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
            aria-label="Click or drag PDF file to attach downloadable notes"
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
                Click to choose PDF document or drag & drop here
              </p>
              <p className="text-[11px] text-muted-foreground">
                PDF format only • Maximum size 25 MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-muted/20 rounded-xl border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {selectedPdfFile.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    {formatFileSize(selectedPdfFile.size)} • application/pdf
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 text-xs gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replace PDF</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePdfFile}
                  className="h-8 text-xs text-destructive hover:bg-destructive/10 gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/20 rounded-lg border border-border/60">
              <Lock className="w-4 h-4 text-primary shrink-0" />
              <span>
                File selected for local inspection. Persisting binary documents requires the Admin Storage API.
              </span>
            </div>
          </div>
        )}

        {pdfFileError && (
          <div className="flex items-center gap-1.5 text-[11px] text-destructive font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{pdfFileError}</span>
          </div>
        )}
      </div>
    </div>
  )
}
