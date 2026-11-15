import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'

export type ArticleType = 'article' | 'guide' | 'news' | 'explainer'

export type Article = {
  slug: string
  type: ArticleType
  title: string
  excerpt: string | null
  category: string | null
  tags: string[]
  authorName: string | null
  heroImageUrl: string | null
  publishedAt: string | null
  readingMinutes: number
}

export type ArticleDetail = Article & { body: string; updatedAt: string; related: Article[] }

export type OfficialNotice = {
  title: string
  docType: string
  academicSession: string | null
  url: string
  owner: { kind: 'exam' | 'scholarship'; slug: string; name: string }
  addedAt: string
}

export const articleTypeLabel: Record<ArticleType, string> = { article: 'Article', guide: 'Guide', news: 'News', explainer: 'Explainer' }

export const categoryLabel: Record<string, string> = {
  admissions: 'Admissions',
  exams: 'Exams',
  colleges: 'Colleges',
  courses: 'Courses',
  careers: 'Careers',
  study_abroad: 'Study abroad',
  scholarships: 'Scholarships',
  general: 'General',
}

export const noticeTypeLabel: Record<string, string> = {
  notification: 'Notice',
  information_bulletin: 'Information bulletin',
  syllabus: 'Syllabus',
  guidelines: 'Guidelines',
  brochure: 'Brochure',
  other: 'Document',
}

export const listArticles = (query: CatalogQuery) => catalogList<Article, Article>('/articles', query, (item) => item)

export const getArticle = cache(async (slug: string): Promise<ArticleDetail | undefined> => {
  try {
    return await catalogGet<ArticleDetail>(`/articles/${seg(slug)}`)
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})

export const listNotices = cache(async (limit = 8): Promise<OfficialNotice[]> => catalogGet<OfficialNotice[]>('/notices', { limit: String(limit) }).catch(() => []))

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })

export const formatArticleDate = (value: string | null) => (value ? dateFormat.format(new Date(value)) : '')
