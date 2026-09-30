'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { tutors } from '@/features/tutors/data/tutors'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { HomeTutorCard } from './tutor-card'
import { HomeCoachingCard } from './coaching-card'

type Category = 'tutors' | 'coaching'

const featuredTutors = tutors.filter((tutor) => tutor.featured).slice(0, 4)
const featuredCoaching = coachingProviders.filter((provider) => provider.featured).slice(0, 4)

const tabs: { id: Category; label: string }[] = [
  { id: 'tutors', label: 'Tutors' },
  { id: 'coaching', label: 'Coaching Institutes' },
]

export function TutorsCoachingSection() {
  const [category, setCategory] = useState<Category>('tutors')

  return (
    <section className="bg-muted py-7 sm:py-9 lg:py-12">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Find Tutors &amp; Coaching</h2>
          <Link href={category === 'tutors' ? '/tutors' : '/coaching'} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 inline-flex rounded-full border bg-card p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              aria-pressed={category === tab.id}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${category === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <HorizontalContentRail
          ariaLabel="Featured tutors and coaching institutes"
          edgeBleed
          className="mt-4 sm:mx-0"
          trackClassName="sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:pb-0 sm:px-0 sm:scroll-px-0 lg:grid-cols-4"
        >
          {category === 'tutors'
            ? featuredTutors.map((tutor) => <HomeTutorCard key={tutor.id} tutor={tutor} />)
            : featuredCoaching.map((coaching, index) => <HomeCoachingCard key={coaching.id} coaching={coaching} index={index} />)}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
