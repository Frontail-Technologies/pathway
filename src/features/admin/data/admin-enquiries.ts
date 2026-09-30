import { demoStudent } from '@/features/student/data/student'
import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import type {
  Enquiry,
  LeadStatus,
  EnquirySource,
  EnquiryEntityType,
  EnquiryPriority,
  GuestContact,
  EnquiryFollowup,
  EnquiryNote,
} from '@/features/enquiries/types/enquiry'
import { leadStatusMap, enquirySourceMap } from '@/features/enquiries/types/enquiry'
import { canonicalEnquiries } from '@/features/enquiries/data/enquiries'

export type {
  Enquiry,
  LeadStatus,
  EnquirySource,
  EnquiryEntityType,
  EnquiryPriority,
  GuestContact,
  EnquiryFollowup,
  EnquiryNote,
}
export { leadStatusMap, enquirySourceMap }

export type AdminEnquiry = Enquiry & {
  contactName: string
  contactEmail?: string
  contactPhone?: string
  targetName?: string
  targetAdminUrl?: string
  statusLabel: string
  sourceLabel: string
  isRegisteredStudent: boolean
  scraperExcluded: boolean
}

export function resolveEntityDetails(
  type?: EnquiryEntityType,
  id?: string
): { name?: string; adminUrl?: string } {
  if (!type || !id) return {}

  switch (type) {
    case 'college': {
      const col = colleges.find((c) => c.slug === id || c.id === id)
      return {
        name: col?.name ?? id,
        adminUrl: col ? `/admin/institutions/${col.id || col.slug}` : undefined,
      }
    }
    case 'course': {
      const crs = courses.find((c) => c.slug === id || c.id === id)
      return {
        name: crs?.name ?? id,
        adminUrl: crs ? `/admin/programs/${crs.id || crs.slug}` : undefined,
      }
    }
    case 'tutor': {
      const tut = tutors.find((t) => t.slug === id || t.id === id)
      return {
        name: tut?.name ?? id,
        adminUrl: tut ? `/admin/tutors-coaching/tutors/${tut.id || tut.slug}` : undefined,
      }
    }
    case 'coaching': {
      const coa = coachingProviders.find((c) => c.slug === id || c.id === id)
      return {
        name: coa?.name ?? id,
        adminUrl: coa ? `/admin/tutors-coaching/coaching/${coa.id || coa.slug}` : undefined,
      }
    }
    default:
      return { name: id }
  }
}

export function mapToAdminEnquiry(enquiry: Enquiry): AdminEnquiry {
  let contactName = 'Guest'
  let contactEmail: string | undefined = undefined
  let contactPhone: string | undefined = undefined
  let isRegisteredStudent = false

  if (enquiry.studentId && enquiry.studentId === demoStudent.id) {
    contactName = demoStudent.name
    contactEmail = demoStudent.email
    contactPhone = demoStudent.phone
    isRegisteredStudent = true
  } else if (enquiry.guestContact) {
    contactName = enquiry.guestContact.name
    contactEmail = enquiry.guestContact.email
    contactPhone = enquiry.guestContact.phone
  }

  const resolved = resolveEntityDetails(enquiry.entityType, enquiry.entityId)

  return {
    ...enquiry,
    contactName,
    contactEmail,
    contactPhone,
    targetName: resolved.name,
    targetAdminUrl: resolved.adminUrl,
    statusLabel: leadStatusMap[enquiry.status]?.label ?? enquiry.status,
    sourceLabel: enquirySourceMap[enquiry.source]?.label ?? enquiry.source,
    isRegisteredStudent,
    scraperExcluded: true,
  }
}

export function getAdminEnquiries(): AdminEnquiry[] {
  return canonicalEnquiries.map(mapToAdminEnquiry)
}

export function getAdminEnquiryById(id: string): AdminEnquiry | undefined {
  const item = canonicalEnquiries.find((e) => e.id === id)
  if (!item) return undefined
  return mapToAdminEnquiry(item)
}

export function getEnquiriesByStudentId(studentId: string): AdminEnquiry[] {
  return canonicalEnquiries
    .filter((e) => e.studentId === studentId)
    .map(mapToAdminEnquiry)
}

export function getLeadPipelineStats(): Record<LeadStatus, number> {
  const stats: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    closed: 0,
  }

  canonicalEnquiries.forEach((item) => {
    if (stats[item.status] !== undefined) {
      stats[item.status] += 1
    }
  })

  return stats
}
