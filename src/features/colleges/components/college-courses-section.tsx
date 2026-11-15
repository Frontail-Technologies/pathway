import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeCoursesSection({ college }: { college: CollegeDetailData }) {
  const levels = [...new Set(college.courses.map((course) => course.level))]
  return (
    <section id="courses" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{college.name} courses</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {college.courses.length} {college.courses.length === 1 ? 'programme' : 'programmes'} · {levels.join(' and ')}
      </p>

      <ul className="mt-4 divide-y overflow-hidden rounded-lg border">
        {college.courses.map((course) => {
          const details = [
            { label: 'Fees', value: course.fees ? `${course.fees} / year` : '' },
            { label: 'Exams', value: course.exam },
            { label: 'Eligibility', value: course.eligibility },
          ].filter((item) => item.value)
          return (
            <li key={course.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="min-w-0 flex-1">
                {course.href ? (
                  <Link href={course.href} className="group inline-flex items-center gap-1 text-[15px] font-semibold text-foreground outline-none hover:text-primary focus-visible:text-primary">
                    {course.name}
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                  </Link>
                ) : (
                  <p className="text-[15px] font-semibold text-foreground">{course.name}</p>
                )}
                <p className="mt-0.5 text-[13px] text-muted-foreground">{[course.level, course.mode, course.duration].filter(Boolean).join(' · ')}</p>
                {details.length ? (
                  <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
                    {details.map((item) => (
                      <div key={item.label} className="flex gap-1.5">
                        <dt className="text-muted-foreground">{item.label}</dt>
                        <dd className="font-medium text-foreground">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
              <EnquiryDialog
                entityName={college.name}
                entity={{ kind: 'college', slug: college.slug }}
                interestOptions={college.courses.map((c) => c.name)}
                interestLabel="Course"
                defaultInterest={course.name}
                trigger={<Button variant="cta" className="h-10 shrink-0 self-start px-4 text-sm font-semibold sm:self-center">Enquire</Button>}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
