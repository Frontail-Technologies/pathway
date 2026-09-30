'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { StudentToolPageFrame, ToolActionBar, ToolStepper } from '@/components/shared/student-tool/student-tool-parts'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { courseForExam, defaultPerformance, emptyDraft, examFromSlug, getCourse, validateCourseStep, validatePerformanceStep, type CollegePredictorDraft, type CourseId, type ExamPerformance, type PredictorErrors, type PredictorExam } from '../data/predictor'
import { CourseExamsStep } from './course-exams-step'
import { PerformanceStep } from './performance-step'
import { PreferencesStep } from './preferences-step'
import { ResultsPreview } from './results-preview'
import { ProfileSummary } from './profile-summary'
import { HowItWorks, PredictorHero, RelatedStudentTools } from './predictor-sections'

const STEPS = ['Course & Exams', 'Performance', 'Preferences', 'Results']
const LAST = STEPS.length - 1

export function CollegePredictorPage() {
  const searchParams = useSearchParams()
  
  const [draft, setDraft] = useState<CollegePredictorDraft>(() => {
    
    const prefill = examFromSlug[searchParams.get('exam') ?? '']
    return prefill ? { ...emptyDraft, course: courseForExam(prefill).id, exams: [prefill], performance: { [prefill]: defaultPerformance } } : emptyDraft
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<PredictorErrors>({})

  const update = (patch: Partial<CollegePredictorDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setErrors({})
  }

  const selectCourse = (course: CourseId) => {
    setDraft((current) => {
      if (current.course === course) return current
      const allowed = getCourse(course)?.exams ?? []
      const exams = current.exams.filter((exam) => allowed.includes(exam))
      const performance = Object.fromEntries(Object.entries(current.performance).filter(([exam]) => exams.includes(exam as PredictorExam)))
      return { ...current, course, exams, performance, preferredBranches: [] }
    })
    setErrors({})
  }

  const toggleExam = (exam: PredictorExam) => {
    setDraft((current) => {
      const selected = current.exams.includes(exam)
      const exams = selected ? current.exams.filter((entry) => entry !== exam) : [...current.exams, exam]
      const performance = { ...current.performance }
      if (selected) delete performance[exam]
      else performance[exam] = defaultPerformance
      return { ...current, exams, performance }
    })
    setErrors({})
  }

  const updatePerformance = (exam: PredictorExam, patch: Partial<ExamPerformance>) => {
    setDraft((current) => ({ ...current, performance: { ...current.performance, [exam]: { ...(current.performance[exam] ?? defaultPerformance), ...patch } } }))
    setErrors({})
  }

  const goNext = () => {
    const found = step === 0 ? validateCourseStep(draft) : step === 1 ? validatePerformanceStep(draft) : {}
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStep((current) => Math.min(current + 1, LAST))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  const goToStep = (target: number) => {
    setErrors({})
    setStep(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <StudentToolPageFrame>
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Student Tools', 'College Predictor']} />
      </Container>
      <PredictorHero />

      <Container className="px-4 pb-4">
        <div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
          <div className="min-w-0 rounded-[14px] border bg-card p-4 shadow-[0_10px_30px_rgba(30,58,138,0.07)] sm:p-6 lg:p-8">
            <ToolStepper steps={STEPS} step={step} />

            <div className="mt-7">
              {step === 0 && <CourseExamsStep draft={draft} errors={errors} onSelectCourse={selectCourse} onToggleExam={toggleExam} />}
              {step === 1 && <PerformanceStep draft={draft} errors={errors} onChange={updatePerformance} />}
              {step === 2 && <PreferencesStep draft={draft} onChange={update} />}
              {step === 3 && <ResultsPreview draft={draft} />}
            </div>

            <ToolActionBar>
              <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={goBack} disabled={step === 0}>
                Back
              </Button>
              {step < 2 && (
                <Button type="button" variant="cta" className="h-11 gap-2 px-6 font-semibold md:h-10" onClick={goNext}>
                  Continue
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              )}
              {step === 2 && (
                <Button type="button" variant="cta" className="h-11 gap-2 px-6 font-semibold md:h-10" onClick={goNext}>
                  Predict Colleges
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              )}
              {step === 3 && (
                <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={() => goToStep(0)}>
                  Edit Details
                </Button>
              )}
            </ToolActionBar>
          </div>

          <div className="lg:sticky lg:top-6">
            <ProfileSummary draft={draft} onEdit={goToStep} />
          </div>
        </div>

        <HowItWorks />
        <RelatedStudentTools />
        </div>
      </Container>
    </StudentToolPageFrame>
  )
}
