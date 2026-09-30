import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

 
export function AdmissionsBanner() {
  return (
    <section className="bg-muted pt-7 pb-1 sm:pt-9 lg:pt-12">
      <div className="container-shell">
        <div className="flex flex-col overflow-hidden rounded-[14px] border bg-card shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:min-h-44 sm:flex-row lg:min-h-48">
          <div className="flex flex-col justify-center gap-2 p-4 sm:w-[55%] sm:p-6">
            <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">College Admissions</p>
            <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Planning your next admission?</h2>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Browse colleges across streams and cities, compare programmes and shortlist where to apply.</p>
            <Button variant="cta" className="mt-1 h-10 w-fit px-5 font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              Explore Colleges
            </Button>
          </div>
          <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[45%]">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=75"
              alt="A university building with a large lawn in front"
              fill
              sizes="(min-width: 640px) 45vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
