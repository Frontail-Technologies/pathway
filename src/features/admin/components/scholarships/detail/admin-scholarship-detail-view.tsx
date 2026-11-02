import Link from 'next/link'
import { Edit, ExternalLink, FileText, Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { AdminPageHeader, CompletenessMeter, FactList, Panel, StatusBadge, Tag, type StatusTone } from '../../kit'
import { completenessStatusStyles, qualityCheckStyles, scholarshipDocumentTypes } from '../shared/scholarship-constants'
import { ScholarshipApplicationStatusBadge, ScholarshipContentStatusBadge, ScholarshipQualityBadge } from '../shared/scholarship-status-badge'

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 text-sm font-medium text-foreground">{children}</h3>
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground marker:text-muted-foreground">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

function StatusRows({ rows }: { rows: { label: string; status: { label: string; tone: StatusTone } }[] }) {
  return (
    <ul className="divide-y divide-border">
      {rows.map((row) => (
        <li key={row.label} className="flex items-center justify-between gap-3 py-2 text-sm first:pt-0 last:pb-0">
          <span className="text-muted-foreground">{row.label}</span>
          <StatusBadge tone={row.status.tone}>{row.status.label}</StatusBadge>
        </li>
      ))}
    </ul>
  )
}

const join = (values: string[], fallback: string) => (values.length > 0 ? values.join(', ') : fallback)

export function AdminScholarshipDetailView({ scholarship: s }: { scholarship: AdminScholarship }) {
  const prov = s.provenance
  const editHref = `/admin/scholarships/${s.id}/edit`

  const completenessRows = [
    { label: 'Basics', state: s.breakdown.identity },
    { label: 'Provider and scope', state: s.breakdown.provider },
    { label: 'Eligibility', state: s.breakdown.eligibility },
    { label: 'Benefits', state: s.breakdown.benefit },
    { label: 'Dates', state: s.breakdown.dates },
    { label: 'How to apply', state: s.breakdown.application },
    { label: 'Documents', state: s.breakdown.documents },
  ].map((row) => ({ label: row.label, status: completenessStatusStyles[row.state] }))

  const qualityRows = [
    { label: 'Basics', state: s.qualityBreakdown.identity },
    { label: 'Provider and scope', state: s.qualityBreakdown.provider },
    { label: 'Eligibility', state: s.qualityBreakdown.eligibility },
    { label: 'Benefits', state: s.qualityBreakdown.benefit },
    { label: 'Dates', state: s.qualityBreakdown.dates },
    { label: 'How to apply', state: s.qualityBreakdown.application },
    { label: 'Source', state: s.qualityBreakdown.source },
  ].map((row) => ({ label: row.label, status: qualityCheckStyles[row.state] }))

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/scholarships', label: 'Scholarships' }}
        title={s.name}
        description={`${s.provider} · ${s.providerType}`}
        meta={
          <>
            <ScholarshipApplicationStatusBadge status={s.applicationStatus} />
            <ScholarshipQualityBadge status={s.qualityStatus} />
            {s.hasDetailPage ? <StatusBadge tone="success">Public page live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>}
          </>
        }
        actions={
          <>
            {s.hasDetailPage ? (
              <Link href={`/scholarship/${s.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={editHref} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
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
              {s.overviewCopy ? <p className="text-sm leading-relaxed text-foreground">{s.overviewCopy}</p> : <Empty>No overview written yet.</Empty>}
              <FactList
                items={[
                  { label: 'Type', value: <Tag>{s.scholarshipType}</Tag> },
                  { label: 'Level', value: join(s.educationLevels, 'All levels') },
                  { label: 'Streams', value: join(s.streams, 'All streams') },
                  { label: 'Session', value: s.academicSession ?? '—' },
                ]}
              />
            </div>
          </Panel>

          <Panel title="Eligibility">
            <div className="space-y-5">
              <FactList
                items={[
                  { label: 'Gender', value: s.genderEligibility },
                  { label: 'Family income', value: s.incomeLimitBucket ?? 'No limit' },
                  { label: 'States', value: join(s.states, 'All India') },
                  { label: 'Categories', value: join(s.categories, 'All categories') },
                ]}
              />
              {s.shortEligibility.length > 0 ? (
                <div>
                  <SubHeading>Key requirements</SubHeading>
                  <BulletList items={s.shortEligibility} />
                </div>
              ) : null}
              {s.eligibilityRows.length > 0 ? (
                <div>
                  <SubHeading>Criteria</SubHeading>
                  <FactList items={s.eligibilityRows.map((row) => ({ label: row.label, value: row.value }))} />
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Benefits">
            <FactList
              items={[
                { label: 'Amount', value: s.benefitLabel || 'Not set' },
                { label: 'Benefit type', value: s.benefitType },
                { label: 'Coverage', value: s.benefitCoverage ?? '—' },
                { label: 'Duration', value: s.benefitDuration ?? '—' },
                { label: 'Disbursement', value: s.benefitDisbursement ?? '—' },
                { label: 'Source', value: prov.sourceName ? prov.sourceName : <StatusBadge tone="warning">No official source</StatusBadge> },
              ]}
            />
          </Panel>

          <Panel
            title="How to apply"
            action={
              s.officialApplyUrl ? (
                <Link href={s.officialApplyUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Official portal
                </Link>
              ) : undefined
            }
          >
            <div className="space-y-5">
              <FactList
                items={[
                  { label: 'Deadline', value: s.deadlineDisplay || 'No date recorded' },
                  { label: 'Official portal', value: s.officialApplyUrl ? 'Linked' : 'Not added' },
                  ...s.importantDates.map((item) => ({ label: item.label, value: item.value })),
                ]}
              />
              <div>
                <SubHeading>Steps</SubHeading>
                {s.applicationSteps.length > 0 ? (
                  <ol className="list-decimal space-y-1 pl-5 text-sm text-foreground marker:text-muted-foreground">
                    {s.applicationSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <Empty>No application steps added yet.</Empty>
                )}
              </div>
              {s.selectionProcess.length > 0 ? (
                <div>
                  <SubHeading>Selection</SubHeading>
                  <p className="text-sm text-foreground">{s.selectionProcess.join(' → ')}</p>
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Required documents" description="What applicants need to submit.">
            {s.requiredDocuments.length > 0 ? <BulletList items={s.requiredDocuments} /> : <Empty>No checklist added yet.</Empty>}
          </Panel>

          <Panel
            title="Official documents"
            description={s.documents.length > 0 ? `${s.documents.length} attached` : undefined}
            action={
              <Link href={`${editHref}#documents`} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <Plus className="size-4" aria-hidden="true" />
                Attach
              </Link>
            }
            bodyClassName={s.documents.length > 0 ? 'px-5 py-2' : undefined}
          >
            {s.documents.length > 0 ? (
              <ul className="divide-y divide-border">
                {s.documents.map((doc) => (
                  <li key={doc.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                        <p className="text-[13px] text-muted-foreground">
                          {[scholarshipDocumentTypes.find((t) => t.value === doc.type)?.label, doc.fileFormat, doc.fileSize, doc.provenance.sourceName].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                    </div>
                    {doc.url ? (
                      <Link href={doc.url} target="_blank" rel="noreferrer" className="shrink-0 text-sm font-medium text-primary hover:underline">
                        View
                      </Link>
                    ) : (
                      <StatusBadge>File pending</StatusBadge>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>No notification or scheme document attached yet.</Empty>
            )}
          </Panel>
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <Panel title="Completeness" action={<ScholarshipContentStatusBadge status={s.contentStatus} />}>
            <div className="space-y-4">
              <CompletenessMeter value={s.completeness} />
              <StatusRows rows={completenessRows} />
            </div>
          </Panel>

          <Panel title="Data quality">
            <div className="space-y-4">
              <StatusRows rows={qualityRows} />
              {s.topIssues.length > 0 ? (
                <div className="border-t border-border pt-4">
                  <SubHeading>To check</SubHeading>
                  <BulletList items={s.topIssues.map((issue) => issue.label)} />
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Source">
            <FactList
              columns={1}
              items={[
                { label: 'Source', value: prov.sourceName || 'Not recorded' },
                { label: 'Entry', value: prov.syncStatus === 'manual' ? 'Added by hand' : 'Imported' },
                { label: 'Last reviewed', value: prov.lastReviewedAt || 'Not recorded' },
              ]}
            />
          </Panel>
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
