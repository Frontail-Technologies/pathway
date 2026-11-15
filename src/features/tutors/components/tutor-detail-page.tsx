import Link from 'next/link'
import { ArrowRight, Check, Globe, MonitorSmartphone } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailBody, DetailSection } from '@/components/shared/detail-section'
import { DetailSectionNav, type DetailSectionNavItem } from '@/components/shared/detail-section-nav'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { Button } from '@/components/ui/button'
import { teachingSteps } from '../data/tutors'
import type { DetailedTutor } from '../api/tutors-api'
import { TutorActionBar } from './tutor-action-bar'
import { TutorPortrait } from './tutor-avatar'
import { TutorProfileAction, TutorSaveAction } from './tutor-cards'

const subjectArt: Record<string, SpotArtName> = { Physics: 'predictor', Chemistry: 'notes', Mathematics: 'chart', Biology: 'scholarship', English: 'courses', 'Computer Science': 'presentation' }

function TutorHeader({ tutor }: { tutor: DetailedTutor }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-shell px-4 pt-5 pb-8 lg:pt-6 lg:pb-10">
        <div className="[&_a]:text-primary-foreground/80 [&_li]:text-primary-foreground/80 [&_span]:text-primary-foreground">
          <Breadcrumbs items={['Home', { label: 'Tutors', href: '/tutors' }, tutor.name]} />
        </div>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <div className="w-fit shrink-0 rounded-2xl bg-primary-foreground p-1.5 shadow-[0_14px_36px_rgba(15,23,42,0.22)]">
            <TutorPortrait tutor={tutor} className="h-36 w-28 rounded-xl sm:h-44 sm:w-36" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-[28px] leading-tight font-extrabold sm:text-[38px]">{tutor.name}</h1>
            <p className="mt-1 text-base text-primary-foreground/85">{tutor.headline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tutor.subjects.map((subject) => (
                <span key={subject} className="rounded-md bg-primary-foreground px-2 py-0.5 text-xs font-semibold text-primary">
                  {subject}
                </span>
              ))}
              {tutor.exams.map((exam) => (
                <span key={exam} className="rounded-md bg-primary-foreground/15 px-2 py-0.5 text-xs font-semibold">
                  {exam}
                </span>
              ))}
            </div>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-primary-foreground/85">
              <span className="flex items-center gap-1.5">
                <Globe className="size-4" aria-hidden="true" />
                {tutor.languages.join(', ')}
              </span>
              <span className="flex items-center gap-1.5">
                <MonitorSmartphone className="size-4" aria-hidden="true" />
                {tutor.modes.join(' and ')}
              </span>
            </p>
            <div className="mt-5 hidden flex-wrap gap-2.5 sm:flex">
              <Button variant="cta" className="h-10 gap-1.5 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
                Get free counselling
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <div className="[&_button]:border-primary-foreground/40 [&_button]:bg-transparent [&_button]:text-primary-foreground [&_button:hover]:bg-primary-foreground/10 [&_button:hover]:text-primary-foreground [&_svg]:text-primary-foreground">
                <TutorSaveAction tutor={tutor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Facts({ tutor }: { tutor: DetailedTutor }) {
  const facts: { art: SpotArtName; label: string; value: string }[] = [
    { art: 'courses', label: 'Subjects', value: tutor.subjects.join(', ') },
    { art: 'exam', label: 'Exams', value: tutor.exams.join(', ') || 'General' },
    { art: 'college', label: 'Class level', value: tutor.studyLevels.join(', ') },
    { art: 'presentation', label: 'Mode', value: tutor.modes.join(' and ') },
  ]
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {facts.map((fact) => (
        <li key={fact.label} className="flex items-center gap-3 rounded-xl border bg-card p-3.5">
          <SpotArt name={fact.art} className="size-11" />
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">{fact.label}</span>
            <span className="block text-sm font-semibold text-foreground">{fact.value}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function SideCard({ tutor }: { tutor: DetailedTutor }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <TutorPortrait tutor={tutor} className="size-14 rounded-xl" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-foreground">{tutor.name}</p>
            <p className="truncate text-xs text-muted-foreground">{tutor.subjects.join(' · ')}</p>
          </div>
        </div>
        <dl className="mt-4 flex flex-col gap-2 border-t pt-3 text-sm">
          {[
            ['Languages', tutor.languages.join(', ')],
            ['Modes', tutor.modes.join(' and ')],
            ['Levels', tutor.studyLevels.join(', ')],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="cta" className="h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
            Get free counselling
          </Button>
          <TutorSaveAction tutor={tutor} />
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-4">
        <SpotArt name="updated" className="size-11 bg-card" />
        <p className="mt-2.5 text-sm font-semibold text-foreground">Booking sessions</p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Requesting a session directly is on the way. A counsellor can help you get started now.</p>
      </div>
    </div>
  )
}

export function TutorDetailPage({ tutor }: { tutor: DetailedTutor }) {
  const firstName = tutor.name.split(' ')[0]
  const navItems: DetailSectionNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'approach', label: 'Approach' },
    ...(tutor.detail.whoHelps.length ? [{ id: 'fit', label: 'Who it suits' }] : []),
    ...(tutor.related.length ? [{ id: 'related', label: 'Similar tutors' }] : []),
  ]

  return (
    <div className="bg-muted/50 pb-24 lg:pb-12">
      <TutorHeader tutor={tutor} />
      <DetailSectionNav items={navItems} />
      <DetailBody aside={<SideCard tutor={tutor} />}>
        <Facts tutor={tutor} />

        <DetailSection id="overview" title={`About ${firstName}`}>
          <p className="text-[15px] leading-7 text-foreground">{tutor.detail.longBio || tutor.intro}</p>
          {tutor.detail.traits.length ? (
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {tutor.detail.traits.map((trait) => (
                <li key={trait} className="flex items-center gap-2.5 rounded-lg bg-secondary px-3.5 py-3 text-sm font-medium text-foreground">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {trait}
                </li>
              ))}
            </ul>
          ) : null}
        </DetailSection>

        <DetailSection id="subjects" title="Subjects and exams">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tutor.subjects.map((subject) => (
              <li key={subject} className="flex items-center gap-3 rounded-xl border p-3.5">
                <SpotArt name={subjectArt[subject] ?? 'courses'} className="size-11" />
                <span className="text-sm font-semibold text-foreground">{subject}</span>
              </li>
            ))}
          </ul>
          {tutor.exams.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Prepares students for</span>
              {tutor.exams.map((exam) => (
                <span key={exam} className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold text-primary">
                  {exam}
                </span>
              ))}
            </div>
          ) : null}
        </DetailSection>

        <DetailSection id="approach" title="How sessions run">
          <ol className="grid gap-3 sm:grid-cols-2">
            {teachingSteps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </DetailSection>

        {tutor.detail.whoHelps.length ? (
          <DetailSection id="fit" title={`Who ${firstName} helps`}>
            <ul className="flex flex-col gap-3">
              {tutor.detail.whoHelps.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}

        {tutor.related.length ? (
          <DetailSection id="related" title="Similar tutors" action={<Link href="/tutors" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">All tutors<ArrowRight className="size-4" aria-hidden="true" /></Link>}>
            <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {tutor.related.map((other) => (
                <li key={other.id} className="flex flex-col rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <TutorPortrait tutor={other} className="size-14 rounded-xl" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{other.name}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{other.headline}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <TutorProfileAction tutor={other} variant="outline" />
                  </div>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}
      </DetailBody>
      <TutorActionBar tutorSlug={tutor.slug} tutorName={tutor.name} />
    </div>
  )
}
