

 
export const LEGAL_LAST_UPDATED = 'September 2026'

export type LegalSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
   
  after?: string
}

export type LegalDocument = {
  slug: 'privacy' | 'terms' | 'disclaimer' | 'cookies'
  title: string
  intro: string
  sections: LegalSection[]
}

 
export const CONTACT_PARAGRAPH = 'If you have questions about this page, please contact us through the Pathway contact page.'
