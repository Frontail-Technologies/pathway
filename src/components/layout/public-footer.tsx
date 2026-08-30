import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Colleges', href: '/colleges' },
      { label: 'Courses', href: '/courses' },
      { label: 'Exams', href: '/exams' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Study Abroad', href: '/study-abroad' },
      { label: 'Tutors', href: '/tutors' },
    ],
  },
  {
    title: 'Student Tools',
    links: [
      { label: 'College Predictor', href: '/college-predictor' },
      { label: 'Compare Colleges', href: '/compare' },
      { label: 'Saved Colleges', href: '/student/saved' },
      { label: 'Counselling', href: '/counselling' },
      { label: 'Reviews', href: '/reviews' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Admissions', href: '/admissions' },
      { label: 'Career Guidance', href: '/resources?topic=careers' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Popular Categories',
    links: [
      { label: 'Engineering', href: '/colleges?stream=engineering' },
      { label: 'Medical', href: '/colleges?stream=medical' },
      { label: 'Management', href: '/colleges?stream=management' },
      { label: 'Law', href: '/colleges?stream=law' },
      { label: 'Design', href: '/colleges?stream=design' },
    ],
  },
] as const

export function PublicFooter() {
  return (
    <footer className="bg-brand-blue-dark text-primary-foreground">
      <div className="container-shell border-b border-primary-foreground/10 px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex max-w-sm flex-col gap-2">
            <Logo inverted />
            <p className="text-sm leading-6 text-primary-foreground/70">Helping students discover colleges, courses, exams and education opportunities.</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="text-sm font-semibold text-primary-foreground">Need help? Talk to our counselling team</p>
            <Button variant="cta" className="h-10 w-full px-5 sm:w-fit" nativeButton={false} render={<Link href="/counselling" />}>
              Get Free Counselling
            </Button>
          </div>
        </div>
      </div>

      <div className="container-shell hidden grid-cols-2 gap-8 px-4 py-10 sm:grid sm:grid-cols-3 lg:grid-cols-5 lg:py-12">
        {footerGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-wider text-primary-foreground/60 uppercase">{group.title}</p>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="rounded-sm text-sm text-primary-foreground/80 outline-none transition-colors hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-white/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Accordion className="container-shell px-4 py-2 sm:hidden">
        {footerGroups.map((group) => (
          <AccordionItem key={group.title} value={group.title} className="border-primary-foreground/10">
            <AccordionTrigger className="min-h-11 text-xs font-semibold tracking-wider text-primary-foreground uppercase **:data-[slot=accordion-trigger-icon]:text-primary-foreground/60">
              {group.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="rounded-sm text-sm text-primary-foreground/80 outline-none transition-colors hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-white/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="border-t border-primary-foreground/10">
        <div className="container-shell flex flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Pathway. All rights reserved.</p>
          <p>Made for students across India</p>
        </div>
      </div>
    </footer>
  )
}
