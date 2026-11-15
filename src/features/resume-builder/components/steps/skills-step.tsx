'use client'

import { SkillChipInput } from '../skill-chip-input'
import type { SkillEntry } from '../../data/types'

export function SkillsStep({ skills, onChange }: { skills: SkillEntry[]; onChange: (skills: SkillEntry[]) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <SkillChipInput skills={skills} onChange={onChange} />
    </div>
  )
}
