import type { Metadata } from 'next'
import { CollegePredictorPage } from '@/features/college-predictor/components/college-predictor-page'
import { PredictorHub } from '@/features/college-predictor/components/predictor-hub'
import { isPredictorCourse } from '@/features/college-predictor/data/exam-catalog'
import { parsePredictorInput, predictorExams } from '@/features/college-predictor/data/predictor'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)
const selectedExam = (params: Record<string, string | string[] | undefined>) => predictorExams.find((item) => item.slug === one(params.exam))

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const exam = selectedExam(params)
  if (!exam) {
    return {
      title: 'College Predictor 2026 for Engineering and Medical Exams',
      description: 'Pick your exam, JEE Main, JEE Advanced, NEET UG or a state entrance test, and see the colleges your rank can get from official closing ranks.',
      alternates: { canonical: '/college-predictor' },
    }
  }
  const input = parsePredictorInput(params)
  return {
    title: `${exam.label} College Predictor`,
    description: `Find the ${exam.counselling} your ${exam.label} rank can get, from official JoSAA closing ranks by branch, category and quota.`,
    alternates: { canonical: `/college-predictor?exam=${exam.slug}` },
    robots: input.rank ? { index: false, follow: true } : undefined,
  }
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  if (!selectedExam(params)) {
    const course = one(params.course)
    return <PredictorHub course={isPredictorCourse(course) ? course : 'engineering'} />
  }
  return <CollegePredictorPage input={parsePredictorInput(params)} />
}
