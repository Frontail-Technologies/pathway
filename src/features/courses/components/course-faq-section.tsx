import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CourseDetailData } from '../data/course-detail'

export function CourseFaqSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="faqs" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Frequently Asked Questions</h2>

      <div className="mt-4 rounded-[10px] border bg-card px-4">
        <Accordion multiple={false}>
          {course.faqs.map((faq, index) => (
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
