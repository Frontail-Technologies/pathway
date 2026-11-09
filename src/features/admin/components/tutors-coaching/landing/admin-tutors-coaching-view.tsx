'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { listCatalogAdminTutors, type CatalogAdminTutor } from '@/features/admin/data/admin-tutors-api'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { Button } from '@/components/ui/button'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { cn } from '@/lib/utils'
import { AdminPageHeader } from '../../kit'
import { AdminTutorsTableView } from '../tutors/directory/admin-tutors-table-view'
import { AdminCoachingTableView } from '../coaching/directory/admin-coaching-table-view'

const TAB_DEFAULTS = { tab: 'tutors' }

const TABS = [
  { value: 'tutors', label: 'Tutors', href: '/admin/tutors-coaching' },
  { value: 'coaching', label: 'Coaching providers', href: '/admin/tutors-coaching?tab=coaching' },
] as const

type TutorsLoad = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; tutors: CatalogAdminTutor[] }

export function AdminTutorsCoachingView({ coachingProviders }: { coachingProviders: AdminCoachingProvider[] }) {
  const { values } = useUrlFilters(TAB_DEFAULTS)
  const { hydrated, session } = useAdminSession()
  const query = useQuery({ queryKey: queryKeys.adminCatalogTutors, queryFn: listCatalogAdminTutors, enabled: hydrated && Boolean(session) })
  const load: TutorsLoad = query.isError
    ? { state: 'error', message: query.error instanceof ApiRequestError ? query.error.message : 'Could not load tutors.' }
    : query.data
      ? { state: 'ready', tutors: query.data }
      : { state: 'loading' }
  const tutors = load.state === 'ready' ? load.tutors : []
  const tab = values.tab === 'coaching' ? 'coaching' : 'tutors'
  const counts = { tutors: tutors.length, coaching: coachingProviders.length }

  return (
    <div className="w-full min-w-0 space-y-5">
      <AdminPageHeader
        title="Tutors & coaching"
        count={tab === 'tutors' ? `${tutors.length} tutors` : `${coachingProviders.length} coaching providers`}
        description="Individual tutors and coaching providers listed on Pathway."
        actions={
          <Link href={tab === 'tutors' ? '/admin/tutors-coaching/tutors/new' : '/admin/tutors-coaching/coaching/new'} className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            {tab === 'tutors' ? 'Add tutor' : 'Add coaching provider'}
          </Link>
        }
      />

      <nav aria-label="Record type" className="flex gap-6 border-b border-border">
        {TABS.map((item) => {
          const active = item.value === tab
          return (
            <Link
              key={item.value}
              href={item.href}
              replace
              scroll={false}
              aria-current={active ? 'page' : undefined}
              className={cn(
                '-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-sm font-medium outline-none transition-colors focus-visible:text-foreground',
                active ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              <span className="text-[13px] font-normal text-muted-foreground tabular-nums">{counts[item.value]}</span>
            </Link>
          )
        })}
      </nav>

      {tab === 'coaching' ? (
        <AdminCoachingTableView providers={coachingProviders} />
      ) : load.state === 'ready' ? (
        <AdminTutorsTableView tutors={tutors} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-14 text-center">
          <p className="text-sm text-muted-foreground">{load.state === 'loading' ? 'Loading tutors…' : load.message}</p>
          {load.state === 'error' ? (
            <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
              Try again
            </Button>
          ) : null}
        </div>
      )}
    </div>
  )
}
