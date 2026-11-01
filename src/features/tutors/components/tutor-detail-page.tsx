import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Globe, GraduationCap, Info, MonitorSmartphone } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { DetailSectionNav, type DetailSectionNavItem } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { TutorActionBar } from './tutor-action-bar'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { Button } from '@/components/ui/button'
import { getRelatedTutors, teachingSteps, type Tutor, type TutorDetail } from '../data/tutors'
import { TutorPortrait } from './tutor-avatar'
import { TutorProfileAction, TutorSaveAction } from './tutor-cards'

type DetailedTutor = Tutor & { detail: TutorDetail }

const chip = 'rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary'

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-section border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

 
function RequestSessionButton({ className }: { className?: string }) {
  return (
    <Button variant="cta" className={className} disabled title="Session requests are coming soon">
      Request Session
    </Button>
  )
}

function TutorHeader({ tutor }: { tutor: DetailedTutor }) {
  const facts: DetailQuickFact[] = [
    { icon: BookOpen, label: 'Subjects', value: tutor.subjects.join(', ') },
    { icon: Globe, label: 'Languages', value: tutor.languages.join(', ') },
    { icon: MonitorSmartphone, label: 'Learning Mode', value: tutor.modes.join(' & ') },
    { icon: GraduationCap, label: 'Study Level', value: tutor.studyLevels.join(', ') },
  ]

  return (
    <div>
      <div className="relative overflow-hidden rounded-[16px] border bg-[linear-gradient(135deg,#ffffff_45%,var(--brand-blue-light))] p-4 shadow-[0_8px_28px_rgba(30,58,138,0.06)] sm:p-6 lg:p-7">
        { }
        <span className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-primary/5" aria-hidden="true" />
        <span className="pointer-events-none absolute -right-4 bottom-6 size-24 rounded-full border border-primary/10" aria-hidden="true" />

        <div className="relative flex items-start gap-4 sm:gap-6 lg:gap-8">
          <TutorPortrait tutor={tutor} className="h-40 w-32 rounded-2xl shadow-[0_12px_28px_rgba(30,58,138,0.16)] sm:h-52 sm:w-44 lg:h-60 lg:w-52" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Tutor</p>
            <h1 className="mt-1 font-heading text-2xl leading-tight font-extrabold text-foreground sm:text-4xl">{tutor.name}</h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">{tutor.headline}</p>
            <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-foreground sm:block sm:text-[15px]">{tutor.intro}</p>

            <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
              {tutor.subjects.map((subject) => (
                <span key={subject} className={chip}>
                  {subject}
                </span>
              ))}
              {tutor.exams.map((exam) => (
                <span key={exam} className="rounded-md border bg-white/80 px-2 py-0.5 text-xs font-medium text-foreground">
                  {exam}
                </span>
              ))}
            </div>
            <p className="mt-3 hidden text-[13px] text-muted-foreground sm:block">
              {tutor.languages.join(', ')} · {tutor.modes.join(' & ')}
            </p>

            <div className="mt-4 hidden flex-wrap items-center gap-2.5 sm:flex">
              <RequestSessionButton className="h-10 px-6 text-sm font-semibold" />
              <TutorSaveAction tutor={tutor} />
              <p className="text-xs text-muted-foreground">Session requests coming soon</p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 sm:hidden">
          <p className="text-sm leading-6 text-foreground">{tutor.intro}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tutor.subjects.map((subject) => (
              <span key={subject} className={chip}>
                {subject}
              </span>
            ))}
            {tutor.exams.map((exam) => (
              <span key={exam} className="rounded-md border bg-white/80 px-2 py-0.5 text-xs font-medium text-foreground">
                {exam}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DetailQuickFacts facts={facts} />
      </div>

      <div className="mt-4 flex flex-col gap-2 pb-5 sm:hidden">
        <RequestSessionButton className="h-11 w-full text-sm font-semibold" />
        <TutorSaveAction tutor={tutor} />
        <p className="text-center text-xs text-muted-foreground">Session requests coming soon</p>
      </div>
      <div className="hidden pb-6 sm:block" />
    </div>
  )
}

function AboutSection({ tutor }: { tutor: DetailedTutor }) {
  return (
    <Section id="overview" title={`About ${tutor.name.split(' ')[0]}`}>
      <p className="text-[15px] leading-7 text-foreground">{tutor.detail.longBio}</p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {tutor.detail.traits.map((trait) => (
          <li key={trait} className="flex items-center gap-2.5 rounded-[10px] bg-secondary/60 px-3.5 py-3 text-sm font-medium text-foreground">
            <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {trait}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function SubjectsSection({ tutor }: { tutor: DetailedTutor }) {
  return (
    <Section id="subjects" title="Subjects & Expertise">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tutor.subjects.map((subject) => (
          <div key={subject} className="flex items-center gap-3 rounded-[10px] border bg-card p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <BookOpen className="size-4.5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-foreground">{subject}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] tracking-wide text-muted-foreground uppercase">Exam preparation</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tutor.exams.map((exam) => (
          <span key={exam} className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-foreground">
            {exam}
          </span>
        ))}
      </div>
    </Section>
  )
}

function ApproachSection() {
  return (
    <Section id="approach" title="Teaching Approach">
      <ol className="grid gap-3 sm:grid-cols-2">
        {teachingSteps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3 rounded-[10px] border bg-card p-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">A general outline of how sessions are structured. Outcomes depend on the student’s own effort and starting point.</p>
    </Section>
  )
}

function FitSection({ tutor }: { tutor: DetailedTutor }) {
  return (
    <Section id="fit" title="Who This Tutor Helps">
      <ul className="flex flex-col gap-3">
        {tutor.detail.whoHelps.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-foreground">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Check className="size-3" aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function LanguagesSection({ tutor }: { tutor: DetailedTutor }) {
  return (
    <Section id="languages" title="Languages & Modes">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[10px] border bg-card p-4">
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Languages</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tutor.languages.map((language) => (
              <span key={language} className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
                {language}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] border bg-card p-4">
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Learning modes</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tutor.modes.map((mode) => (
              <span key={mode} className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Modes describe what this tutor offers. Booking is not connected yet.</p>
    </Section>
  )
}

function AvailabilitySection() {
  return (
    <section id="availability" className="scroll-mt-section py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Availability</h2>
      <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-dashed bg-muted/40 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted-foreground">Session scheduling coming soon. Live availability and booking will appear here once scheduling is connected.</p>
      </div>
    </section>
  )
}

function TutorSidebar({ tutor }: { tutor: DetailedTutor }) {
  return (
    <div className="rounded-[10px] border bg-card p-4">
      <div className="flex items-center gap-3">
        <TutorPortrait tutor={tutor} className="size-16 rounded-xl" />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-foreground">{tutor.name}</p>
          <p className="text-xs text-muted-foreground">{tutor.subjects.join(' · ')}</p>
        </div>
      </div>
      <dl className="mt-4 flex flex-col gap-2 border-t pt-3 text-sm">
        {[
          ['Languages', tutor.languages.join(', ')],
          ['Modes', tutor.modes.join(' & ')],
          ['Levels', tutor.studyLevels.join(', ')],
          ['Sessions', 'Coming soon'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <RequestSessionButton className="mt-4 h-10 w-full text-sm font-semibold" />
      <p className="mt-2 text-center text-xs text-muted-foreground">Session requests coming soon</p>
    </div>
  )
}

function RelatedTutorsSection({ tutor }: { tutor: DetailedTutor }) {
  const related = getRelatedTutors(tutor)
  if (related.length === 0) return null
  return (
    <Container className="px-4">
      <section className="border-t py-7 lg:py-9" aria-labelledby="related-tutors-title">
        <h2 id="related-tutors-title" className="font-heading text-xl font-bold text-foreground sm:text-[22px]">
          Related Tutors
        </h2>
        <HorizontalContentRail ariaLabel="Related tutors" className="mt-4" trackClassName="lg:grid lg:grid-cols-3 lg:overflow-visible">
          {related.map((other) => (
            <div key={other.id} className="flex w-72 shrink-0 snap-start flex-col rounded-[10px] border bg-card p-4 lg:w-auto">
              <div className="flex items-center gap-3">
                <TutorPortrait tutor={other} className="size-16 rounded-xl" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{other.name}</p>
                  <p className="text-xs text-muted-foreground">{other.headline}</p>
                </div>
              </div>
              <div className="mt-3">
                <TutorProfileAction tutor={other} variant="outline" />
              </div>
            </div>
          ))}
        </HorizontalContentRail>
      </section>
    </Container>
  )
}

function FinalCta() {
  return (
    <Container className="px-4 pb-10">
      <div className="flex flex-col gap-4 rounded-[12px] border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-foreground">Still comparing tutors?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Browse every tutor by subject, exam, class level, language and learning mode.</p>
        </div>
        <Button variant="cta" className="h-11 gap-2 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/tutors" />}>
          Browse All Tutors
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </Container>
  )
}

export function TutorDetailPage({ tutor }: { tutor: DetailedTutor }) {
  const navItems: DetailSectionNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'approach', label: 'Approach' },
    { id: 'fit', label: 'Learning Fit' },
    { id: 'languages', label: 'Languages' },
    { id: 'availability', label: 'Availability' },
  ]

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Tutors', href: '/tutors' }, tutor.name]} />
        <div className="mt-4">
          <TutorHeader tutor={tutor} />
        </div>
      </Container>

      <DetailSectionNav items={navItems} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">
            <AboutSection tutor={tutor} />
            <SubjectsSection tutor={tutor} />
            <ApproachSection />
            <FitSection tutor={tutor} />
            <LanguagesSection tutor={tutor} />
            <AvailabilitySection />
          </div>
          <DetailStickySidebar>
            <TutorSidebar tutor={tutor} />
          </DetailStickySidebar>
        </div>
      </Container>

      <RelatedTutorsSection tutor={tutor} />
      <FinalCta />
      <TutorActionBar tutorSlug={tutor.slug} tutorName={tutor.name} />
    </div>
  )
}
