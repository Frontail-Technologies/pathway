import type { Metadata } from 'next'
import { RankPredictorPage } from '@/features/rank-predictor/components/rank-predictor-page'
import { parsePercentile } from '@/features/rank-predictor/data/rank'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export const metadata: Metadata = {
  title: 'JEE Main Rank Predictor',
  description: 'Convert your JEE Main percentile into an estimated rank using NTA’s method, then see the colleges that rank can get.',
  alternates: { canonical: '/rank-predictor' },
}

export default async function Page({ searchParams }: Props) {
  const raw = (await searchParams).percentile
  const value = Array.isArray(raw) ? raw[0] : raw
  const percentile = parsePercentile(value)
  return <RankPredictorPage percentile={percentile} invalid={Boolean(value) && percentile == null} />
}
