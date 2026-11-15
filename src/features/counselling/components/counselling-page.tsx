import Link from 'next/link'
import { CalendarCheck, Check, ClipboardList, MessagesSquare, PhoneCall } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Band, MarketingHero } from '@/components/shared/landing'
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
    <>
      <MarketingHero
        trail={['Home', 'Free counselling']}
        title="Talk to a counsellor about your next step"
        description="Personal guidance on colleges, courses and exams based on your goals, scores and budget."
        actions={
          <ul className="flex flex-col gap-2.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-[15px] font-medium">
                <Check className="size-5 shrink-0 text-primary-foreground/80" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        }
        aside={
          <div id="request" className="scroll-mt-header rounded-xl bg-card p-4 text-foreground sm:p-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Request a free call back</h2>
            <p className="mt-0.5 mb-4 text-sm text-muted-foreground">We usually call back within one working day.</p>
            <EnquiryForm intent="counselling" interestOptions={streamOptions} interestLabel="Stream you’re interested in" />
          </div>
        }
      />

      <Band title="How it works">
        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-3xl font-extrabold text-primary/25 tabular-nums">{index + 1}</span>
              </div>
              <p className="mt-4 font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band title="What we can help with" tone="muted">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li key={topic} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-4 text-[15px] font-medium text-foreground">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <MessagesSquare className="size-4" aria-hidden="true" />
              </span>
              {topic}
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Frequently asked questions">
        <div className="max-w-3xl">
          <Accordion multiple={false}>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-[15px] font-semibold text-foreground">{faq.q}</AccordionTrigger>
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
      </Band>
    </>
  )
}
