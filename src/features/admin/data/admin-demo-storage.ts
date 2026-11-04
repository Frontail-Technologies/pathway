export const ADMIN_STORAGE_KEYS = {
  activity: 'pathway-admin:activity',
  examEdits: 'pathway-admin:exam-edits',
  streamPublish: 'pathway-admin:stream-publish',
  team: 'pathway-admin:team',
  settings: 'pathway-admin:settings',
} as const

export type AdminStorageKey = (typeof ADMIN_STORAGE_KEYS)[keyof typeof ADMIN_STORAGE_KEYS]

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
  }
}

export function resetAdminDemoData() {
  if (typeof window === 'undefined') return
  for (const key of Object.values(ADMIN_STORAGE_KEYS)) {
    try {
      window.localStorage.removeItem(key)
    } catch {
    }
  }
  window.dispatchEvent(new CustomEvent(ADMIN_STORAGE_EVENT, { detail: { key: 'all' } }))
}
