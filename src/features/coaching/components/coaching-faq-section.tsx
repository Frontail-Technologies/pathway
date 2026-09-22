import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import type { CoachingProvider } from '../data/coaching'

/**
 * Always full-width in the main column at every breakpoint — deliberately
 * not duplicated into the desktop sidebar (unlike Similar Institutes) so the
 * sticky nav's "FAQs" tab keeps exactly one always-rendered `#faqs` scroll
 * target instead of colliding on a duplicate id or targeting a hidden copy.
 */
export function CoachingFaqSection({ provider }: { provider: CoachingProvider }) {
  if (!provider.faqs?.length) return null

  return (
    <section id="faqs" className="scroll-mt-43 py-8 lg:scroll-mt-40 lg:py-12">
      <DetailSectionHeader title="Frequently Asked Questions" />
      <div className="mt-4 rounded-[10px] border bg-card px-4">
        <Accordion multiple={false}>
          {provider.faqs.map((faq, index) => (
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
