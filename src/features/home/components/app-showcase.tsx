import Image from 'next/image'
import { BellRing, Bookmark, Check, FileText, Smartphone, Target } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { getCatalogTotals } from '../api/home-data'

const benefits = [
  { icon: BellRing, text: 'Exam notices and deadline reminders' },
  { icon: Bookmark, text: 'Your saved colleges, synced with the website' },
  { icon: Target, text: 'College and rank predictors' },
  { icon: FileText, text: 'Official cutoffs, rankings and brochures' },
]

export async function AppShowcase() {
  const totals = await getCatalogTotals()
  const storeUrl = siteConfig.androidAppUrl

  return (
    <section aria-labelledby="app-showcase-title" className="bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_17rem_minmax(0,0.8fr)] lg:gap-10 lg:p-10">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                <Smartphone className="size-4" aria-hidden="true" />
                Pathway app
              </p>
              <h2 id="app-showcase-title" className="mt-2 font-heading text-2xl leading-tight font-extrabold text-foreground sm:text-[30px]">
                Your college search, in your pocket
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {benefits.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-[15px] text-foreground">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <item.icon className="size-4" aria-hidden="true" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 flex gap-8 border-t pt-5">
                {[
                  { label: 'Colleges', value: totals.colleges },
                  { label: 'Exams', value: totals.exams },
                  { label: 'Scholarships', value: totals.scholarships },
                ]
                  .filter((item) => item.value > 0)
                  .map((item) => (
                    <div key={item.label}>
                      <dd className="font-heading text-2xl font-semibold text-foreground tabular-nums">{item.value.toLocaleString('en-IN')}</dd>
                      <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
                    </div>
                  ))}
              </dl>
            </div>

            <div className="relative mx-auto w-56 sm:w-64 lg:w-full">
              <div className="relative rounded-[2.2rem] border-[7px] border-slate-900 bg-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
                <div className="relative aspect-[540/1104] overflow-hidden rounded-[1.7rem] bg-card">
                  <Image src="/images/app/app-home.jpg" alt="Pathway app home screen with search, tools and the college predictor" fill sizes="(min-width: 1024px) 17rem, 16rem" className="object-cover object-top" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 rounded-xl border bg-muted/40 p-5 lg:items-center lg:p-6 lg:text-center">
              {storeUrl ? (
                <>
                  <p className="text-base font-semibold text-foreground">Get the app</p>
                  <Button variant="cta" size="lg" className="px-6" nativeButton={false} render={<a href={storeUrl} target="_blank" rel="noopener noreferrer" />}>
                    Download for Android
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-foreground">Launching on Android soon</p>
                  <ul className="flex flex-col gap-2 text-left text-sm text-muted-foreground">
                    {['Same account as the website', 'Free, no paywalls', 'Official data sources'].map((line) => (
                      <li key={line} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
