import Link from 'next/link'
import { ChevronRight, GraduationCap, ShieldCheck, TriangleAlert } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EnquiryForm } from '@/features/enquiries/components/enquiry-form'

const topics = ['General question', 'Report incorrect information', 'Feedback about Pathway', 'List or update my institution', 'Privacy or data request', 'Something else'] as const

const shortcuts = [
  { icon: GraduationCap, title: 'Admission or course advice', body: 'A counsellor can help you shortlist colleges and courses.', href: '/counselling', cta: 'Get free counselling' },
  { icon: TriangleAlert, title: 'Spotted something wrong?', body: 'Choose “Report incorrect information” and tell us the page and what needs fixing.', href: '#contact-form', cta: 'Report it below' },
  { icon: ShieldCheck, title: 'Your data', body: 'See how we use your information, or send a privacy request with the form.', href: '/privacy', cta: 'Read the privacy policy' },
]

export function ContactPage() {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 pb-10 lg:pt-6 lg:pb-14">
        <Breadcrumbs items={['Home', 'Contact']} />
        <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1fr_440px] lg:gap-12">
          <div>
            <h1 className="font-heading text-[28px] leading-tight font-bold text-foreground sm:text-4xl">Contact Pathway</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">Questions, corrections or feedback: send us a message and we’ll reply to the phone number or email you share.</p>

            <ul className="mt-6 flex flex-col gap-3">
              {shortcuts.map(({ icon: Icon, title, body, href, cta }) => (
                <li key={title} className="flex gap-3 rounded-[12px] border bg-card p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{body}</p>
                    <Link href={href} className="mt-1 inline-flex items-center gap-0.5 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
                      {cta}
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact-form" className="scroll-mt-header rounded-[14px] border bg-card p-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)] sm:p-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Send a message</h2>
            <p className="mt-0.5 mb-4 text-sm text-muted-foreground">All fields except name and mobile number are optional.</p>
            <EnquiryForm intent="enquiry" interestOptions={topics} interestLabel="Topic" />
          </div>
        </div>
      </Container>
    </div>
  )
}
