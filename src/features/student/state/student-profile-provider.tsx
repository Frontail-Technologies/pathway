'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { STUDENT_PROFILE_STORAGE_KEY, isStoredProfile } from '../data/profile-form'
import { demoStudent, type StudentProfile } from '../data/student'

type StudentProfileContextValue = {
  profile: StudentProfile
  /** False until the stored demo profile (if any) has been read, so forms never seed from stale defaults. */
  hydrated: boolean
  /** Session-local preview URL for the chosen photo. Never persisted or uploaded. */
  photoUrl: string | null
  setPhotoUrl: (url: string | null) => void
  updateProfile: (next: StudentProfile) => void
}

const StudentProfileContext = createContext<StudentProfileContextValue | null>(null)

/**
 * Single source of truth for the student profile across STU-01 and STU-02.
 * Frontend DEMO persistence only: non-sensitive profile fields are mirrored to localStorage so edits survive a
 * reload on this device. There is no backend, sign-in or sync, and the photo is deliberately never stored.
 */
export function StudentProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(demoStudent)
  const [hydrated, setHydrated] = useState(false)
  const [photoUrl, setPhotoUrlState] = useState<string | null>(null)
  const previousPhoto = useRef<string | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY)
      const parsed: unknown = raw ? JSON.parse(raw) : null
      if (isStoredProfile(parsed)) setProfile(parsed)
    } catch {
      // Storage unavailable or corrupt — fall back to the demo fixture.
    }
    setHydrated(true)
  }, [])

  const updateProfile = useCallback((next: StudentProfile) => {
    setProfile(next)
    try {
      window.localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Private mode / quota — the edit still applies for this session.
    }
  }, [])

  const setPhotoUrl = useCallback((url: string | null) => {
    if (previousPhoto.current && previousPhoto.current !== url) URL.revokeObjectURL(previousPhoto.current)
    previousPhoto.current = url
    setPhotoUrlState(url)
  }, [])

  const value = useMemo(() => ({ profile, hydrated, photoUrl, setPhotoUrl, updateProfile }), [profile, hydrated, photoUrl, setPhotoUrl, updateProfile])
  return <StudentProfileContext.Provider value={value}>{children}</StudentProfileContext.Provider>
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext)
  if (!context) throw new Error('useStudentProfile must be used inside StudentProfileProvider')
  return context
}
