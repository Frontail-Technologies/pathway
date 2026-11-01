const INDIAN_MOBILE = /^[6-9]\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

/** Accepts "98765 43210", "+91 98765-43210", "09876543210"; returns the bare 10 digits or null. Same rule as the app. */
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return INDIAN_MOBILE.test(digits) ? digits : null
}

/** "9876543210" → "+91 98765 43210" */
export function formatIndianMobile(digits: string): string {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

export function isEmail(value: string): boolean {
  return EMAIL.test(value.trim())
}

/**
 * Where to go after signing in. Only same-site paths are allowed (no "//host" or "https://…"), so a crafted
 * ?next= link cannot send people to another site.
 */
export function safeNextPath(next: string | undefined, fallback: string): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback
  if (next.startsWith('/login') || next.startsWith('/register')) return fallback
  return next
}

export const OTP_LENGTH = 6
export const RESEND_SECONDS = 30
export const MIN_PASSWORD = 8
