'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminInstitutionDetail } from '@/features/admin/types/institutions'
import {
  institutionCompletenessStatusStyles as completenessStatusStyles,
  institutionDetailQualityBadgeStyles as qualityBadgeStyles,
  institutionQualityCheckStyles as qualityCheckStyles,
} from '@/features/admin/constants/institutions'
import { AdminPageHeader, CompletenessMeter, FactList, Panel, StatusBadge, Tag, toneFromVariant } from '../kit'

const qualityItems = [
  { key: 'identity', label: 'Identity and approval' },
  { key: 'programs', label: 'Courses' },
  { key: 'fees', label: 'Fees' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'placements', label: 'Placement claims' },
  { key: 'scholarships', label: 'Scholarships' },
  { key: 'media', label: 'Campus media' },
] as const

const completenessItems = [
  { key: 'identity', label: 'Identity and accreditation' },
  { key: 'overview', label: 'Overview' },
  { key: 'programs', label: 'Courses' },
  { key: 'fees', label: 'Fees' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'facilities', label: 'Facilities' },
  { key: 'placements', label: 'Placements' },
  { key: 'scholarships', label: 'Scholarships' },
  { key: 'media', label: 'Photos' },
] as const

/** A quiet "needs a source" line for sections whose figures have no recorded provenance. */
function SourceWarning({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
      <StatusBadge tone="warning">Needs a source</StatusBadge>
      <span>{children}</span>
    </div>
  )
}

export function AdminInstitutionDetailView({ data }: { data: AdminInstitutionDetail }) {
  const { institution, detail } = data
  const quality = qualityBadgeStyles[institution.qualityStatus]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/institutions', label: 'Institutions' }}
        title={institution.name}
        meta={
          <>
            <StatusBadge tone={toneFromVariant(quality.variant)}>{quality.label}</StatusBadge>
            <Tag>{institution.type}</Tag>
            <span className="text-[13px] text-muted-foreground">
              {[`${institution.city}, ${institution.state}`, institution.approval, detail?.established ? `Est. ${detail.established}` : null].filter(Boolean).join(' · ')}
            </span>
          </>
        }
        actions={
          <>
            {institution.hasDetailPage ? (
              <Link href={`/college/${institution.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-9 gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/institutions/${institution.id}/edit`} className={buttonVariants({ size: 'sm', className: 'h-9' })}>
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Overview">
            {detail?.overviewCopy ? (
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-foreground">{detail.overviewCopy}</p>
                {detail.facts && detail.facts.length > 0 ? <FactList columns={3} items={detail.facts.map((fact) => ({ label: fact.label, value: fact.value }))} /> : null}
              </div>
            ) : (
              <div className="space-y-5">
                <FactList
                  columns={3}
                  items={[
                    { label: 'Main degree', value: institution.degree },
                    { label: 'Popular course', value: institution.popularCourse },
                    { label: 'Typical fees', value: institution.fees },
                  ]}
                />
                <p className="text-[13px] text-muted-foreground">This is a basic listing. The overview, history and key facts haven&apos;t been added yet.</p>
              </div>
            )}
          </Panel>

          <Panel
            title="Courses"
            description={`${detail?.courses?.length || 1} ${detail?.courses?.length && detail.courses.length > 1 ? 'courses' : 'course'}`}
            action={
              <Link href={`/admin/programs?institution=${institution.id}`} className="text-sm font-medium text-primary hover:underline">
                Manage courses
              </Link>
            }
            bodyClassName="p-0"
          >
            <ul className="divide-y divide-border">
              {detail?.courses && detail.courses.length > 0 ? (
                detail.courses.map((course) => (
                  <li key={course.name} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{course.name}</span>
                        <Tag>{course.level}</Tag>
                      </div>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">
                        {[course.duration, course.mode, `Exam: ${course.exam}`, `Eligibility: ${course.eligibility}`].join(' · ')}
                      </p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="text-sm font-medium text-foreground tabular-nums">{course.fees}</p>
                      <p className="text-[13px] text-muted-foreground">per year</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{institution.popularCourse}</p>
                    <p className="text-[13px] text-muted-foreground">Main listed course</p>
                  </div>
                  <span className="text-sm font-medium text-foreground tabular-nums">{institution.fees}</span>
                </li>
              )}
            </ul>
          </Panel>

          {detail?.fees && detail.fees.length > 0 ? (
            <Panel
              title="Admissions and fees"
              action={
                <Link href={`/admin/admissions-fees?institution=${institution.id}`} className="text-sm font-medium text-primary hover:underline">
                  Manage fees
                </Link>
              }
            >
              <div className="space-y-6">
                <div className="overflow-x-auto rounded-md border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-[13px] text-muted-foreground">
                      <tr>
                        <th className="px-3.5 py-2 font-medium">Course</th>
                        <th className="px-3.5 py-2 font-medium">Duration</th>
                        <th className="px-3.5 py-2 font-medium">Tuition</th>
                        <th className="px-3.5 py-2 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {detail.fees.map((fee) => (
                        <tr key={fee.course}>
                          <td className="px-3.5 py-2.5 font-medium text-foreground">{fee.course}</td>
                          <td className="px-3.5 py-2.5 text-muted-foreground">{fee.duration}</td>
                          <td className="px-3.5 py-2.5 text-muted-foreground tabular-nums">{fee.tuitionFee}</td>
                          <td className="px-3.5 py-2.5 text-right font-medium text-foreground tabular-nums">{fee.totalFee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {detail.admissions && detail.admissions.length > 0 ? (
                  <div>
                    <h3 className="mb-2 text-[13px] font-medium text-muted-foreground">Admission routes</h3>
                    <ul className="divide-y divide-border rounded-md border border-border">
                      {detail.admissions.map((admission) => (
                        <li key={admission.title} className="px-3.5 py-2.5">
                          <p className="text-sm font-medium text-foreground">{admission.title}</p>
                          <p className="text-[13px] text-muted-foreground">
                            Exam: {admission.exam} · {admission.selection}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Panel>
          ) : null}

          {detail?.facilities && detail.facilities.length > 0 ? (
            <Panel title="Facilities">
              <div className="flex flex-wrap gap-1.5">
                {detail.facilities.map((facility) => (
                  <Tag key={facility}>{facility}</Tag>
                ))}
              </div>
            </Panel>
          ) : null}

          {detail?.placementMetrics && detail.placementMetrics.length > 0 ? (
            <Panel title="Placements">
              <SourceWarning>Placement figures and packages have no recorded source.</SourceWarning>
              <div className="space-y-5">
                <FactList columns={3} items={detail.placementMetrics.map((metric) => ({ label: metric.label, value: metric.value }))} />
                {detail.recruiters && detail.recruiters.length > 0 ? (
                  <div>
                    <h3 className="mb-2 text-[13px] text-muted-foreground">Recruiters</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.recruiters.map((recruiter) => (
                        <Tag key={recruiter}>{recruiter}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Panel>
          ) : null}

          {detail?.scholarships && detail.scholarships.length > 0 ? (
            <Panel title="Scholarships">
              <SourceWarning>Deadlines and amounts have no recorded source.</SourceWarning>
              <ul className="divide-y divide-border rounded-md border border-border">
                {detail.scholarships.map((scholarship) => (
                  <li key={scholarship.name} className="flex flex-col gap-1 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{scholarship.name}</p>
                      <p className="text-[13px] text-muted-foreground">{scholarship.eligibility}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="text-sm font-medium text-foreground">{scholarship.benefit}</p>
                      <p className="text-[13px] text-muted-foreground">{scholarship.deadline}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}

          {detail?.gallery && detail.gallery.length > 0 ? (
            <Panel title="Photos" description={`${detail.gallery.length} in the gallery`}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {detail.gallery.slice(0, 4).map((image) => (
                  <figure key={image.id} className="space-y-1">
                    <div className="aspect-video overflow-hidden rounded-md border border-border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt={image.alt} className="size-full object-cover" />
                    </div>
                    <figcaption className="text-xs text-muted-foreground">{image.category}</figcaption>
                  </figure>
                ))}
              </div>
            </Panel>
          ) : null}

          <Panel title="Change history">
            <p className="text-sm text-muted-foreground">No changes recorded yet. Edits and data imports will be listed here.</p>
          </Panel>
        </div>

        <div className="space-y-6 lg:sticky lg:top-[4.5rem] lg:col-span-4">
          <Panel title="Completeness">
            <CompletenessMeter value={institution.completeness} />
            <ul className="mt-4 space-y-2">
              {completenessItems.map(({ key, label }) => {
                const style = completenessStatusStyles[institution.breakdown[key]]
                return (
                  <li key={key} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <StatusBadge tone={toneFromVariant(style.variant)}>{style.label}</StatusBadge>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel title="Data quality" description="Based on where each section's facts come from.">
            <ul className="space-y-2">
              {qualityItems.map(({ key, label }) => {
                const style = qualityCheckStyles[institution.qualityBreakdown[key]]
                return (
                  <li key={key} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <StatusBadge tone={toneFromVariant(style.variant)}>{style.label}</StatusBadge>
                  </li>
                )
              })}
            </ul>
            {institution.topIssues && institution.topIssues.length > 0 ? (
              <div className="mt-5 border-t border-border pt-4">
                <h3 className="mb-2 text-[13px] font-medium text-foreground">To fix</h3>
                <ul className="list-disc space-y-1 pl-4 text-[13px] text-muted-foreground marker:text-muted-foreground/60">
                  {institution.topIssues.map((issue) => (
                    <li key={issue.id}>{issue.label}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Panel>

          <Panel title="Source">
            <FactList
              columns={1}
              items={[
                { label: 'Source', value: 'Added manually' },
                { label: 'Sync', value: 'Manual; no automatic imports' },
                { label: 'Pending changes', value: <span className="font-normal text-muted-foreground">None</span> },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
