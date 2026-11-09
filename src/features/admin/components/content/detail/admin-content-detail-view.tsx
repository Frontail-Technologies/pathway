'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../../kit'
import { contentCategoryLabels, contentStatusHints, contentStatusLabels, contentStatusTones, contentTypeLabels, formatContentDate, relatedEntityTypeLabels } from '../shared/content-constants'

export function AdminContentDetailView({ entry }: { entry: AdminContentEntry }) {
  const body = entry.body?.trim() ?? ''
  const wordCount = body ? body.split(/\s+/).length : 0
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200))
  const entities = entry.resolvedRelatedEntities ?? []

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/content', label: 'Articles' }}
        title={entry.title}
        media={<Monogram name={entry.title} size="lg" />}
        description={entry.excerpt}
        chips={
          <>
            <StatusBadge tone={contentStatusTones[entry.status]}>{contentStatusLabels[entry.status]}</StatusBadge>
            <Tag>{contentTypeLabels[entry.type]}</Tag>
          </>
        }
        actions={
          <Link href={`/admin/content/${entry.id}/edit`} className={buttonVariants({ size: 'sm' })}>
            Edit
          </Link>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Body" action={wordCount ? <span className="text-[13px] text-muted-foreground tabular-nums">{wordCount} words · {readMinutes} min read</span> : undefined}>
            {body ? (
              <div className="max-h-[520px] overflow-y-auto font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-foreground">{entry.body}</div>
            ) : (
              <p className="text-sm text-muted-foreground">No body text yet.</p>
            )}
          </Panel>

          <Panel title="Hero image">
            {entry.heroImage ? (
              <div className="space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                  <Image src={entry.heroImage} alt={entry.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
                </div>
                <a href={entry.heroImage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                  Open image
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No hero image. The site shows a default placeholder.</p>
            )}
          </Panel>

          <Panel title="Linked records" description="Colleges, courses and other records this article mentions.">
            {entities.length > 0 ? (
              <ul className="divide-y divide-border">
                {entities.map((item, index) => (
                  <li key={`${item.entityType}-${item.entityId}-${index}`} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {item.adminUrl ? (
                          <Link href={item.adminUrl} className="truncate text-sm font-medium text-foreground hover:text-primary hover:underline">
                            {item.name}
                          </Link>
                        ) : (
                          <span className="truncate text-sm font-medium text-foreground">{item.name}</span>
                        )}
                        <Tag>{relatedEntityTypeLabels[item.entityType] ?? item.typeLabel}</Tag>
                      </div>
                      {item.subtitle ? <p className="truncate text-[13px] text-muted-foreground">{item.subtitle}</p> : null}
                    </div>
                    {item.publicUrl ? (
                      <Link href={item.publicUrl} target="_blank" className="inline-flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground">
                        Public page
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nothing linked yet. Add records when editing.</p>
            )}
          </Panel>
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <Panel title="Details">
              <FactList
                columns={1}
                items={[
                  { label: 'Status', value: contentStatusHints[entry.status] },
                  { label: 'Slug', value: <span className="font-mono text-[13px]">/{entry.slug}</span> },
                  { label: 'Category', value: entry.category ? contentCategoryLabels[entry.category] : '—' },
                  { label: 'Author', value: entry.authorName || '—' },
                  { label: 'Published', value: formatContentDate(entry.publishedAt) ?? 'Not published' },
                  { label: 'Last updated', value: formatContentDate(entry.updatedAt) ?? '—' },
                  { label: 'Created', value: formatContentDate(entry.createdAt) ?? '—' },
                  { label: 'Public page', value: 'Not available yet' },
                  ...(entry.tags && entry.tags.length > 0
                    ? [
                        {
                          label: 'Tags',
                          value: (
                            <span className="flex flex-wrap gap-1">
                              {entry.tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                              ))}
                            </span>
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            </Panel>
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
