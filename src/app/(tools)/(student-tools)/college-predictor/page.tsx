import type { Metadata } from 'next'
import { CollegePredictorPage } from '@/features/college-predictor/components/college-predictor-page'
import { parsePredictorInput, predictorExams } from '@/features/college-predictor/data/predictor'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const input = parsePredictorInput(await searchParams)
  const exam = predictorExams.find((item) => item.slug === input.exam)!
  return {
    title: `${exam.label} College Predictor`,
    description: `Find the ${exam.counselling} your ${exam.label} rank can get, from official JoSAA closing ranks by branch, category and quota.`,
    alternates: { canonical: `/college-predictor?exam=${exam.slug}` },
    robots: input.rank ? { index: false, follow: true } : undefined,
  }
}

export default async function Page({ searchParams }: Props) {
  return <CollegePredictorPage input={parsePredictorInput(await searchParams)} />
}
