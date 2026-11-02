import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { teachingSteps } from '@/features/tutors/data/tutors'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { AdminDetailStickyRail } from '../../../admin-detail-sticky-rail'
import { AdminPageHeader, FactList, Panel } from '../../../kit'
import { CompletenessPanel, HistoryPanel, PlainList, QualityPanel, RecordPanel, TextBlock } from '../../shared/detail-panels'
import { TagList } from '../../shared/tags'
import { portraitLabel, PublicPageBadge, QualityStatusBadge } from '../../shared/tutor-status-badge'

export function AdminTutorDetailView({ tutor }: { tutor: AdminTutor }) {
  const traits = tutor.detail?.traits ?? []
  const whoHelps = tutor.detail?.whoHelps ?? []

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/tutors-coaching', label: 'Tutors & coaching' }}
        title={tutor.name}
        description={tutor.headline}
        meta={
          <>
            <QualityStatusBadge status={tutor.quality.status} />
            <PublicPageBadge live={tutor.hasDetailPage} />
          </>
        }
        actions={
          <>
            {tutor.hasDetailPage ? (
              <Link href={`/tutors/${tutor.slug}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1.5' })}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </Link>
            ) : null}
            <Link href={`/admin/tutors-coaching/tutors/${tutor.id}/edit`} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Profile" bodyClassName="space-y-5 p-5">
            <TextBlock label="Summary">{tutor.intro || <span className="text-muted-foreground">Not added</span>}</TextBlock>
            {tutor.detail?.longBio ? <TextBlock label="Full bio">{tutor.detail.longBio}</TextBlock> : null}
            {whoHelps.length > 0 ? (
              <TextBlock label="Who this tutor helps">
                <PlainList items={whoHelps} />
              </TextBlock>
            ) : null}
          </Panel>

          <Panel title="Teaching">
            <FactList
              items={[
                { label: 'Subjects', value: <TagList items={tutor.subjects} /> },
                { label: 'Exams', value: <TagList items={tutor.exams} /> },
                { label: 'Study levels', value: tutor.studyLevels.join(', ') || '—' },
                { label: 'Languages', value: tutor.languages.join(', ') || '—' },
                { label: 'Mode', value: tutor.modes.join(', ') || '—' },
                { label: 'Featured', value: tutor.featured ? 'Yes' : 'No' },
              ]}
            />
          </Panel>

          <Panel title="Teaching approach" bodyClassName="space-y-5 p-5">
            <TextBlock label="Traits">{traits.length > 0 ? <TagList items={traits} /> : <span className="text-muted-foreground">None added</span>}</TextBlock>
            <TextBlock label="Standard steps (shown on every tutor page)">
              <ol className="list-decimal space-y-1 pl-5 marker:text-muted-foreground">
                {teachingSteps.map((step) => (
                  <li key={step.title}>
                    <span className="font-medium">{step.title}.</span> <span className="text-muted-foreground">{step.text}</span>
                  </li>
                ))}
              </ol>
            </TextBlock>
          </Panel>

          <Panel title="Portrait">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <TutorPortrait tutor={tutor} className="size-20 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <FactList
                  items={[
                    { label: 'Type', value: portraitLabel[tutor.portraitStatus] },
                    { label: 'Photo file', value: tutor.portrait ? <span className="font-mono text-[13px] font-normal">{tutor.portrait}</span> : 'None' },
                    { label: 'Avatar style', value: `${tutor.avatar.style.charAt(0).toUpperCase()}${tutor.avatar.style.slice(1)} hair${tutor.avatar.glasses ? ', glasses' : ''}` },
                    { label: 'Avatar colours', value: <span className="font-mono text-[13px] font-normal">{[tutor.avatar.hair, tutor.avatar.shirt, tutor.avatar.skin].join(' · ')}</span> },
                  ]}
                />
                {tutor.portraitStatus !== 'real' ? <p className="mt-4 text-[13px] text-muted-foreground">A real photo is needed before this profile can be marked ready.</p> : null}
              </div>
            </div>
          </Panel>

          <HistoryPanel />
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <QualityPanel quality={tutor.quality} />
          <CompletenessPanel completeness={tutor.completeness} />
          <RecordPanel id={tutor.id} sourceInfo={tutor.sourceInfo} note="Tutor profiles contain personal data, so they're entered by hand and never filled in by automatic imports." />
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
