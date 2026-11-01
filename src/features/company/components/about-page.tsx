import Link from 'next/link'
import { Award, BadgeCheck, BookOpen, Compass, FileText, Landmark, Presentation, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'

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
  { icon: Sparkles, title: 'Previews are labelled', body: 'Predictor results and other estimates are shown as previews, not promises of admission.' },
]

export function AboutPage() {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', 'About']} />
        <header className="mt-5 max-w-3xl">
          <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">About Pathway</p>
          <h1 className="mt-2 font-heading text-[28px] leading-tight font-bold text-foreground sm:text-4xl">Education discovery, made clearer</h1>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground sm:text-base">
            Pathway helps students and parents in India find and compare colleges, courses, exams and scholarships, and plan the next step with less guesswork.
          </p>
        </header>
      </Container>

      <Container className="px-4 py-8 lg:py-12">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">What you can do on Pathway</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map(({ icon: Icon, title, body, href }) => (
            <li key={title}>
              <Link href={href} className="group flex h-full gap-3 rounded-[12px] border bg-card p-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-foreground group-hover:text-primary">{title}</span>
                  <span className="mt-0.5 block text-sm leading-6 text-muted-foreground">{body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-heading text-xl font-bold text-foreground sm:text-[22px]">How we handle information</h2>
        <ul className="mt-4 grid gap-3 lg:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-[12px] border bg-card p-4">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
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

        <div className="mt-12 flex flex-col gap-4 rounded-[14px] bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark))] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="font-heading text-lg font-bold sm:text-xl">Not sure where to start?</p>
            <p className="mt-1 text-sm text-white/85">Talk to a counsellor, or tell us what you think of Pathway.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="cta" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
              Get Free Counselling
            </Button>
            <Button variant="outline" className="h-11 border-white/40 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white" nativeButton={false} render={<Link href="/contact" />}>
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
