import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AdmissionsBanner() {
  return (
    <section className="py-5 sm:py-7 lg:py-8">
      <div className="container-shell px-4">
        <div className="flex flex-col overflow-hidden rounded-xl border bg-card sm:min-h-42.5 sm:flex-row-reverse">
          <div className="relative h-24 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[40%]">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=75"
              alt="A university building with a large lawn in front"
              fill
              sizes="(min-width: 640px) 40vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6">
            <p className="hidden text-xs font-semibold tracking-wider text-primary uppercase sm:block">Admissions Open 2026</p>
            <h2 className="font-heading text-base font-bold text-foreground sm:text-2xl">Explore colleges currently accepting applications</h2>
            <p className="max-w-md text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">Browse colleges across streams and cities before admission windows close.</p>
            <Button variant="cta" className="h-10 w-fit px-5 sm:h-11 sm:px-6" nativeButton={false} render={<Link href="/colleges" />}>
              Explore Colleges
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
