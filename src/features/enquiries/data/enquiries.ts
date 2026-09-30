import type { Enquiry } from '../types/enquiry'

export const canonicalEnquiries: Enquiry[] = []

export function getCanonicalEnquiries(): Enquiry[] {
  return canonicalEnquiries
}

export function getCanonicalEnquiryById(id: string): Enquiry | undefined {
  return canonicalEnquiries.find((e) => e.id === id)
}

export function getCanonicalEnquiriesByStudent(studentId: string): Enquiry[] {
  return canonicalEnquiries.filter((e) => e.studentId === studentId)
}
