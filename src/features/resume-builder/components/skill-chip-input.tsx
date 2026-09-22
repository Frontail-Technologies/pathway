'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SkillEntry, SkillGroupId } from '../data/types'
import { makeEntryId } from '../data/id'

const GROUPS: SkillGroupId[] = ['Technical Skills', 'Tools', 'Soft Skills']

export function SkillChipInput({ skills, onChange }: { skills: SkillEntry[]; onChange: (skills: SkillEntry[]) => void }) {
  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((group) => (
        <SkillGroupInput key={group} group={group} skills={skills} onChange={onChange} />
      ))}
    </div>
  )
}

function SkillGroupInput({ group, skills, onChange }: { group: SkillGroupId; skills: SkillEntry[]; onChange: (skills: SkillEntry[]) => void }) {
  const [draft, setDraft] = useState('')
  const groupSkills = skills.filter((skill) => skill.group === group)

  const addSkill = () => {
    const label = draft.trim()
    if (!label) return
    if (groupSkills.some((skill) => skill.label.toLowerCase() === label.toLowerCase())) {
      setDraft('')
      return
    }
    onChange([...skills, { id: makeEntryId('skill'), label, group }])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{group}</Label>
      {groupSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {groupSkills.map((skill) => (
            <span key={skill.id} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
              {skill.label}
              <button
                type="button"
                onClick={() => onChange(skills.filter((existing) => existing.id !== skill.id))}
                aria-label={`Remove ${skill.label}`}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            addSkill()
          }
        }}
        placeholder={`Add a ${group.toLowerCase()} skill and press Enter`}
        className="h-9"
      />
    </div>
  )
}
