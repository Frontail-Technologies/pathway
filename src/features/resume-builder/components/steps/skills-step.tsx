'use client'

import { SkillChipInput } from '../skill-chip-input'
import type { SkillEntry } from '../../data/types'

export function SkillsStep({ skills, onChange }: { skills: SkillEntry[]; onChange: (skills: SkillEntry[]) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Type a skill and press Enter to add it as a chip. Group skills the way recruiters expect to see them.</p>
      <SkillChipInput skills={skills} onChange={onChange} />
    </div>
  )
}
