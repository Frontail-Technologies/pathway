import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, Check, Flag, GraduationCap, Info, Layers } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { DetailSectionNav, type DetailSectionNavItem } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { ExamActionBar } from './exam-action-bar'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { courses } from '@/features/courses/data/courses'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { examFromSlug } from '@/features/college-predictor/data/predictor'
import { rankExamFromSlug } from '@/features/rank-predictor/data/rank'
import { getRelatedExams, type Exam, type ExamDetail } from '../data/exams'

type DetailedExam = Exam & { detail: ExamDetail }

const monogram = (exam: Exam) => exam.shortName.split(' ')[0].slice(0, 4).toUpperCase()

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-section border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function PendingNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-[10px] border border-dashed bg-muted/40 p-4">
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  )
}

 
function predictorLinks(exam: Exam) {
  return {
    college: examFromSlug[exam.slug] ? `/college-predictor?exam=${exam.slug}` : null,
    rank: rankExamFromSlug[exam.slug] ? `/rank-predictor?exam=${exam.slug}` : null,
  }
}

function ExamHeader({ exam }: { exam: DetailedExam }) {
  const links = predictorLinks(exam)
  const facts: DetailQuickFact[] = [
    { icon: Layers, label: 'Study Area', value: exam.studyArea },
    { icon: Flag, label: 'Exam Scope', value: exam.scope },
    { icon: GraduationCap, label: 'Level', value: exam.level },
    ...(exam.conductingBody ? [{ icon: Building2, label: 'Conducting Body', value: exam.conductingBody }] : []),
  ]

  return (
    <div className="border-b pb-5 sm:pb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-primary sm:size-16">{monogram(exam)}</span>
          <div className="min-w-0">
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{exam.shortName}</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{exam.name}</p>
            <p className="mt-2.5 max-w-2xl text-sm leading-6 text-foreground">{exam.description}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{exam.studyArea}</span>
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{exam.scope}</span>
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{exam.level}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:w-64 lg:shrink-0 lg:flex-col">
          {links.college && (
            <Button variant="cta" className="h-11 gap-2 px-5 text-sm font-semibold sm:h-10" nativeButton={false} render={<Link href={links.college} />}>
              Use College Predictor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          )}
          <Button variant="outline" className="h-11 px-5 text-sm font-semibold sm:h-10" nativeButton={false} render={<Link href="/colleges" />}>
            Explore Colleges
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <DetailQuickFacts facts={facts} />
      </div>
    </div>
  )
}

function OverviewSection({ exam }: { exam: DetailedExam }) {
  return (
    <Section id="overview" title={`About ${exam.shortName}`}>
      <p className="text-sm leading-6 text-foreground">{exam.detail.longDescription}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {exam.detail.overview.map((point) => (
          <div key={point.label} className="rounded-[10px] border bg-card p-3.5">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{point.label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{point.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function EligibilitySection({ exam }: { exam: DetailedExam }) {
  const { eligibility } = exam.detail
  return (
    <Section id="eligibility" title="Eligibility">
      {eligibility?.length ? (
        <div className="divide-y rounded-[10px] border bg-card">
          {eligibility.map((row) => (
            <div key={row.label} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-4">
              <p className="text-sm font-semibold text-foreground">{row.label}</p>
              <p className="text-sm leading-6 text-muted-foreground">{row.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <PendingNote>Detailed eligibility criteria will be added once verified exam data is connected. Please refer to the official information bulletin for current rules.</PendingNote>
      )}
    </Section>
  )
}

function PatternSection({ exam }: { exam: DetailedExam }) {
  const { pattern } = exam.detail
  return (
    <Section id="pattern" title="Exam Pattern">
      {!!pattern?.length && (
        <div className="divide-y rounded-[10px] border bg-card">
          {pattern.map((row) => (
            <div key={row.label} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-4">
              <p className="text-sm font-semibold text-foreground">{row.label}</p>
              <p className="text-sm text-foreground">{row.value}</p>
            </div>
          ))}
        </div>
      )}
      <div className={pattern?.length ? 'mt-3' : ''}>
        <PendingNote>
          {pattern?.length ? 'Duration, number of questions and marking scheme are not connected yet — data pending integration.' : 'Exam pattern details (mode, sections, duration and marking) are pending verified exam-data integration.'} Check the official notification for the current pattern.
        </PendingNote>
      </div>
    </Section>
  )
}

function SyllabusSection({ exam }: { exam: DetailedExam }) {
  const groups = exam.detail.syllabusGroups
  if (!groups?.length) return null
  return (
    <Section id="syllabus" title="Syllabus Areas">
      <div className="grid gap-3 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-[10px] border bg-card p-4">
            <p className="text-[15px] font-semibold text-foreground">{group.title}</p>
            {group.topics?.length ? (
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {group.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-[13px] leading-5 text-muted-foreground">Detailed syllabus topics pending verified exam-data integration.</p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Detailed syllabus content will be added from verified exam sources.</p>
    </Section>
  )
}

function ProcessSection({ exam }: { exam: DetailedExam }) {
  return (
    <Section id="process" title="Exam & Admission Process">
      <ol className="grid gap-3 sm:grid-cols-2">
        {exam.detail.processSteps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3 rounded-[10px] border bg-card p-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">General steps only. This does not indicate that registration is currently open.</p>
    </Section>
  )
}

function CollegesSection({ exam }: { exam: DetailedExam }) {
  const list = (exam.detail.collegeSlugs ?? []).map((slug) => colleges.find((college) => college.slug === slug)).filter((college) => !!college)
  if (list.length === 0) return null
  return (
    <Section id="colleges" title="Colleges to Explore">
      <p className="mb-3 text-[13px] text-muted-foreground">These are relevant institutions in Pathway, not a verified participating-college list.</p>
      <HorizontalContentRail ariaLabel="Colleges to explore" showControls>
        {list.map((college) => (
          <div key={college.slug} className="flex w-64 shrink-0 snap-start flex-col rounded-[10px] border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{college.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {college.city} · {college.type}
            </p>
            <p className="mt-2 flex-1 text-[13px] text-foreground">{college.popularCourse}</p>
            <p className="mt-1 text-xs text-muted-foreground">Listed exam: {college.exam}</p>
            <div className="mt-3">
              {getCollegeDetail(college.slug) ? (
                <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/college/${college.slug}`} />}>
                  View College
                </Button>
              ) : (
                <span className="text-xs font-medium text-muted-foreground/80">Profile coming soon</span>
              )}
            </div>
          </div>
        ))}
      </HorizontalContentRail>
      <div className="mt-3">
        <Link href="/colleges" className="cursor-pointer text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
          Browse all colleges
        </Link>
      </div>
    </Section>
  )
}

 
function CoursesSection({ exam }: { exam: DetailedExam }) {
  const list = courses.filter((course) => course.entranceExams.includes(exam.shortName))
  if (list.length === 0) return null
  return (
    <Section id="courses" title={`Courses Accepting ${exam.shortName}`}>
      <div className="divide-y rounded-[10px] border bg-card">
        {list.map((course) => (
          <div key={course.slug} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{course.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {course.level} · {course.duration} · {course.eligibility}
              </p>
            </div>
            {getCourseDetail(course.slug) ? (
              <Button variant="outline" className="h-9 shrink-0 px-4 text-sm" nativeButton={false} render={<Link href={`/course/${course.slug}`} />}>
                View Course
              </Button>
            ) : (
              <span className="text-xs font-medium text-muted-foreground/80">Details soon</span>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

function FaqSection({ exam }: { exam: DetailedExam }) {
  return (
    <section id="faqs" className="scroll-mt-section py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Frequently Asked Questions</h2>
      <div className="mt-4 rounded-[10px] border bg-card px-4">
        <Accordion multiple={false}>
          {exam.detail.faqs.map((faq, index) => (
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

function ExamSidebar({ exam }: { exam: DetailedExam }) {
  const links = predictorLinks(exam)
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[10px] border bg-card p-4">
        <p className="text-[15px] font-semibold text-foreground">{exam.shortName} at a glance</p>
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          {[
            ['Study area', exam.studyArea],
            ['Scope', exam.scope],
            ['Level', exam.level],
            ...(exam.conductingBody ? [['Conducted by', exam.conductingBody]] : []),
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-[10px] border bg-card p-4">
        <p className="text-[15px] font-semibold text-foreground">After the exam</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Add your own performance details to preview colleges or a rank range. Previews are placeholders, not live predictions.</p>
        {links.college && (
          <Button variant="cta" className="mt-3 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href={links.college} />}>
            Use College Predictor
          </Button>
        )}
        {links.rank && (
          <Button variant="outline" className="mt-2 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href={links.rank} />}>
            Use Rank Predictor
          </Button>
        )}
      </div>
    </div>
  )
}

function RelatedExamsSection({ exam }: { exam: DetailedExam }) {
  const related = getRelatedExams(exam)
  if (related.length === 0) return null
  return (
    <Container className="px-4">
      <section id="related-exams" className="border-t py-7 lg:py-9" aria-labelledby="related-exams-title">
        <h2 id="related-exams-title" className="font-heading text-xl font-bold text-foreground sm:text-[22px]">
          Related Exams
        </h2>
        <HorizontalContentRail ariaLabel="Related exams" className="mt-4" showControls>
          {related.map((other) => (
            <div key={other.id} className="flex w-64 shrink-0 snap-start flex-col rounded-[10px] border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-primary">{monogram(other)}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{other.shortName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {other.studyArea} · {other.scope}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                {other.hasDetailPage ? (
                  <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={`/exam/${other.slug}`} />}>
                    View Details
                  </Button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground/80">Details soon</span>
                )}
              </div>
            </div>
          ))}
        </HorizontalContentRail>
      </section>
    </Container>
  )
}

function FinalCta({ exam }: { exam: DetailedExam }) {
  const links = predictorLinks(exam)
  return (
    <Container className="px-4 pb-10">
      <div className="flex flex-col gap-4 rounded-[12px] border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-foreground">Planning your next step after {exam.shortName}?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Preview colleges that may suit your profile, or browse institutions on Pathway.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {links.college && (
            <Button variant="cta" className="h-11 gap-2 px-5 text-sm font-semibold" nativeButton={false} render={<Link href={links.college} />}>
              Try College Predictor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          )}
          <Button variant="outline" className="h-11 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
            Explore Colleges
          </Button>
        </div>
      </div>
    </Container>
  )
}

export function ExamDetailPage({ exam }: { exam: DetailedExam }) {
  const hasColleges = (exam.detail.collegeSlugs ?? []).length > 0
  const hasCourses = courses.some((course) => course.entranceExams.includes(exam.shortName))
  const navItems: DetailSectionNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'pattern', label: 'Pattern' },
    ...(exam.detail.syllabusGroups?.length ? [{ id: 'syllabus', label: 'Syllabus' }] : []),
    { id: 'process', label: 'Process' },
    ...(hasColleges ? [{ id: 'colleges', label: 'Colleges' }] : []),
    ...(hasCourses ? [{ id: 'courses', label: 'Courses' }] : []),
    { id: 'faqs', label: 'FAQs' },
  ]

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Exams', href: '/exams' }, exam.shortName]} />
        <div className="mt-4">
          <ExamHeader exam={exam} />
        </div>
      </Container>

      <DetailSectionNav items={navItems} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">
            <OverviewSection exam={exam} />
            <EligibilitySection exam={exam} />
            <PatternSection exam={exam} />
            <SyllabusSection exam={exam} />
            <ProcessSection exam={exam} />
            <CollegesSection exam={exam} />
            <CoursesSection exam={exam} />
            <FaqSection exam={exam} />
          </div>
          <DetailStickySidebar>
            <ExamSidebar exam={exam} />
          </DetailStickySidebar>
        </div>
      </Container>

      <RelatedExamsSection exam={exam} />
      <FinalCta exam={exam} />
      <ExamActionBar examName={exam.shortName} collegePredictorHref={predictorLinks(exam).college} rankPredictorHref={predictorLinks(exam).rank} />
    </div>
  )
}
