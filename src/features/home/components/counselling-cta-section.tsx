import Image from 'next/image'
import Link from 'next/link'
import { Check, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = ['Free guidance', 'College & course shortlisting', 'Admission support']

export function CounsellingCtaSection() {
  return (
    <section className="border-b py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="flex flex-col overflow-hidden rounded-xl border bg-secondary sm:min-h-55 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-2.5 p-5 sm:gap-3 sm:p-8">
            <div className="flex items-center gap-2 text-primary">
              <MessageCircleQuestion className="size-5" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-wider uppercase">Free Counselling</p>
            </div>
            <h2 className="font-heading text-xl font-bold text-secondary-foreground sm:text-2xl">Need help choosing the right college?</h2>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Get personalised guidance based on your goals, exam scores and preferred courses.</p>
            <ul className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-1.5 text-sm text-foreground">
                  <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button variant="cta" className="mt-1 h-11 w-full px-6 sm:w-fit" nativeButton={false} render={<Link href="/counselling" />}>
              Get Free Counselling
            </Button>
          </div>
          <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[38%]">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=75"
              alt="Students studying together and planning their next steps"
              fill
              sizes="(min-width: 640px) 38vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
