import type { EnquirySource, LeadStatus } from '@/features/admin/data/admin-enquiries'
import type { StatusTone } from '@/features/admin/components/kit'

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  closed: 'Closed',
}

export const leadStatusDescriptions: Record<LeadStatus, string> = {
  new: 'Received and waiting for a first reply.',
  contacted: 'We have reached out to the student.',
  qualified: 'A real admission or counselling opportunity.',
  converted: 'The student enrolled or booked.',
  closed: 'No further action needed.',
}

export const leadStatusTones: Record<LeadStatus, StatusTone> = {
  new: 'info',
  contacted: 'warning',
  qualified: 'info',
  converted: 'success',
  closed: 'neutral',
}

export const enquirySourceLabels: Record<EnquirySource, string> = {
  college: 'College',
  course: 'Course',
  exam: 'Exam',
  scholarship: 'Scholarship',
  tutor: 'Tutor session',
  coaching: 'Coaching',
  counselling: 'Counselling',
  contact: 'Contact page',
  general: 'General',
}

export const leadStatusOptions = (Object.keys(leadStatusLabels) as LeadStatus[]).map((value) => ({ value, label: leadStatusLabels[value] }))
export const enquirySourceOptions = (Object.keys(enquirySourceLabels) as EnquirySource[]).map((value) => ({ value, label: enquirySourceLabels[value] }))
export const assignmentOptions = [{ value: 'unassigned', label: 'Unassigned' }]

export function enquiryTitle(enquiry: { subject?: string; contactName: string }) {
  return enquiry.subject || `Enquiry from ${enquiry.contactName}`
}
