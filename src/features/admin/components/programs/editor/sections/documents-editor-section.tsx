import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileText, Plus, Trash2, Upload } from 'lucide-react'
import type { AdminProgramDocument, AdminProgramDocumentType } from '@/features/admin/types/programs'
import { documentTypes } from '@/features/admin/constants/programs'

export type DocumentsEditorSectionProps = {
  documents: AdminProgramDocument[]
  newDocTitle: string
  onNewDocTitleChange: (val: string) => void
  newDocType: AdminProgramDocumentType
  onNewDocTypeChange: (val: AdminProgramDocumentType) => void
  newDocUrl: string
  onNewDocUrlChange: (val: string) => void
  selectedFileMeta: { name: string; size: string } | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddDocument: () => void
  onRemoveDocument: (id: string) => void
}

export function DocumentsEditorSection({
  documents,
  newDocTitle,
  onNewDocTitleChange,
  newDocType,
  onNewDocTypeChange,
  newDocUrl,
  onNewDocUrlChange,
  selectedFileMeta,
  onFileChange,
  onAddDocument,
  onRemoveDocument,
}: DocumentsEditorSectionProps) {
  return (
    <section id="documents" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Documents & Resources
        </h2>
        <span className="text-xs text-muted-foreground">
          {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
        </span>
      </div>

      {documents.length > 0 && (
        <div className="divide-y divide-border/60 -my-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground truncate">{doc.title}</span>
                    <Badge variant="muted" size="xs">
                      {doc.type.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-muted-foreground block">
                    {doc.fileSize ? `${doc.fileSize} • ` : ''}Source: {doc.provenance.sourceName || 'Internal Record'}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveDocument(doc.id)}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/30 border border-border/70 space-y-3 pt-4">
        <span className="text-xs font-bold text-foreground block">
          Attach New Document
        </span>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="new-doc-title" className="text-xs font-semibold">
              Document Title
            </Label>
            <Input
              id="new-doc-title"
              value={newDocTitle}
              onChange={(e) => onNewDocTitleChange(e.target.value)}
              placeholder="e.g. Official 4-Year Syllabus Bulletin"
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="new-doc-type" className="text-xs font-semibold">
                Document Type
              </Label>
              <Select
                items={documentTypes}
                value={newDocType}
                onValueChange={(val) =>
                  onNewDocTypeChange((val as AdminProgramDocumentType) || 'syllabus')
                }
              >
                <SelectTrigger id="new-doc-type" className="w-full text-xs">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((dt) => (
                    <SelectItem key={dt.value} value={dt.value}>
                      {dt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-doc-url" className="text-xs font-semibold">
                Source / Asset URL
              </Label>
              <Input
                id="new-doc-url"
                value={newDocUrl}
                onChange={(e) => onNewDocUrlChange(e.target.value)}
                placeholder="https://..."
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <Label htmlFor="new-doc-file" className="text-xs font-semibold">
              Local Asset File (Session Preview)
            </Label>
            <Input
              id="new-doc-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onFileChange}
              className="text-xs file:mr-2 file:py-0 file:px-2 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer"
            />
            {selectedFileMeta && (
              <div className="flex items-center gap-2 p-2 rounded bg-card text-[11px] text-foreground border border-border/60">
                <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="font-semibold truncate">{selectedFileMeta.name}</span>
                <span className="text-muted-foreground shrink-0">({selectedFileMeta.size})</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
              <Upload className="w-3.5 h-3.5 shrink-0" />
              <span>Upload persistence requires Admin storage API connection.</span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddDocument}
              disabled={!newDocTitle.trim()}
              className="text-xs font-semibold shrink-0 bg-card"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Attach Document
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
