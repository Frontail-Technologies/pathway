'use client'

import { TagListInput } from '../tag-list-input'
import type { ResumeAdditional } from '../../data/types'

export function AdditionalStep({ additional, onChange }: { additional: ResumeAdditional; onChange: (additional: ResumeAdditional) => void }) {
  const update = <K extends keyof ResumeAdditional>(key: K, values: ResumeAdditional[K]) => onChange({ ...additional, [key]: values })

  return (
    <div className="flex flex-col gap-5">
      <TagListInput label="Languages" placeholder="Add a language and press Enter" values={additional.languages} onChange={(values) => update('languages', values)} />
      <TagListInput label="Extracurricular Activities" placeholder="Add an activity and press Enter" values={additional.extracurricular} onChange={(values) => update('extracurricular', values)} />
      <TagListInput label="Volunteer Work" placeholder="Add volunteer work and press Enter" values={additional.volunteer} onChange={(values) => update('volunteer', values)} />
      <TagListInput label="Interests" placeholder="Add an interest and press Enter" values={additional.interests} onChange={(values) => update('interests', values)} />
    </div>
  )
}
