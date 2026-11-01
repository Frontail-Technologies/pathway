import { Award, ClipboardCheck, LifeBuoy, MonitorPlay } from 'lucide-react'
import { DetailSectionHeader } from '@/components/shared/detail-section-header'
import type { CoachingProvider } from '../data/coaching'

const FEATURE_ICONS = [Award, ClipboardCheck, LifeBuoy, MonitorPlay]

 
export function CoachingAboutSection({ provider }: { provider: CoachingProvider }) {
  const features = [...provider.highlights, `${provider.modes.join(' + ')} learning`].slice(0, 4)

  return (
    <section id="overview" className="scroll-mt-section border-b py-8 lg:py-12">
      <DetailSectionHeader title={`About ${provider.name}`} />
      <p className="mt-2.5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{provider.aboutCopy}</p>

      {features.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]
            return (
              <div key={feature} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <p className="mt-1 text-sm font-medium text-foreground">{feature}</p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
