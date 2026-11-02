/** Admin settings (demo): saved to this browser's localStorage only. */

export type AdminSettings = {
  siteName: string
  supportEmail: string
  supportPhone: string
  /** 'unassigned', 'owner' or a team invite id */
  defaultAssignee: string
  autoAcknowledge: boolean
  emailOnNewEnquiry: boolean
}

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  siteName: 'Pathway',
  supportEmail: '',
  supportPhone: '',
  defaultAssignee: 'unassigned',
  autoAcknowledge: false,
  emailOnNewEnquiry: false,
}
