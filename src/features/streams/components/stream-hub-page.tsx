import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Band, CtaBandSection } from '@/components/shared/landing'
import { HeroScene } from '@/components/shared/landing-art'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { Button } from '@/components/ui/button'
import { CollegeCard } from '@/features/colleges/components/college-card'
import { NoticeList } from '@/features/content/components/notice-list'
import { CourseCard } from '@/features/courses/components/course-card'
import { ScholarshipRailCard } from '@/features/scholarships/components/scholarship-rail-card'
import type { StreamDefinition } from '../data/stream-taxonomy'
import type { StreamLanding } from '../api/stream-landing'

function Section({ id, title, href, linkLabel, tone, children }: { id: string; title: string; href?: string; linkLabel?: string; tone: 'white' | 'muted'; children: React.ReactNode }) {
  return (
    <Band id={id} title={title} href={href} linkLabel={linkLabel} tone={tone}>
      {children}
    </Band>
  )
}

export function StreamHubPage({ landing, otherStreams }: { landing: StreamLanding; otherStreams: StreamDefinition[] }) {
  const { stream, counts } = landing
  const name = stream.name.toLowerCase()
  const predictor = landing.exams.find((exam) => exam.predictor)
  const Icon = stream.icon
  const stats = [
    { label: 'Colleges', value: counts.colleges },
    { label: 'Courses', value: counts.courses },
    { label: 'Entrance exams', value: counts.exams },
    { label: 'Scholarships', value: counts.scholarships },
  ].filter((stat) => stat.value > 0)

  const nav = [
    landing.colleges.length ? { id: 'colleges', label: 'Colleges' } : null,
    landing.exams.length ? { id: 'exams', label: 'Exams' } : null,
    landing.courses.length ? { id: 'courses', label: 'Courses' } : null,
    landing.notices.length ? { id: 'updates', label: 'Updates' } : null,
    landing.scholarships.length ? { id: 'scholarships', label: 'Scholarships' } : null,
    landing.states.length ? { id: 'by-state', label: 'By state' } : null,
  ].filter((item): item is { id: string; label: string } => Boolean(item))

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container-shell px-4 pt-5 pb-7 lg:pt-6 lg:pb-9">
          <div className="[&_a]:text-primary-foreground/80 [&_li]:text-primary-foreground/80 [&_span]:text-primary-foreground">
            <Breadcrumbs items={['Home', stream.name]} />
          </div>
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-2xl">
          <div className="mt-5 flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground text-primary sm:size-16">
              <Icon className="size-7 sm:size-8" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="font-heading text-[26px] leading-tight font-bold sm:text-4xl">{stream.name}</h1>
              <p className="mt-1 text-[15px] text-primary-foreground/85">{landing.tagline}</p>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-7 text-primary-foreground/90">{stream.description}</p>
          {stats.length ? (
            <dl className="mt-5 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-heading text-2xl font-bold tabular-nums">{stat.value.toLocaleString('en-IN')}</dd>
                  <dt className="text-sm text-primary-foreground/80">{stat.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button variant="cta" size="lg" className="gap-2 font-semibold" nativeButton={false} render={<Link href={landing.collegesHref} />}>
              Explore {name} colleges
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            {predictor ? (
              <Button variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" nativeButton={false} render={<Link href={predictor.predictor!} />}>
                {predictor.shortName} college predictor
              </Button>
            ) : null}
          </div>
          </div>
          <div className="hidden w-[26rem] shrink-0 lg:block">
            <HeroScene name="streams" />
          </div>
          </div>
        </div>
      </section>

      {nav.length > 1 ? <DetailSectionNav items={nav} label={`${stream.name} sections`} /> : null}

      <div>
        {landing.colleges.length ? (
          <Section id="colleges" tone="white" title={`Top ${name} colleges`} href={landing.collegesHref} linkLabel={`View all ${counts.colleges.toLocaleString('en-IN')}`}>
            <HorizontalContentRail ariaLabel={`Top ${name} colleges`} showControls>
              {landing.colleges.map((college) => (
                <CollegeCard key={college.slug} college={college} variant="rail" />
              ))}
            </HorizontalContentRail>
          </Section>
        ) : null}

        {landing.exams.length ? (
          <Section id="exams" tone="muted" title={`Key ${name} entrance exams`} href="/exams" linkLabel="All exams">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {landing.exams.map((exam) => (
                <article key={exam.slug} className="flex flex-col rounded-xl border bg-card">
                  <Link href={`/exam/${exam.slug}`} className="group flex items-start gap-3 p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-primary">{exam.shortName.split(' ')[0]!.slice(0, 5).toUpperCase()}</span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-foreground group-hover:text-primary">{exam.shortName}</span>
                      <span className="block truncate text-[13px] text-muted-foreground">{exam.name}</span>
                    </span>
                  </Link>
                  <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1.5 border-t bg-muted/30 px-4 py-3 text-sm">
                    {exam.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-foreground hover:text-primary hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {predictor ? <CtaBandSection title={`Turn your ${predictor.shortName} rank into college options`} text="Colleges and branches within reach, from official JoSAA closing ranks." href={predictor.predictor!} label="Predict my colleges" /> : null}

        {landing.courses.length ? (
          <Section id="courses" tone="muted" title={`Popular ${name} courses`} href={landing.coursesHref} linkLabel="All courses">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {landing.courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </Section>
        ) : null}

        {landing.notices.length ? (
          <Section id="updates" tone="white" title="Latest official notices" href="/articles" linkLabel="All updates">
            <NoticeList notices={landing.notices} className="rounded-xl border bg-card px-4 sm:px-5" />
          </Section>
        ) : null}

        {landing.scholarships.length ? (
          <Section id="scholarships" tone="muted" title={`Scholarships for ${name} students`} href={landing.scholarshipsHref} linkLabel="All scholarships">
            <HorizontalContentRail ariaLabel={`${stream.name} scholarships`} showControls>
              {landing.scholarships.map((scholarship) => (
                <ScholarshipRailCard key={scholarship.slug} scholarship={scholarship} />
              ))}
            </HorizontalContentRail>
          </Section>
        ) : null}

        {landing.states.length ? (
          <Section id="by-state" tone="white" title={`${stream.name} colleges by state`}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-4">
              {landing.states.map((state) => (
                <li key={state.href}>
                  <Link href={state.href} className="text-foreground hover:text-primary hover:underline">
                    {stream.name} colleges in {state.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {otherStreams.length ? (
          <Band title="Explore other streams" tone="muted">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {otherStreams.map((other) => {
                const OtherIcon = other.icon
                return (
                  <Link key={other.slug} href={`/${other.slug}`} className="flex items-center gap-2.5 rounded-xl border bg-card p-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-primary/50 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                    <OtherIcon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    {other.name}
                  </Link>
                )
              })}
            </div>
          </Band>
        ) : null}
      </div>
    </div>
  )
}
