import Link from 'next/link'
import { CalendarCheck, Check, ClipboardList, MessagesSquare, PhoneCall } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EnquiryForm } from '@/features/enquiries/components/enquiry-form'
import { streamOptions } from '@/features/courses/data/filters'

const benefits = ['Free, no obligation', 'College & course shortlisting', 'Exam and admission planning']

const steps = [
  { icon: ClipboardList, title: 'Share your details', body: 'Tell us your stream, class or exam, and what you want help with.' },
  { icon: PhoneCall, title: 'Get a call back', body: 'A counsellor calls you to understand your goals, scores and budget.' },
  { icon: CalendarCheck, title: 'Leave with a plan', body: 'Get a shortlist of colleges and courses and the next deadlines to watch.' },
]

const topics = [
  'Choosing a stream after Class 10 or 12',
  'Shortlisting colleges for your exam score',
  'Understanding fees, scholarships and loans',
  'Entrance exam strategy and timelines',
  'Comparing courses and career outcomes',
  'Planning to study abroad',
]

const faqs = [
  { q: 'Is counselling really free?', a: 'Yes. Requesting a call back and the first counselling session are free, and there is no obligation to apply anywhere.' },
  { q: 'Who will call me?', a: 'An education counsellor will call the mobile number you share. They can explain colleges, courses, exams and admission steps.' },
  { q: 'Can I get help for a specific college?', a: 'Yes. Mention the college or course in your question, or use "Enquire Now" on that college’s page so your request includes it.' },
  { q: 'How is my information used?', a: 'Only to respond to your request. See our privacy policy for details.' },
]

export function CounsellingPage() {
  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark))]">
        <Container className="px-4 pt-5 pb-8 lg:pt-6 lg:pb-14">
          <div className="[&_a]:text-white/80 [&_li]:text-white/80 [&_span]:text-white">
            <Breadcrumbs items={['Home', 'Free Counselling']} />
          </div>
          <div className="mt-5 grid items-start gap-6 lg:grid-cols-[1fr_420px] lg:gap-12">
            <div className="text-white">
              <p className="text-xs font-bold tracking-[0.14em] text-white/75 uppercase">Free Counselling</p>
              <h1 className="mt-2 font-heading text-[26px] leading-tight font-bold sm:text-4xl">Talk to a counsellor about your next step</h1>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/85">Get personal guidance on colleges, courses and exams based on your goals, scores and budget.</p>
              <ul className="mt-4 flex flex-col gap-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="size-4 shrink-0 text-white/80" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div id="request" className="scroll-mt-header rounded-[14px] bg-card p-4 shadow-[0_12px_32px_rgba(15,23,42,0.22)] sm:p-5">
              <h2 className="font-heading text-lg font-bold text-foreground">Request a free call back</h2>
              <p className="mt-0.5 mb-4 text-sm text-muted-foreground">We usually call back within one working day.</p>
              <EnquiryForm intent="counselling" interestOptions={streamOptions} interestLabel="Stream you’re interested in" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="px-4 py-8 lg:py-12">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">How it works</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="rounded-[12px] border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Step {index + 1}</span>
              </div>
              <p className="mt-3 font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-10 font-heading text-xl font-bold text-foreground sm:text-[22px]">What we can help with</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li key={topic} className="flex items-center gap-2.5 rounded-[10px] border bg-card px-4 py-3 text-sm font-medium text-foreground">
              <MessagesSquare className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {topic}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-heading text-xl font-bold text-foreground sm:text-[22px]">Frequently asked questions</h2>
        <div className="mt-2 max-w-3xl">
          <Accordion multiple={false}>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-sm font-semibold text-foreground sm:text-[15px]">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">
                  {faq.a}
                  {index === faqs.length - 1 && (
                    <>
                      {' '}
                      <Link href="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
                        Read the privacy policy
                      </Link>
                      .
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  )
}
