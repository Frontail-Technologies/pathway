'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { getAdminCoachingProviders } from '@/features/admin/data/admin-coaching'
import { getAdminExams } from '@/features/admin/data/admin-exams'
import { getAdminInstitutions } from '@/features/admin/data/admin-institutions'
import { getAdminPrograms } from '@/features/admin/data/admin-programs'
import { getAdminScholarships } from '@/features/admin/data/admin-scholarships'
import { adminNavigationGroups } from '@/features/admin/data/admin-stats'
import { getAdminStudents } from '@/features/admin/data/admin-students'
import { getAdminTutors } from '@/features/admin/data/admin-tutors'

type Entry = { id: string; label: string; hint: string; href: string }

function useSearchIndex() {
  return useMemo(() => {
    const records: { group: string; items: Entry[] }[] = [
      { group: 'Institutions', items: getAdminInstitutions().map((i) => ({ id: `inst-${i.id}`, label: i.name, hint: `${i.city}, ${i.state}`, href: `/admin/institutions/${i.id}` })) },
      { group: 'Courses', items: getAdminPrograms().map((p) => ({ id: `prog-${p.id}`, label: p.name, hint: 'Course', href: `/admin/programs/${p.id}` })) },
      { group: 'Exams', items: getAdminExams().map((e) => ({ id: `exam-${e.id}`, label: e.shortName, hint: e.name, href: `/admin/exams/${e.id}` })) },
      { group: 'Scholarships', items: getAdminScholarships().map((s) => ({ id: `sch-${s.id}`, label: s.name, hint: 'Scholarship', href: `/admin/scholarships/${s.id}` })) },
      { group: 'Tutors', items: getAdminTutors().map((t) => ({ id: `tut-${t.slug}`, label: t.name, hint: 'Tutor', href: `/admin/tutors-coaching/tutors/${t.slug}` })) },
      { group: 'Coaching', items: getAdminCoachingProviders().map((c) => ({ id: `coa-${c.slug}`, label: c.name, hint: 'Coaching', href: `/admin/tutors-coaching/coaching/${c.slug}` })) },
      { group: 'Students', items: getAdminStudents().map((s) => ({ id: `stu-${s.id}`, label: s.name, hint: 'Student', href: `/admin/students/${s.id}` })) },
    ]
    const pages: Entry[] = adminNavigationGroups.flatMap((group) => group.items.map((item) => ({ id: `nav-${item.id}`, label: item.label, hint: group.title, href: item.href })))
    return { pages, records }
  }, [])
}

export function AdminQuickSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { pages, records } = useSearchIndex()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-sm items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground outline-none transition-colors hover:border-input focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="flex-1 text-left">Search admin…</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 text-[11px] font-medium sm:inline">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search admin" description="Jump to a page or record">
        <CommandInput placeholder="Search pages, institutions, courses, tutors…" />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((entry) => (
              <CommandItem key={entry.id} value={`${entry.label} ${entry.hint}`} onSelect={() => go(entry.href)}>
                <span className="flex-1">{entry.label}</span>
                <span className="text-xs text-muted-foreground">{entry.hint}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {records.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((entry) => (
                <CommandItem key={entry.id} value={`${entry.label} ${entry.hint} ${group.group}`} onSelect={() => go(entry.href)}>
                  <span className="flex-1 truncate">{entry.label}</span>
                  <span className="text-xs text-muted-foreground">{entry.hint}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
