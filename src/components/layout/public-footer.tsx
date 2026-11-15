import Link from 'next/link'
import { ArrowRight, Smartphone } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { siteConfig } from '@/config/site'
import { shortInstituteName } from '@/features/colleges/utils'
import { getCatalogTotals, getPopularExams, getStreams, getTopRanked } from '@/features/home/api/home-data'

type FooterLink = { label: string; href: string }
type FooterGroup = { title: string; links: FooterLink[] }

const tools: FooterLink[] = [
  { label: 'JEE Main college predictor', href: '/college-predictor?exam=jee-main' },
  { label: 'JEE Advanced college predictor', href: '/college-predictor?exam=jee-advanced' },
  { label: 'JEE Main rank predictor', href: '/rank-predictor?exam=jee-main' },
  { label: 'NEET UG rank predictor', href: '/rank-predictor?exam=neet-ug' },
  { label: 'JoSAA cutoff explorer', href: '/cutoffs' },
  { label: 'Exam calendar', href: '/exam-calendar' },
  { label: 'Education loan EMI calculator', href: '/education-loan-calculator' },
  { label: 'Compare colleges', href: '/compare' },
  { label: 'Psychometric test', href: '/psychometric-test' },
  { label: 'Resume builder', href: '/resume-builder' },
]

const company: FooterLink[] = [
  { label: 'About Pathway', href: '/about' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Free counselling', href: '/counselling' },
  { label: 'Articles and news', href: '/articles' },
  { label: 'Notes and study material', href: '/notes' },
  { label: 'Study abroad', href: '/study-abroad' },
  { label: 'For tutors', href: '/tutor-dashboard' },
]

const legal: FooterLink[] = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
  { label: 'Cookie policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

const linkClass = 'rounded-sm text-sm text-primary-foreground/75 outline-none transition-colors hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-white/70'

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export async function PublicFooter() {
  const [totals, exams, colleges, streams] = await Promise.all([getCatalogTotals(), getPopularExams(7), getTopRanked(7), getStreams()])

  const groups: FooterGroup[] = [
    { title: 'Top exams', links: [...exams.map((exam) => ({ label: exam.shortName, href: `/exam/${exam.slug}` })), { label: 'All entrance exams', href: '/exams' }] },
    { title: 'Top colleges', links: [...colleges.map((college) => ({ label: shortInstituteName(college.name), href: `/college/${college.slug}` })), { label: 'All colleges', href: '/colleges?sort=ranking' }] },
    { title: 'Predictors and tools', links: tools },
    { title: 'Streams', links: [...streams.map((stream) => ({ label: stream.name, href: `/${stream.slug}` })), { label: 'Courses', href: '/courses' }, { label: 'Scholarships', href: '/scholarships' }] },
    { title: 'Pathway', links: company },
  ].filter((group) => group.links.length > 1)

  const stats = [
    { label: 'colleges', value: totals.colleges },
    { label: 'exams', value: totals.exams },
    { label: 'courses', value: totals.courses },
    { label: 'scholarships', value: totals.scholarships },
  ].filter((stat) => stat.value > 0)

  return (
    <footer className="web-chrome bg-brand-blue-dark text-primary-foreground">
      <div className="container-shell px-4 py-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-md flex-col gap-3">
            <Logo inverted />
            <p className="text-sm leading-6 text-primary-foreground/75">Find and compare colleges, courses, exams and scholarships across India, with official data and free tools to plan your next step.</p>
            {stats.length ? (
              <p className="text-sm text-primary-foreground/75">
                {stats.map((stat, index) => (
                  <span key={stat.label}>
                    {index ? ' · ' : ''}
                    <span className="font-semibold text-primary-foreground tabular-nums">{stat.value.toLocaleString('en-IN')}</span> {stat.label}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="cta" size="lg" className="gap-2 font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
              Get free counselling
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            {siteConfig.androidAppUrl ? (
              <Button variant="outline" size="lg" className="gap-2 border-primary-foreground/30 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" nativeButton={false} render={<a href={siteConfig.androidAppUrl} target="_blank" rel="noopener noreferrer" />}>
                <Smartphone className="size-4" aria-hidden="true" />
                Get the app
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-shell hidden gap-8 px-4 py-10 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3.5">
              <h2 className="text-sm font-semibold text-primary-foreground">{group.title}</h2>
              <LinkList links={group.links} />
            </nav>
          ))}
        </div>

        <Accordion className="container-shell px-4 py-2 sm:hidden">
          {groups.map((group) => (
            <AccordionItem key={group.title} value={group.title} className="border-primary-foreground/10">
              <AccordionTrigger className="min-h-12 text-sm font-semibold text-primary-foreground **:data-[slot=accordion-trigger-icon]:text-primary-foreground/60">{group.title}</AccordionTrigger>
              <AccordionContent>
                <LinkList links={group.links} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-shell flex flex-col gap-3 px-4 py-5 text-sm text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pathway. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
