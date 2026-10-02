import { useMemo } from 'react'
import Image from 'next/image'
import { Mail, MapPin, Phone, GraduationCap, Briefcase, User } from 'lucide-react'
import type { ResumeData } from '../../data/types'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../../data/page-size'
import { usePagedBlocks } from '../../hooks/use-paged-blocks'
import { buildBlocksFromSections, type ResumeSection } from '../../lib/build-blocks'
import { groupSkills } from './resume-template-classic'

const DARK = '#1E2A38'
const SIDEBAR = '#F1F3F5'
const HEADER_HEIGHT = 128
const SIDEBAR_WIDTH = Math.round(RESUME_PAGE_WIDTH * 0.3)
const MAIN_PADDING_X = 26
const MAIN_PADDING_Y = 28
const CONTENT_WIDTH = RESUME_PAGE_WIDTH - SIDEBAR_WIDTH - MAIN_PADDING_X * 2
const USABLE_HEIGHT = RESUME_PAGE_HEIGHT - HEADER_HEIGHT - MAIN_PADDING_Y * 2
const BLOCK_GAP = 20






 
export function useExecutiveTimelineDocument(data: ResumeData) {
  const { personal, education, experience, projects, skills, achievements, additional } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'
  const skillGroups = groupSkills(skills)

  const header = (
    <header className="flex shrink-0 items-center gap-5 text-white" style={{ backgroundColor: DARK, height: HEADER_HEIGHT, paddingInline: 28 }}>
      {personal.photo ? (
        
        <Image src={personal.photo} alt="" width={80} height={80} className="size-20 shrink-0 rounded-full object-cover ring-4 ring-white/20" />
      ) : (
        <div className="size-20 shrink-0 rounded-full bg-white/10" />
      )}
      <div>
        <p className="text-[26px] leading-tight font-extrabold tracking-wide uppercase">{fullName}</p>
        {personal.headline && <p className="mt-1.5 text-[13.5px] tracking-widest text-white/75 uppercase">{personal.headline}</p>}
      </div>
    </header>
  )

  const sidebar = (
    <aside className="flex shrink-0 flex-col gap-4" style={{ width: SIDEBAR_WIDTH, backgroundColor: SIDEBAR, paddingInline: 18, paddingBlock: 24 }}>
      <div>
        <p className="text-[11px] font-bold tracking-[0.15em] text-neutral-500 uppercase">Contact</p>
        <div className="mt-2 flex flex-col gap-2">
          {personal.phone && <ContactRow icon={Phone}>{personal.phone}</ContactRow>}
          {personal.email && <ContactRow icon={Mail}>{personal.email}</ContactRow>}
          {personal.location && <ContactRow icon={MapPin}>{personal.location}</ContactRow>}
        </div>
      </div>

      {skillGroups.length > 0 && (
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-neutral-500 uppercase">Skills</p>
          <div className="mt-2 flex flex-col gap-1">
            {skillGroups.flatMap((group) => group.items).map((item) => (
              <p key={item} className="text-[12.5px] text-neutral-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}

      {additional.languages.length > 0 && (
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-neutral-500 uppercase">Languages</p>
          <div className="mt-2 flex flex-col gap-1">
            {additional.languages.map((language) => (
              <p key={language} className="text-[12.5px] text-neutral-700">
                {language}
              </p>
            ))}
          </div>
        </div>
      )}

      {(additional.extracurricular.length > 0 || additional.volunteer.length > 0 || additional.interests.length > 0) && (
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-neutral-500 uppercase">Additional</p>
          <div className="mt-2 flex flex-col gap-1 text-[12.5px] text-neutral-700">
            {[...additional.extracurricular, ...additional.volunteer, ...additional.interests].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      )}
    </aside>
  )

  const sections: ResumeSection[] = []
  if (personal.summary) {
    sections.push({ id: 'profile', heading: null, items: [<TimelineItem key="profile" icon={User} title="Profile"><p className="text-[13.5px]">{personal.summary}</p></TimelineItem>] })
  }
  if (experience.length > 0) {
    sections.push({
      id: 'experience',
      heading: null,
      items: experience.map((entry, index) => (
        <TimelineItem key={entry.id} icon={Briefcase} title={index === 0 ? 'Work Experience' : undefined}>
          <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
            <p className="font-semibold text-neutral-900">{entry.role}</p>
            <p className="shrink-0 text-[11.5px] text-neutral-500">
              {entry.startDate}–{entry.current ? 'Present' : entry.endDate}
            </p>
          </div>
          <p className="text-[11.5px] text-neutral-500">{entry.organization}</p>
          {entry.description && <p className="mt-1 text-[13.5px]">{entry.description}</p>}
        </TimelineItem>
      )),
    })
  }
  if (projects.length > 0) {
    sections.push({
      id: 'projects',
      heading: null,
      items: projects.map((entry, index) => (
        <TimelineItem key={entry.id} icon={Briefcase} title={index === 0 ? 'Projects' : undefined}>
          <p className="text-[13.5px] font-semibold text-neutral-900">
            {entry.name}
            {entry.role ? ` — ${entry.role}` : ''}
          </p>
          {entry.technologies.length > 0 && <p className="text-[11.5px] text-neutral-500">{entry.technologies.join(', ')}</p>}
          <p className="mt-1 text-[13.5px]">{entry.description}</p>
        </TimelineItem>
      )),
    })
  }
  if (education.length > 0) {
    sections.push({
      id: 'education',
      heading: null,
      items: education.map((entry, index) => (
        <TimelineItem key={entry.id} icon={GraduationCap} title={index === 0 ? 'Education' : undefined}>
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-[13.5px] font-semibold text-neutral-900">
                {entry.degree}
                {entry.specialization ? `, ${entry.specialization}` : ''}
              </p>
              <p className="text-[12px] text-neutral-600">
                {entry.institute}
                {entry.grade ? ` — ${entry.grade}` : ''}
              </p>
            </div>
            <p className="shrink-0 text-[11.5px] text-neutral-500">
              {entry.startYear}–{entry.endYear}
            </p>
          </div>
        </TimelineItem>
      )),
    })
  }
  if (achievements.length > 0) {
    sections.push({
      id: 'achievements',
      heading: null,
      items: achievements.map((entry, index) => (
        <TimelineItem key={entry.id} icon={Briefcase} title={index === 0 ? 'Achievements & Certifications' : undefined}>
          <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
            <p>
              <span className="font-semibold text-neutral-900">{entry.title}</span>
              {entry.issuer ? ` — ${entry.issuer}` : ''}
            </p>
            {entry.date && <p className="shrink-0 text-[11.5px] text-neutral-500">{entry.date}</p>}
          </div>
        </TimelineItem>
      )),
    })
  }

  
  
  
  
  
  const blocks = useMemo(() => buildBlocksFromSections(sections), [data])
  const { pages, measureNode } = usePagedBlocks(blocks, { width: CONTENT_WIDTH, usableHeight: USABLE_HEIGHT, gap: BLOCK_GAP })

  const pageNodes = pages.map((pageBlocks, index) => (
    <div key={index} className="flex min-h-full flex-col font-sans text-neutral-800">
      {header}
      <div className="flex flex-1">
        {sidebar}
        <main className="relative min-w-0 flex-1 break-words" style={{ paddingInline: MAIN_PADDING_X, paddingBlock: MAIN_PADDING_Y }}>
          {pageBlocks.length > 1 && <div className="absolute top-8 bottom-8 w-px bg-neutral-300" style={{ left: MAIN_PADDING_X + 13 }} />}
          <div className="relative flex flex-col" style={{ gap: BLOCK_GAP }}>
            {pageBlocks.map((block) => (
              <div key={block.id}>{block.node}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  ))

  return { pages: pageNodes, pageCount: pages.length, measureNode }
}

function TimelineItem({ icon: Icon, title, children }: { icon: typeof User; title?: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-9">
      <span className="absolute top-0 left-0 flex size-7 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: DARK }}>
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      {title && <p className="text-[13px] font-bold tracking-wide text-neutral-900 uppercase">{title}</p>}
      <div className={title ? 'mt-1.5' : ''}>{children}</div>
    </div>
  )
}

function ContactRow({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[12.5px] text-neutral-700">
      <Icon className="size-3.5 shrink-0 text-neutral-500" aria-hidden="true" />
      <span className="break-all">{children}</span>
    </p>
  )
}
