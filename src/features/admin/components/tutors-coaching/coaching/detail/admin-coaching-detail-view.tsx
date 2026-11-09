import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { AdminDetailStickyRail } from '../../../admin-detail-sticky-rail'
import { FactList, Panel, Monogram, RecordHeader } from '../../../kit'
import { CompletenessPanel, HistoryPanel, PlainList, QualityPanel, RecordPanel, TextBlock } from '../../shared/detail-panels'
import { TagList } from '../../shared/tags'
import { providerPlace, sentenceCase } from '../../shared/tutor-coaching-constants'
import { PublicPageBadge, QualityStatusBadge } from '../../shared/tutor-status-badge'

export function AdminCoachingDetailView({ provider }: { provider: AdminCoachingProvider }) {
  const programs = provider.programs ?? []
  const facultyNotes = provider.facultyNotes ?? []
  const gallery = provider.gallery ?? []
  const faqs = provider.faqs ?? []

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/tutors-coaching?tab=coaching', label: 'Tutors & coaching' }}
        title={provider.name}
        media={<Monogram name={provider.name} size="lg" />}
        description={`${sentenceCase(provider.providerType)} · ${providerPlace(provider)}`}
        chips={
          <>
            <QualityStatusBadge status={provider.quality.status} />
            <PublicPageBadge live={!!provider.hasDetailPage} />
          </>
        }
        actions={
          <>
            {provider.hasDetailPage ? (
              <Link href={`/coaching/${provider.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/tutors-coaching/coaching/${provider.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Profile" bodyClassName="space-y-5">
            <TextBlock label="Tagline">{provider.programLabel || <span className="text-muted-foreground">Not added</span>}</TextBlock>
            {provider.aboutCopy ? <TextBlock label="About">{provider.aboutCopy}</TextBlock> : null}
            {provider.highlights.length > 0 ? (
              <TextBlock label="Highlights">
                <PlainList items={provider.highlights} />
              </TextBlock>
            ) : null}
          </Panel>

          <Panel title="Coverage">
            <FactList
              items={[
                { label: 'Exams', value: <TagList items={provider.exams} /> },
                { label: 'Subjects', value: <TagList items={provider.subjects} /> },
                { label: 'Mode', value: provider.modes.join(', ') || '—' },
                { label: 'Location', value: providerPlace(provider) },
                { label: 'Course formats', value: provider.courseTypes.map(sentenceCase).join(', ') || '—' },
                { label: 'Featured', value: provider.featured ? 'Yes' : 'No' },
              ]}
            />
          </Panel>

          <Panel title="Programs" description={programs.length > 0 ? `${programs.length} ${programs.length === 1 ? 'program' : 'programs'}` : undefined} bodyClassName={programs.length > 0 ? 'p-0' : undefined}>
            {programs.length > 0 ? (
              <ul className="divide-y divide-border">
                {programs.map((program) => (
                  <li key={program.name} className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">{program.name}</p>
                    {program.mode || program.courseType ? (
                      <p className="text-[13px] text-muted-foreground">{[program.mode, program.courseType && sentenceCase(program.courseType)].filter(Boolean).join(' · ')}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-foreground">{program.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No programs added. The listing shows course formats only.</p>
            )}
          </Panel>

          <Panel title="Teaching approach" bodyClassName={facultyNotes.length > 0 ? 'p-0' : undefined}>
            {facultyNotes.length > 0 ? (
              <ul className="divide-y divide-border">
                {facultyNotes.map((note) => (
                  <li key={note.title} className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">{note.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{note.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No teaching approach notes added.</p>
            )}
          </Panel>

          <Panel title="Photos" description={gallery.length > 0 ? `${gallery.length} ${gallery.length === 1 ? 'photo' : 'photos'}` : undefined}>
            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {gallery.map((src, index) => (
                  <div key={src} className="aspect-4/3 overflow-hidden rounded-md border border-border bg-muted">
                    <img src={src} alt={`${provider.name} photo ${index + 1}`} className="size-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No photos added. The listing uses its default image.</p>
            )}
          </Panel>

          {faqs.length > 0 ? (
            <Panel title="FAQs" description={`${faqs.length} ${faqs.length === 1 ? 'question' : 'questions'}`} bodyClassName="p-0">
              <ul className="divide-y divide-border">
                {faqs.map((faq) => (
                  <li key={faq.question} className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">{faq.question}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}

          <HistoryPanel />
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <QualityPanel quality={provider.quality} />
          <CompletenessPanel completeness={provider.completeness} />
          <RecordPanel id={provider.id} sourceInfo={provider.sourceInfo} note="Changes from automatic imports are held for review and never overwrite this record directly." />
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
