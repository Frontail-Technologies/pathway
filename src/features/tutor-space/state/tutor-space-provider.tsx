'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { apiRequest } from '@/features/auth/lib/session-client'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'
import { initialTutorSpace, TUTOR_SPACE_STORAGE_KEY, type Availability, type SessionRequest, type TutorNotificationSettings, type TutorProfileDraft, type TutorSpaceState } from '../data/tutor-space'
import { availabilityFromApi, availabilityToApi, profileFromApi, profileToApi, type ApiTutorAccount } from '../data/tutor-account-api'

type TutorSpaceContextValue = {
  hydrated: boolean
  signedIn: boolean
  signOut: () => Promise<void>
  account: ApiTutorAccount | null
  state: TutorSpaceState
  saveProfile: (draft: TutorProfileDraft) => Promise<void>
  saveAvailability: (availability: Availability) => Promise<void>
  saveSettings: (patch: { acceptingStudents?: boolean; notifications?: Partial<TutorNotificationSettings> }) => Promise<void>
  submitForReview: () => Promise<void>
  updateRequests: (next: (current: SessionRequest[]) => SessionRequest[]) => void
}

const TutorSpaceContext = createContext<TutorSpaceContextValue | null>(null)

export function TutorSpaceProvider({ children }: { children: React.ReactNode }) {
  const { hydrated: sessionReady, signedIn, user, signOut } = useRoleSession('tutor')
  const [requests, setRequests] = useState<SessionRequest[]>(initialTutorSpace.requests)
  const tutorId = user?.id
  const queryClient = useQueryClient()

  useEffect(() => {
    try {
      window.localStorage.removeItem(TUTOR_SPACE_STORAGE_KEY)
    } catch {
    }
  }, [])

  const query = useQuery({ queryKey: queryKeys.tutorAccount(tutorId ?? ''), queryFn: () => apiRequest<ApiTutorAccount>('GET', '/tutor/account'), enabled: sessionReady && Boolean(tutorId) })
  const account = query.data ?? null
  const loaded = !tutorId || !query.isPending
  const adopt = useCallback((next: ApiTutorAccount) => void queryClient.setQueryData(queryKeys.tutorAccount(tutorId ?? ''), next), [queryClient, tutorId])

  const saveProfile = useCallback(async (draft: TutorProfileDraft) => adopt(await apiRequest<ApiTutorAccount>('PATCH', '/tutor/account/profile', profileToApi(draft))), [adopt])
  const saveAvailability = useCallback(async (availability: Availability) => adopt(await apiRequest<ApiTutorAccount>('PUT', '/tutor/account/availability', availabilityToApi(availability))), [adopt])
  const saveSettings = useCallback(
    async (patch: { acceptingStudents?: boolean; notifications?: Partial<TutorNotificationSettings> }) => adopt(await apiRequest<ApiTutorAccount>('PATCH', '/tutor/account/settings', patch)),
    [adopt],
  )
  const submitForReview = useCallback(async () => adopt(await apiRequest<ApiTutorAccount>('POST', '/tutor/account/submit')), [adopt])
  const updateRequests = useCallback((next: (current: SessionRequest[]) => SessionRequest[]) => setRequests(next), [])

  const state = useMemo<TutorSpaceState>(
    () =>
      account
        ? { profile: profileFromApi(account), availability: availabilityFromApi(account), acceptingStudents: account.settings.acceptingStudents, notifications: account.settings.notifications, requests }
        : { ...initialTutorSpace, profile: { ...initialTutorSpace.profile, name: '', headline: '', intro: '', city: '', subjects: [], exams: [], levels: [], languages: [], modes: [] }, availability: availabilityToEmpty(), requests },
    [account, requests],
  )

  const value = useMemo<TutorSpaceContextValue>(
    () => ({ hydrated: sessionReady && loaded, signedIn, signOut, account, state, saveProfile, saveAvailability, saveSettings, submitForReview, updateRequests }),
    [sessionReady, loaded, signedIn, signOut, account, state, saveProfile, saveAvailability, saveSettings, submitForReview, updateRequests],
  )
  return <TutorSpaceContext.Provider value={value}>{children}</TutorSpaceContext.Provider>
}

const availabilityToEmpty = (): Availability => ({ Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] })

export function useTutorSpace() {
  const context = useContext(TutorSpaceContext)
  if (!context) throw new Error('useTutorSpace must be used inside TutorSpaceProvider')
  return context
}
