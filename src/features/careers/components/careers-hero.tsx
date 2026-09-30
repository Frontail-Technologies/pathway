import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DiscoveryListingHero } from '@/components/shared/discovery-listing-hero'

 
function CareersArtwork() {
  return (
    <div className="relative hidden h-52 w-104 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 220 170" className="absolute bottom-0 left-8 h-44 w-44 drop-shadow-[0_16px_20px_rgba(30,58,138,0.2)]">
        <circle cx="100" cy="90" r="70" fill="#dbe6fb" />
        <circle cx="100" cy="90" r="70" fill="none" stroke="#1e3a8a" strokeWidth="4" />
        <path d="M75 65 130 55 115 115 60 125Z" fill="#1d4ed8" opacity="0.85" />
        <circle cx="100" cy="90" r="6" fill="#fff" />
      </svg>
      <div className="absolute top-2 right-10 flex size-14 items-center justify-center rounded-2xl bg-white/85 text-primary shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>
      <span className="absolute top-6 left-16 text-xl text-cta/70">+</span>
      <span className="absolute right-8 bottom-10 text-xl text-cta/70">+</span>
    </div>
  )
}

export function CareersHero() {
  return (
    <DiscoveryListingHero
      eyebrow="Career Discovery"
      titleLead="Explore Career Paths That"
      titleAccent="Fit You"
      description="Get a general feel for different career fields, what the work involves, and which courses commonly lead there."
      artwork={<CareersArtwork />}
    >
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Button variant="cta" className="h-11 px-6 font-semibold" nativeButton={false} render={<a href="#categories" />}>
          Explore Careers
        </Button>
        <Button variant="outline" className="h-11 px-6 font-semibold" nativeButton={false} render={<Link href="/psychometric-test" />}>
          Take Psychometric Test
        </Button>
      </div>
    </DiscoveryListingHero>
  )
}
