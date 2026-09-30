import { FileText, Languages, ListChecks, Users } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { applicationResources } from '../data/study-abroad'

const icons = [FileText, Users, Languages, ListChecks]

 
export function StudyAbroadResourceStrip() {
  return (
    <section className="bg-background py-8 sm:py-10 lg:py-14">
      <div className="container-shell mx-auto px-4">
        <SectionHeader title="Application Resources" description="Common pieces of an overseas application, explained simply." />
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 lg:grid-cols-4">
          {applicationResources.map((resource, index) => {
            const Icon = icons[index]
            return (
              <div key={resource.title} className="flex flex-col gap-2 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{resource.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{resource.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
