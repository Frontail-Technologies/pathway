import type { Metadata } from 'next'
import { AdminInviteAcceptForm } from '@/features/admin/auth/admin-invite-accept-form'

export const metadata: Metadata = { title: 'Join the Pathway team', description: 'Accept your invitation to the Pathway admin.', robots: { index: false, follow: false } }

export default async function AdminInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  return <AdminInviteAcceptForm token={token} />
}
