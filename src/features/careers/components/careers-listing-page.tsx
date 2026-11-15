import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FieldArt, fieldArtNames, HeroScene, type FieldArtName } from '@/components/shared/landing-art'
import { Button } from '@/components/ui/button'
import { Band, CtaBandSection, HeroOutlineButton, MarketingHero, StepList } from '@/components/shared/landing'
import { listCourses } from '@/features/courses/api/courses-api'
import { inCuratedOrder } from '@/features/catalog/curated'
import { careerCategories, featuredCareerPaths, journeySteps } from '../data/careers'

const connectionSlugs = ['btech-computer-science', 'mbbs', 'mba', 'ba-llb']


export async function CareersListingPage() {
  const connectedCourses = await listCourses({ slugs: connectionSlugs.join(','), limit: String(connectionSlugs.length) })
    .then((list) => inCuratedOrder(list.items, connectionSlugs))
    .catch(() => [])

  return (
    <>
      <MarketingHero
        trail={['Home', 'Careers']}
        aside={<HeroScene name="careers" className="hidden lg:block" />}
        title="Find a career that fits you"
        description="What the work involves in each field, and the courses and entrance exams that lead there."
        stats={[
          { label: 'Career fields', value: String(careerCategories.length) },
          { label: 'Career paths', value: String(featuredCareerPaths.length) },
        ]}
        actions={
          <>
            <Button variant="cta" size="lg" className="gap-2 font-semibold" nativeButton={false} render={<Link href="#fields" />}>
              Browse career fields
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <HeroOutlineButton href="/psychometric-test">Take the psychometric test</HeroOutlineButton>
          </>
        }
      />

      <Band id="fields" title="Career fields" subtitle="Pick a field to see the courses that lead into it">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {careerCategories.map((category) => {
            const body = (
              <>
                <FieldArt name={(fieldArtNames as string[]).includes(category.id) ? (category.id as FieldArtName) : 'education'} />
                <p className="mt-4 font-semibold text-foreground group-hover:text-primary">{category.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{category.description}</p>
                <p className="mt-auto pt-4 text-[13px] font-medium text-foreground">{category.relatedCourseTags.join(' · ')}</p>
              </>
            )
            const className = 'group flex h-full flex-col rounded-xl border bg-card p-5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40'
            return category.href ? (
              <Link key={category.id} href={category.href} className={className}>
                {body}
              </Link>
            ) : (
              <div key={category.id} className={className}>
                {body}
              </div>
            )
          })}
        </div>
      </Band>

      <Band title="Popular career paths" subtitle="What the job involves and where it starts" tone="muted">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCareerPaths.map((path) => (
            <article key={path.id} className="flex flex-col rounded-xl border bg-card p-5">
              <p className="text-[13px] font-medium text-primary">{path.field}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{path.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{path.workInvolves}</p>
              <dl className="mt-auto grid gap-1.5 pt-4 text-sm">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Courses</dt>
                  <dd className="font-medium text-foreground">{path.relatedCourses.join(', ')}</dd>
                </div>
                {path.relatedExam ? (
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">Exam</dt>
                    <dd className="font-medium text-foreground">{path.relatedExam}</dd>
                  </div>
                ) : null}
              </dl>
            </article>
          ))}
        </div>
      </Band>

      <CtaBandSection title="Not sure which field suits you?" text="A 16-question test on what you enjoy and how you like to work." href="/psychometric-test" label="Take the test" />

      {connectedCourses.length ? (
        <Band title="Courses that lead there" href="/courses" linkLabel="All courses" tone="muted">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {connectedCourses.map((course) => (
              <Link key={course.slug} href={`/course/${course.slug}`} className="group flex flex-col rounded-xl border bg-card p-5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                <span className="text-[13px] font-medium text-primary">{course.stream}</span>
                <span className="mt-1 text-lg font-semibold text-foreground group-hover:text-primary">{course.name}</span>
                <span className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
                  {[course.duration, course.fees].filter(Boolean).join(' · ')}
                  <ArrowRight className="size-4 shrink-0 group-hover:text-primary" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Band>
      ) : null}

      <Band title="Plan your path">
        <StepList steps={journeySteps} />
      </Band>

      <CtaBandSection title="Need help choosing a college?" text="Free guidance on colleges, courses and exams from a counsellor." href="/counselling" label="Get free counselling" tone="muted" />
    </>
  )
}
