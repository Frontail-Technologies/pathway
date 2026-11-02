/**
 * Activity log (demo). There is no server-side audit trail, so this records only the actions taken in this
 * browser's admin. Nothing is pre-filled: an empty log is the honest starting point.
 */
import { ADMIN_STORAGE_KEYS, readAdminStorage, writeAdminStorage } from './admin-demo-storage'

export const ADMIN_ACTIVITY_AREAS = ['Exams', 'Streams', 'Team', 'Settings'] as const
export type AdminActivityArea = (typeof ADMIN_ACTIVITY_AREAS)[number]

export const ADMIN_ACTIVITY_ACTIONS = ['Created', 'Updated', 'Published', 'Unpublished', 'Invited', 'Role changed', 'Removed', 'Reset'] as const
export type AdminActivityAction = (typeof ADMIN_ACTIVITY_ACTIONS)[number]

export type AdminActivityEntry = {
  id: string
  /** ISO timestamp */
  at: string
  area: AdminActivityArea
  action: AdminActivityAction
  /** What was changed, e.g. "JEE Main" */
  label: string
  href?: string
  actor: string
}

const MAX_ENTRIES = 200

export function readAdminActivity(): AdminActivityEntry[] {
  const entries = readAdminStorage<AdminActivityEntry[]>(ADMIN_STORAGE_KEYS.activity, [])
  return Array.isArray(entries) ? entries : []
}

export function logAdminActivity(entry: { area: AdminActivityArea; action: AdminActivityAction; label: string; href?: string }) {
  const next: AdminActivityEntry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    actor: 'Demo administrator',
    ...entry,
  }
  writeAdminStorage(ADMIN_STORAGE_KEYS.activity, [next, ...readAdminActivity()].slice(0, MAX_ENTRIES))
  return next
}

export function clearAdminActivity() {
  writeAdminStorage<AdminActivityEntry[]>(ADMIN_STORAGE_KEYS.activity, [])
}
