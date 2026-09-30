import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { FileText, ExternalLink } from 'lucide-react'
import type { AdminProgramDocument } from '@/features/admin/types/programs'

export function ProgramDocumentRow({
  doc,
}: {
  doc: AdminProgramDocument
}) {
  return (
    <div className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5 text-muted-foreground">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">{doc.title}</span>
            <Badge variant="muted" size="xs">
              {doc.type.replace(/_/g, ' ')}
            </Badge>
            {doc.fileFormat && (
              <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1 rounded">
                {doc.fileFormat}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">
            {doc.fileSize ? `${doc.fileSize} • ` : ''}Source: {doc.provenance.sourceName || 'Internal Record'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {doc.url ? (
          <Link
            href={doc.url}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'h-7 px-2.5 text-xs font-medium',
            })}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1 text-primary" />
            View Document
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="h-7 px-2.5 text-xs font-medium text-muted-foreground/60 cursor-not-allowed bg-muted/30"
          >
            Asset Pending
          </Button>
        )}
      </div>
    </div>
  )
}
