'use client'

import { useQuery } from '@tanstack/react-query'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { toAdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { getStaffEnquiry, listStaffEnquiries } from '@/features/enquiries/api/enquiries-api'
import { queryKeys } from '@/lib/query-client'

export function useAdminEnquiries() {
  const { hydrated, session } = useAdminSession()
  return useQuery({ queryKey: queryKeys.adminEnquiries, queryFn: listStaffEnquiries, enabled: hydrated && Boolean(session), select: (rows) => rows.map(toAdminEnquiry) })
}

export function useAdminEnquiry(id: string) {
  const { hydrated, session } = useAdminSession()
  return useQuery({ queryKey: queryKeys.adminEnquiry(id), queryFn: () => getStaffEnquiry(id), enabled: hydrated && Boolean(session) })
}
