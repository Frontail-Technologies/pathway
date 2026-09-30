import { NotePurchase, NoteEntitlement } from '../types/note-access'




 
export const canonicalPurchases: NotePurchase[] = []




 
export const canonicalEntitlements: NoteEntitlement[] = []

export function getStudentEntitlements(studentId: string): NoteEntitlement[] {
  return canonicalEntitlements.filter(
    (e) => e.studentId === studentId && !e.revokedAt
  )
}

export function getStudentPurchases(studentId: string): NotePurchase[] {
  return canonicalPurchases.filter((p) => p.studentId === studentId)
}
