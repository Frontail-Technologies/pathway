import { useMemo } from 'react'
import type { ResumeData } from '../../data/types'
import { RESUME_PAGE_HEIGHT, RESUME_PAGE_WIDTH } from '../../data/page-size'
import { usePagedBlocks } from '../../hooks/use-paged-blocks'
import { buildBlocksFromSections, type ResumeSection } from '../../lib/build-blocks'

const PAGE_PADDING = 44
const CONTENT_WIDTH = RESUME_PAGE_WIDTH - PAGE_PADDING * 2
const USABLE_HEIGHT = RESUME_PAGE_HEIGHT - PAGE_PADDING * 2
const BLOCK_GAP = 18

export function groupSkills(skills: ResumeData['skills']) {
  const order: ResumeData['skills'][number]['group'][] = ['Technical Skills', 'Tools', 'Soft Skills']
  return order
    .map((group) => ({ group, items: skills.filter((skill) => skill.group === group).map((skill) => skill.label) }))
    .filter((group) => group.items.length > 0)
}






 
export function useClassicAtsDocument(data: ResumeData) {
  const { personal, education, experience, projects, skills, achievements, additional } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'
  const contactLine = [personal.location, personal.email, personal.phone].filter(Boolean).join('   |   ')
  const linkLine = [personal.linkedin, personal.portfolio, personal.github].filter(Boolean).join('   |   ')
  const skillGroups = groupSkills(skills)

  const headerBlock = (
    <div className="border-b-2 border-neutral-900 pb-3 text-center">
      <p className="text-[30px] leading-tight font-bold tracking-wide uppercase">{fullName}</p>
      {personal.headline && <p className="mt-1 text-[15px] text-neutral-700">{personal.headline}</p>}
      {contactLine && <p className="mt-2 text-[12px] text-neutral-600">{contactLine}</p>}
      {linkLine && <p className="text-[12px] text-neutral-600">{linkLine}</p>}
    </div>
  )

  const sections: ResumeSection[] = []

  if (personal.summary) {
    sections.push({ id: 'summary', heading: <SectionTitle>Summary</SectionTitle>, items: [<p key="summary">{personal.summary}</p>] })
  }

  if (education.length > 0) {
    sections.push({
      id: 'education',
      heading: <SectionTitle>Education</SectionTitle>,
      items: education.map((entry) => (
        <div key={entry.id}>
          <div className="flex items-baseline justify-between font-semibold">
            <span>{entry.institute}</span>
            <span className="text-[12px] font-normal text-neutral-600">
              {entry.startYear} – {entry.endYear}
            </span>
          </div>
          <p className="mt-0.5">
            {entry.degree}
            {entry.specialization ? `, ${entry.specialization}` : ''}
            {entry.grade ? ` — ${entry.grade}` : ''}
          </p>
        </div>
      )),
    })
  }

  if (experience.length > 0) {
    sections.push({
      id: 'experience',
      heading: <SectionTitle>Experience</SectionTitle>,
      items: experience.map((entry) => (
        <div key={entry.id}>
          <div className="flex items-baseline justify-between font-semibold">
            <span>
              {entry.role}, {entry.organization}
            </span>
            <span className="text-[12px] font-normal text-neutral-600">
              {entry.startDate} – {entry.current ? 'Present' : entry.endDate}
            </span>
          </div>
          <p className="text-[12px] text-neutral-600">{entry.type}</p>
          {entry.description && <p className="mt-0.5">{entry.description}</p>}
        </div>
      )),
    })
  }

  if (projects.length > 0) {
    sections.push({
      id: 'projects',
      heading: <SectionTitle>Projects</SectionTitle>,
      items: projects.map((entry) => (
        <div key={entry.id}>
          <p className="font-semibold">
            {entry.name}
            {entry.role ? ` — ${entry.role}` : ''}
          </p>
          {entry.technologies.length > 0 && <p className="text-[12px] text-neutral-600">{entry.technologies.join(', ')}</p>}
          <p className="mt-0.5">{entry.description}</p>
        </div>
      )),
    })
  }

  if (skillGroups.length > 0) {
    sections.push({
      id: 'skills',
      heading: <SectionTitle>Skills</SectionTitle>,
      items: [
        <div key="skills" className="flex flex-col gap-1">
          {skillGroups.map((group) => (
            <p key={group.group}>
              <span className="font-semibold">{group.group}: </span>
              {group.items.join(', ')}
            </p>
          ))}
        </div>,
      ],
    })
  }

  if (achievements.length > 0) {
    sections.push({
      id: 'achievements',
      heading: <SectionTitle>Achievements &amp; Certifications</SectionTitle>,
      items: achievements.map((entry) => (
        <div key={entry.id}>
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">{entry.title}</span>
            {entry.date && <span className="text-[12px] text-neutral-600">{entry.date}</span>}
          </div>
          {entry.issuer && <p className="text-[12px] text-neutral-600">{entry.issuer}</p>}
        </div>
      )),
    })
  }

  const hasAdditional = additional.languages.length > 0 || additional.extracurricular.length > 0 || additional.volunteer.length > 0 || additional.interests.length > 0
  if (hasAdditional) {
    sections.push({
      id: 'additional',
      heading: <SectionTitle>Additional Information</SectionTitle>,
      items: [
        <div key="additional" className="flex flex-col gap-1">
          {additional.languages.length > 0 && (
            <p>
              <span className="font-semibold">Languages: </span>
              {additional.languages.join(', ')}
            </p>
          )}
          {additional.extracurricular.length > 0 && (
            <p>
              <span className="font-semibold">Extracurricular: </span>
              {additional.extracurricular.join(', ')}
            </p>
          )}
          {additional.volunteer.length > 0 && (
            <p>
              <span className="font-semibold">Volunteer Work: </span>
              {additional.volunteer.join(', ')}
            </p>
          )}
          {additional.interests.length > 0 && (
            <p>
              <span className="font-semibold">Interests: </span>
              {additional.interests.join(', ')}
            </p>
          )}
        </div>,
      ],
    })
  }

  
  
  
  
  
  const blocks = useMemo(() => [{ id: 'header', node: headerBlock }, ...buildBlocksFromSections(sections)], [data])
  const { pages, measureNode } = usePagedBlocks(blocks, { width: CONTENT_WIDTH, usableHeight: USABLE_HEIGHT, gap: BLOCK_GAP })

  const pageNodes = pages.map((pageBlocks, index) => (
    <div key={index} className="min-h-full font-sans break-words text-[13.5px] leading-snug text-neutral-900" style={{ padding: PAGE_PADDING }}>
      <div className="flex flex-col" style={{ gap: BLOCK_GAP }}>
        {pageBlocks.map((block) => (
          <div key={block.id}>{block.node}</div>
        ))}
      </div>
    </div>
  ))

  return { pages: pageNodes, pageCount: pages.length, measureNode }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="border-b border-neutral-400 pb-1 text-[15px] font-bold tracking-wide uppercase">{children}</p>
}
