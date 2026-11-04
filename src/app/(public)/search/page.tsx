import type { Metadata } from 'next'
import { SearchResultsPage } from '@/features/search/components/search-results-page'
import { searchKinds, type SearchKind } from '@/features/search/data/search-index'

type SearchParams = Promise<{ q?: string | string[]; type?: string | string[] }>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? ''

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const q = first((await searchParams).q).trim()
  return { title: q ? `Search: ${q}` : 'Search', robots: { index: false, follow: true } }
}

export default async function SearchRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = first(params.q).trim().slice(0, 100)
  const rawType = first(params.type)
  const type = searchKinds.some(({ kind }) => kind === rawType) ? (rawType as SearchKind) : undefined
  return <SearchResultsPage query={query} type={type} />
}
