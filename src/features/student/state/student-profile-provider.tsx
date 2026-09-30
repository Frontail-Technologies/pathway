'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { STUDENT_PROFILE_STORAGE_KEY, isStoredProfile } from '../data/profile-form'
import { demoStudent, type StudentProfile } from '../data/student'

type StudentProfileContextValue = {
  profile: StudentProfile
   
  hydrated: boolean
   
  photoUrl: string | null
  setPhotoUrl: (url: string | null) => void
  updateProfile: (next: StudentProfile) => void
}

const StudentProfileContext = createContext<StudentProfileContextValue | null>(null)





 
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
      
    }
    setHydrated(true)
  }, [])

  const updateProfile = useCallback((next: StudentProfile) => {
    setProfile(next)
    try {
      window.localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(next))
    } catch {
      
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
