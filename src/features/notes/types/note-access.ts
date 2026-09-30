






 
export type NotePurchaseStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type NotePurchase = {
  id: string
  studentId: string
  noteId: string
  amountPaise: number
  currency: 'INR'
  status: NotePurchaseStatus
  paymentProvider?: string
  providerPaymentId?: string
  createdAt?: string
  paidAt?: string
}




 
export type NoteEntitlementSource = 'purchase' | 'free'






 
export type NoteEntitlement = {
  id: string
  studentId: string
  noteId: string
  source: NoteEntitlementSource
  grantedAt?: string
  revokedAt?: string
}
