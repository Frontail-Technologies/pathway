


export type Dimension = 'Analytical' | 'Creative' | 'Social' | 'Practical' | 'Organising' | 'Enterprising'
export const dimensions: Dimension[] = ['Analytical', 'Creative', 'Social', 'Practical', 'Organising', 'Enterprising']

export type Likert = 1 | 2 | 3 | 4 | 5
export const likertLabels: Record<Likert, string> = { 1: 'Strongly dislike', 2: 'Dislike', 3: 'Neutral', 4: 'Like', 5: 'Strongly like' }

export type InterestQuestion = { id: string; dimension: Dimension; text: string }


export const interestQuestions: InterestQuestion[] = [
  { id: 'i1', dimension: 'Analytical', text: 'Solving technical or logical problems step by step' },
  { id: 'i2', dimension: 'Social', text: 'Working with people and understanding what they need' },
  { id: 'i3', dimension: 'Creative', text: 'Creating or designing something new' },
  { id: 'i4', dimension: 'Practical', text: 'Building, fixing or making things with my hands' },
  { id: 'i5', dimension: 'Organising', text: 'Planning schedules and keeping things organised' },
  { id: 'i6', dimension: 'Enterprising', text: 'Leading a team or a project toward a goal' },
  { id: 'i7', dimension: 'Analytical', text: 'Analysing information to find patterns or answers' },
  { id: 'i8', dimension: 'Social', text: 'Helping or supporting others when they face a challenge' },
  { id: 'i9', dimension: 'Creative', text: 'Expressing ideas through writing, visuals or media' },
  { id: 'i10', dimension: 'Practical', text: 'Working with tools, equipment or in a lab or workshop' },
  { id: 'i11', dimension: 'Organising', text: 'Coordinating tasks so that everything runs smoothly' },
  { id: 'i12', dimension: 'Enterprising', text: 'Persuading others or starting something of my own' },
]
export const INTEREST_PAGE_SIZE = 4

export type WorkStyleQuestion = { id: string; prompt: string; options: [{ label: string; dimension: Dimension }, { label: string; dimension: Dimension }] }


export const workStyleQuestions: WorkStyleQuestion[] = [
  { id: 'w1', prompt: 'When I work on something, I usually prefer to…', options: [{ label: 'Work independently and focus deeply', dimension: 'Analytical' }, { label: 'Collaborate and bounce ideas around with others', dimension: 'Social' }] },
  { id: 'w2', prompt: 'I am more comfortable when the task is…', options: [{ label: 'Clearly structured with defined steps', dimension: 'Organising' }, { label: 'Open-ended, so I can explore my own approach', dimension: 'Creative' }] },
  { id: 'w3', prompt: 'I tend to enjoy work that involves…', options: [{ label: 'Practical, hands-on tasks with visible results', dimension: 'Practical' }, { label: 'Ideas, concepts and how things work', dimension: 'Analytical' }] },
  { id: 'w4', prompt: 'In a group, I naturally…', options: [{ label: 'Take the lead and make decisions', dimension: 'Enterprising' }, { label: 'Support the plan and help it get done', dimension: 'Organising' }] },
]


export const studyLevels = ['Class 9–10', 'Class 11–12', 'Undergraduate', 'Postgraduate']

export const studyAreas = ['Science', 'Commerce', 'Arts & Humanities', 'Engineering', 'Medical', 'Management', 'Law', 'Design', 'Not sure yet']
export const exploringOptions = ['Career options', 'College / course direction', 'My strengths', 'My interests', 'Not sure yet']

export type PsychometricDraft = {
  studyLevel: string
  studyArea: string
  exploring: string[]
  interests: Partial<Record<string, Likert>>
  workStyle: Partial<Record<string, Dimension>>
}

export const emptyPsychometricDraft: PsychometricDraft = { studyLevel: '', studyArea: '', exploring: [], interests: {}, workStyle: {} }







const WORK_STYLE_POINTS = 2

export type DimensionScore = { dimension: Dimension; points: number; max: number; strength: number }

export function scoreDraft(draft: PsychometricDraft): DimensionScore[] {
  return dimensions
    .map((dimension) => {
      const interest = interestQuestions.filter((q) => q.dimension === dimension)
      const interestPoints = interest.reduce((sum, q) => sum + (draft.interests[q.id] ?? 0), 0)
      const workOpportunities = workStyleQuestions.filter((q) => q.options.some((option) => option.dimension === dimension)).length
      const workPoints = workStyleQuestions.reduce((sum, q) => sum + (draft.workStyle[q.id] === dimension ? WORK_STYLE_POINTS : 0), 0)
      const max = interest.length * 5 + workOpportunities * WORK_STYLE_POINTS
      const points = interestPoints + workPoints
      return { dimension, points, max, strength: max === 0 ? 0 : points / max }
    })
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score.strength - a.score.strength || a.index - b.index)
    .map(({ score }) => score)
}

export function topDimensions(draft: PsychometricDraft, count = 3): DimensionScore[] {
  return scoreDraft(draft).slice(0, count)
}


export function isAboutYouComplete(draft: PsychometricDraft) {
  return Boolean(draft.studyLevel && draft.studyArea && draft.exploring.length > 0)
}
export function interestPageQuestions(page: number) {
  return interestQuestions.slice(page * INTEREST_PAGE_SIZE, (page + 1) * INTEREST_PAGE_SIZE)
}
export const INTEREST_PAGES = Math.ceil(interestQuestions.length / INTEREST_PAGE_SIZE)
export function unansweredInterestIds(draft: PsychometricDraft, page: number) {
  return interestPageQuestions(page).filter((q) => !draft.interests[q.id]).map((q) => q.id)
}
export function unansweredWorkStyleIds(draft: PsychometricDraft) {
  return workStyleQuestions.filter((q) => !draft.workStyle[q.id]).map((q) => q.id)
}


export type ExploreArea = { label: string;   stream?: string }

export type DimensionInfo = { summary: string; environments: string; areas: ExploreArea[] }

export const dimensionInfo: Record<Dimension, DimensionInfo> = {
  Analytical: {
    summary: 'solving problems, analysing information and understanding how things work',
    environments: 'that involve data, logic, research or technical problem-solving',
    areas: [{ label: 'Engineering', stream: 'engineering' }, { label: 'Data & analytics' }, { label: 'Research', stream: 'science' }, { label: 'Finance', stream: 'commerce' }],
  },
  Creative: {
    summary: 'creating, designing and expressing new ideas',
    environments: 'with room for original ideas, design thinking and open-ended projects',
    areas: [{ label: 'Design', stream: 'design' }, { label: 'Media' }, { label: 'Architecture' }, { label: 'Content' }],
  },
  Social: {
    summary: 'working with people, supporting others and communicating',
    environments: 'where you collaborate with people and help them make progress',
    areas: [{ label: 'Counselling' }, { label: 'Teaching' }, { label: 'HR' }, { label: 'Healthcare support', stream: 'medical' }],
  },
  Practical: {
    summary: 'hands-on work, tools and seeing tangible results',
    environments: 'that are hands-on, technical and focused on building or fixing things',
    areas: [{ label: 'Engineering', stream: 'engineering' }, { label: 'Operations' }, { label: 'Technical trades' }, { label: 'Lab / workshop environments', stream: 'science' }],
  },
  Organising: {
    summary: 'planning, coordinating and keeping things running smoothly',
    environments: 'with clear structure, coordination and attention to detail',
    areas: [{ label: 'Operations' }, { label: 'Administration' }, { label: 'Project coordination' }, { label: 'Finance', stream: 'commerce' }],
  },
  Enterprising: {
    summary: 'leading, persuading and turning ideas into action',
    environments: 'where you lead, influence decisions or build something of your own',
    areas: [{ label: 'Business', stream: 'management' }, { label: 'Management', stream: 'management' }, { label: 'Marketing', stream: 'management' }, { label: 'Entrepreneurship' }],
  },
}
