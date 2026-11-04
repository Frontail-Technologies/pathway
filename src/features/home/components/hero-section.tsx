import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { GlobalSearch } from '@/components/shared/global-search'
import { Button } from '@/components/ui/button'
import { PopularSearchChips } from './popular-searches'




 
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-light">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=70"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(239,246,255,0.96)_0%,rgba(239,246,255,0.9)_45%,rgba(219,230,251,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,var(--background))]" />
      </div>
      <Container className="relative flex items-center gap-10 py-8 sm:py-10 lg:min-h-105 lg:py-12">
        <div className="min-w-0 flex-1 lg:max-w-[58%]">
          <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase sm:text-sm">India&apos;s Education Discovery Marketplace</p>
          <h1 className="mt-2 font-heading text-[30px] leading-[1.1] font-extrabold text-foreground sm:text-[44px]">
            Find Colleges, Courses <span className="text-primary">&amp; Exams</span>
          </h1>
          <p className="mt-2.5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Explore colleges, courses, exams and scholarships in one place — built for students planning their next step.
          </p>
          <div className="mt-4 max-w-160">
            <GlobalSearch />
          </div>
          <div className="mt-3">
            <PopularSearchChips />
          </div>
          <Button variant="cta" className="mt-4 h-11 gap-2 px-6 font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
            Explore Colleges
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="relative hidden h-80 flex-1 lg:block">
          <span className="absolute -right-3 -bottom-3 size-3/4 rounded-[32px] bg-primary/15" aria-hidden="true" />
          <div className="relative size-full overflow-hidden rounded-[28px] rounded-tl-[90px] shadow-[0_16px_40px_rgba(30,58,138,0.2)]">
            <Image
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=78"
              alt="Students talking together on a university campus"
              fill
              priority
              sizes="42vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
