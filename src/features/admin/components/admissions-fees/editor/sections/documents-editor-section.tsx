import * as React from 'react'
import { type OfferingDocument, type OfferingDocumentType } from '@/features/admin/data/admin-admissions-fees'
import { DocumentsEditor } from '../../../programs/shared/documents-editor'
import { offeringDocumentTypes } from '../../shared/admissions-fees-constants'

export function DocumentsEditorSection(props: {
  documents: OfferingDocument[]
  newDocTitle: string
  onNewDocTitleChange: (val: string) => void
  newDocType: OfferingDocumentType
  onNewDocTypeChange: (val: OfferingDocumentType) => void
  newDocUrl: string
  onNewDocUrlChange: (val: string) => void
  selectedFileMeta: { name: string; size: string } | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddDocument: () => void
  onRemoveDocument: (id: string) => void
}) {
  return <DocumentsEditor {...props} typeOptions={offeringDocumentTypes} titlePlaceholder="e.g. Fee schedule 2026-27" />
}
