import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { AdminDetailStickyRail } from '../../admin-detail-sticky-rail'
import { FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../../kit'
import { SeoIndexingBadge, seoTargetTypeLabels } from '../shared/seo-meta'
import { SeoSearchSnippet, SeoSocialCard } from '../shared/seo-previews'

function sourceNote(isCustom: boolean) {
  return isCustom ? <StatusBadge tone="info">Custom</StatusBadge> : <StatusBadge>Default</StatusBadge>
}

function FieldRow({ label, isCustom, children }: { label: string; isCustom: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        {sourceNote(isCustom)}
      </div>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  )
}

export function AdminSeoDetailView({ record }: { record: AdminSeoRecord }) {
  const meta = record.resolvedMetadata
  const typeLabel = seoTargetTypeLabels[record.targetType] ?? record.targetType

  const overrideFields = [
    { label: 'Title', isOverride: meta.isOverrideTitle },
    { label: 'Description', isOverride: meta.isOverrideDescription },
    { label: 'Canonical link', isOverride: meta.isOverrideCanonical },
    { label: 'Indexing', isOverride: meta.isOverrideRobots },
    { label: 'Social title', isOverride: meta.isOverrideOgTitle },
    { label: 'Social description', isOverride: meta.isOverrideOgDescription },
    { label: 'Social image', isOverride: meta.isOverrideOgImage },
  ]
  const customCount = overrideFields.filter((field) => field.isOverride).length

  const followLabel = record.robotsFollow === undefined ? 'Default (followed)' : record.robotsFollow ? 'Followed' : 'Not followed'
  const indexLabel = record.robotsIndex === undefined ? 'Default (indexed)' : record.robotsIndex ? 'Indexed' : 'Not indexed'

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/seo', label: 'SEO' }}
        title={record.targetLabel}
        media={<Monogram name={record.targetLabel} size="lg" />}
        description={record.targetRoutePath}
        chips={
          <>
            <Tag>{typeLabel}</Tag>
            <SeoIndexingBadge robotsIndex={record.robotsIndex} robotsFollow={record.robotsFollow} />
          </>
        }
        actions={
          <>
            <Link href={record.targetRoutePath} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Open public page
            </Link>
            <Link href={`/admin/seo/${record.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Search result">
            <SeoSearchSnippet metadata={meta} />
          </Panel>

          <Panel title="Search text" bodyClassName="px-5 py-4">
            <div className="divide-y divide-border">
              <FieldRow label={`Title · ${meta.title.length} characters`} isCustom={meta.isOverrideTitle}>
                <p className="font-medium">{meta.title}</p>
              </FieldRow>
              <FieldRow label={`Description · ${meta.description.length} characters`} isCustom={meta.isOverrideDescription}>
                <p>{meta.description}</p>
              </FieldRow>
              <FieldRow label="Canonical link" isCustom={meta.isOverrideCanonical}>
                <p className="font-mono text-[13px]">{meta.canonicalPath}</p>
              </FieldRow>
            </div>
          </Panel>

          <Panel title="Indexing">
            <div className="space-y-4">
              <FactList
                items={[
                  { label: 'Search engines', value: indexLabel },
                  { label: 'Links on the page', value: followLabel },
                ]}
              />
              {record.robotsIndex === false ? (
                <p className="text-[13px] text-muted-foreground">This page is set to noindex, so it will not appear in search results.</p>
              ) : null}
            </div>
          </Panel>

          <Panel title="Social card">
            <div className="space-y-5">
              <SeoSocialCard metadata={meta} />
              <FactList
                items={[
                  { label: 'Social title', value: meta.isOverrideOgTitle ? meta.ogTitle : 'Uses search title' },
                  { label: 'Social description', value: meta.isOverrideOgDescription ? meta.ogDescription : 'Uses search description' },
                ]}
              />
            </div>
          </Panel>

          <Panel title="Keywords">
            <FactList
              items={[
                { label: 'Primary keyword', value: record.primaryKeyword || '—' },
                {
                  label: 'Other keywords',
                  value:
                    record.secondaryKeywords && record.secondaryKeywords.length > 0 ? (
                      <span className="flex flex-wrap gap-1">
                        {record.secondaryKeywords.map((keyword, index) => (
                          <Tag key={`${keyword}-${index}`}>{keyword}</Tag>
                        ))}
                      </span>
                    ) : (
                      '—'
                    ),
                },
              ]}
            />
          </Panel>
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <Panel title="Overrides" description={`${customCount} of ${overrideFields.length} fields customised`}>
            <ul className="divide-y divide-border">
              {overrideFields.map((field) => (
                <li key={field.label} className="flex items-center justify-between gap-3 py-2 text-sm first:pt-0 last:pb-0">
                  <span className="text-muted-foreground">{field.label}</span>
                  {sourceNote(field.isOverride)}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Applies to">
            <FactList
              columns={1}
              items={[
                { label: 'Page', value: record.targetLabel },
                { label: 'Type', value: typeLabel },
                { label: 'Path', value: <span className="font-mono text-[13px]">{record.targetRoutePath}</span> },
              ]}
            />
          </Panel>

          <Panel title="History">
            <FactList
              columns={1}
              items={[
                { label: 'Created', value: record.createdAt || 'Not recorded' },
                { label: 'Last updated', value: record.updatedAt || 'Not recorded' },
              ]}
            />
          </Panel>
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
