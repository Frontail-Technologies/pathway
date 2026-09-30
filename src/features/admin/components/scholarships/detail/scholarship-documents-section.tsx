import * as React from 'react'
import Link from 'next/link'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { FileText, Plus, ExternalLink } from 'lucide-react'

export function ScholarshipDocumentsSection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  const docs = scholarship.documents

  return (
    <AdminSection
      title="Official Documents & Circulars"
      badge={
        docs.length > 0 ? (
          <Badge
            variant="secondary"
            className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-2 py-0.5"
          >
            {docs.length} {docs.length === 1 ? 'Asset' : 'Assets'}
          </Badge>
        ) : undefined
      }
    >
      {docs.length > 0 ? (
        <div className="divide-y divide-border/60 -my-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground truncate">{doc.title}</span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0 capitalize"
                    >
                      {doc.type.replace('_', ' ')}
                    </Badge>
                    {doc.fileFormat && (
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1 rounded">
                        {doc.fileFormat}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {doc.fileSize ? `${doc.fileSize} • ` : ''}Source: {doc.provenance.sourceName || 'Scheme Document'}
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
                    View Asset
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
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-muted-foreground text-xs">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 shrink-0 text-muted-foreground/70" />
            <p>No official scholarship notification or scheme document attached yet.</p>
          </div>
          <Link
            href={`/admin/scholarships/${scholarship.id}/edit#documents`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'h-7 px-2.5 text-xs font-semibold self-start sm:self-auto bg-card shrink-0 inline-flex',
            })}
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
            Attach Document
          </Link>
        </div>
      )}
    </AdminSection>
  )
}
