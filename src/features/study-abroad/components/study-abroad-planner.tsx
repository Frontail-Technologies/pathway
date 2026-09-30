'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Container } from '@/components/shared/container'
import { studyLevelOptions, studyDestinations, popularStudyAreas } from '../data/study-abroad'






 
export function StudyAbroadPlanner() {
  const [level, setLevel] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [area, setArea] = useState<string>('')

  function handleExplore() {
    const targetId = destination ? `destination-${destination}` : 'destinations'
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="planner" className="relative z-10 -mt-6 px-4 sm:-mt-8 lg:-mt-10">
      <Container className="px-0">
        <div className="mx-auto flex flex-col gap-3 rounded-[14px] border bg-card p-3.5 shadow-[0_12px_32px_rgba(15,23,42,0.1)] sm:p-4 lg:flex-row lg:items-center lg:gap-4">
          <p className="shrink-0 text-sm font-bold text-foreground lg:pr-2">Start planning your study abroad journey</p>
          <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-3">
            <Select value={level} onValueChange={(value) => setLevel(value ?? '')} items={studyLevelOptions.map((option) => ({ value: option.id, label: option.label }))}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Study Level" />
              </SelectTrigger>
              <SelectContent>
                {studyLevelOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={destination} onValueChange={(value) => setDestination(value ?? '')} items={studyDestinations.map((d) => ({ value: d.id, label: d.country }))}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                {studyDestinations.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={area} onValueChange={(value) => setArea(value ?? '')} items={popularStudyAreas.map((a) => ({ value: a, label: a }))}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Study Area" />
              </SelectTrigger>
              <SelectContent>
                {popularStudyAreas.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="cta" className="h-10 shrink-0 px-6 font-semibold" onClick={handleExplore}>
            Start Exploring
          </Button>
        </div>
      </Container>
    </section>
  )
}
