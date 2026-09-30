import Image from 'next/image'
import { ArrowRight, Globe2 } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { studyDestinations } from '../data/study-abroad'

const [featured, ...rest] = studyDestinations

function DestinationTag({ label }: { label: string }) {
  return <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-semibold text-primary backdrop-blur-sm">{label}</span>
}

function DestinationTile({ destination, large = false }: { destination: (typeof studyDestinations)[number]; large?: boolean }) {
  return (
    <div
      id={`destination-${destination.id}`}
      className={`group relative flex shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[14px] shadow-[0_2px_10px_rgba(15,23,42,0.06)] scroll-mt-24 ${large ? 'h-64 w-full sm:h-80' : 'h-48 w-64 sm:h-52 sm:w-auto'}`}
    >
      <Image
        src={destination.imageUrl}
        alt={destination.imageAlt}
        fill
        sizes={large ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 640px) 25vw, 60vw'}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.25)_40%,rgba(15,23,42,0.95)_100%)]" />
      <div className={`relative flex flex-col gap-1.5 p-4 ${large ? 'sm:p-6' : ''}`}>
        <p className={`font-heading font-bold text-white ${large ? 'text-xl sm:text-2xl' : 'text-base'}`}>{destination.country}</p>
        {large && <p className="max-w-md text-sm leading-5 text-white/85">{destination.descriptor}</p>}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {destination.commonStudyAreas.slice(0, 2).map((area) => (
            <DestinationTag key={area} label={area} />
          ))}
        </div>
        <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-white">
          Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}





 
export function DestinationFeatureGrid() {
  return (
    <div id="destinations" className="scroll-mt-24">
      <div className="flex items-center gap-2">
        <Globe2 className="size-5 text-primary" aria-hidden="true" />
        <SectionHeader title="Explore Destinations" description="A general sense of what each destination is commonly known for — not a ranking or recommendation." />
      </div>
      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <DestinationTile destination={featured} large />
        <HorizontalContentRail
          ariaLabel="More study destinations"
          edgeBleed
          className="sm:mx-0"
          trackClassName="sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:scroll-px-0"
        >
          {rest.map((destination) => (
            <DestinationTile key={destination.id} destination={destination} />
          ))}
        </HorizontalContentRail>
      </div>
    </div>
  )
}
