export type AdminSettings = {
  siteName: string
  supportEmail: string
  supportPhone: string
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
