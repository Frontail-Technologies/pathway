'use client'

import { Bookmark, GraduationCap, Layers, MapPin, MonitorPlay } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DetailMediaGallery } from '@/components/shared/detail-media-gallery'
import { DetailQuickFacts, type DetailQuickFact } from '@/components/shared/detail-quick-facts'
import type { CoachingProvider } from '../data/coaching'
import { CoachingEnquiryDialog } from './coaching-enquiry-dialog'

type CoachingIdentityHeroProps = {
  provider: CoachingProvider
  saved: boolean
  onToggleSaved: () => void
}








 
export function CoachingIdentityHero({ provider, saved, onToggleSaved }: CoachingIdentityHeroProps) {
  const facts: DetailQuickFact[] = [
    { icon: MonitorPlay, label: 'Learning Mode', value: provider.modes.join(' & ') },
    { icon: MapPin, label: 'Location', value: provider.state ? `${provider.location}, ${provider.state}` : provider.location },
    { icon: GraduationCap, label: 'Exams Offered', value: provider.exams.join(', ') },
    { icon: Layers, label: 'Course Type', value: provider.courseTypes.join(' & ') },
  ]

  
  
  
  const galleryImages = (provider.gallery ?? []).map((src, index) => ({
    src,
    alt: `${provider.name} photo ${index + 1}`,
    position: index === 0 ? 'center 15%' : 'center center',
  }))

  return (
    <div className="border-b pb-5 sm:pb-6">
      <div className="grid gap-x-6 gap-y-4 lg:grid-cols-[43fr_57fr] lg:items-start">
        <DetailMediaGallery images={galleryImages} name={provider.name} />

        <div className="flex flex-col gap-3 lg:self-start">
          <div>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{provider.providerType}</span>
            <h1 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-[28px]">{provider.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {provider.state ? `${provider.location}, ${provider.state}` : provider.location}
            </p>
            <p className="mt-2 text-sm text-foreground">{provider.programLabel}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[...provider.exams, ...provider.subjects].slice(0, 5).map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="outline" className="h-11 gap-1.5 px-6 text-sm font-semibold sm:h-10" onClick={onToggleSaved} aria-pressed={saved}>
              <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
              {saved ? 'Saved' : 'Save'}
            </Button>
            <CoachingEnquiryDialog
              provider={provider}
              trigger={
                <Button variant="cta" className="h-11 px-6 text-sm font-semibold sm:h-10">
                  Enquire Now
                </Button>
              }
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <DetailQuickFacts facts={facts} />
        </div>
      </div>
    </div>
  )
}
