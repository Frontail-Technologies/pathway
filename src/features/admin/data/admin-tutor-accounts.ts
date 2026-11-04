import { apiRequest } from '@/features/auth/lib/session-client'
import type { ApiTutorAccount, VerificationStatus } from '@/features/tutor-space/data/tutor-account-api'

export type { VerificationStatus }
export type AccountStatus = 'active' | 'suspended' | 'disabled'
export type ListingRef = { slug: string; status: 'draft' | 'published' | 'archived' }

export type AdminTutorAccountSummary = {
  userId: string
  email: string
  displayName: string
  accountStatus: AccountStatus
  verificationStatus: VerificationStatus
  submittedAt: string | null
  reviewedAt: string | null
  listing: ListingRef | null
}

export type AdminTutorAccount = ApiTutorAccount & { userId: string; accountStatus: AccountStatus }

export type HistoryEvent = {
  id: string
  action: string
  actor: { id: string; email: string; role: 'student' | 'tutor' | 'staff' | 'admin' } | null
  changes: { field: string; before: unknown; after: unknown }[]
  metadata: Record<string, unknown>
  createdAt: string
}

export type CatalogTutorListing = { id: string; status: ListingRef['status']; updatedAt: string; record: { slug: string; name: string; listed: boolean } }

export const verificationLabels: Record<VerificationStatus, string> = {
  pending_review: 'Pending review',
  changes_requested: 'Changes requested',
  approved: 'Approved',
  draft: 'Draft',
}

export const verificationTone = { pending_review: 'info', changes_requested: 'warning', approved: 'success', draft: 'neutral' } as const

export const listingLabels: Record<ListingRef['status'], string> = { draft: 'Listing draft', published: 'Listing live', archived: 'Listing archived' }

const enc = encodeURIComponent

export const listTutorAccounts = (status?: VerificationStatus) =>
  apiRequest<AdminTutorAccountSummary[]>('GET', `/admin/tutor-accounts${status ? `?status=${status}` : ''}`)

export const getTutorAccount = (userId: string) => apiRequest<AdminTutorAccount>('GET', `/admin/tutor-accounts/${enc(userId)}`)

export const approveTutorAccount = (userId: string) => apiRequest<AdminTutorAccount>('POST', `/admin/tutor-accounts/${enc(userId)}/approve`)

export const requestTutorChanges = (userId: string, reason: string) =>
  apiRequest<AdminTutorAccount>('POST', `/admin/tutor-accounts/${enc(userId)}/request-changes`, { reason: reason.trim() })

export const getTutorAccountHistory = (userId: string) => apiRequest<HistoryEvent[]>('GET', `/admin/history/tutor_account/${enc(userId)}?limit=50`)

export async function findCatalogListing(slug: string): Promise<CatalogTutorListing | null> {
  const rows = await apiRequest<CatalogTutorListing[]>('GET', `/admin/tutors?q=${enc(slug)}`)
  return rows.find((row) => row.record.slug === slug) ?? null
}

export const publishCatalogListing = (id: string) => apiRequest<CatalogTutorListing>('POST', `/admin/tutors/${enc(id)}/publish`, {})

export const historyActionLabels: Record<string, string> = {
  'tutor_account.submitted': 'Submitted for review',
  'tutor_account.profile_update': 'Profile edited by tutor',
  'tutor_account.approved': 'Approved',
  'tutor_account.changes_requested': 'Changes requested',
}

export const formatDateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—'
