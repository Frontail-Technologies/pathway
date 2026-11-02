'use client'

import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminNote } from '@/features/admin/data/admin-notes'
import { formatDateTimeSafe, formatFileSize, formatStream, formatStudyLevel } from '@/features/notes/types/note'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { AdminPageHeader, FactList, Panel, StatusBadge, Tag } from '../../kit'
import { NoteStatusBadge, sentenceCase } from '../shared/note-meta'

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

export function AdminNoteDetailView({ note }: { note: AdminNote }) {
  const asset = note.downloadableAsset
  const preview = note.previewAsset
  const isPublished = note.status === 'published'

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/notes', label: 'Notes' }}
        title={note.title}
        description={`/notes/${note.slug}`}
        meta={
          <>
            <NoteStatusBadge status={note.status} label={note.statusMeta.label} />
            {asset ? <StatusBadge tone="success">File attached</StatusBadge> : <StatusBadge tone="warning">No file</StatusBadge>}
          </>
        }
        actions={
          <>
            {isPublished ? (
              <Link href={`/notes/${note.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/notes/${note.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Overview">
            <div className="space-y-5">
              {note.shortDescription ? <p className="text-sm font-medium text-foreground">{note.shortDescription}</p> : null}
              {note.description ? <p className="text-sm leading-relaxed whitespace-pre-line text-foreground">{note.description}</p> : <Empty>No description yet.</Empty>}
              <FactList
                items={[
                  { label: 'Type', value: <Tag>{sentenceCase(note.typeMeta.label)}</Tag> },
                  { label: 'Subject', value: note.subject || '—' },
                  { label: 'Level', value: note.studyLevel ? formatStudyLevel(note.studyLevel) : '—' },
                  { label: 'Stream', value: note.stream ? formatStream(note.stream) : '—' },
                  { label: 'Author', value: [note.authorName, note.providerName].filter(Boolean).join(' · ') || '—' },
                ]}
              />
            </div>
          </Panel>

          <Panel title="Courses and exams">
            <FactList
              items={[
                { label: 'Courses', value: note.resolvedCourses.length > 0 ? note.resolvedCourses.map((c) => c.name).join(', ') : 'None linked' },
                {
                  label: 'Exams',
                  value:
                    note.resolvedExams.length > 0 ? (
                      <span className="flex flex-wrap gap-1">
                        {note.resolvedExams.map((exam) => (
                          <Tag key={exam.id}>{exam.name}</Tag>
                        ))}
                      </span>
                    ) : (
                      'None linked'
                    ),
                },
              ]}
            />
          </Panel>

          <Panel title="Download file" description="Students get a short-lived private link after access is checked.">
            {asset ? (
              <FactList
                columns={3}
                items={[
                  { label: 'File name', value: asset.fileName || '—' },
                  { label: 'Size', value: formatFileSize(asset.fileSizeBytes) },
                  { label: 'Pages', value: asset.pageCount ? String(asset.pageCount) : '—' },
                ]}
              />
            ) : (
              <Empty>No file attached yet.</Empty>
            )}
          </Panel>

          <Panel title="Sample preview">
            {preview?.publicUrl ? (
              <div className="aspect-video w-full max-w-lg overflow-hidden rounded-lg border border-border bg-muted">
                {preview.mimeType?.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview.publicUrl} alt="Sample preview" className="h-full w-full object-cover" />
                ) : (
                  <iframe src={`${preview.publicUrl}#toolbar=0`} title="Sample preview" className="h-full w-full border-0" />
                )}
              </div>
            ) : (
              <Empty>No sample preview uploaded.</Empty>
            )}
          </Panel>
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <Panel title="Status">
            <div className="space-y-3">
              <NoteStatusBadge status={note.status} label={note.statusMeta.label} />
              <p className="text-[13px] text-muted-foreground">{note.statusMeta.description}</p>
            </div>
          </Panel>

          <Panel title="Price">
            <FactList
              columns={1}
              items={[
                { label: 'Price', value: note.formattedPrice },
                { label: 'Access', value: note.pricingType === 'free' ? 'Free for signed-in students' : 'One-time purchase' },
              ]}
            />
          </Panel>

          <Panel title="History">
            <FactList
              columns={1}
              items={[
                { label: 'Created', value: formatDateTimeSafe(note.createdAt) },
                { label: 'Last updated', value: formatDateTimeSafe(note.updatedAt) },
              ]}
            />
          </Panel>
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
