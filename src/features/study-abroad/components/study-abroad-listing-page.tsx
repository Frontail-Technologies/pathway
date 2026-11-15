import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, FileText, Landmark, Mail, PenLine, Wallet, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroScene } from '@/components/shared/landing-art'
import { Band, CtaBandSection, HeroOutlineButton, MarketingHero, StepList } from '@/components/shared/landing'
import { applicationResources, journeySteps, scholarshipCategories, studyAbroadExams, studyDestinations } from '../data/study-abroad'

const resourceIcons: LucideIcon[] = [PenLine, Mail, BadgeCheck, FileText]
const fundingIcons: LucideIcon[] = [BadgeCheck, Landmark, Landmark, Wallet]

export function StudyAbroadListingPage() {
  return (
    <>
      <MarketingHero
        trail={['Home', 'Study abroad']}
        aside={<HeroScene name="studyAbroad" className="hidden lg:block" />}
        title="Plan your studies abroad"
        description="Popular destinations, the exams they ask for, ways to fund your degree and what goes into an overseas application."
        stats={[
          { label: 'Destinations', value: String(studyDestinations.length) },
          { label: 'Key exams', value: String(studyAbroadExams.length) },
        ]}
        actions={
          <>
            <Button variant="cta" size="lg" className="gap-2 font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
              Talk to a counsellor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <HeroOutlineButton href="#destinations">Browse destinations</HeroOutlineButton>
          </>
        }
      />

      <Band id="destinations" title="Popular destinations" subtitle="Where Indian students most often go, and what each is known for">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studyDestinations.map((destination) => (
            <li key={destination.id} id={`destination-${destination.id}`} className="scroll-mt-header overflow-hidden rounded-xl border bg-card">
              <div className="relative aspect-[16/9] bg-muted">
                <Image src={destination.imageUrl} alt={destination.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-foreground">{destination.country}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{destination.descriptor}</p>
                <p className="mt-3 text-[13px] font-medium text-foreground">{destination.commonStudyAreas.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Exams for studying abroad" subtitle="English tests and admission tests universities commonly ask for" tone="muted">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {studyAbroadExams.map((exam) => (
            <li key={exam.name} className="flex flex-col rounded-xl border bg-card p-5">
              <span className="flex h-11 w-fit min-w-11 items-center justify-center rounded-lg bg-secondary px-2 text-sm font-bold text-primary">{exam.name}</span>
              <p className="mt-4 text-[13px] font-medium text-primary">{exam.category}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{exam.description}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Funding your studies" href="/scholarships" linkLabel="Browse scholarships">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scholarshipCategories.map((category, index) => {
            const Icon = fundingIcons[index] ?? Wallet
            return (
              <li key={category.title} className="rounded-xl border bg-card p-5">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-semibold text-foreground">{category.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{category.description}</p>
              </li>
            )
          })}
        </ul>
      </Band>

      <Band title="What goes into an application" tone="muted">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {applicationResources.map((resource, index) => {
            const Icon = resourceIcons[index] ?? FileText
            return (
              <li key={resource.title} className="rounded-xl border bg-card p-5">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-semibold text-foreground">{resource.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{resource.description}</p>
              </li>
            )
          })}
        </ul>
      </Band>

      <Band title="Plan your journey">
        <StepList steps={journeySteps} />
      </Band>

      <CtaBandSection title="Planning to study abroad?" text="A counsellor can help you shortlist destinations, courses and next steps." href="/counselling" label="Get free counselling" tone="muted" />
    </>
  )
}
