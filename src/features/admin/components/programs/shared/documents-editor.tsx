'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentRow, EditorSection, Field, FormSelect, type SelectOption } from './section-kit'

type EditableDocument = {
  id: string
  title: string
  type: string
  fileSize?: string
  provenance: { sourceName?: string }
}

export function DocumentsEditor<TType extends string>({
  documents,
  typeOptions,
  titlePlaceholder,
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
}: {
  documents: EditableDocument[]
  typeOptions: { value: TType; label: string }[]
  titlePlaceholder?: string
  newDocTitle: string
  onNewDocTitleChange: (val: string) => void
  newDocType: TType
  onNewDocTypeChange: (val: TType) => void
  newDocUrl: string
  onNewDocUrlChange: (val: string) => void
  selectedFileMeta: { name: string; size: string } | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddDocument: () => void
  onRemoveDocument: (id: string) => void
}) {
  const typeLabel = (value: string) => typeOptions.find((t) => t.value === value)?.label ?? value
  return (
    <EditorSection id="documents" title="Documents" action={`${documents.length} attached`}>
      {documents.length > 0 ? (
        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              title={doc.title}
              type={typeLabel(doc.type)}
              meta={[doc.fileSize, `Source: ${doc.provenance.sourceName || 'Internal record'}`].filter(Boolean).join(' · ')}
              action={
                <Button type="button" variant="ghost" size="sm" onClick={() => onRemoveDocument(doc.id)} className="text-muted-foreground hover:text-destructive">
                  Remove
                </Button>
              }
            />
          ))}
        </div>
      ) : null}

      <div className="space-y-4 rounded-md border border-border p-4">
        <p className="text-sm font-medium text-foreground">Attach a document</p>
        <Field label="Title" htmlFor="new-doc-title">
          <Input id="new-doc-title" value={newDocTitle} onChange={(e) => onNewDocTitleChange(e.target.value)} placeholder={titlePlaceholder} className="text-sm" />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Type" htmlFor="new-doc-type">
            <FormSelect id="new-doc-type" value={newDocType} onChange={(val) => onNewDocTypeChange(val as TType)} options={typeOptions as SelectOption[]} placeholder="Choose type" />
          </Field>
          <Field label="Link" htmlFor="new-doc-url">
            <Input id="new-doc-url" value={newDocUrl} onChange={(e) => onNewDocUrlChange(e.target.value)} placeholder="https://" className="text-sm" />
          </Field>
        </div>
        <Field label="File" htmlFor="new-doc-file">
          <Input id="new-doc-file" type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="cursor-pointer text-sm" />
        </Field>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onAddDocument} disabled={!newDocTitle.trim()}>
            Attach document
          </Button>
        </div>
      </div>
    </EditorSection>
  )
}
