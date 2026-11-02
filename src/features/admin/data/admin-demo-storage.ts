/**
 * Demo persistence for the admin. There is no backend: anything the admin "saves" in the new sections
 * (exams, streams, team, settings, activity) is kept in this browser's localStorage under these keys.
 * Every read/write is guarded so private windows and server rendering simply fall back to defaults.
 */

export const ADMIN_STORAGE_KEYS = {
  activity: 'pathway-admin:activity',
  examEdits: 'pathway-admin:exam-edits',
  streamPublish: 'pathway-admin:stream-publish',
  team: 'pathway-admin:team',
  settings: 'pathway-admin:settings',
} as const

export type AdminStorageKey = (typeof ADMIN_STORAGE_KEYS)[keyof typeof ADMIN_STORAGE_KEYS]

/** Fired on window after any demo write so open views can re-read. */
export const ADMIN_STORAGE_EVENT = 'pathway-admin:storage'

export function readAdminStorage<T>(key: AdminStorageKey, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeAdminStorage<T>(key: AdminStorageKey, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent(ADMIN_STORAGE_EVENT, { detail: { key } }))
  } catch {
    /* storage unavailable: the change lives only in component state */
  }
}

/** Clears every key above (Settings → Reset demo data). */
export function resetAdminDemoData() {
  if (typeof window === 'undefined') return
  for (const key of Object.values(ADMIN_STORAGE_KEYS)) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  }
  window.dispatchEvent(new CustomEvent(ADMIN_STORAGE_EVENT, { detail: { key: 'all' } }))
}
