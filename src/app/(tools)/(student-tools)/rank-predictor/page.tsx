import type { Metadata } from 'next'
import { RankPredictorPage } from '@/features/rank-predictor/components/rank-predictor-page'
import { getRankExam, parsePercentile } from '@/features/rank-predictor/data/rank'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const exam = getRankExam(one((await searchParams).exam))
  return {
    title: `${exam.label} Rank Predictor`,
    description: `Convert your ${exam.label} percentile into an estimated rank using NTA’s method and the official candidate count.`,
    alternates: { canonical: `/rank-predictor?exam=${exam.slug}` },
  }
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const exam = getRankExam(one(params.exam))
  const raw = one(params.percentile)
  const percentile = parsePercentile(raw)
  return <RankPredictorPage exam={exam} percentile={percentile} invalid={Boolean(raw) && percentile == null} />
}
