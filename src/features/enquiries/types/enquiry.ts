export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'

export type EnquirySource = 'college' | 'course' | 'tutor' | 'coaching' | 'counselling' | 'general'

export type EnquiryEntityType = 'college' | 'course' | 'tutor' | 'coaching'

export type EnquiryPriority = 'urgent' | 'high' | 'medium' | 'low'

export type GuestContact = {
  name: string
  email?: string
  phone?: string
  city?: string
}

export type EnquiryFollowup = {
  id: string
  type: 'call' | 'email' | 'note' | 'status_change'
  summary: string
  performedBy: string
  performedAt: string
}

export type EnquiryNote = {
  id: string
  content: string
  author: string
  createdAt: string
}

export type Enquiry = {
  id: string
  studentId?: string
  guestContact?: GuestContact
  source: EnquirySource
  entityType?: EnquiryEntityType
  entityId?: string
  subject?: string
  message?: string
  status: LeadStatus
  priority?: EnquiryPriority
  assignedTo?: string
  createdAt: string
  updatedAt?: string
  followups?: EnquiryFollowup[]
  notes?: EnquiryNote[]
}

export const leadStatusMap: Record<LeadStatus, { label: string; description: string }> = {
  new: { label: 'New', description: 'Enquiry received, pending initial review.' },
  contacted: { label: 'Contacted', description: 'Initial contact attempted or completed.' },
  qualified: { label: 'Qualified', description: 'Assessed as a relevant counselling/admission opportunity.' },
  converted: { label: 'Converted', description: 'Successful downstream academic outcome.' },
  closed: { label: 'Closed', description: 'Archived / no further action required.' },
}

export const enquirySourceMap: Record<EnquirySource, { label: string; description: string }> = {
  college: { label: 'College', description: 'Institution profile enquiry' },
  course: { label: 'Program / Course', description: 'Degree curriculum inquiry' },
  tutor: { label: 'Tutor Session', description: 'Educator session request' },
  coaching: { label: 'Coaching Institute', description: 'Coaching batch enquiry' },
  counselling: { label: 'General Counselling', description: 'Academic counselling request' },
  general: { label: 'General Enquiry', description: 'Platform general enquiry' },
}
