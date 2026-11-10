'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { AdminStream } from '@/features/admin/data/admin-streams'
import { FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../kit'
import { DemoNote, ToggleRow } from '../demo/demo-form'
import { useStreamPublish } from './use-stream-publish'

const PREVIEW_LIMIT = 6

export function AdminStreamDetailView({ stream }: { stream: AdminStream }) {
  const { isPublished, isOverridden, setPublished } = useStreamPublish()
  const published = isPublished(stream)

  return (
    <div className="space-y-5">
      <RecordHeader
        back={{ href: '/admin/streams', label: 'Streams' }}
        title={stream.name}
        media={<Monogram name={stream.name} size="lg" />}
        description={stream.description}
        chips={
          <>
            {published ? <StatusBadge tone="success">Published</StatusBadge> : <StatusBadge>Not published</StatusBadge>}
            <Tag>{stream.tagline}</Tag>
          </>
        }
        actions={
          stream.livePublished ? (
            <Link href={`/${stream.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <ExternalLink className="size-4" aria-hidden="true" />
              View public hub
            </Link>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Panel title="Hub sections" description={`${stream.sections.length} of 7 with content`} bodyClassName="p-0">
            {stream.sections.length === 0 ? (
              <p className="px-5 py-4 text-sm text-muted-foreground">No section has content for this stream yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {stream.sections.map((section) => (
                  <li key={section.id} className="space-y-2 px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{section.title}</p>
                      <span className="text-[13px] text-muted-foreground tabular-nums">
                        {section.count} {section.count === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {section.entries.slice(0, PREVIEW_LIMIT).map((entry) => (
                        <Link key={entry.id} href={entry.href} target="_blank" rel="noreferrer" className="rounded-md border border-border px-1.5 py-0.5 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary">
                          {entry.title}
                        </Link>
                      ))}
                      {section.count > PREVIEW_LIMIT ? <span className="px-1 py-0.5 text-xs text-muted-foreground">+{section.count - PREVIEW_LIMIT} more</span> : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Publishing">
            <ToggleRow
              title="Published"
              control={<Switch checked={published} onCheckedChange={(next) => setPublished(stream, next)} aria-label={`Publish ${stream.name} hub`} />}
            />
            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <p className="text-[13px] text-muted-foreground">
                On the live site a hub is published automatically when at least two sections have content. Right now it is {stream.livePublished ? 'published' : 'not published'}.
              </p>
              {isOverridden(stream) ? <p className="text-[13px] text-foreground">You changed this on this device.</p> : null}
              <DemoNote>Demo: saved on this device only; the public site is unchanged.</DemoNote>
            </div>
          </Panel>
          <Panel title="Summary">
            <FactList
              columns={1}
              items={[
                { label: 'Address', value: <span className="font-mono text-[13px]">/{stream.slug}</span> },
                { label: 'Colleges', value: stream.collegeCount },
                { label: 'Courses', value: stream.courseCount },
                { label: 'Exams', value: stream.examCount },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
