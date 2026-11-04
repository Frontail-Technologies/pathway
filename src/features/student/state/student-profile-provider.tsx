'use client'

import { createContext, useCallback, useContext, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { apiRequest } from '@/features/auth/lib/session-client'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'
import { STUDENT_PROFILE_STORAGE_KEY } from '../data/profile-form'
import { fromApiProfile, toPreferencesBody, toProfilePatch, type ApiStudentProfile } from '../data/profile-api'
import { createStudentProfile, demoStudent, type StudentProfile } from '../data/student'

type StudentProfileContextValue = {
  profile: StudentProfile
  hydrated: boolean
  photoUrl: string | null
  saveProfile: (next: StudentProfile) => Promise<void>
  savePreferences: (next: StudentProfile) => Promise<void>
  uploadPhoto: (file: File) => Promise<void>
  removePhoto: () => Promise<void>
}

const StudentProfileContext = createContext<StudentProfileContextValue | null>(null)
const emptyProfile = createStudentProfile({ firstName: '', lastName: '', email: '' })

async function importDeviceProfile(server: StudentProfile): Promise<ApiStudentProfile | null> {
  let local: StudentProfile | null = null
  try {
    local = JSON.parse(window.localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY) ?? 'null') as StudentProfile | null
  } catch {
    local = null
  }
  try {
    window.localStorage.removeItem(STUDENT_PROFILE_STORAGE_KEY)
  } catch {
  }
  if (!local?.email || local.email === demoStudent.email || local.email.toLowerCase() !== server.email.toLowerCase()) return null

  const merged: StudentProfile = {
    ...server,
    phone: server.phone ?? local.phone,
    city: server.city ?? local.city,
    studyLevel: server.studyLevel ?? local.studyLevel,
    stream: server.stream ?? local.stream,
    careerGoal: server.careerGoal ?? local.careerGoal,
    education: { institution: server.education?.institution ?? local.education?.institution, graduationYear: server.education?.graduationYear ?? local.education?.graduationYear },
    workExperience: server.workExperience.length ? server.workExperience : (local.workExperience ?? []),
  }
  const prefsEmpty = !server.studyGoal && !server.preferredStreams?.length && !server.preferredCourses.length && !server.preferredExams.length && !server.preferredLocations.length
  let result = await apiRequest<ApiStudentProfile>('PATCH', '/me/profile', toProfilePatch(merged))
  if (prefsEmpty) {
    result = await apiRequest<ApiStudentProfile>(
      'PUT',
      '/me/preferences',
      toPreferencesBody({ ...merged, studyGoal: local.studyGoal, preferredStreams: local.preferredStreams ?? [], preferredCourses: local.preferredCourses ?? [], preferredExams: local.preferredExams ?? [], preferredLocations: local.preferredLocations ?? [] }),
    )
  }
  return result
}

export function StudentProfileProvider({ children }: { children: React.ReactNode }) {
  const { hydrated: sessionReady, user } = useRoleSession('student')
  const userId = user?.id
  const queryClient = useQueryClient()
  const key = queryKeys.studentProfile(userId ?? '')

  const query = useQuery({
    queryKey: key,
    queryFn: async () => {
      const current = await apiRequest<ApiStudentProfile>('GET', '/me/profile')
      return (await importDeviceProfile(fromApiProfile(current)).catch(() => null)) ?? current
    },
    enabled: sessionReady && Boolean(userId),
  })
  const api = query.data ?? null
  const loaded = !userId || !query.isPending
  const adopt = useCallback((next: ApiStudentProfile) => queryClient.setQueryData(queryKeys.studentProfile(userId ?? ''), next), [queryClient, userId])

  const saveProfile = useCallback(async (next: StudentProfile) => void adopt(await apiRequest<ApiStudentProfile>('PATCH', '/me/profile', toProfilePatch(next))), [adopt])
  const savePreferences = useCallback(async (next: StudentProfile) => void adopt(await apiRequest<ApiStudentProfile>('PUT', '/me/preferences', toPreferencesBody(next))), [adopt])

  const uploadPhoto = useCallback(
    async (file: File) => {
      const ticket = await apiRequest<{ assetId: string; upload: { url: string; headers: Record<string, string> } }>('POST', '/me/profile/avatar/uploads', {
        fileName: file.name,
        mime: file.type,
        sizeBytes: file.size,
      })
      const put = await fetch(ticket.upload.url, { method: 'PUT', body: file, headers: ticket.upload.headers })
      if (!put.ok) throw new Error('The photo could not be uploaded. Please try again.')
      adopt(await apiRequest<ApiStudentProfile>('POST', `/me/profile/avatar/uploads/${ticket.assetId}/complete`))
    },
    [adopt],
  )

  const removePhoto = useCallback(async () => void adopt(await apiRequest<ApiStudentProfile>('DELETE', '/me/profile/avatar')), [adopt])

  const value = useMemo<StudentProfileContextValue>(
    () => ({
      profile: api ? fromApiProfile(api) : emptyProfile,
      hydrated: sessionReady && loaded,
      photoUrl: api?.avatarUrl ?? null,
      saveProfile,
      savePreferences,
      uploadPhoto,
      removePhoto,
    }),
    [api, sessionReady, loaded, saveProfile, savePreferences, uploadPhoto, removePhoto],
  )
  return <StudentProfileContext.Provider value={value}>{children}</StudentProfileContext.Provider>
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext)
  if (!context) throw new Error('useStudentProfile must be used inside StudentProfileProvider')
  return context
}
