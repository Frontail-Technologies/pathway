import { Award, BedDouble, Building2, Dumbbell, FlaskConical, HeartPulse, Library, UtensilsCrossed, Wifi, type LucideIcon } from 'lucide-react'
import type { CollegeDetailData } from '../data/college-detail'

const facilityIcons: Record<string, LucideIcon> = {
  Library,
  Hostel: BedDouble,
  Labs: FlaskConical,
  Sports: Dumbbell,
  'Wi-Fi': Wifi,
  Cafeteria: UtensilsCrossed,
  Medical: HeartPulse,
  Auditorium: Building2,
}

export function CollegeFacilitiesSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="facilities" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Facilities</h2>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
        {college.facilities.map((facility) => {
          const Icon = facilityIcons[facility] ?? Award
          return (
            <div key={facility} className="flex flex-col items-center gap-1.5 rounded-[10px] border bg-card p-3 text-center">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-foreground">{facility}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
