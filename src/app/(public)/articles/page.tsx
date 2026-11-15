import type { Metadata } from 'next'
import Link from 'next/link'
import { Illustration } from '@/components/shared/illustration'
import { MarketingHero } from '@/components/shared/landing'
import { HeroScene } from '@/components/shared/landing-art'
import { SpotArt } from '@/components/shared/spot-art'
import { listArticles, listNotices, type ArticleType } from '@/features/content/api/content-api'
import { ArticleCard, ArticleFeature } from '@/features/content/components/article-card'
import { NoticeList } from '@/features/content/components/notice-list'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Articles, Guides and Education News',
  description: 'Guides and explainers on admissions, exams, rankings and scholarships, with the latest official notices.',
  alternates: { canonical: '/articles' },
}

const tabs: { value: ArticleType | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'guide', label: 'Guides' },
  { value: 'explainer', label: 'Explainers' },
  { value: 'news', label: 'News' },
  { value: 'article', label: 'Articles' },
]

type Props = { searchParams: Promise<{ type?: string }> }

export default async function ArticlesPage({ searchParams }: Props) {
  const { type } = await searchParams
  const active = tabs.find((tab) => tab.value === type)?.value ?? ''
  const [list, notices] = await Promise.all([listArticles({ limit: '24', ...(active ? { type: active } : {}) }).catch(() => null), listNotices(10)])
  const articles = list?.items ?? []
  const [feature, ...rest] = articles
  const total = list?.page.total ?? articles.length

  return (
    <div className="bg-muted/50 pb-24 lg:pb-14">
      <MarketingHero
        trail={['Home', 'Articles']}
        title="Articles, guides and news"
        description="Plain-language guides on admissions, exams, rankings and scholarships, written from official sources, plus the newest official notices."
        stats={[
          ...(total ? [{ label: active ? tabs.find((tab) => tab.value === active)!.label : 'Articles and guides', value: String(total) }] : []),
          ...(notices.length ? [{ label: 'Latest official notices', value: String(notices.length) }] : []),
        ]}
        aside={<HeroScene name="news" className="hidden lg:block" />}
      />

      <div className="container-shell pt-5 sm:pt-6">
        <nav aria-label="Article types" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.value ? `/articles?type=${tab.value}` : '/articles'}
              aria-current={active === tab.value ? 'page' : undefined}
              className={cn(
                'inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                active === tab.value ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
          <div className="min-w-0">
            {feature ? (
              <div className="flex flex-col gap-5">
                <ArticleFeature article={feature} />
                {rest.length ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {rest.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-14 text-center">
                <Illustration name="noArticles" width={190} />
                <p className="font-heading text-lg font-bold text-foreground">No {active ? tabs.find((tab) => tab.value === active)?.label.toLowerCase() : 'articles'} published yet</p>
                <p className="max-w-md text-sm text-muted-foreground">New guides on admissions, cutoffs and scholarships are on the way. The latest official notices are listed alongside.</p>
              </div>
            )}
          </div>

          {notices.length ? (
            <aside aria-labelledby="notices-title" className="rounded-2xl border bg-card p-4 sm:p-5 lg:sticky lg:top-header-gap">
              <div className="flex items-center gap-3 border-b pb-3">
                <SpotArt name="sources" className="size-11" />
                <div>
                  <h2 id="notices-title" className="font-heading text-base font-bold text-foreground">
                    Official notices
                  </h2>
                  <p className="text-xs text-muted-foreground">From exam and scholarship bodies</p>
                </div>
              </div>
              <NoticeList notices={notices} />
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
