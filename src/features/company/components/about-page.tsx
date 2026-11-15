import Link from 'next/link'
import { Award, BadgeCheck, BookOpen, Compass, FileText, Landmark, Presentation, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { Band, CtaBandSection, HeroOutlineButton, MarketingHero } from '@/components/shared/landing'
import { Button } from '@/components/ui/button'
import { HeroScene } from '@/components/shared/landing-art'
import { getCatalogTotals } from '@/features/home/api/home-data'

const offerings = [
  { icon: Compass, title: 'Streams', body: 'Start from what you want to study and see everything for that stream in one place.', href: '/engineering' },
  { icon: Landmark, title: 'Colleges', body: 'Courses, fees, admission, placements, facilities and FAQs for each college.', href: '/colleges' },
  { icon: BookOpen, title: 'Courses', body: 'Eligibility, fees, syllabus and career paths for each course.', href: '/courses' },
  { icon: FileText, title: 'Exams', body: 'Eligibility, pattern, process and the colleges and courses that accept each exam.', href: '/exams' },
  { icon: Award, title: 'Scholarships', body: 'Scholarships by stream, level and eligibility, with links to official applications.', href: '/scholarships' },
  { icon: Presentation, title: 'Tutors & coaching', body: 'Coaching institutes and tutors for entrance exams and school subjects.', href: '/tutors' },
  { icon: Wrench, title: 'Planning tools', body: 'College and rank predictors, comparisons, a psychometric test and a resume builder.', href: '/college-predictor' },
]

const principles = [
  { icon: ShieldCheck, title: 'Clear about what is verified', body: 'Figures reported by institutes, such as placements, are labelled as self-reported. Information that is not yet available says so instead of guessing.' },
  { icon: BadgeCheck, title: 'Official sources first', body: 'Dates, eligibility and cut-offs change every year. We point you to official notices and ask you to confirm before you decide.' },
  { icon: Sparkles, title: 'Estimates are labelled', body: 'Predictor results come from last year’s official closing ranks and are estimates, not promises of admission.' },
]

export async function AboutPage() {
  const totals = await getCatalogTotals()
  const stats = [
    { label: 'Colleges', value: totals.colleges },
    { label: 'Courses', value: totals.courses },
    { label: 'Entrance exams', value: totals.exams },
    { label: 'Scholarships', value: totals.scholarships },
  ]
    .filter((item) => item.value > 0)
    .map((item) => ({ label: item.label, value: item.value.toLocaleString('en-IN') }))

  return (
    <>
      <MarketingHero
        trail={['Home', 'About']}
        aside={<HeroScene name="about" className="hidden lg:block" />}
        title="Education discovery, made clearer"
        description="Pathway helps students and parents in India find and compare colleges, courses, exams and scholarships, and plan the next step with less guesswork."
        stats={stats}
        actions={
          <>
            <Button variant="cta" size="lg" className="font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              Explore colleges
            </Button>
            <HeroOutlineButton href="/contact">Contact us</HeroOutlineButton>
          </>
        }
      />

      <Band title="What you can do on Pathway">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map(({ icon: Icon, title, body, href }) => (
            <li key={title}>
              <Link href={href} className="group flex h-full flex-col rounded-xl border bg-card p-5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-4 font-semibold text-foreground group-hover:text-primary">{title}</span>
                <span className="mt-1 text-sm leading-6 text-muted-foreground">{body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band title="How we handle information" tone="muted">
        <ul className="grid gap-3 lg:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-xl border bg-card p-5">
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Read the{' '}
          <Link href="/disclaimer" className="font-medium text-primary underline-offset-2 hover:underline">
            disclaimer
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
            privacy policy
          </Link>{' '}
          for details.
        </p>
      </Band>

      <CtaBandSection title="Not sure where to start?" text="Talk to a counsellor, or tell us what you think of Pathway." href="/counselling" label="Get free counselling" secondary={{ href: '/contact', label: 'Contact us' }} />
    </>
  )
}
