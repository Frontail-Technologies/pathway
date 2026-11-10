'use client'

import { useQuery } from '@tanstack/react-query'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { listSources } from '@/features/admin/data/admin-ingestion-api'
import { listTutorAccounts } from '@/features/admin/data/admin-tutor-accounts'
import { listStaffEnquiries } from '@/features/enquiries/api/enquiries-api'
import { queryKeys } from '@/lib/query-client'

export type AdminBadges = { enquiries: number; tutorReviews: number; ingestion: number }

export function useAdminBadges(): AdminBadges {
  const { hydrated, session } = useAdminSession()
  const enabled = hydrated && Boolean(session)
  const enquiries = useQuery({ queryKey: queryKeys.adminEnquiries, queryFn: listStaffEnquiries, enabled, staleTime: 60_000, select: (rows) => rows.filter((row) => row.status === 'new').length })
  const reviews = useQuery({ queryKey: queryKeys.adminTutorAccounts('pending_review'), queryFn: () => listTutorAccounts('pending_review'), enabled, staleTime: 60_000, select: (rows) => rows.length })
  const ingestion = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled, staleTime: 60_000, select: (rows) => rows.reduce((sum, row) => sum + row.pendingReview, 0) })
  return { enquiries: enquiries.data ?? 0, tutorReviews: reviews.data ?? 0, ingestion: ingestion.data ?? 0 }
}
