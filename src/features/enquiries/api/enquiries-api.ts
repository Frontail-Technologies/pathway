import { apiRequest } from '@/features/auth/lib/session-client'
import type { LeadStatus } from '../types/enquiry'

export type EnquiryIntent = 'enquiry' | 'brochure' | 'counselling'
export type EnquiryEntityKind = 'college' | 'course' | 'exam' | 'scholarship' | 'coaching' | 'tutor'
export type EnquiryEntityRef = { kind: EnquiryEntityKind; slug: string }
export type EnquirySourceInput = 'counselling' | 'contact' | 'general'
export type EnquiryApiSource = EnquiryEntityKind | 'counselling' | 'contact' | 'general'

export type SubmitEnquiryInput = {
  intent: EnquiryIntent
  entity?: EnquiryEntityRef
  source?: EnquirySourceInput
  topic?: string
  interest?: string
  name: string
  phone: string
  email?: string
  city?: string
  message?: string
}

export type EnquiryReceipt = { id: string; status: LeadStatus; createdAt: string; duplicate: boolean }

type EntitySummary = { kind: EnquiryEntityKind; slug: string; name: string } | null

export type OwnEnquiry = {
  id: string
  intent: EnquiryIntent
  source: EnquiryApiSource
  entity: EntitySummary
  topic: string | null
  interest: string | null
  message: string | null
  status: LeadStatus
  createdAt: string
}

export type StaffEnquirySummary = {
  id: string
  intent: EnquiryIntent
  source: EnquiryApiSource
  entity: EntitySummary
  topic: string | null
  interest: string | null
  status: LeadStatus
  name: string
  phone: string
  email: string | null
  city: string | null
  channel: 'web' | 'app'
  student: { userId: string; email: string } | null
  createdAt: string
  updatedAt: string
}

export type StaffEnquiryEvent = {
  id: string
  type: 'status_change' | 'note'
  summary: string
  fromStatus: LeadStatus | null
  toStatus: LeadStatus | null
  actor: { id: string; email: string } | null
  createdAt: string
}

export type StaffEnquiry = StaffEnquirySummary & { message: string | null; consentAt: string; events: StaffEnquiryEvent[] }

const clean = (value?: string) => (value && value.trim() ? value.trim() : undefined)

export const submitEnquiry = (input: SubmitEnquiryInput) =>
  apiRequest<EnquiryReceipt>('POST', '/enquiries', {
    intent: input.intent,
    entity: input.entity,
    source: input.entity ? undefined : input.source,
    topic: clean(input.topic),
    interest: clean(input.interest),
    name: input.name.trim(),
    phone: input.phone,
    email: clean(input.email),
    city: clean(input.city),
    message: clean(input.message),
    consent: true,
    channel: 'web',
  })

export const listOwnEnquiries = () => apiRequest<OwnEnquiry[]>('GET', '/me/enquiries')

export const listStaffEnquiries = () => apiRequest<StaffEnquirySummary[]>('GET', '/admin/enquiries?limit=500')
export const getStaffEnquiry = (id: string) => apiRequest<StaffEnquiry>('GET', `/admin/enquiries/${encodeURIComponent(id)}`)
export const setStaffEnquiryStatus = (id: string, status: LeadStatus) => apiRequest<StaffEnquiry>('PATCH', `/admin/enquiries/${encodeURIComponent(id)}/status`, { status })
export const addStaffEnquiryNote = (id: string, content: string) => apiRequest<StaffEnquiry>('POST', `/admin/enquiries/${encodeURIComponent(id)}/notes`, { content })
