import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/shared/illustration";
import { HeroScene } from "@/components/shared/landing-art";
import { SpotArt, type SpotArtName } from "@/components/shared/spot-art";
import { cn } from "@/lib/utils";
import { getPopularSearches } from "@/features/home/api/home-data";
import {
  searchKinds,
  searchLocalEntries,
  type SearchKind,
} from "../data/search-index";
import { searchCatalog } from "../api/catalog-search";
import { SearchResultRow, kindArt } from "./search-result-row";

const GROUP_PREVIEW = 4;

const browse: {
  label: string;
  text: string;
  href: string;
  art: SpotArtName;
}[] = [
  {
    label: "Colleges",
    text: "Ranked by NIRF, with fees and placements",
    href: "/colleges",
    art: "college",
  },
  {
    label: "Courses",
    text: "Degrees, eligibility and careers",
    href: "/courses",
    art: "courses",
  },
  {
    label: "Exams",
    text: "Entrance exams and notices",
    href: "/exams",
    art: "exam",
  },
  {
    label: "Scholarships",
    text: "Government and private schemes",
    href: "/scholarships",
    art: "scholarship",
  },
  {
    label: "College predictor",
    text: "Colleges for your rank",
    href: "/college-predictor",
    art: "predictor",
  },
  {
    label: "Compare colleges",
    text: "Side by side on the numbers",
    href: "/compare",
    art: "compare",
  },
  {
    label: "Notes",
    text: "Study material by subject",
    href: "/notes",
    art: "notes",
  },
  {
    label: "Careers",
    text: "Paths, courses and next steps",
    href: "/careers",
    art: "guide",
  },
];

function searchHref(q: string, type?: SearchKind) {
  const params = new URLSearchParams({ q });
  if (type) params.set("type", type);
  return `/search?${params.toString()}`;
}

function TermChips({
  terms,
  tone = "light",
}: {
  terms: string[];
  tone?: "light" | "blue";
}) {
  if (!terms.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {terms.map((term) => (
        <Link
          key={term}
          href={searchHref(term)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2",
            tone === "blue"
              ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground/60"
              : "bg-card text-foreground hover:border-primary hover:text-primary focus-visible:ring-primary/40",
          )}
        >
          {term}
        </Link>
      ))}
    </div>
  );
}

export async function SearchResultsPage({
  query,
  type,
}: {
  query: string;
  type?: SearchKind;
}) {
  const popular = await getPopularSearches(8);
  const local = query ? searchLocalEntries(query) : [];
  const catalog = query
    ? await searchCatalog(query, { type, perKind: GROUP_PREVIEW })
    : { entries: [], counts: new Map<SearchKind, number>(), failed: [] };
  const results = [...catalog.entries, ...local];
  const counts = new Map<SearchKind, number>(catalog.counts);
  for (const entry of local)
    counts.set(entry.kind, (counts.get(entry.kind) ?? 0) + 1);
  const totalCount = [...counts.values()].reduce(
    (sum, value) => sum + value,
    0,
  );
  const activeType = type && counts.has(type) ? type : undefined;
  const visibleKinds = searchKinds.filter(({ kind }) => counts.has(kind));
  const filters = [
    { kind: undefined, plural: "All results", count: totalCount },
    ...visibleKinds.map(({ kind, plural }) => ({
      kind,
      plural,
      count: counts.get(kind) ?? 0,
    })),
  ];

  return (
    <div className="min-h-[60vh] bg-muted/50 pb-12">
      <section className="bg-primary text-primary-foreground">
        <div
          className={cn(
            "container-shell py-7 sm:py-9",
            !query &&
              "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]",
          )}
        >
          <div>
            <h1 className="font-heading text-[26px] leading-tight font-extrabold sm:text-[34px]">
              {query ? (
                <>Results for &ldquo;{query}&rdquo;</>
              ) : (
                "What are you looking for?"
              )}
            </h1>
            <p className="mt-1.5 text-sm text-primary-foreground/80 sm:text-[15px]">
              {query
                ? totalCount
                  ? `${totalCount.toLocaleString("en-IN")} ${totalCount === 1 ? "result" : "results"} across ${visibleKinds.length} ${visibleKinds.length === 1 ? "category" : "categories"}`
                  : "No results yet"
                : "Search colleges, courses, exams, scholarships, notes and tools"}
            </p>
            <form
              action="/search"
              role="search"
              className="mt-5 flex h-13 max-w-3xl items-center gap-2 rounded-xl bg-card pr-1.5 pl-4 shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
            >
              <Search
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                name="q"
                type="search"
                defaultValue={query}
                autoFocus={!query}
                enterKeyHint="search"
                aria-label="Search colleges, courses, exams and more"
                placeholder="Try IIT Bombay, B.Tech or JEE Main"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                variant="cta"
                className="h-10 px-5 text-sm font-semibold"
              >
                Search
              </Button>
            </form>
            {!query && popular.length ? (
              <div className="mt-5">
                <p className="mb-2.5 text-sm font-semibold">Popular searches</p>
                <TermChips terms={popular} tone="blue" />
              </div>
            ) : null}
          </div>
          {!query ? (
            <HeroScene name="streams" className="hidden lg:block" />
          ) : null}
        </div>
      </section>

      <div className="container-shell pt-6">
        {!query ? (
          <section aria-labelledby="browse-title">
            <h2
              id="browse-title"
              className="font-heading text-xl font-bold text-foreground sm:text-2xl"
            >
              Browse Pathway
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {browse.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-center gap-3.5 rounded-xl border bg-card p-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <SpotArt name={item.art} className="size-12" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="block text-[13px] text-muted-foreground">
                        {item.text}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {query && catalog.failed.length > 0 ? (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-foreground"
          >
            Some results couldn&apos;t be loaded right now. Please try again in
            a moment.
          </p>
        ) : null}

        {query && results.length === 0 && catalog.failed.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 text-center sm:p-8">
            <Illustration name="noResults" width={180} className="mx-auto" />
            <h2 className="mt-2 font-heading text-lg font-bold text-foreground">
              No matches for &ldquo;{query}&rdquo;
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Check the spelling or try a shorter term, like a college short
              name or an exam.
            </p>
            <Button
              variant="cta"
              className="mt-4 h-10 px-5 text-sm font-semibold"
              nativeButton={false}
              render={<Link href="/counselling" />}
            >
              Ask a counsellor
            </Button>
            {popular.length ? (
              <div className="mt-6 border-t pt-5 text-left">
                <p className="mb-2.5 text-sm font-semibold text-foreground">
                  Try a popular search
                </p>
                <TermChips terms={popular} />
              </div>
            ) : null}
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-6">
            <nav
              aria-label="Filter results by type"
              className="-mx-4 overflow-x-auto px-4 lg:hidden"
            >
              <div className="flex w-max gap-2">
                {filters.map((filter) => {
                  const active = filter.kind === activeType;
                  return (
                    <Link
                      key={filter.plural}
                      href={searchHref(query, filter.kind)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:border-primary/50",
                      )}
                    >
                      {filter.kind ? filter.plural : "All"}
                      <span
                        className={cn(
                          "tabular-nums",
                          active
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {filter.count.toLocaleString("en-IN")}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <aside className="hidden lg:sticky lg:top-header-gap lg:block">
              <nav
                aria-label="Filter results by type"
                className="overflow-hidden rounded-xl border bg-card p-2"
              >
                {filters.map((filter) => {
                  const active = filter.kind === activeType;
                  return (
                    <Link
                      key={filter.plural}
                      href={searchHref(query, filter.kind)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40",
                        active
                          ? "bg-secondary font-semibold text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      <SpotArt
                        name={filter.kind ? kindArt[filter.kind] : "search"}
                        className="size-8 rounded-md bg-transparent"
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {filter.plural}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {filter.count.toLocaleString("en-IN")}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <div className="flex min-w-0 flex-col gap-4">
              {(activeType
                ? visibleKinds.filter(({ kind }) => kind === activeType)
                : visibleKinds
              ).map(({ kind, plural }) => {
                const group = results.filter((entry) => entry.kind === kind);
                const shown = activeType
                  ? group
                  : group.slice(0, GROUP_PREVIEW);
                const groupTotal = counts.get(kind) ?? group.length;
                return (
                  <section
                    key={kind}
                    aria-labelledby={`results-${kind}`}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <header className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
                      <h2
                        id={`results-${kind}`}
                        className="font-heading text-base font-bold text-foreground"
                      >
                        {plural}{" "}
                        <span className="font-sans text-sm font-medium text-muted-foreground tabular-nums">
                          {groupTotal.toLocaleString("en-IN")}
                        </span>
                      </h2>
                      {shown.length < groupTotal && !activeType ? (
                        <Link
                          href={searchHref(query, kind)}
                          className="flex items-center gap-0.5 text-sm font-semibold text-primary hover:underline"
                        >
                          See all
                          <ChevronRight className="size-4" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </header>
                    <ul className="divide-y">
                      {shown.map((entry) => (
                        <SearchResultRow
                          key={entry.id}
                          entry={entry}
                          query={query}
                        />
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
