import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { articleTypeLabel, categoryLabel, formatArticleDate, getArticle, type ArticleDetail } from '@/features/content/api/content-api'
import { ArticleCard } from '@/features/content/components/article-card'
import { MarkdownBody } from '@/features/content/components/markdown-body'
import { articleHeadings } from '@/features/content/lib/headings'

type Props = { params: Promise<{ slug: string }> }

type ToolLink = { label: string; text: string; href: string; art: SpotArtName; tags: string[]; categories: string[] }

const toolLinks: ToolLink[] = [
  { label: 'JoSAA cutoff explorer', text: 'Opening and closing ranks by branch', href: '/cutoffs', art: 'chart', tags: ['josaa', 'cutoffs', 'closing-rank', 'opening-rank', 'nit', 'iit'], categories: ['admissions'] },
  { label: 'College predictor', text: 'Colleges within reach of your rank', href: '/college-predictor', art: 'predictor', tags: ['josaa', 'jee-main', 'jee-advanced', 'counselling', 'cutoffs'], categories: ['admissions'] },
  { label: 'Rank predictor', text: 'Percentile to rank for JEE Main and NEET', href: '/rank-predictor', art: 'chart', tags: ['jee-main', 'neet-ug', 'neet'], categories: ['exams'] },
  { label: 'NIRF ranked colleges', text: 'Every ranked college with its NIRF rank', href: '/colleges?sort=ranking', art: 'trophy', tags: ['nirf', 'ranking', 'rankings'], categories: ['colleges'] },
  { label: 'Compare colleges', text: 'Fees, ranks and placements side by side', href: '/compare', art: 'compare', tags: ['nirf', 'placements'], categories: ['colleges'] },
  { label: 'Scholarships', text: 'Open schemes and their deadlines', href: '/scholarships', art: 'scholarship', tags: ['nsp', 'aicte', 'pragati', 'saksham', 'scholarship'], categories: ['scholarships'] },
  { label: 'Entrance exams', text: 'Exam pages with official notices', href: '/exams', art: 'exam', tags: ['jee-main', 'jee-advanced', 'neet-ug'], categories: ['exams'] },
]

function relatedTools(article: ArticleDetail) {
  return toolLinks
    .map((tool) => ({ tool, score: tool.tags.filter((tag) => article.tags.includes(tag)).length * 2 + (article.category && tool.categories.includes(article.category) ? 1 : 0) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ tool }) => tool)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: { type: 'article', title: article.title, description: article.excerpt ?? undefined, publishedTime: article.publishedAt ?? undefined, ...(article.heroImageUrl ? { images: [article.heroImageUrl] } : {}) },
  }
}

export default async function ArticleRoute({ params }: Props) {
  const article = await getArticle((await params).slug)
  if (!article) notFound()
  const updated = article.updatedAt && article.publishedAt && new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > 86_400_000
  const headings = articleHeadings(article.body)
  const tools = relatedTools(article)
  const initials = (article.authorName ?? 'P')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? undefined,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? undefined,
    author: article.authorName ? { '@type': 'Organization', name: article.authorName } : undefined,
  }

  return (
    <div className="bg-muted/50 pb-24 lg:pb-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="bg-primary text-primary-foreground">
        <div className="container-shell pt-5 pb-9 lg:pt-6 lg:pb-12">
          <div className="[&_a]:text-primary-foreground/80 [&_li]:text-primary-foreground/80 [&_span]:text-primary-foreground">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Articles', href: '/articles' }, article.title]} />
          </div>
          <div className="mt-6 max-w-3xl">
            <p className="flex flex-wrap gap-2 text-xs font-semibold">
              <Link href={`/articles?type=${article.type}`} className="rounded-md bg-cta px-2 py-1 text-white hover:bg-cta-hover">
                {articleTypeLabel[article.type]}
              </Link>
              {article.category ? <span className="rounded-md bg-primary-foreground/15 px-2 py-1">{categoryLabel[article.category] ?? article.category}</span> : null}
            </p>
            <h1 className="mt-3 font-heading text-[28px] leading-tight font-extrabold sm:text-[40px]">{article.title}</h1>
            {article.excerpt ? <p className="mt-3 text-base leading-7 text-primary-foreground/85 sm:text-lg">{article.excerpt}</p> : null}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/85">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">
                  {initials}
                </span>
                <span className="font-semibold text-primary-foreground">{article.authorName ?? 'Pathway'}</span>
              </span>
              {article.publishedAt ? <span>{formatArticleDate(article.publishedAt)}</span> : null}
              {updated ? <span>Updated {formatArticleDate(article.updatedAt)}</span> : null}
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {article.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell pt-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-8">
          <article className="min-w-0 rounded-2xl border bg-card px-5 py-6 sm:px-8 sm:py-8">
            {article.heroImageUrl ? (
              <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                <Image src={article.heroImageUrl} alt="" fill sizes="(min-width: 1024px) 48rem, 100vw" className="object-cover" priority unoptimized />
              </div>
            ) : null}
            <div className="max-w-3xl [&>div>h2:first-child]:mt-0">
              <MarkdownBody source={article.body} />
            </div>
            {article.tags.length ? (
              <div className="mt-8 flex flex-wrap gap-2 border-t pt-5">
                {article.tags.map((tag) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag.replace(/-/g, ' '))}`} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-header-gap">
            {headings.length > 1 ? (
              <nav aria-labelledby="toc-title" className="rounded-2xl border bg-card p-4 sm:p-5">
                <h2 id="toc-title" className="font-heading text-base font-bold text-foreground">
                  On this page
                </h2>
                <ol className="mt-3 flex flex-col gap-0.5 border-l-2">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-3 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            {tools.length ? (
              <section aria-labelledby="tools-title" className="rounded-2xl border bg-card p-4 sm:p-5">
                <h2 id="tools-title" className="font-heading text-base font-bold text-foreground">
                  Try it on Pathway
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {tools.map((tool) => (
                    <li key={tool.href}>
                      <Link href={tool.href} className="group flex items-center gap-3 rounded-xl border p-3 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                        <SpotArt name={tool.art} className="size-10 rounded-lg" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{tool.label}</span>
                          <span className="block text-xs text-muted-foreground">{tool.text}</span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="rounded-2xl bg-primary p-5 text-primary-foreground">
              <h2 className="font-heading text-base font-bold">Still unsure what to do next?</h2>
              <p className="mt-1 text-sm text-primary-foreground/85">Talk to a counsellor about exams, colleges and scholarships.</p>
              <Link href="/counselling" className="mt-4 inline-flex h-10 items-center gap-1 rounded-lg bg-cta px-4 text-sm font-semibold text-white hover:bg-cta-hover">
                Get free counselling
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </section>
          </aside>
        </div>

        {article.related.length ? (
          <section aria-labelledby="related-articles" className="mt-10">
            <h2 id="related-articles" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Keep reading
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {article.related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
