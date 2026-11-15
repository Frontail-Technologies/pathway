import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SourceNote } from '@/components/shared/source-note'
import { listArticles, listNotices } from '@/features/content/api/content-api'
import { ArticleCard, ArticleFeature } from '@/features/content/components/article-card'
import { NoticeList } from '@/features/content/components/notice-list'
import { SpotArt } from '@/components/shared/spot-art'
import { HomeSectionHeading } from './home-section-heading'

export async function UpdatesSection() {
  const [articles, notices] = await Promise.all([
    listArticles({ limit: '4' })
      .then((list) => list.items)
      .catch(() => []),
    listNotices(8),
  ])
  if (!articles.length && !notices.length) return null
  const [feature, ...rest] = articles

  return (
    <section aria-labelledby="updates-title" className="bg-muted/60 py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="updates-title" className="sr-only">
          News and updates
        </span>
        <HomeSectionHeading
          eyebrow="News & updates"
          title={articles.length ? 'Articles, guides and official updates' : 'Latest official updates'}
          subtitle={articles.length ? 'Explainers from our team, and the newest notices from exam and scholarship bodies' : 'The newest notices and guidelines from exam and scholarship bodies'}
          href={articles.length ? '/articles' : undefined}
          linkLabel={articles.length ? 'All articles' : undefined}
        />

        <div className={articles.length ? 'mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]' : 'mt-6'}>
          {feature ? (
            <div className="flex flex-col gap-4">
              <ArticleFeature article={feature} />
              {rest.length ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {notices.length ? (
            <aside aria-label="Official notices" className="rounded-2xl border bg-card p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
                  <SpotArt name="sources" className="size-9 rounded-lg" />
                  Official notices
                </p>
                <Link href="/exams" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  All exams
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <NoticeList notices={articles.length ? notices.slice(0, 6) : notices} className={articles.length ? 'mt-1' : 'mt-1 grid md:grid-cols-2 md:gap-x-8 md:divide-y-0 [&>li]:border-b'} />
              <SourceNote className="mt-3" source="NTA, AICTE and NSP" note="Opens the official PDF" />
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  )
}
