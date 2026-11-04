const EMAIL = /^\S+@\S+\.\S+$/

export function isEmail(value: string): boolean {
  return EMAIL.test(value.trim())
}

export function safeNextPath(next: string | undefined, fallback: string): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback
  if (next.startsWith('/login') || next.startsWith('/register')) return fallback
  return next
}

export const MIN_PASSWORD = 8
