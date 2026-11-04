'use client'

import { useRoleSession } from '@/features/auth/state/auth-session-provider'

export function useStudentSession() {
  const { hydrated, signedIn, user, signOut } = useRoleSession('student')
  return { hydrated, signedIn, user, signOut }
}
