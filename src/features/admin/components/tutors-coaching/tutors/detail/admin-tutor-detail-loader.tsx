'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { getCatalogAdminTutor, type CatalogAdminTutor } from '@/features/admin/data/admin-tutors-api'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { AdminPageHeader } from '../../../kit'
import { AdminTutorDetailView } from './admin-tutor-detail-view'

type Load = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; tutor: CatalogAdminTutor }

export function AdminTutorDetailLoader({ tutorId }: { tutorId: string }) {
  const { hydrated, session } = useAdminSession()
  const query = useQuery({ queryKey: queryKeys.adminCatalogTutor(tutorId), queryFn: () => getCatalogAdminTutor(tutorId), enabled: hydrated && Boolean(session) })
  const error = query.error
  const load: Load = query.isError
    ? { state: 'error', message: error instanceof ApiRequestError ? (error.status === 404 || error.status === 422 ? 'This tutor is not in the catalog.' : error.message) : 'Could not load this tutor.' }
    : query.data
      ? { state: 'ready', tutor: query.data }
      : { state: 'loading' }

  if (load.state === 'ready') return <AdminTutorDetailView tutor={load.tutor} />
  return (
    <div className="space-y-5">
      <AdminPageHeader title="Tutor" back={{ href: '/admin/tutors-coaching', label: 'Tutors & coaching' }} />
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-14 text-center">
        <p className="text-sm text-muted-foreground">{load.state === 'loading' ? 'Loading tutor…' : load.message}</p>
        {load.state === 'error' ? (
          <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
            Try again
          </Button>
        ) : null}
      </div>
    </div>
  )
}
