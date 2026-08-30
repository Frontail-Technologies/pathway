'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { tutors } from '../data/tutors'
import { coachingInstitutes } from '../data/coaching-institutes'
import { TutorCard } from './tutor-card'
import { CoachingCard } from './coaching-card'

type Category = 'tutors' | 'coaching'

export function TutorsCoachingSection() {
  const [category, setCategory] = useState<Category>('tutors')

  return (
    <section className="border-b bg-muted py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="flex items-center justify-between gap-3">
          <SectionHeader title="Find Tutors & Coaching" />
          <Link href={category === 'tutors' ? '/tutors' : '/coaching'} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 flex gap-2 sm:mt-4">
          <button
            type="button"
            onClick={() => setCategory('tutors')}
            aria-pressed={category === 'tutors'}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${category === 'tutors' ? 'border-primary bg-secondary text-primary' : 'bg-card text-muted-foreground hover:border-primary hover:text-primary'}`}
          >
            Tutors
          </button>
          <button
            type="button"
            onClick={() => setCategory('coaching')}
            aria-pressed={category === 'coaching'}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${category === 'coaching' ? 'border-primary bg-secondary text-primary' : 'bg-card text-muted-foreground hover:border-primary hover:text-primary'}`}
          >
            Coaching Institutes
          </button>
        </div>
        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-5 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {category === 'tutors'
            ? tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
            : coachingInstitutes.map((coaching, index) => <CoachingCard key={coaching.id} coaching={coaching} index={index} />)}
        </div>
      </div>
    </section>
  )
}
