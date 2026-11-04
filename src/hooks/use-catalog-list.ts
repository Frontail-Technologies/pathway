'use client'

import { useCallback, useMemo, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { catalogList, CatalogRequestError, type CatalogList, type CatalogQuery } from '@/services/api/catalog'

export type CatalogListState<Item> = {
  items: Item[]
  total: number
  hasMore: boolean
  status: 'loading' | 'ready' | 'error'
  error: string | null
  loadingMore: boolean
  loadMore: () => void
  retry: () => void
}

const normalise = (query: CatalogQuery) =>
  Object.fromEntries(
    Object.entries(query)
      .filter((entry): entry is [string, string] => entry[1] !== undefined && entry[1] !== '')
      .sort(([a], [b]) => a.localeCompare(b)),
  )

const messageOf = (error: unknown) => (error instanceof CatalogRequestError ? error.message : 'Could not load results. Please try again.')

export function useCatalogList<Dto, Item>({
  path,
  query,
  map,
  limit = 12,
  initial,
  initialQuery,
}: {
  path: string
  query: CatalogQuery
  map: (dto: Dto) => Item
  limit?: number
  initial?: CatalogList<Item> | null
  initialQuery?: CatalogQuery
}): CatalogListState<Item> {
  const apiQuery = useMemo(() => normalise({ ...query, limit: String(limit) }), [query, limit])
  const seeded = useMemo(() => (initial && initialQuery ? JSON.stringify(normalise({ ...initialQuery, limit: String(limit) })) === JSON.stringify(apiQuery) : false), [initial, initialQuery, limit, apiQuery])
  const mapRef = useRef(map)
  mapRef.current = map

  const result = useInfiniteQuery({
    queryKey: queryKeys.catalogList(path, apiQuery),
    queryFn: ({ pageParam }) => catalogList(path, pageParam ? { ...apiQuery, cursor: pageParam } : apiQuery, (dto: Dto) => mapRef.current(dto)),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => (last.page.hasMore && last.page.nextCursor ? last.page.nextCursor : undefined),
    initialData: seeded && initial ? { pages: [initial], pageParams: [undefined] } : undefined,
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = result
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const pages = data?.pages ?? []
  return {
    items: pages.flatMap((page) => page.items),
    total: pages[0]?.page.total ?? pages[0]?.items.length ?? 0,
    hasMore: Boolean(hasNextPage),
    status: result.isPending ? 'loading' : result.isError && pages.length === 0 ? 'error' : 'ready',
    error: result.error ? messageOf(result.error) : null,
    loadingMore: isFetchingNextPage,
    loadMore,
    retry: () => void refetch(),
  }
}
