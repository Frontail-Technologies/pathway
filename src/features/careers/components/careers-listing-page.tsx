import Link from 'next/link'
import { ArrowRight, Brain, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/section-header'
import { CounsellingCtaSection } from '@/features/home/components/counselling-cta-section'
import { listCourses } from '@/features/courses/api/courses-api'
import { inCuratedOrder } from '@/features/catalog/curated'
import { CareersHero } from './careers-hero'
import { careerCategories, featuredCareerPaths, journeySteps } from '../data/careers'


const connectionSlugs = ['btech-computer-science', 'mbbs', 'mba', 'ba-llb']

export async function CareersListingPage() {
  const connectedCourses = await listCourses({ slugs: connectionSlugs.join(','), limit: String(connectionSlugs.length) })
    .then((list) => inCuratedOrder(list.items, connectionSlugs))
    .catch(() => [])
  return (
    <div className="bg-background">
      <CareersHero />

      <section id="categories" className="py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <SectionHeader title="Career Categories" description="Broad fields to help you get oriented — not a ranked or exhaustive list." />
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 lg:grid-cols-4">
            {careerCategories.map((category) => {
              const cardContent = (
                <>
                  <p className="text-sm font-bold text-foreground">{category.label}</p>
                  <p className="text-xs leading-5 text-muted-foreground">{category.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t pt-2.5">
                    {category.relatedCourseTags.map((tag) => (
                      <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {category.href && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )
              const cardClassName = 'group flex h-full flex-col gap-2 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40'
              return category.href ? (
                <Link key={category.id} href={category.href} className={cardClassName}>
                  {cardContent}
                </Link>
              ) : (
                <div key={category.id} className={cardClassName}>
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <SectionHeader title="Featured Career Paths" description="A look at what the work commonly involves and where it typically starts." />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCareerPaths.map((path) => (
              <div key={path.id} className="flex flex-col gap-2 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">{path.field}</p>
                <p className="text-[15px] font-bold text-foreground">{path.title}</p>
                <p className="text-xs leading-5 text-muted-foreground">{path.workInvolves}</p>
                <div className="mt-auto flex flex-col gap-1.5 border-t pt-2.5 text-xs text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Related courses:</span> {path.relatedCourses.join(', ')}
                  </p>
                  {path.relatedExam && (
                    <p>
                      <span className="font-semibold text-foreground">Related exam:</span> {path.relatedExam}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <div className="flex flex-col items-start gap-3 rounded-[16px] border bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Brain className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Not sure where to start?</h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                  Take our psychometric test to reflect on your interests and strengths — one helpful input among many, not a guaranteed answer.
                </p>
              </div>
            </div>
            <Button variant="cta" className="h-11 w-full shrink-0 px-6 font-semibold sm:w-fit" nativeButton={false} render={<Link href="/psychometric-test" />}>
              Take Psychometric Test
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SectionHeader title="Connect to Courses" description="Once you have a field in mind, browse the courses that commonly lead there." />
            <Link href="/courses" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View All Courses <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 lg:grid-cols-4">
            {connectedCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses?q=${encodeURIComponent(course.name)}`}
                className="group flex h-full items-center gap-3 rounded-[12px] border bg-card p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:p-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-11">
                  <GraduationCap className="size-4.5 sm:size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-foreground sm:text-sm">{course.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {course.stream} · {course.duration}
                  </p>
                </div>
                <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:block" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <SectionHeader title="Plan Your Path" />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
                <p className="mt-2.5 text-sm font-bold text-foreground">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CounsellingCtaSection />
    </div>
  )
}
