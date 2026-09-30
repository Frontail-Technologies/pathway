'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Users, Building2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { AdminTutorsTableView } from '../tutors/directory/admin-tutors-table-view'
import { AdminCoachingTableView } from '../coaching/directory/admin-coaching-table-view'

export function AdminTutorsCoachingView({
  tutors,
  coachingProviders,
}: {
  tutors: AdminTutor[]
  coachingProviders: AdminCoachingProvider[]
}) {
  const [activeTab, setActiveTab] = useState<'tutors' | 'coaching'>('tutors')

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Tutors & Coaching
            </h1>
            <Badge variant="info" size="sm">
              {activeTab === 'tutors' ? `${tutors.length} Educators` : `${coachingProviders.length} Providers`}
            </Badge>
          </div>
        </div>

        <Link
          href={activeTab === 'tutors' ? '/admin/tutors-coaching/tutors/new' : '/admin/tutors-coaching/coaching/new'}
          className={buttonVariants({
            size: 'sm',
            className: 'font-semibold text-xs gap-1.5 shadow-xs shrink-0 self-start sm:self-auto',
          })}
        >
          <Plus className="w-4 h-4" />
          {activeTab === 'tutors' ? 'Add Tutor' : 'Add Coaching Provider'}
        </Link>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as 'tutors' | 'coaching')}
        className="w-full min-w-0"
      >
        <TabsList variant="line">
          <TabsTrigger
            value="tutors"
          >
            <Users />
            <span>Individual Tutors</span>
            <Badge variant="muted" size="xs">
              {tutors.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="coaching"
          >
            <Building2 />
            <span>Coaching Providers</span>
            <Badge variant="muted" size="xs">
              {coachingProviders.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutors" className="mt-6 w-full min-w-0">
          <AdminTutorsTableView tutors={tutors} />
        </TabsContent>

        <TabsContent value="coaching" className="mt-6 w-full min-w-0">
          <AdminCoachingTableView providers={coachingProviders} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
