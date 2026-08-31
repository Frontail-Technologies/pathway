import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CourseDetailData } from '../data/course-detail'

export function CourseSyllabusSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="syllabus" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{course.name} Syllabus</h2>
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
