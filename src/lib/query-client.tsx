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
  predictorPreview: (slugs: readonly string[]) => ['catalog', 'predictor-preview', slugs] as const,
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
  studentEnquiries: (userId: string) => ['me', userId, 'enquiries'] as const,
  adminEnquiries: ['admin', 'enquiries'] as const,
  adminEnquiry: (id: string) => ['admin', 'enquiries', id] as const,
  adminTeam: ['admin', 'team'] as const,
  adminTeamMember: (userId: string) => ['admin', 'team', 'member', userId] as const,
  invitationPreview: (token: string) => ['auth', 'invitation', token] as const,
  adminTaxonomyKinds: ['admin', 'master-data', 'kinds'] as const,
  adminTaxonomyTerms: (kind: string) => ['admin', 'master-data', 'terms', kind] as const,
  adminGeography: ['admin', 'master-data', 'geography'] as const,
  ingestion: ['admin', 'ingestion'] as const,
  ingestionSources: ['admin', 'ingestion', 'sources'] as const,
  ingestionSource: (id: string) => ['admin', 'ingestion', 'sources', id] as const,
  ingestionJobs: (filter: Record<string, string | number | undefined>) => ['admin', 'ingestion', 'jobs', filter] as const,
  ingestionJob: (id: string) => ['admin', 'ingestion', 'job', id] as const,
  ingestionBatches: (filter: Record<string, string | number | undefined>) => ['admin', 'ingestion', 'batches', filter] as const,
  ingestionBatch: (id: string) => ['admin', 'ingestion', 'batch', id] as const,
  ingestionStaged: (filter: Record<string, string | number | undefined>) => ['admin', 'ingestion', 'staged', filter] as const,
  ingestionRecord: (id: string) => ['admin', 'ingestion', 'record', id] as const,
  ingestionConflicts: (resolution: string) => ['admin', 'ingestion', 'conflicts', resolution] as const,
}
