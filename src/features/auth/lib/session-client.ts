import { apiUrl } from '@/services/api/client'

export type ServerRole = 'student' | 'tutor' | 'staff' | 'admin'

export type SessionUser = {
  id: string
  email: string
  role: ServerRole
  status: 'active' | 'suspended' | 'disabled'
  profile: { firstName: string; lastName: string; avatarAssetId: string | null; completionPercent: number } | null
  tutor: { displayName: string; verificationStatus: 'draft' | 'pending_review' | 'changes_requested' | 'approved' } | null
}

export type FieldErrors = Record<string, string | undefined>

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly details: { path?: string; message?: string; code?: string }[] = [],
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }

  get fields(): FieldErrors {
    const fields: FieldErrors = {}
    for (const detail of this.details) {
      const field = detail.path?.split('.').pop()
      if (field && !fields[field]) fields[field] = detail.message
    }
    return fields
  }
}

type Listener = (user: SessionUser | null) => void
const listeners = new Set<Listener>()
let accessToken: string | null = null
let refreshing: Promise<SessionUser | null> | null = null

export function onSessionChange(listener: Listener) {
  listeners.add(listener)
  return () => void listeners.delete(listener)
}
const emit = (user: SessionUser | null) => listeners.forEach((listener) => listener(user))

type ErrorBody = { error?: { code: string; message: string; details?: { path?: string; message?: string; code?: string }[] } }

async function send<T>(method: string, path: string, body: unknown, token: string | null): Promise<T> {
  if (!apiUrl) throw new ApiRequestError('Sign-in is not configured for this site (NEXT_PUBLIC_API_URL).', 0, 'NOT_CONFIGURED')
  let response: Response
  try {
    response = await fetch(`${apiUrl.replace(/\/$/, '')}${path}`, {
      method,
      credentials: 'include',
      headers: { Accept: 'application/json', ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiRequestError('Could not reach Pathway. Check your connection and try again.', 0, 'NETWORK_ERROR')
  }
  const payload = (await response.json().catch(() => null)) as ({ data?: T } & ErrorBody) | null
  if (response.ok && payload && 'data' in payload) return payload.data as T
  const error = payload?.error
  throw new ApiRequestError(error?.message ?? 'Something went wrong. Please try again.', response.status, error?.code ?? 'UNEXPECTED_RESPONSE', error?.details ?? [])
}

type AuthPayload = { user: SessionUser; session: { accessToken: string } }

function adopt(result: AuthPayload) {
  accessToken = result.session.accessToken
  emit(result.user)
  return result.user
}

export function refreshSession(): Promise<SessionUser | null> {
  refreshing ??= send<AuthPayload>('POST', '/auth/refresh', {}, null)
    .then(adopt)
    .catch((error: unknown) => {
      if (error instanceof ApiRequestError && (error.status === 401 || error.status === 403)) {
        accessToken = null
        emit(null)
        return null
      }
      throw error
    })
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

export async function apiRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, body?: unknown): Promise<T> {
  if (refreshing) await refreshing.catch(() => undefined)
  if (!accessToken) await refreshSession()
  try {
    return await send<T>(method, path, body, accessToken)
  } catch (error) {
    if (!(error instanceof ApiRequestError) || error.status !== 401) throw error
    if (!(await refreshSession())) throw error
    return send<T>(method, path, body, accessToken)
  }
}

export const signInWithPassword = async (input: { email: string; password: string }) =>
  adopt(await send<AuthPayload>('POST', '/auth/login', { email: input.email.trim(), password: input.password }, null))

export const registerStudentAccount = async (input: { email: string; password: string; firstName: string; lastName: string }) =>
  adopt(await send<AuthPayload>('POST', '/auth/register', { email: input.email.trim(), password: input.password, firstName: input.firstName.trim(), lastName: input.lastName.trim() }, null))

export const registerTutorAccount = async (input: { email: string; password: string; displayName: string }) =>
  adopt(await send<AuthPayload>('POST', '/auth/register/tutor', { email: input.email.trim(), password: input.password, displayName: input.displayName.trim() }, null))

export const previewStaffInvitation = (token: string) => send<{ email: string; role: ServerRole; expiresAt: string }>('GET', `/auth/invitations/${encodeURIComponent(token)}`, undefined, null)

export const acceptStaffInvitation = async (input: { token: string; password: string }) => adopt(await send<AuthPayload>('POST', '/auth/invitations/accept', input, null))

export async function signOut() {
  accessToken = null
  emit(null)
  await send('POST', '/auth/logout', {}, null).catch(() => undefined)
}
