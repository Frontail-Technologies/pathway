'use client'

import * as React from 'react'
import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import type { Exam } from '@/features/exams/data/exams'
import { discardExamEdit, EXAM_DETAIL_SECTIONS, examCompleteness, examSectionCounts } from '@/features/admin/data/admin-exams'
import { AdminPageHeader, CompletenessMeter, FactList, Panel, StatusBadge, Tag } from '../kit'
import { DemoNote } from '../demo/demo-form'
import { formatDateTime } from '../demo/relative-time'
import { useExamsWithEdits } from './use-exam-edits'

export function AdminExamDetailView({ exam: fixture }: { exam: Exam }) {
  const list = React.useMemo(() => [fixture], [fixture])
  const { exams, edits } = useExamsWithEdits(list)
  const exam = exams[0]!
  const localEdit = edits[fixture.id]
  const counts = examSectionCounts(exam)
  const completeness = examCompleteness(exam)
  const missing = EXAM_DETAIL_SECTIONS.filter((section) => counts[section.id] === 0)

  return (
    <div className="space-y-5">
      <AdminPageHeader
        back={{ href: '/admin/exams', label: 'Exams' }}
        title={exam.shortName}
        description={exam.name}
        meta={
          <>
            {exam.hasDetailPage ? <StatusBadge tone="success">Public page live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>}
            <Tag>{exam.studyArea}</Tag>
            {exam.popular ? <Tag>Popular</Tag> : null}
          </>
        }
        actions={
          <>
            {exam.hasDetailPage ? (
              <Link href={`/exam/${exam.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                View public page
              </Link>
            ) : null}
            <Link href={`/admin/exams/${exam.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit exam
            </Link>
          </>
        }
      />

      {localEdit ? (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-card shadow-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <DemoNote>Showing edits saved on this device on {formatDateTime(localEdit.savedAt)}. The public site still shows the original record.</DemoNote>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              discardExamEdit(fixture.id)
              toast.success('Local edits discarded')
            }}
          >
            Discard local edits
          </Button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Panel title="Overview">
            <FactList
              items={[
                { label: 'Full name', value: exam.name },
                { label: 'Short name', value: exam.shortName },
                { label: 'Study area', value: exam.studyArea },
                { label: 'Level', value: exam.level },
                { label: 'Scope', value: exam.scope },
                { label: 'Conducting body', value: exam.conductingBody ?? 'Not recorded' },
                { label: 'Slug', value: <span className="font-mono text-[13px]">{exam.slug}</span> },
                { label: 'Public page', value: exam.hasDetailPage ? `/exam/${exam.slug}` : 'Listing only' },
              ]}
            />
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-[13px] text-muted-foreground">Listing description</p>
              <p className="mt-1 text-sm text-foreground">{exam.description}</p>
              {exam.detail?.longDescription ? (
                <>
                  <p className="mt-4 text-[13px] text-muted-foreground">Page introduction</p>
                  <p className="mt-1 text-sm text-foreground">{exam.detail.longDescription}</p>
                </>
              ) : null}
            </div>
          </Panel>

          <Panel title="Public page sections" description={exam.detail ? 'What the exam page shows today.' : 'No detail content yet, so the exam appears in listings only.'} bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {EXAM_DETAIL_SECTIONS.map((section) => {
                const count = counts[section.id]
                return (
                  <li key={section.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                    <span className="text-foreground">{section.label}</span>
                    {count > 0 ? (
                      <StatusBadge tone="success">
                        {count} {count === 1 ? 'item' : 'items'}
                      </StatusBadge>
                    ) : (
                      <StatusBadge>Missing</StatusBadge>
                    )}
                  </li>
                )
              })}
            </ul>
          </Panel>

          {exam.detail?.eligibility?.length || exam.detail?.pattern?.length ? (
            <Panel title="Eligibility and pattern">
              <FactList
                items={[...(exam.detail?.eligibility ?? []).map((e) => ({ label: e.label, value: e.text })), ...(exam.detail?.pattern ?? []).map((p) => ({ label: p.label, value: p.value }))]}
              />
            </Panel>
          ) : null}
        </div>

        <div className="space-y-5">
          <Panel title="Completeness">
            <CompletenessMeter value={completeness} />
            {missing.length > 0 ? (
              <div className="mt-4">
                <p className="text-[13px] text-muted-foreground">Missing sections</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {missing.map((section) => (
                    <Tag key={section.id}>{section.label}</Tag>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-3 text-[13px] text-muted-foreground">Every public page section has content.</p>
            )}
          </Panel>
          <Panel title="Record">
            <FactList
              columns={1}
              items={[
                { label: 'Record ID', value: <span className="font-mono text-[13px]">{exam.id}</span> },
                { label: 'Source', value: 'Site fixtures (sample data)' },
                { label: 'Linked colleges', value: counts.colleges > 0 ? counts.colleges : 'None' },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
