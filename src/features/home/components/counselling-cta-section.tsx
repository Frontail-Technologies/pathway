import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = ['Free guidance', 'College & course shortlisting', 'Admission support']

 
export function CounsellingCtaSection({ tone = 'plain' }: { tone?: 'plain' | 'muted' }) {
  return (
    <section className={`${tone === 'muted' ? 'bg-muted/60' : 'bg-background'} py-7 sm:py-9 lg:py-12`}>
      <div className="container-shell">
        <div className="flex flex-col overflow-hidden rounded-2xl bg-primary sm:min-h-56 sm:flex-row">
          <div className="flex flex-col justify-center gap-2.5 p-5 sm:w-[55%] sm:p-8">
            <p className="text-sm font-medium text-white/80">Free counselling</p>
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">Need help choosing the right college?</h2>
            <p className="max-w-md text-sm leading-6 text-white/85">Get personalised guidance based on your goals, exam scores and preferred courses.</p>
            <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-1.5 text-sm text-white">
                  <Check className="size-4 shrink-0 text-white/80" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button variant="cta" className="mt-1.5 h-11 w-full px-6 sm:w-fit" nativeButton={false} render={<Link href="/counselling" />}>
              Get Free Counselling
            </Button>
          </div>
          <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[45%]">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=75"
              alt="Students studying together and planning their next steps"
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
