import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import type { AdminProgramDocument } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'
import { ProgramDocumentRow } from '../shared/program-document-row'

export function ProgramDocumentsSection({
  documents,
  programId,
}: {
  documents: AdminProgramDocument[]
  programId: string
}) {
  return (
    <AdminSection
      title="Documents & Resources"
      badge={
        documents.length > 0 ? (
          <Badge variant="muted" size="xs">
            {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
          </Badge>
        ) : undefined
      }
    >
      {documents.length > 0 ? (
        <div className="divide-y divide-border/60 -my-2">
          {documents.map((doc) => (
            <ProgramDocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-muted-foreground text-xs">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 shrink-0 text-muted-foreground/70" />
            <p>No programme documents are attached yet.</p>
          </div>
          <Link
            href={`/admin/programs/${programId}/edit#documents`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'h-7 px-2.5 text-xs font-semibold self-start sm:self-auto bg-card shrink-0 inline-flex',
            })}
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
            Add Document
          </Link>
        </div>
      )}
    </AdminSection>
  )
}
