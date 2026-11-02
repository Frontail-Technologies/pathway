import * as React from 'react'
import type { AdminProgramDocument, AdminProgramDocumentType } from '@/features/admin/types/programs'
import { documentTypes } from '@/features/admin/constants/programs'
import { DocumentsEditor } from '../../shared/documents-editor'

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

export function DocumentsEditorSection(props: DocumentsEditorSectionProps) {
  return <DocumentsEditor {...props} typeOptions={documentTypes} titlePlaceholder="e.g. Four-year syllabus" />
}
