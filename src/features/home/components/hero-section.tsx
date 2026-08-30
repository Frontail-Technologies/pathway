import { GlobalSearch } from '@/components/shared/global-search'
import { Button } from '@/components/ui/button'
import { HeroSlider } from './hero-slider'

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroSlider />
      <div className="container-shell relative z-10 flex min-h-90 flex-col justify-center gap-3 px-4 py-8 sm:py-9">
        <div className="flex max-w-180 flex-col items-start gap-3 text-left">
          <p className="text-sm font-semibold text-white/90">India&apos;s education discovery marketplace</p>
          <h1 className="text-balance font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">Find Colleges, Courses &amp; Exams</h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-white/75">Explore colleges, courses, exams and scholarships in one place.</p>
          <div className="hidden w-full max-w-160 md:block">
            <GlobalSearch />
          </div>
          <Button variant="outline" className="h-11 border-white/40 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white focus-visible:border-transparent focus-visible:ring-white/70">Explore Colleges</Button>
        </div>
      </div>
    </section>
  )
}
