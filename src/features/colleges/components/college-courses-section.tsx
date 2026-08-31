import { Button } from '@/components/ui/button'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeCoursesSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="courses" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Courses at {college.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{college.courses.length} programmes across UG and PG levels</p>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {college.courses.map((course) => (
            <div key={course.name} className="p-5">
              {/* Mobile: compact prioritized rows — name, then condensed metadata lines, actions last with reduced weight. */}
              <div className="sm:hidden">
                <p className="text-sm font-semibold text-foreground">{course.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {course.level} · {course.duration}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{course.fees}</span> · {course.exam}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{course.eligibility}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Button variant="link" className="h-auto p-0 text-sm font-semibold">
                    View Course
                  </Button>
                  <Button variant="cta" className="h-9 px-4 text-xs font-semibold">
                    Enquire
                  </Button>
                </div>
              </div>

              {/* Desktop: structured columns — name/meta, then fees/exam/eligibility, then equal-weight actions. */}
              <div className="hidden sm:flex sm:items-center sm:gap-6">
                <div className="sm:w-56 sm:shrink-0">
                  <p className="text-[15px] font-semibold text-foreground">{course.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {course.level} · {course.mode} · {course.duration}
                  </p>
                </div>

                <div className="flex flex-1 gap-6">
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">Fees</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{course.fees}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">Accepted Exam</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{course.exam}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">Eligibility</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{course.eligibility}</p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" className="h-10 px-4 text-sm">
                    View Course
                  </Button>
                  <Button variant="cta" className="h-10 px-4 text-sm">
                    Enquire
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
