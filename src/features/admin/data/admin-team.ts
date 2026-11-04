import { ADMIN_STORAGE_KEYS, readAdminStorage } from './admin-demo-storage'

export const TEAM_ROLES = ['Owner', 'Editor', 'Viewer'] as const
export type TeamRole = (typeof TEAM_ROLES)[number]

export const TEAM_ROLE_INFO: Record<TeamRole, { summary: string; can: string[]; cannot: string[] }> = {
  Owner: {
    summary: 'Full control of the admin.',
    can: ['Everything an editor can do', 'Invite people and change roles', 'Change settings and reset demo data'],
    cannot: [],
  },
  Editor: {
    summary: 'Runs the catalogue and day-to-day work.',
    can: ['Create and edit records', 'Publish and unpublish pages', 'Handle enquiries and reviews'],
    cannot: ['Manage the team', 'Change settings'],
  },
  Viewer: {
    summary: 'Read-only access.',
    can: ['View every section, report and the activity log'],
    cannot: ['Change any record', 'Manage the team or settings'],
  },
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: TeamRole
  status: 'active' | 'pending'
  invitedAt?: string
}

export const DEMO_OWNER: TeamMember = { id: 'owner', name: 'Demo administrator', email: 'Signed in on this device', role: 'Owner', status: 'active' }

export function readTeamInvites(): TeamMember[] {
  const invites = readAdminStorage<TeamMember[]>(ADMIN_STORAGE_KEYS.team, [])
  return Array.isArray(invites) ? invites : []
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
