import * as React from 'react'
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
import {
  Plus,
  Trash2,
  FileText,
  UploadCloud,
  ExternalLink,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { scholarshipDocumentTypes } from '../../shared/scholarship-constants'
import {
  type ScholarshipDocument,
  type ScholarshipDocumentType,
} from '@/features/admin/data/admin-scholarships'

export function ScholarshipDocsSection({
  requiredDocuments,
  newReqDocInput,
  setNewReqDocInput,
  onAddReqDoc,
  onRemoveReqDoc,
  documents,
  newDocTitle,
  setNewDocTitle,
  newDocType,
  setNewDocType,
  newDocUrl,
  setNewDocUrl,
  selectedFileMeta,
  onFileChange,
  onAddDocument,
  onRemoveDocument,
}: {
  requiredDocuments: string[]
  newReqDocInput: string
  setNewReqDocInput: (v: string) => void
  onAddReqDoc: () => void
  onRemoveReqDoc: (idx: number) => void
  documents: ScholarshipDocument[]
  newDocTitle: string
  setNewDocTitle: (v: string) => void
  newDocType: ScholarshipDocumentType
  setNewDocType: (v: ScholarshipDocumentType) => void
  newDocUrl: string
  setNewDocUrl: (v: string) => void
  selectedFileMeta: { name: string; size: string } | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddDocument: () => void
  onRemoveDocument: (id: string) => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <section id="documents" className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 scroll-mt-20">
      <h2 className="text-[15px] font-semibold text-foreground">
        Documents
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground block">
            What applicants must submit
          </label>
          <div className="flex gap-2">
            <Input
              value={newReqDocInput}
              onChange={(e) => setNewReqDocInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onAddReqDoc()
                }
              }}
              placeholder="e.g. Income certificate"
              className="text-sm flex-1"
            />
            <Button type="button" variant="outline" size="sm" onClick={onAddReqDoc} className="text-sm">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add
            </Button>
          </div>

          {requiredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/60 text-sm"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-foreground leading-snug">{doc}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveReqDoc(idx)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              No documents listed yet.
            </p>
          )}
        </div>

        <div className="space-y-3 pt-3 border-t border-border/60">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground block">
              Official documents
            </label>
            <p className="text-[13px] text-muted-foreground">
              Attach the notification or guidelines that confirm the benefit amounts.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-muted/20 border border-border/60 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[13px] font-medium text-foreground">
                  Title
                </label>
                <Input
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Official Scheme Notification 2026-27"
                  className="text-sm"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-[13px] font-medium text-foreground">
                  Type
                </label>
                <Select
                  items={scholarshipDocumentTypes}
                  value={newDocType}
                  onValueChange={(val) => setNewDocType(val as any)}
                >
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {scholarshipDocumentTypes.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-[13px] font-medium text-foreground">
                  Link
                </label>
                <Input
                  value={newDocUrl}
                  onChange={(e) => setNewDocUrl(e.target.value)}
                  placeholder="https://..."
                  className="text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm h-8"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                  Choose file
                </Button>
                {selectedFileMeta && (
                  <span className="text-[13px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    {selectedFileMeta.name} ({selectedFileMeta.size})
                  </span>
                )}
              </div>

              <Button
                type="button"
                size="sm"
                onClick={onAddDocument}
                disabled={!newDocTitle.trim()}
                className="text-sm h-8"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Attach
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Info className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
              <span>
                File upload isn’t connected yet; only the title and link are kept.
              </span>
            </div>
          </div>

          {documents.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-sm font-medium text-foreground block">
                Attached ({documents.length})
              </span>
              <div className="divide-y divide-border/60 rounded-lg border border-border/60 overflow-hidden bg-card">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-semibold text-foreground block truncate">
                          {doc.title}
                        </span>
                        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                          <Badge variant="secondary" className="text-xs bg-muted px-1.5 py-0 capitalize">
                            {doc.type.replace('_', ' ')}
                          </Badge>
                          {doc.fileSize && <span>{doc.fileSize}</span>}
                          {doc.url && (
                            <span className="truncate max-w-[200px] font-mono text-xs">
                              {doc.url}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveDocument(doc.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
