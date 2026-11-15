import type { ReactNode } from 'react'
import Link from 'next/link'
import { Building2, Check, Flag, GraduationCap, Info, Layers } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import { DetailBody, DetailSection } from '@/components/shared/detail-section'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailTabBreadcrumbs } from '@/components/shared/detail-tab-breadcrumbs'
import { KeyValueTable } from '@/components/shared/key-value-table'
import { hasTab, sectionNavItems, tabLinks } from '@/lib/detail-tabs'
import { ExamActionBar } from './exam-action-bar'
import { ExamStreamCoursesSection, ExamTopCollegesSection, examStreamData } from './exam-stream-sections'
import { ExamDatesTable, ExamKeyDateCard, ExamNoticesSection } from './exam-notices'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { examFromSlug } from '@/features/college-predictor/data/predictor'
import { rankExamFromSlug } from '@/features/rank-predictor/data/rank'
import type { Exam } from '../data/exams'
import { examBase, examColleges, examCourses, examTabs, type DetailedExam } from '../config/exam-tabs'

const monogram = (exam: Exam) => exam.shortName.split(' ')[0].slice(0, 4).toUpperCase()

const Section = DetailSection

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
  const facts: DetailQuickFact[] = [
    { icon: Layers, label: 'Study Area', value: exam.studyArea },
    { icon: Flag, label: 'Exam Scope', value: exam.scope },
    { icon: GraduationCap, label: 'Level', value: exam.level },
    ...(exam.conductingBody ? [{ icon: Building2, label: 'Conducting Body', value: exam.conductingBody }] : []),
  ]

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-primary sm:size-16">{monogram(exam)}</span>
          <div className="min-w-0">
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{exam.shortName}</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">{exam.name}</p>
            <p className="mt-2.5 max-w-2xl text-sm leading-6 text-foreground">{exam.description}</p>
          </div>
        </div>

      </div>

      <div className="mt-5">
        <DetailQuickFacts facts={facts} />
      </div>
      <div className="mt-4 empty:hidden">
        <ExamKeyDateCard exam={exam} />
      </div>
    </div>
  )
}

export function OverviewSection({ exam }: { exam: DetailedExam }) {
  return (
    <Section id="overview" title={`About ${exam.shortName}`}>
      <p className="text-[15px] leading-7 text-muted-foreground">{exam.detail.longDescription}</p>
      <h3 className="mt-6 text-base font-semibold text-foreground">{exam.shortName} highlights</h3>
      <KeyValueTable
        className="mt-3"
        head={['Particulars', 'Details']}
        rows={[
          { label: 'Full name', value: exam.name },
          { label: 'Conducting body', value: exam.conductingBody },
          { label: 'Accepted by', value: exam.courses.length ? `${exam.courses.length} ${exam.courses.length === 1 ? 'course' : 'courses'} on Pathway` : null },
          ...exam.detail.overview.map((point) => ({ label: point.label, value: point.text })),
        ]}
      />
    </Section>
  )
}

export function EligibilitySection({ exam }: { exam: DetailedExam }) {
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

export function PatternSection({ exam }: { exam: DetailedExam }) {
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

export function SyllabusSection({ exam }: { exam: DetailedExam }) {
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

export function ProcessSection({ exam }: { exam: DetailedExam }) {
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

export function CollegesSection({ exam }: { exam: DetailedExam }) {
  const list = examColleges(exam)
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
            <p className="mt-2 flex-1 text-xs text-muted-foreground">Related to {exam.shortName}</p>
            <div className="mt-3">
              {college.hasDetailPage ? (
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

 
export function CoursesSection({ exam }: { exam: DetailedExam }) {
  const list = examCourses(exam)
  if (list.length === 0) return null
  return (
    <Section id="courses" title={`Courses Accepting ${exam.shortName}`}>
      <div className="divide-y rounded-[10px] border bg-card">
        {list.map((course) => (
          <div key={course.slug} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{course.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {course.degree}
              </p>
            </div>
            {course.hasDetailPage ? (
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

export function FaqSection({ exam }: { exam: DetailedExam }) {
  return (
    <Section id="faqs" title={`${exam.shortName} FAQs`}>
      <Accordion multiple={false}>
        {exam.detail.faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-sm font-semibold text-foreground sm:text-[15px]">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

function ExamSidebar({ exam, collegesHref }: { exam: DetailedExam; collegesHref?: string }) {
  const links = predictorLinks(exam)
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[10px] border bg-card p-4">
        <p className="text-[15px] font-semibold text-foreground">Plan your next step</p>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">Shortlist colleges and courses for {exam.studyArea.toLowerCase()}.</p>
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
        <Button variant={links.college ? 'outline' : 'cta'} className="mt-2 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href={collegesHref ?? '/colleges'} />}>
          Explore colleges
        </Button>
      </div>
    </div>
  )
}

function RelatedExamsSection({ exam }: { exam: DetailedExam }) {
  const related = exam.related
  if (related.length === 0) return null
  return (
    <section id="related-exams" className="rounded-xl border bg-card p-4 sm:p-6" aria-labelledby="related-exams-title">
        <h2 id="related-exams-title" className="font-heading text-lg font-bold text-foreground sm:text-xl">
          {related.some((other) => other.studyArea === exam.studyArea) ? 'Related exams' : 'Other popular exams'}
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
                <Button variant="outline" size="sm" className="px-4" nativeButton={false} render={<Link href={`/exam/${other.slug}`} />}>
                  View exam
                </Button>
              </div>
            </div>
          ))}
        </HorizontalContentRail>
    </section>
  )
}

export async function ExamDetailShell({ exam, children }: { exam: DetailedExam; children: ReactNode }) {
  const base = examBase(exam.slug)
  const has = (segment: string) => hasTab(examTabs, exam, segment)
  const stream = await examStreamData(exam)
  const tabs = sectionNavItems(examTabs, exam)
  const extra = [
    ...(stream?.colleges.length ? [{ id: 'top-colleges', label: 'Top colleges' }] : []),
    ...(stream?.courses.length ? [{ id: 'stream-courses', label: 'Courses' }] : []),
  ]
  const nav = [...tabs.filter((item) => item.id !== 'faqs'), ...extra, ...tabs.filter((item) => item.id === 'faqs')]

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 pb-5 lg:pt-6">
        <DetailTabBreadcrumbs trail={['Home', { label: 'Exams', href: '/exams' }]} entityLabel={exam.shortName} base={base} tabs={tabLinks(examTabs, exam, base)} />
        <div className="mt-4">
          <ExamHeader exam={exam} />
        </div>
      </Container>

      <DetailSectionNav items={nav} label={`${exam.shortName} sections`} />

      <DetailBody aside={<ExamSidebar exam={exam} collegesHref={stream?.colleges.length ? stream.collegesHref : undefined} />}>
        <OverviewSection exam={exam} />
        <ExamDatesTable exam={exam} />
        {has('eligibility') ? <EligibilitySection exam={exam} /> : null}
        {has('pattern') ? (
          <>
            <PatternSection exam={exam} />
            <SyllabusSection exam={exam} />
          </>
        ) : null}
        {has('process') ? <ProcessSection exam={exam} /> : null}
        {has('notices') ? <ExamNoticesSection exam={exam} /> : null}
        {has('colleges') ? <CollegesSection exam={exam} /> : null}
        {has('courses') ? <CoursesSection exam={exam} /> : null}
        {stream ? <ExamTopCollegesSection data={stream} /> : null}
        {stream ? <ExamStreamCoursesSection data={stream} /> : null}
        {has('faqs') ? <FaqSection exam={exam} /> : null}
        <RelatedExamsSection exam={exam} />
      </DetailBody>

      {children}
      <ExamActionBar examName={exam.shortName} examSlug={exam.slug} collegePredictorHref={predictorLinks(exam).college} rankPredictorHref={predictorLinks(exam).rank} />
    </div>
  )
}
