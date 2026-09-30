import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

 
export function PredictorBanner() {
  return (
    <section className="bg-background pt-1 pb-7 sm:pb-9 lg:pb-12">
      <div className="container-shell">
        <div className="relative flex min-h-40 items-center overflow-hidden rounded-[14px] sm:min-h-44">
          <Image
            src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1600&q=72"
            alt="An empty lecture hall used for examinations"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(30,58,138,0.92)_0%,rgba(30,58,138,0.75)_50%,rgba(30,58,138,0.2)_100%)]" />
          <div className="relative flex flex-col gap-1.5 p-5 sm:max-w-xl sm:p-8">
            <p className="text-xs font-bold tracking-[0.14em] text-white/80 uppercase">Admission Chances</p>
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">Know your admission chances</h2>
            <p className="max-w-md text-sm leading-6 text-white/85">Use your exam score or rank to discover colleges you may qualify for.</p>
            <Button variant="cta" className="mt-1.5 h-10 w-fit px-5 font-semibold" nativeButton={false} render={<Link href="/college-predictor" />}>
              Try College Predictor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
