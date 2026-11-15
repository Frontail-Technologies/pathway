import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { ListingHeader } from '@/components/shared/listing/listing-header'
import { listArticles, listNotices, type ArticleType } from '@/features/content/api/content-api'
import { ArticleCard, ArticleFeature } from '@/features/content/components/article-card'
import { NoticeList } from '@/features/content/components/notice-list'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Articles, Guides and Education News',
  description: 'Guides and explainers on admissions, exams, rankings and scholarships, with the latest official notices.',
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
  const [articles, notices] = await Promise.all([
    listArticles({ limit: '24', ...(active ? { type: active } : {}) })
      .then((list) => list.items)
      .catch(() => []),
    listNotices(10),
  ])
  const [feature, ...rest] = articles

  return (
    <div className="bg-background pb-24 lg:pb-14">
      <ListingHeader breadcrumbs={[{ label: 'Home', href: '/' }, 'Articles']} title="Articles, guides and news" description="Clear explainers on admissions, exams, rankings and scholarships, plus the newest official notices." />
      <Container className="pt-5 sm:pt-6">
        <nav aria-label="Article types" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.value ? `/articles?type=${tab.value}` : '/articles'}
              aria-current={active === tab.value ? 'page' : undefined}
              className={cn(
                'inline-flex h-9 shrink-0 items-center rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors',
                active === tab.value ? 'border-primary bg-secondary text-secondary-foreground' : 'bg-card text-foreground hover:bg-muted',
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
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
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Newspaper className="size-6" aria-hidden="true" />
                </span>
                <p className="font-heading text-lg font-bold text-foreground">No {active ? tabs.find((tab) => tab.value === active)?.label.toLowerCase() : 'articles'} published yet</p>
                <p className="max-w-md text-sm text-muted-foreground">Our editorial team is writing guides on admissions, cutoffs and scholarships. Meanwhile, the latest official notices are listed here.</p>
              </div>
            )}
          </div>

          {notices.length ? (
            <aside aria-label="Official notices" className="rounded-2xl border bg-card p-4 sm:p-5 lg:sticky lg:top-header-gap">
              <p className="font-heading text-base font-bold text-foreground">Official notices</p>
              <NoticeList notices={notices} className="mt-1" />
            </aside>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
