import { apiRequest } from '@/features/auth/lib/session-client'

export type StaffRole = 'staff' | 'admin'
export type MemberStatus = 'active' | 'suspended' | 'disabled'

export type TeamMember = {
  userId: string
  email: string
  role: StaffRole
  status: MemberStatus
  lastLoginAt: string | null
  createdAt: string
}

export type StaffInvitation = {
  id: string
  email: string
  role: StaffRole
  expiresAt: string
  createdAt: string
  invitedBy: { userId: string; email: string } | null
  expired: boolean
}

export type CreatedInvitation = StaffInvitation & { token: string }

export type TeamList = { members: TeamMember[]; invitations: StaffInvitation[] }

export type TeamActivityEvent = { id: string; action: string; actorEmail: string | null; createdAt: string; metadata: Record<string, unknown> }

export type TeamMemberDetail = TeamMember & { activeSessions: number; activity: TeamActivityEvent[] }

export type InvitationPreview = { email: string; role: StaffRole; expiresAt: string }

export const STAFF_ROLES: StaffRole[] = ['staff', 'admin']

export const roleLabels: Record<StaffRole, string> = { staff: 'Staff', admin: 'Administrator' }

export const roleInfo: Record<StaffRole, { summary: string; can: string[]; cannot: string[] }> = {
  admin: {
    summary: 'Full control of the admin.',
    can: ['Everything staff can do', 'Publish, unpublish and archive records', 'Moderate reviews and manage promotions', 'Invite people, change roles and suspend accounts', 'Approve tutor profiles'],
    cannot: [],
  },
  staff: {
    summary: 'Runs the catalogue and day-to-day work.',
    can: ['Create and edit catalogue drafts', 'Work enquiries: status, notes and follow-ups', 'Review notes, content and SEO', 'See reports and history'],
    cannot: ['Publish or archive records', 'Moderate reviews or manage promotions', 'Manage the team'],
  },
}

export const statusLabels: Record<MemberStatus, string> = { active: 'Active', suspended: 'Suspended', disabled: 'Disabled' }
export const statusTone = { active: 'success', suspended: 'danger', disabled: 'neutral' } as const

export const activityLabels: Record<string, string> = {
  'user.created': 'Account created',
  'user.role_changed': 'Role changed',
  'user.suspended': 'Suspended',
  'user.reactivated': 'Reactivated',
  'user.signed_out_everywhere': 'Signed out everywhere',
  'user.password_changed': 'Password changed',
  'user.logged_in': 'Signed in',
}

export const memberName = (email: string) =>
  (email.split('@')[0] ?? '')
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ') || email

export const inviteLink = (token: string) => `${typeof window === 'undefined' ? '' : window.location.origin}/admin/invite/${token}`

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export function formatDateTime(value: string | null | undefined) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

const enc = encodeURIComponent

export const listTeam = () => apiRequest<TeamList>('GET', '/admin/team')
export const getTeamMember = (userId: string) => apiRequest<TeamMemberDetail>('GET', `/admin/team/${enc(userId)}`)
export const createInvitation = (input: { email: string; role: StaffRole }) => apiRequest<CreatedInvitation>('POST', '/admin/team/invitations', { email: input.email.trim(), role: input.role })
export const revokeInvitation = (invitationId: string) => apiRequest<null>('POST', `/admin/team/invitations/${enc(invitationId)}/revoke`)
export const changeMemberRole = (userId: string, role: StaffRole) => apiRequest<TeamMemberDetail>('PATCH', `/admin/team/${enc(userId)}/role`, { role })
export const suspendMember = (userId: string) => apiRequest<TeamMemberDetail>('POST', `/admin/team/${enc(userId)}/suspend`)
export const reactivateMember = (userId: string) => apiRequest<TeamMemberDetail>('POST', `/admin/team/${enc(userId)}/reactivate`)
export const signOutMemberEverywhere = (userId: string) => apiRequest<TeamMemberDetail>('POST', `/admin/team/${enc(userId)}/sign-out-all`)
export const changeOwnPassword = (input: { currentPassword: string; newPassword: string }) => apiRequest<null>('POST', '/auth/change-password', input)
