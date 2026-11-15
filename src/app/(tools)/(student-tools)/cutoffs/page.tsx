import type { Metadata } from 'next'
import { parseCutoffFilters } from '@/features/cutoffs/api/cutoffs-api'
import { CutoffExplorerPage } from '@/features/cutoffs/components/cutoff-explorer-page'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export const metadata: Metadata = {
  title: 'JoSAA Cutoffs: Opening and Closing Ranks',
  description: 'JoSAA opening and closing ranks for every IIT, NIT, IIIT and GFTI branch by category, quota and gender.',
  alternates: { canonical: '/cutoffs' },
}

export default async function Page({ searchParams }: Props) {
  return <CutoffExplorerPage filters={parseCutoffFilters(await searchParams)} />
}
