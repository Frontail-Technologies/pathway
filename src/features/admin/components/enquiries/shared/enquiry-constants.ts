import {
  type LeadStatus,
  type EnquirySource,
  leadStatusMap,
  enquirySourceMap,
} from '@/features/admin/data/admin-enquiries'

export const leadStatusFilterOptions = [
  { value: 'all', label: 'All Lead Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'closed', label: 'Closed' },
]

export const enquirySourceFilterOptions = [
  { value: 'all', label: 'All Sources' },
  { value: 'college', label: 'College' },
  { value: 'course', label: 'Program / Course' },
  { value: 'tutor', label: 'Tutor Session' },
  { value: 'coaching', label: 'Coaching Institute' },
  { value: 'counselling', label: 'General Counselling' },
  { value: 'general', label: 'General Enquiry' },
]

export const assignmentFilterOptions = [
  { value: 'all', label: 'All Assignees' },
  { value: 'unassigned', label: 'Unassigned' },
]

export { leadStatusMap, enquirySourceMap }
