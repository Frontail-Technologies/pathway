import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CourseDetailData } from '../data/course-detail'

export function CourseSyllabusSection({ course }: { course: CourseDetailData }) {
  if (!course.syllabus.length) return null
  return (
    <section id="syllabus" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{course.name} Syllabus</h2>
      <p className="mt-1 text-sm text-muted-foreground">Representative subjects by year — actual syllabus varies by institute.</p>

      <div className="mt-4 rounded-[10px] border bg-card px-4">
        <Accordion multiple defaultValue={course.syllabus.map((item) => item.year)}>
          {course.syllabus.map((item) => (
            <AccordionItem key={item.year} value={item.year}>
              <AccordionTrigger className="text-sm font-semibold text-foreground sm:text-[15px]">{item.year}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/50">
                  {item.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
