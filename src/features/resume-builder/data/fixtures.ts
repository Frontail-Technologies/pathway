import type { ResumeData } from './types'
import { makeEntryId } from './id'

 
export function createEmptyResume(): ResumeData {
  return {
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      headline: '',
      linkedin: '',
      portfolio: '',
      github: '',
      summary: '',
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    additional: { languages: [], extracurricular: [], volunteer: [], interests: [] },
  }
}

 
export function createSampleResume(): ResumeData {
  return {
    personal: {
      firstName: 'Aarav',
      lastName: 'Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98765 43210',
      location: 'Pune, Maharashtra',
      headline: 'B.Tech Computer Science Student',
      linkedin: 'linkedin.com/in/aarav-mehta',
      portfolio: 'aaravmehta.dev',
      github: 'github.com/aaravmehta',
      summary:
        'Final-year Computer Science student with a strong foundation in data structures, web development, and machine learning fundamentals. Looking for a software engineering internship where I can contribute to real products and keep learning.',
    },
    education: [
      {
        id: makeEntryId('edu'),
        institute: 'Pune Institute of Technology',
        degree: 'B.Tech, Computer Science & Engineering',
        specialization: 'Data Science',
        startYear: '2022',
        endYear: '2026',
        grade: '8.6 CGPA',
        location: 'Pune, Maharashtra',
      },
      {
        id: makeEntryId('edu'),
        institute: 'Delhi Public School',
        degree: 'Higher Secondary (XII), PCM',
        startYear: '2020',
        endYear: '2022',
        grade: '92%',
        location: 'Pune, Maharashtra',
      },
    ],
    experience: [
      {
        id: makeEntryId('exp'),
        organization: 'Nimbus Labs',
        role: 'Software Engineering Intern',
        type: 'Internship',
        startDate: 'May 2025',
        endDate: 'Jul 2025',
        current: false,
        description:
          'Built and shipped a customer-facing analytics dashboard feature used by 200+ internal users; fixed 15+ bugs across the React/Node codebase during the internship.',
      },
    ],
    projects: [
      {
        id: makeEntryId('proj'),
        name: 'CampusConnect',
        role: 'Full-stack Developer',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        description:
          'A campus events and clubs discovery app used by 300+ students at my college; built the event RSVP flow and the admin moderation panel.',
        link: 'campusconnect.example.com',
        githubLink: 'github.com/aaravmehta/campusconnect',
      },
      {
        id: makeEntryId('proj'),
        name: 'Resume Screener',
        role: 'ML Project (solo)',
        technologies: ['Python', 'scikit-learn', 'Flask'],
        description:
          'A course project that classifies resumes into broad skill categories using a simple TF-IDF + logistic regression pipeline, with a small Flask demo UI.',
        githubLink: 'github.com/aaravmehta/resume-screener',
      },
    ],
    skills: [
      { id: makeEntryId('skill'), label: 'Python', group: 'Technical Skills' },
      { id: makeEntryId('skill'), label: 'JavaScript', group: 'Technical Skills' },
      { id: makeEntryId('skill'), label: 'React', group: 'Technical Skills' },
      { id: makeEntryId('skill'), label: 'SQL', group: 'Technical Skills' },
      { id: makeEntryId('skill'), label: 'Git', group: 'Tools' },
      { id: makeEntryId('skill'), label: 'Figma', group: 'Tools' },
      { id: makeEntryId('skill'), label: 'Communication', group: 'Soft Skills' },
      { id: makeEntryId('skill'), label: 'Teamwork', group: 'Soft Skills' },
    ],
    achievements: [
      {
        id: makeEntryId('ach'),
        type: 'Certification',
        title: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2025',
      },
      {
        id: makeEntryId('ach'),
        type: 'Achievement',
        title: 'Finalist, Smart India Hackathon',
        issuer: 'Ministry of Education, Govt. of India',
        date: '2024',
        description: 'Built a working prototype for rural healthcare access as part of a 4-member team.',
      },
    ],
    additional: {
      languages: ['English', 'Hindi', 'Marathi'],
      extracurricular: ['Core member, College Coding Club'],
      volunteer: ['Weekend teaching volunteer, local NGO'],
      interests: ['Competitive programming', 'Chess', 'Football'],
    },
  }
}
