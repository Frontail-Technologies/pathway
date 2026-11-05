import type { StaffEnquiry, StaffEnquirySummary } from '@/features/enquiries/api/enquiries-api'
import type {
  Enquiry,
  EnquiryEntityType,
  EnquiryFollowup,
  EnquiryNote,
  EnquiryPriority,
  EnquirySource,
  GuestContact,
  LeadStatus,
} from '@/features/enquiries/types/enquiry'
import { enquirySourceMap, leadStatusMap } from '@/features/enquiries/types/enquiry'

export type { Enquiry, EnquiryEntityType, EnquiryFollowup, EnquiryNote, EnquiryPriority, EnquirySource, GuestContact, LeadStatus }
export { enquirySourceMap, leadStatusMap }

export type AdminEnquiry = Enquiry & {
  contactName: string
  contactEmail?: string
  contactPhone?: string
  contactCity?: string
  targetName?: string
  targetAdminUrl?: string
  statusLabel: string
  sourceLabel: string
  isRegisteredStudent: boolean
  studentEmail?: string
  channel: 'web' | 'app'
  consentAt?: string
  scraperExcluded: boolean
}

const adminPaths: Partial<Record<EnquiryEntityType, string>> = {
  college: '/admin/institutions',
  course: '/admin/programs',
  exam: '/admin/exams',
  scholarship: '/admin/scholarships',
}

const intentLabels: Record<StaffEnquirySummary['intent'], string> = { enquiry: 'Enquiry', brochure: 'Brochure request', counselling: 'Counselling call-back' }

function subjectOf(item: StaffEnquirySummary) {
  const detail = item.interest ?? item.topic
  return detail ? `${intentLabels[item.intent]} · ${detail}` : intentLabels[item.intent]
}

export function toAdminEnquiry(item: StaffEnquirySummary | StaffEnquiry): AdminEnquiry {
  const events = 'events' in item ? item.events : []
  const actor = (event: StaffEnquiry['events'][number]) => event.actor?.email ?? 'Pathway team'
  const entityKind = item.entity?.kind
  const adminPath = entityKind ? adminPaths[entityKind] : undefined
  return {
    id: item.id,
    studentId: undefined,
    guestContact: { name: item.name, email: item.email ?? undefined, phone: item.phone, city: item.city ?? undefined },
    source: item.source,
    entityType: entityKind,
    entityId: item.entity?.slug,
    subject: subjectOf(item),
    message: 'message' in item ? (item.message ?? undefined) : undefined,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    followups: events
      .filter((event) => event.type === 'status_change')
      .map((event) => ({ id: event.id, type: 'status_change' as const, summary: event.summary, performedBy: actor(event), performedAt: event.createdAt })),
    notes: events.filter((event) => event.type === 'note').map((event) => ({ id: event.id, content: event.summary, author: actor(event), createdAt: event.createdAt })),
    contactName: item.name,
    contactEmail: item.email ?? undefined,
    contactPhone: item.phone,
    contactCity: item.city ?? undefined,
    targetName: item.entity?.name,
    targetAdminUrl: adminPath && item.entity ? `${adminPath}/${item.entity.slug}` : undefined,
    statusLabel: leadStatusMap[item.status].label,
    sourceLabel: enquirySourceMap[item.source].label,
    isRegisteredStudent: Boolean(item.student),
    studentEmail: item.student?.email,
    channel: item.channel,
    consentAt: 'consentAt' in item ? item.consentAt : undefined,
    scraperExcluded: true,
  }
}
