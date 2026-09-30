import Image from 'next/image'
import { Container } from '@/components/shared/container'





 
export function StudyAbroadHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=75"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.62)_45%,rgba(15,23,42,0.32)_100%)]" />
      </div>
      <Container className="relative flex min-h-90 flex-col justify-center gap-4 px-4 py-12 sm:min-h-105 sm:py-14 lg:min-h-100">
        <div className="max-w-xl">
          <p className="text-xs font-bold tracking-[0.18em] text-white/80 uppercase sm:text-sm">Study Abroad</p>
          <h1 className="mt-2 font-heading text-[30px] leading-tight font-extrabold text-white sm:text-5xl">Explore Study Opportunities Around the World</h1>
          <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">Discover destinations, courses, exams and planning resources for studying overseas.</p>
        </div>
      </Container>
    </section>
  )
}
