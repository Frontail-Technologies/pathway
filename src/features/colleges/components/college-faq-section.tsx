import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeFaqSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="faqs" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{college.name} FAQs</h2>

      <div className="mt-2">
        <Accordion multiple={false}>
          {college.faqs.map((faq, index) => (
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
