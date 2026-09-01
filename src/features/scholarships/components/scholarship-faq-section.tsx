import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

export function ScholarshipFaqSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="faqs" className="scroll-mt-43 py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Frequently Asked Questions</h2>

      <div className="mt-4 rounded-[10px] border bg-card px-4">
        <Accordion multiple={false}>
          {scholarship.faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-sm font-semibold text-foreground sm:text-[15px]">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
