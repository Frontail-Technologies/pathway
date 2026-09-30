import { useMemo } from 'react'
import { Globe, Link2, Mail, MapPin, Phone } from 'lucide-react'
import type { ResumeData } from '../../data/types'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../../data/page-size'
import { usePagedBlocks } from '../../hooks/use-paged-blocks'
import { buildBlocksFromSections, type ResumeSection } from '../../lib/build-blocks'
import { groupSkills } from './resume-template-classic'

const ACCENT = '#2F5D50'
const SIDEBAR_WIDTH = Math.round(RESUME_PAGE_WIDTH * 0.32)
const MAIN_PADDING_X = 26
const MAIN_PADDING_Y = 30
const CONTENT_WIDTH = RESUME_PAGE_WIDTH - SIDEBAR_WIDTH - MAIN_PADDING_X * 2
const USABLE_HEIGHT = RESUME_PAGE_HEIGHT - MAIN_PADDING_Y * 2
const BLOCK_GAP = 18








 
export function useModernSidebarDocument(data: ResumeData) {
  const { personal, education, experience, projects, skills, achievements, additional } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'
  const skillGroups = groupSkills(skills)

  const sidebar = (
    <aside className="flex shrink-0 flex-col gap-4 border-r-4 py-7" style={{ width: SIDEBAR_WIDTH, borderColor: ACCENT, paddingInline: 18 }}>
      {personal.photo ? (
        
        <img src={personal.photo} alt="" className="size-20 self-center rounded-full object-cover" />
      ) : (
        <div className="size-20 self-center rounded-full" style={{ backgroundColor: `${ACCENT}1a` }} />
      )}

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>
          Contact
        </p>
        {personal.email && <ContactRow icon={Mail}>{personal.email}</ContactRow>}
        {personal.phone && <ContactRow icon={Phone}>{personal.phone}</ContactRow>}
        {personal.location && <ContactRow icon={MapPin}>{personal.location}</ContactRow>}
        {personal.linkedin && <ContactRow icon={Link2}>{personal.linkedin}</ContactRow>}
        {personal.portfolio && <ContactRow icon={Globe}>{personal.portfolio}</ContactRow>}
      </div>

      {education.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>
            Education
          </p>
          <div className="flex flex-col gap-2.5">
            {education.map((entry) => (
              <div key={entry.id}>
                <p className="text-[13px] font-semibold text-neutral-900">{entry.degree}</p>
                <p className="text-[12.5px] text-neutral-600">{entry.institute}</p>
                <p className="text-[11.5px] text-neutral-500">
                  {entry.startYear}–{entry.endYear}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skillGroups.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>
            Skills
          </p>
          <div className="flex flex-col gap-1">
            {skillGroups.flatMap((group) => group.items).map((item) => (
              <p key={item} className="text-[12.5px] text-neutral-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}

      {additional.languages.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>
            Languages
          </p>
          <div className="flex flex-col gap-1">
            {additional.languages.map((language) => (
              <p key={language} className="text-[12.5px] text-neutral-700">
                {language}
              </p>
            ))}
          </div>
        </div>
      )}
    </aside>
  )

  const headerBlock = (
    <div>
      <p className="text-[28px] leading-tight font-bold text-neutral-900">{fullName}</p>
      {personal.headline && (
        <p className="mt-1 text-[14.5px] font-medium" style={{ color: ACCENT }}>
          {personal.headline}
        </p>
      )}
    </div>
  )

  const sections: ResumeSection[] = []

  if (personal.summary) {
    sections.push({ id: 'about', heading: <SectionTitle>About Me</SectionTitle>, items: [<p key="summary" className="text-[13.5px]">{personal.summary}</p>] })
  }

  if (experience.length > 0) {
    sections.push({
      id: 'experience',
      heading: <SectionTitle>Experience</SectionTitle>,
      items: experience.map((entry) => (
        <div key={entry.id} className="text-[13.5px]">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-semibold text-neutral-900">{entry.role}</p>
            <p className="shrink-0 text-[11.5px] text-neutral-500">
              {entry.startDate}–{entry.current ? 'Present' : entry.endDate}
            </p>
          </div>
          <p className="text-[11.5px] text-neutral-500">{entry.organization}</p>
          {entry.description && <p className="mt-1">{entry.description}</p>}
        </div>
      )),
    })
  }

  if (projects.length > 0) {
    sections.push({
      id: 'projects',
      heading: <SectionTitle>Projects</SectionTitle>,
      items: projects.map((entry) => (
        <div key={entry.id} className="text-[13.5px]">
          <p className="font-semibold text-neutral-900">
            {entry.name}
            {entry.role ? ` — ${entry.role}` : ''}
          </p>
          {entry.technologies.length > 0 && <p className="text-[11.5px] text-neutral-500">{entry.technologies.join(', ')}</p>}
          <p className="mt-1">{entry.description}</p>
        </div>
      )),
    })
  }

  if (achievements.length > 0) {
    sections.push({
      id: 'achievements',
      heading: <SectionTitle>Achievements &amp; Certifications</SectionTitle>,
      items: achievements.map((entry) => (
        <div key={entry.id} className="flex items-baseline justify-between gap-3 text-[13.5px]">
          <p>
            <span className="font-semibold text-neutral-900">{entry.title}</span>
            {entry.issuer ? ` — ${entry.issuer}` : ''}
          </p>
          {entry.date && <p className="shrink-0 text-[11.5px] text-neutral-500">{entry.date}</p>}
        </div>
      )),
    })
  }

  
  const blocks = useMemo(() => [{ id: 'header', node: headerBlock }, ...buildBlocksFromSections(sections)], [data])
  const { pages, measureNode } = usePagedBlocks(blocks, { width: CONTENT_WIDTH, usableHeight: USABLE_HEIGHT, gap: BLOCK_GAP })

  
  
  
  const sidebarSpacer = <aside aria-hidden="true" className="shrink-0" style={{ width: SIDEBAR_WIDTH }} />

  const pageNodes = pages.map((pageBlocks, index) => (
    <div key={index} className="flex min-h-full font-sans text-neutral-800">
      {index === 0 ? sidebar : sidebarSpacer}
      <main className="flex-1 overflow-hidden break-words" style={{ paddingInline: MAIN_PADDING_X, paddingBlock: MAIN_PADDING_Y }}>
        <div className="flex flex-col" style={{ gap: BLOCK_GAP }}>
          {pageBlocks.map((block) => (
            <div key={block.id}>{block.node}</div>
          ))}
        </div>
      </main>
    </div>
  ))

  return { pages: pageNodes, pageCount: pages.length, measureNode }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[14px] font-bold tracking-wide uppercase" style={{ color: ACCENT }}>
        {children}
      </p>
      <div className="mt-1 h-px w-full" style={{ backgroundColor: `${ACCENT}33` }} />
    </div>
  )
}

function ContactRow({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[12.5px] text-neutral-700">
      <Icon className="size-3.5 shrink-0" style={{ color: ACCENT }} aria-hidden="true" />
      <span className="break-all">{children}</span>
    </p>
  )
}
