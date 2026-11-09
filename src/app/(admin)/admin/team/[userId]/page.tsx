import type { Metadata } from 'next'
import { AdminTeamMemberDetailView } from '@/features/admin/components/team/admin-team-member-detail-view'

type Props = { params: Promise<{ userId: string }> }

export const metadata: Metadata = {
  title: 'Team member | Pathway Admin',
  description: 'Staff account, role, sessions and activity.',
}

export default async function AdminTeamMemberPage({ params }: Props) {
  const { userId } = await params
  return <AdminTeamMemberDetailView userId={userId} />
}
