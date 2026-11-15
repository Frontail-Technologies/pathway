import { ChevronRight, FileText } from 'lucide-react'
import { SourceNote } from '@/components/shared/source-note'
import type { ScholarshipDetailData } from '../api/scholarships-api'

const typeLabel: Record<string, string> = {
  notification: 'Notice',
  guidelines: 'Guidelines',
  brochure: 'Brochure',
  information_bulletin: 'Information bulletin',
  other: 'Document',
}

export function ScholarshipOfficialDocuments({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const documents = scholarship.officialDocuments ?? []
  if (!documents.length) return null
  return (
    <section id="official-documents" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Official guidelines and notices</h2>
      <ul className="mt-4 divide-y overflow-hidden rounded-xl border bg-card">
        {documents.map((doc, index) => (
          <li key={`${doc.url}-${index}`}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-16 items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary">{doc.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{[typeLabel[doc.type] ?? 'Document', doc.session ? `Session ${doc.session}` : '', 'PDF'].filter(Boolean).join(' · ')}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <SourceNote className="mt-3" source={scholarship.provider} note="Copies of the official files" />
    </section>
  )
}
