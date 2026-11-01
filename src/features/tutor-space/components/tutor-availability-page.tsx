'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DashboardSection } from '@/features/student/components/dashboard-parts'
import { DAYS, SLOTS, type Availability, type Day, type SlotId } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'

/** Build a full week from a per-day rule. */
const week = (slotsFor: (day: Day) => SlotId[]): Availability => Object.fromEntries(DAYS.map((day) => [day, slotsFor(day)])) as Record<Day, SlotId[]>

const isWeekend = (day: Day) => day === 'Sat' || day === 'Sun'

const presets: { label: string; build: () => Availability }[] = [
  { label: 'Weekday evenings', build: () => week((day) => (isWeekend(day) ? [] : ['evening'])) },
  { label: 'Weekends', build: () => week((day) => (isWeekend(day) ? ['morning', 'afternoon'] : [])) },
  { label: 'Clear all', build: () => week(() => []) },
]

export function TutorAvailabilityPage() {
  const { state, update } = useTutorSpace()
  const total = Object.values(state.availability).reduce((sum, slots) => sum + slots.length, 0)

  const toggle = (day: Day, slot: SlotId) => {
    update((current) => {
      const slots = current.availability[day]
      return { availability: { ...current.availability, [day]: slots.includes(slot) ? slots.filter((s) => s !== slot) : [...slots, slot] } }
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Availability</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tap a time slot to switch it on or off. Changes save automatically on this device.</p>
      </div>

      <DashboardSection
        title="Weekly schedule"
        description={total === 0 ? 'No time slots yet — students won’t see when you’re free.' : `${total} time slot${total === 1 ? '' : 's'} a week`}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              className="h-9 px-3 text-xs"
              onClick={() => {
                update({ availability: preset.build() })
                toast.success(preset.label === 'Clear all' ? 'Availability cleared.' : `Set to ${preset.label.toLowerCase()}.`)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <div>
          {/* Fixed layout: day column + three equal slot columns fit a 320px phone without sideways scrolling. */}
          <table className="w-full table-fixed border-separate border-spacing-1 text-sm sm:border-spacing-1.5">
            <caption className="sr-only">Weekly availability by day and time of day</caption>
            <thead>
              <tr>
                <th scope="col" className="w-10 text-left text-xs font-medium text-muted-foreground sm:w-14">
                  <span className="sr-only">Day</span>
                </th>
                {SLOTS.map((slot) => (
                  <th key={slot.id} scope="col" className="text-center text-xs font-semibold text-foreground">
                    {slot.label}
                    <span className="block font-normal text-muted-foreground">{slot.time}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr key={day}>
                  <th scope="row" className="text-left text-xs font-semibold text-foreground">
                    {day}
                  </th>
                  {SLOTS.map((slot) => {
                    const on = state.availability[day].includes(slot.id)
                    return (
                      <td key={slot.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          aria-label={`${day} ${slot.label}`}
                          onClick={() => toggle(day, slot.id)}
                          className={`flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${on ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:border-primary/50'}`}
                        >
                          {on ? 'Free' : '—'}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardSection>
    </div>
  )
}
