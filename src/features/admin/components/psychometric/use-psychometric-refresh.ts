'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'

export function usePsychometricRefresh() {
  const queryClient = useQueryClient()
  return useCallback(() => void queryClient.invalidateQueries({ queryKey: queryKeys.adminPsychometric }), [queryClient])
}
