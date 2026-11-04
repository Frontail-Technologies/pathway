'use client'

import { useRoleSession } from '@/features/auth/state/auth-session-provider'

export type AdminSession = { email: string; name: string; role: 'staff' | 'admin' }

const nameFrom = (email: string) =>
  (email.split('@')[0] ?? '')
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ') || 'Administrator'

export function useAdminSession() {
  const { hydrated, user, signOut } = useRoleSession('staff', 'admin')
  const session: AdminSession | null = user ? { email: user.email, name: nameFrom(user.email), role: user.role as AdminSession['role'] } : null
  return { session, hydrated, signOut }
}

export function safeAdminNext(next: string | undefined): string {
  if (!next || !next.startsWith('/admin') || next.startsWith('/admin/login') || next.includes('//')) return '/admin'
  return next
}
