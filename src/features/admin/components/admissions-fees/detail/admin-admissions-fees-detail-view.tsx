'use client'

import * as React from 'react'
import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminProgramOffering, AdminProgramOfferingDetail } from '@/features/admin/data/admin-admissions-fees'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { CompletenessMeter, FactList, Panel, StatusBadge, Tag, toneFromVariant, Monogram, RecordHeader } from '../../kit'
import { DocumentRow, EmptyNote, StatusChecklist } from '../../programs/shared/section-kit'
import { admissionModes, completenessStatusStyles, feeComponentTypes, feePeriods, offeringDocumentTypes, qualityBadgeStyles, qualityCheckStyles } from '../shared/admissions-fees-constants'

const completenessItems: { key: keyof AdminProgramOffering['breakdown']; label: string }[] = [
  { key: 'identity', label: 'Basics' },
  { key: 'fees', label: 'Fees' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'exams', label: 'Entrance exams' },
  { key: 'process', label: 'Admission steps' },
  { key: 'documents', label: 'Documents' },
]

const qualityItems: { key: keyof AdminProgramOffering['qualityBreakdown']; label: string }[] = [
  { key: 'identity', label: 'Basics' },
  { key: 'fees', label: 'Fees' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'exams', label: 'Entrance exams' },
  { key: 'process', label: 'Admission steps' },
  { key: 'source', label: 'Source' },
]

const PUBLIC_COLLEGE_SLUGS = new Set(['iit-delhi'])
const PUBLIC_COURSE_SLUGS = new Set(['btech-computer-science'])

const linkClass = 'font-medium text-foreground hover:text-primary hover:underline'

export function AdminAdmissionsFeesDetailView({ data }: { data: AdminProgramOfferingDetail }) {
  const { offering } = data
  const quality = qualityBadgeStyles[offering.qualityStatus]
  const modeLabel = admissionModes.find((m) => m.value === offering.admissionMode)?.label ?? offering.admissionMode

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/admissions-fees', label: 'Admissions & fees' }}
        title={offering.programName}
        media={<Monogram name={offering.programName} size="lg" />}
        description={`${offering.institutionName} · ${offering.institutionCity}, ${offering.institutionState}`}
        chips={
          <>
            <StatusBadge tone={toneFromVariant(quality.variant)}>{quality.label}</StatusBadge>
            {offering.annualFee ? null : <StatusBadge tone="warning">Fee not set</StatusBadge>}
            <Tag>Session {offering.academicSession}</Tag>
          </>
        }
        actions={
          <>
            {PUBLIC_COLLEGE_SLUGS.has(offering.institutionSlug) ? (
              <Link href={`/college/${offering.institutionSlug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/admissions-fees/${offering.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <Panel title="Overview">
            <FactList
              items={[
                {
                  label: 'Institution',
                  value: (
                    <Link href={`/admin/institutions/${offering.institutionId}`} className={linkClass}>
                      {offering.institutionName}
                    </Link>
                  ),
                },
                {
                  label: 'Course',
                  value: (
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <Link href={`/admin/programs/${offering.programId}`} className={linkClass}>
                        {offering.programName}
                      </Link>
                      {PUBLIC_COURSE_SLUGS.has(offering.programSlug) ? (
                        <Link href={`/course/${offering.programSlug}`} target="_blank" rel="noreferrer" className="text-[13px] font-normal text-muted-foreground hover:text-foreground hover:underline">
                          Public page
                        </Link>
                      ) : null}
                    </span>
                  ),
                },
                { label: 'Institution type', value: offering.institutionType },
                { label: 'Degree', value: `${offering.degree} · ${offering.duration}` },
                { label: 'Level and stream', value: `${offering.level} · ${offering.stream}` },
                { label: 'Study mode', value: offering.studyMode },
              ]}
            />
          </Panel>

          <FeesPanel offering={offering} />

          <Panel title="Eligibility">
            <div className="space-y-5">
              {offering.eligibilitySummary ? <p className="text-sm text-foreground">{offering.eligibilitySummary}</p> : null}
              <FactList
                columns={3}
                items={[
                  { label: 'Qualification', value: offering.academicQualification || '10+2 or equivalent' },
                  { label: 'Required subjects', value: offering.mandatorySubjects || 'Depends on stream' },
                  { label: 'Minimum marks', value: offering.minimumMarks || 'As per regulator norms' },
                ]}
              />
              {offering.importantRequirements.length > 0 ? (
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-[13px] text-muted-foreground">Documents students must provide</p>
                  <ul className="list-disc space-y-1 pl-4 text-sm text-foreground marker:text-muted-foreground">
                    {offering.importantRequirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Entrance exams and selection">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-1.5">
                {offering.entranceExams.length > 0 ? offering.entranceExams.map((ex) => <Tag key={ex}>{ex}</Tag>) : <p className="text-sm text-muted-foreground">No entrance exam. Admission is by board marks or the institution&apos;s own process.</p>}
              </div>
              <FactList
                items={[
                  { label: 'Admission route', value: modeLabel },
                  { label: 'Counselling body', value: offering.counsellingBody || 'The institution' },
                ]}
              />
              {offering.selectionProcess ? (
                <div className="space-y-1 border-t border-border pt-4">
                  <p className="text-[13px] text-muted-foreground">How selection works</p>
                  <p className="text-sm leading-relaxed text-foreground">{offering.selectionProcess}</p>
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Admission steps">
            {offering.applicationSteps.length > 0 ? (
              <ol className="space-y-4">
                {offering.applicationSteps.map((step) => (
                  <li key={step.id} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[13px] font-medium text-muted-foreground tabular-nums">{step.stepNumber}</span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-foreground">{step.title}</p>
                      {step.description ? <p className="text-[13px] text-muted-foreground">{step.description}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyNote>No steps added yet.</EmptyNote>
            )}
          </Panel>

          <Panel title="Documents" description={offering.documents.length > 0 ? `${offering.documents.length} attached` : undefined}>
            {offering.documents.length > 0 ? (
              <div className="divide-y divide-border">
                {offering.documents.map((doc) => (
                  <DocumentRow
                    key={doc.id}
                    title={doc.title}
                    type={offeringDocumentTypes.find((t) => t.value === doc.type)?.label ?? doc.type}
                    meta={[doc.fileFormat, doc.fileSize, `Source: ${doc.provenance.sourceName || 'Institution record'}`].filter(Boolean).join(' · ')}
                    action={
                      doc.url ? (
                        <Link href={doc.url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                          Open
                        </Link>
                      ) : (
                        <StatusBadge>File pending</StatusBadge>
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyNote
                action={
                  <Link href={`/admin/admissions-fees/${offering.id}/edit#documents`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                    Add document
                  </Link>
                }
              >
                No documents attached yet.
              </EmptyNote>
            )}
          </Panel>

          <Panel title="Change history">
            <p className="text-sm text-muted-foreground">No changes recorded yet.</p>
          </Panel>
        </div>

        <AdminDetailStickyRail className="space-y-5 lg:col-span-4">
          <Panel title="Completeness">
            <div className="space-y-4">
              <CompletenessMeter value={offering.completeness} />
              <StatusChecklist
                items={completenessItems.map(({ key, label }) => {
                  const style = completenessStatusStyles[offering.breakdown[key]]
                  return { key, label, tone: toneFromVariant(style.variant), status: style.label }
                })}
              />
            </div>
          </Panel>

          <Panel title="Data quality" description="Fees change often. Amounts need an official source to count as verified.">
            <div className="space-y-4">
              <StatusChecklist
                items={qualityItems.map(({ key, label }) => {
                  const style = qualityCheckStyles[offering.qualityBreakdown[key]]
                  return { key, label, tone: toneFromVariant(style.variant), status: style.label }
                })}
              />
              {offering.topIssues.length > 0 ? (
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-[13px] font-medium text-foreground">To fix</p>
                  <ul className="list-disc space-y-1.5 pl-4 text-[13px] text-muted-foreground marker:text-warning">
                    {offering.topIssues.map((issue) => (
                      <li key={issue.id}>{issue.label}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Source">
            <FactList
              columns={1}
              items={[
                { label: 'Source', value: offering.provenance.sourceName || 'Not recorded' },
                { label: 'Sync', value: <StatusBadge>{offering.provenance.syncStatus === 'manual' ? 'Manual' : 'Imported'}</StatusBadge> },
                { label: 'Session', value: offering.academicSession },
                { label: 'Last reviewed', value: offering.provenance.lastReviewedAt || 'Not recorded' },
              ]}
            />
          </Panel>
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}

function FeesPanel({ offering }: { offering: AdminProgramOffering }) {
  const typeLabel = (value: string) => feeComponentTypes.find((t) => t.value === value)?.label ?? value
  return (
    <Panel title="Fees" action={offering.provenance.sourceName ? <StatusBadge tone="success">Source recorded</StatusBadge> : <StatusBadge tone="warning">Source needed</StatusBadge>}>
      <div className="space-y-5">
        <FactList
          columns={3}
          items={[
            { label: 'Annual fee', value: offering.annualFee || 'Not set' },
            { label: 'Whole course', value: offering.totalProgrammeFee || 'Not set' },
            { label: 'Billed', value: feePeriods.find((p) => p.value === offering.feePeriod)?.label ?? offering.feePeriod },
          ]}
        />
        {offering.feeComponents.length > 0 ? (
          <ul className="divide-y divide-border border-t border-border">
            {offering.feeComponents.map((comp) => (
              <li key={comp.id} className="flex items-center justify-between gap-3 py-3 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{comp.label}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {typeLabel(comp.type)} · {comp.period}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-foreground tabular-nums">{comp.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No fee breakdown yet (hostel, exam, deposit and so on).</EmptyNote>
        )}
      </div>
    </Panel>
  )
}
