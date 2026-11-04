'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = (error as { status?: number }).status
          return (status === undefined || status === 0 || status >= 500) && failureCount < 2
        },
      },
      mutations: { retry: false },
    },
  })
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(makeQueryClient)
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export const queryKeys = {
  catalogList: (path: string, query: Record<string, string>) => ['catalog', 'list', path, query] as const,
  savedResolve: (kind: string, slugs: readonly string[]) => ['catalog', 'saved', kind, slugs] as const,
  comparison: (selection: { colleges: string[]; programs: string[] }) => ['catalog', 'compare', selection] as const,
  comparePickerColleges: ['catalog', 'compare', 'picker-colleges'] as const,
  compareProgramOptions: (collegeSlug: string) => ['catalog', 'compare', 'options', collegeSlug] as const,
  adminCatalogTutors: ['admin', 'catalog-tutors'] as const,
  adminCatalogTutor: (id: string) => ['admin', 'catalog-tutors', id] as const,
  adminTutorAccounts: (status?: string) => ['admin', 'tutor-accounts', status ?? 'all'] as const,
  adminTutorAccount: (userId: string) => ['admin', 'tutor-accounts', 'detail', userId] as const,
  adminTutorAccountHistory: (userId: string) => ['admin', 'tutor-accounts', 'history', userId] as const,
  adminCatalogListing: (slug: string) => ['admin', 'catalog-tutors', 'by-slug', slug] as const,
  studentProfile: (userId: string) => ['me', userId, 'profile'] as const,
  studentSaved: (userId: string) => ['me', userId, 'saved-items'] as const,
  tutorAccount: (userId: string) => ['tutor', userId, 'account'] as const,
}
