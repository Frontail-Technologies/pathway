import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminTeamView } from '@/features/admin/components/team/admin-team-view'

export const metadata: Metadata = {
  title: 'Team & access | Pathway Admin',
  description: 'Admin team members, invites and roles.',
}

export default function AdminTeamPage() {
  return (
    <Suspense>
      <AdminTeamView />
    </Suspense>
  )
}
