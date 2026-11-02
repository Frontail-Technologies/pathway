'use client'

import * as React from 'react'
import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { CourseDetailData } from '@/features/courses/data/course-detail'
import { completenessStatusStyles, documentTypes, qualityBadgeStyles, qualityCheckStyles } from '@/features/admin/constants/programs'
import type { AdminProgram, AdminProgramDetail } from '@/features/admin/types/programs'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { AdminPageHeader, CompletenessMeter, FactList, Panel, StatusBadge, Tag, toneFromVariant } from '../../kit'
import { DocumentRow, EmptyNote, StatusChecklist } from '../shared/section-kit'

const completenessItems: { key: keyof AdminProgram['breakdown']; label: string }[] = [
  { key: 'identity', label: 'Basics' },
  { key: 'overview', label: 'Overview' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'exams', label: 'Entrance exams' },
  { key: 'careers', label: 'Careers' },
  { key: 'institutions', label: 'Institutions' },
]

const qualityItems: { key: keyof AdminProgram['qualityBreakdown']; label: string }[] = [
  { key: 'identity', label: 'Basics' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'exams', label: 'Entrance exams' },
  { key: 'careers', label: 'Career claims' },
  { key: 'institutions', label: 'Institutions' },
]

const smallOutline = buttonVariants({ variant: 'outline', size: 'sm' })

export function AdminProgramDetailView({ data }: { data: AdminProgramDetail }) {
  const { program, detail } = data
  const quality = qualityBadgeStyles[program.qualityStatus]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/programs', label: 'Courses' }}
        title={program.name}
        description={[program.degree, program.stream, program.duration, program.studyMode].filter(Boolean).join(' · ')}
        meta={
          <>
            <StatusBadge tone={toneFromVariant(quality.variant)}>{quality.label}</StatusBadge>
            {program.hasDetailPage ? <StatusBadge tone="success">Public page live</StatusBadge> : <StatusBadge>Not published</StatusBadge>}
            <Tag>{program.level}</Tag>
          </>
        }
        actions={
          <>
            {program.hasDetailPage ? (
              <Link href={`/course/${program.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/programs/${program.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <OverviewPanel program={program} detail={detail} />
          <EligibilityPanel program={program} detail={detail} />
          <CurriculumPanel syllabus={detail?.syllabus} />
          <ExamsPanel exams={detail?.exams} fallback={program.entranceExams} />
          <InstitutionsPanel program={program} />
          <DocumentsPanel program={program} />
          <CareersPanel careerMetrics={detail?.careerMetrics} careers={detail?.careers} careerAreas={program.careerAreas} />
          <Panel title="Change history">
            <p className="text-sm text-muted-foreground">No changes recorded yet.</p>
          </Panel>
        </div>

        <AdminDetailStickyRail className="space-y-5 lg:col-span-4">
          <Panel title="Completeness">
            <div className="space-y-4">
              <CompletenessMeter value={program.completeness} />
              <StatusChecklist
                items={completenessItems.map(({ key, label }) => {
                  const style = completenessStatusStyles[program.breakdown[key]]
                  return { key, label, tone: toneFromVariant(style.variant), status: style.label }
                })}
              />
            </div>
          </Panel>

          <Panel title="Data quality">
            <div className="space-y-4">
              <StatusChecklist
                items={qualityItems.map(({ key, label }) => {
                  const style = qualityCheckStyles[program.qualityBreakdown[key]]
                  return { key, label, tone: toneFromVariant(style.variant), status: style.label }
                })}
              />
              {program.topIssues.length > 0 ? (
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-[13px] font-medium text-foreground">To fix</p>
                  <ul className="list-disc space-y-1.5 pl-4 text-[13px] text-muted-foreground marker:text-warning">
                    {program.topIssues.map((issue) => (
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
                { label: 'Source', value: 'Added manually' },
                { label: 'Sync', value: <StatusBadge>Manual</StatusBadge> },
                { label: 'Incoming changes', value: 'None' },
              ]}
            />
          </Panel>
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}

function OverviewPanel({ program, detail }: { program: AdminProgram; detail?: CourseDetailData }) {
  if (detail?.overviewCopy) {
    return (
      <Panel title="Overview">
        <div className="space-y-5">
          <p className="max-w-prose text-sm leading-relaxed text-foreground">{detail.overviewCopy}</p>
          {detail.facts && detail.facts.length > 0 ? <FactList columns={3} items={detail.facts.map((fact) => ({ label: fact.label, value: fact.value }))} /> : null}
        </div>
      </Panel>
    )
  }
  return (
    <Panel title="Overview">
      <div className="space-y-5">
        <EmptyNote>No overview written yet.</EmptyNote>
        <FactList
          columns={3}
          items={[
            { label: 'Level', value: program.level },
            { label: 'Duration', value: program.duration },
            { label: 'Typical fees', value: program.fees },
          ]}
        />
      </div>
    </Panel>
  )
}

function EligibilityPanel({ program, detail }: { program: AdminProgram; detail?: CourseDetailData }) {
  const eligibility = detail?.eligibility
  return (
    <Panel title="Eligibility">
      {eligibility ? (
        <div className="space-y-4">
          <FactList
            items={[
              { label: 'Qualification', value: eligibility.academic },
              { label: 'Required subjects', value: eligibility.subjects },
              { label: 'Minimum marks', value: eligibility.minimumMarks },
              { label: 'Entrance exams', value: eligibility.entrance },
            ]}
          />
          {eligibility.note ? <p className="text-[13px] text-muted-foreground">{eligibility.note}</p> : null}
        </div>
      ) : (
        <FactList columns={1} items={[{ label: 'Requirement', value: program.eligibility || 'Not specified' }]} />
      )}
    </Panel>
  )
}

function CurriculumPanel({ syllabus }: { syllabus?: CourseDetailData['syllabus'] }) {
  if (!syllabus || syllabus.length === 0) return null
  return (
    <Panel title="Curriculum" bodyClassName="p-0">
      <div className="divide-y divide-border">
        {syllabus.map((year) => (
          <div key={year.year} className="space-y-2 px-5 py-4">
            <p className="text-sm font-medium text-foreground">{year.year}</p>
            <div className="flex flex-wrap gap-1.5">
              {year.subjects.map((subject) => (
                <Tag key={subject} className="font-normal">
                  {subject}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function ExamsPanel({ exams, fallback }: { exams?: CourseDetailData['exams']; fallback: string[] }) {
  const hasDetailed = !!exams && exams.length > 0
  if (!hasDetailed && fallback.length === 0) return null
  return (
    <Panel title="Entrance exams">
      {hasDetailed ? (
        <ul className="divide-y divide-border">
          {exams!.map((exam) => (
            <li key={exam.name} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{exam.name}</p>
                <p className="text-[13px] text-muted-foreground">{exam.purpose}</p>
              </div>
              <Tag>{exam.level}</Tag>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {fallback.map((exam) => (
            <Tag key={exam}>{exam}</Tag>
          ))}
        </div>
      )}
    </Panel>
  )
}

function InstitutionsPanel({ program }: { program: AdminProgram }) {
  const { offerings } = program
  return (
    <Panel title="Offered by" description={`${offerings.length} ${offerings.length === 1 ? 'institution' : 'institutions'}`}>
      {offerings.length > 0 ? (
        <ul className="divide-y divide-border">
          {offerings.map((offering) => (
            <li key={offering.slug} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/admin/institutions/${offering.id}`} className="text-sm font-medium text-foreground hover:text-primary hover:underline">
                  {offering.name}
                </Link>
                <p className="text-[13px] text-muted-foreground">
                  {[`${offering.city}, ${offering.state}`, offering.type, offering.exam ? `Exam: ${offering.exam}` : null, offering.fees ? `Fees: ${offering.fees}` : null].filter(Boolean).join(' · ')}
                </p>
              </div>
              <Link href={`/admin/admissions-fees?institution=${offering.id}&program=${program.id}`} className={smallOutline}>
                Admissions and fees
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyNote>No institutions linked to this course yet.</EmptyNote>
      )}
    </Panel>
  )
}

function DocumentsPanel({ program }: { program: AdminProgram }) {
  const { documents } = program
  return (
    <Panel title="Documents" description={documents.length > 0 ? `${documents.length} attached` : undefined}>
      {documents.length > 0 ? (
        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              title={doc.title}
              type={documentTypes.find((t) => t.value === doc.type)?.label ?? doc.type}
              meta={[doc.fileFormat, doc.fileSize, `Source: ${doc.provenance.sourceName || 'Internal record'}`].filter(Boolean).join(' · ')}
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
            <Link href={`/admin/programs/${program.id}/edit#documents`} className={smallOutline}>
              Add document
            </Link>
          }
        >
          No documents attached yet.
        </EmptyNote>
      )}
    </Panel>
  )
}

function CareersPanel({ careerMetrics, careers, careerAreas }: { careerMetrics?: CourseDetailData['careerMetrics']; careers?: CourseDetailData['careers']; careerAreas: string[] }) {
  const hasCareers = !!careers && careers.length > 0
  if (!hasCareers && careerAreas.length === 0) return null
  return (
    <Panel title="Careers" action={<StatusBadge tone="warning">Source needed</StatusBadge>}>
      <div className="space-y-5">
        <p className="text-[13px] text-muted-foreground">Salary and outcome figures have no recorded source yet. Verify them before publishing.</p>
        {careerMetrics && careerMetrics.length > 0 ? <FactList columns={3} items={careerMetrics.map((metric) => ({ label: metric.label, value: metric.value }))} /> : null}
        {hasCareers ? (
          <ul className="divide-y divide-border border-t border-border">
            {careers!.map((career) => (
              <li key={career.role} className="py-3 last:pb-0">
                <p className="text-sm font-medium text-foreground">{career.role}</p>
                <p className="text-[13px] text-muted-foreground">{career.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {careerAreas.map((area) => (
              <Tag key={area}>{area}</Tag>
            ))}
          </div>
        )}
      </div>
    </Panel>
  )
}
