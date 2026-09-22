'use client'

import {
  categories,
  counsellingOptions,
  genders,
  getBranchOptions,
  homeStates,
  preferredStateOptions,
  priorityOptions,
  type CollegePredictorDraft,
  type CollegeTypePreference,
  type PriorityChoice,
} from '../data/predictor'
import { ChipGroup, Field, OptionSelect, SegmentedChoice, StepHeading } from '@/components/shared/student-tool/tool-fields'

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]
}

export function PreferencesStep({ draft, onChange }: { draft: CollegePredictorDraft; onChange: (patch: Partial<CollegePredictorDraft>) => void }) {
  const branchLabel = draft.course === 'medical' ? 'Preferred Courses' : draft.course === 'undergraduate' ? 'Preferred Programs' : 'Preferred Branches'

  return (
    <div className="flex flex-col gap-7">
      <StepHeading title="Tell us your preferences" helper="Everything on this page is optional — add what you know." />

      <section aria-labelledby="admission-context">
        <p id="admission-context" className="text-base font-semibold text-foreground">
          Admission Context <span className="font-normal text-muted-foreground">(Optional)</span>
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">These details help tailor results once the prediction engine is connected.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Category">
            <OptionSelect value={draft.category} onChange={(category) => onChange({ category })} options={categories} placeholder="Select category" />
          </Field>
          <Field label="Home State">
            <OptionSelect value={draft.homeState} onChange={(homeState) => onChange({ homeState })} options={homeStates} placeholder="Select home state" />
          </Field>
          <Field label="Gender">
            <OptionSelect value={draft.gender} onChange={(gender) => onChange({ gender })} options={genders} placeholder="Select gender" />
          </Field>
          <Field label="Preferred Counselling">
            <OptionSelect value={draft.counselling} onChange={(counselling) => onChange({ counselling })} options={counsellingOptions} placeholder="Select counselling" />
          </Field>
        </div>
      </section>

      <section aria-labelledby="college-preferences" className="flex flex-col gap-6 border-t pt-6">
        <p id="college-preferences" className="text-base font-semibold text-foreground">
          College Preferences <span className="font-normal text-muted-foreground">(Optional)</span>
        </p>

        <Field label="Preferred States" hint="Pick any number, or leave empty for all states.">
          <ChipGroup ariaLabel="Preferred states" options={preferredStateOptions} selected={draft.preferredStates} onToggle={(state) => onChange({ preferredStates: toggle(draft.preferredStates, state) })} />
        </Field>

        <Field label={branchLabel} hint="Pick any number.">
          <ChipGroup ariaLabel={branchLabel} options={getBranchOptions(draft.course)} selected={draft.preferredBranches} onToggle={(branch) => onChange({ preferredBranches: toggle(draft.preferredBranches, branch) })} />
        </Field>

        <Field label="College Type">
          <SegmentedChoice<CollegeTypePreference> options={['Government', 'Private', 'Either']} value={draft.collegeType} onChange={(collegeType) => onChange({ collegeType })} ariaLabel="College type" />
        </Field>

        <Field label="What matters most?" hint="Shapes how results will be presented later, not a ranking algorithm.">
          <SegmentedChoice<PriorityChoice> options={priorityOptions} value={draft.priority} onChange={(priority) => onChange({ priority })} ariaLabel="Priority" />
        </Field>
      </section>
    </div>
  )
}
