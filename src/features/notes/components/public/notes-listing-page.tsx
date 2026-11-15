'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CatalogListing } from '@/components/shared/listing/catalog-listing'
import type { FacetGroup, SelectedFilters } from '@/components/shared/listing/types'
import { useCatalogList } from '@/hooks/use-catalog-list'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { notesApiQuery, type PublicNote } from '../../api/notes-api'
import { noteTypeMap, type NoteType } from '../../types/note'
import { NoteCard } from './note-card'

const groups: FacetGroup[] = [
  { key: 'type', title: 'Type', options: (Object.keys(noteTypeMap) as NoteType[]).map((value) => ({ value, label: noteTypeMap[value].label })) },
  {
    key: 'pricing',
    title: 'Price',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'paid', label: 'Paid' },
    ],
  },
]

const sortOptions = [{ value: 'newest', label: 'Newest' }]

export function NotesListingPage({ initial, initialQuery }: { initial?: CatalogList<PublicNote> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected: SelectedFilters = useMemo(() => Object.fromEntries(groups.map((group) => [group.key, (searchParams.get(group.key) ?? '').split(',').filter(Boolean)])), [searchParams])
  const query = searchParams.get('q') ?? ''
  const apiQuery = useMemo(() => notesApiQuery(searchParams), [searchParams])
  const list = useCatalogList<PublicNote, PublicNote>({ path: '/notes', query: apiQuery, map: (note) => note, limit: 12, initial, initialQuery })

  const navigate = (next: SelectedFilters, _sort: string, nextQuery: string) => {
    const params = new URLSearchParams()
    if (nextQuery.trim()) params.set('q', nextQuery.trim())
    for (const group of groups) if (next[group.key]?.length) params.set(group.key, next[group.key]!.join(','))
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <CatalogListing
      art="notes"
      breadcrumbs={[{ label: 'Home', href: '/' }, 'Notes']}
      title="Notes and study material"
      description="Revision notes, formula sheets and chapter summaries for school and entrance exams."
      searchPlaceholder="Search by title, subject or stream"
      noun={['note', 'notes']}
      groups={groups}
      selected={selected}
      sort="newest"
      sortOptions={sortOptions}
      query={query}
      onNavigate={navigate}
      list={list}
      layout="grid"
      renderItems={(items) => items.map((note) => <NoteCard key={note.slug} note={note} />)}
    />
  )
}
