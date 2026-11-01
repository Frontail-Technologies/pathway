# Pathway vs Shiksha.com — structure benchmark & target design

Goal: give Pathway the clean, mobile-first structure that Shiksha.com is known for, so the same pages work on the web **and** inside the Pathway mobile app as a WebView.

> **Source note.** Shiksha.com could not be crawled for this document: the build environment's network policy blocks the domain. The Shiksha patterns below come from general knowledge of the site, plus a web search that confirmed its `/college/<slug>-<id>/reviews` URL shape, paginated `/reviews-2` pages and per-category review ratings. Before locking routes, check them against the live site (mobile UA). The items to check are marked **[verify]**.

---

## 1. What makes Shiksha's structure "clean"

| # | Pattern | Why it works on mobile / WebView |
|---|---------|----------------------------------|
| 1 | **Stream first, then entity.** Top-level navigation is by stream (MBA, Engineering, Medical, Design, Law, …). Each stream has its own colleges, exams, courses, rankings, predictors and news. | Users think "I want to do engineering" before "I want a college". One stream hub gives a short, focused menu instead of a mega-menu. |
| 2 | **Entity pages split into real sub-pages.** A college has crawlable sub-URLs such as `/courses`, `/admission`, `/placement`, `/cutoff`, `/reviews`, `/ranking`, `/gallery`, `/infrastructure`, `/scholarships`, `/questions`, `/news` **[verify exact list]**. Reviews are paginated (`/reviews-2`) and filterable (`?rating=4`). | Each sub-page is small and fast, can be deep-linked from push notifications or native screens, and ranks on its own for SEO. |
| 3 | **One shared entity header + horizontally scrolling tab bar.** Name, logo, location, rating and key facts sit on top. Tabs are links to the sub-pages, not in-page anchors. | The header is identical across sub-pages, so navigation feels like an app: the tab changes and the header stays. |
| 4 | **Sticky bottom action bar on mobile.** Primary lead actions (Apply / Download Brochure / Compare / Shortlist) **[verify labels]** stay in reach of the thumb. | Conversion actions are never more than one tap away, and the pattern maps 1:1 to a native bottom sheet. |
| 5 | **Summary-then-drill-down.** The overview shows a few rows per topic plus a "View all" link into the sub-page. Long text collapses behind "Read more". | Short first paint and low WebView memory. |
| 6 | **Structured reviews.** Overall rating plus category ratings (placements, infrastructure, faculty, campus life…), with sort and filter. | Scannable on small screens, and the same data can feed native widgets. |
| 7 | **Tools as first-class entries.** College predictor, rank predictor, compare and Q&A are linked from every stream hub. | Gives high-intent users a fast path into the tools. |

## 2. Pathway today (audited from this repo)

**Strengths already in place**
- Next.js 16 App Router with clean route groups: `(public)`, `(student)`, `(admin)`, `(tools)`, `(auth)`. Feature-sliced code under `src/features/*`.
- A token-based design system in `globals.css` (Tailwind v4 `@theme`), shared primitives under `components/shared`, and a separate admin theme.
- Mobile-first detail pages: identity hero, sticky horizontal section nav with scroll-spy, and a mobile bottom nav.
- Detail pages are statically generated (`generateStaticParams`), which suits a WebView (fast first load, cacheable).

**Gaps compared with Shiksha's structure**

| Area | Today | Gap |
|------|-------|-----|
| Information architecture | Entity first: `/colleges`, `/courses`, `/exams` | No **stream** layer, so users can't land on a focused "Engineering" or "MBA" hub. |
| College / course / exam detail | One long page with `#anchor` tabs (`/college/[slug]#placements`) | Not deep-linkable per topic, one large payload, and anchors don't get their own SEO pages. |
| Mobile conversion | Enquiry sidebar is `hidden lg:block`, so **phones have no enquiry CTA** on detail pages | ✅ Fixed in phase 1: `MobileActionBar` on every detail page |
| Data | Mock data in `features/*/data`; `services/api/client.ts` is a stub | Needs a real API layer before native and web can share data. |
| Broken links | `/counselling`, `/search`, `/about`, `/contact` are linked but have no pages (404 on prefetch). Header search submitted to the missing `/search` | ✅ `/search` and `/counselling` built in phase 1. `/about` and `/contact` still missing |
| WebView readiness | *Fixed in this change (see §4)* | — |

## 3. Target structure

### 3.1 Route map

```
/                                   Home (stream picker, top tools, trending)
/[stream]                           Stream hub (engineering, mba, medical, design, law, …)
/[stream]/colleges                  Listing pre-filtered by stream (+ ?state=&city=&fee=)
/[stream]/exams                     Exams for the stream
/[stream]/courses                   Courses for the stream

/college/[slug]                     Overview (summary of every tab + "View all")
/college/[slug]/courses             Courses & fees
/college/[slug]/admission           Admission process, dates, eligibility
/college/[slug]/placement           Placement stats, recruiters
/college/[slug]/cutoff              Cut-offs by exam / round
/college/[slug]/reviews             Reviews (paginated, ?rating= ?sort=)
/college/[slug]/gallery             Photos & infrastructure
/college/[slug]/scholarships        Scholarships
/college/[slug]/faqs                Q&A / FAQs

/exam/[slug](/dates|/syllabus|/pattern|/result|/cutoff|/admit-card)
/course/[slug](/syllabus|/colleges|/careers)

/compare, /college-predictor, /rank-predictor   (unchanged)
```

Implement the college sub-pages with one shared **`app/(public)/college/[slug]/layout.tsx`** that renders the identity header and a tab bar of `<Link>`s. Each tab becomes its own `page.tsx` that reuses the section components already in `features/colleges/components`. Keep the existing `#anchor` URLs working by redirecting `/college/x#placements` to `/college/x/placement` on the client.

### 3.2 Page anatomy (mobile)

```
┌───────────────────────────────┐
│ Web header (hidden in app)    │  ← native app shows its own top bar
├───────────────────────────────┤
│ Entity header: logo · name ·  │
│ location · rating · 3 facts   │
├───────────────────────────────┤
│ Tabs → (sticky, scrolls x)    │  ← top-header token, 0 in app
├───────────────────────────────┤
│ Summary cards + "View all"    │
│ …                             │
├───────────────────────────────┤
│ Sticky action bar:            │  ← NEW (Apply · Brochure · Save)
│ [Save] [Compare] [Apply now]  │
├───────────────────────────────┤
│ Bottom nav (hidden in app)    │  ← native tab bar instead
└───────────────────────────────┘
```

### 3.3 Design-system rules for WebView-safe UI
- Never hard-code header offsets. Use `top-header`, `top-header-gap`, `top-section`, `scroll-mt-section` (tokens in `globals.css`).
- Mark anything the native app replaces with `web-chrome`. Mark app-only UI with `app-only`.
- Use `100dvh`, not `100vh`. Pad fixed bottom elements with `env(safe-area-inset-bottom)`.
- Touch targets must be ≥ 44px, and no feature may depend on hover.
- Open external links through the bridge (this is automatic for `target="_blank"` and off-site links).
- Keep detail pages static or ISR, and keep each page's JS small. Prefer a sub-route over one huge page.

## 4. Delivered in this change (phase 0 — WebView foundation)

- **App-shell mode**: `src/lib/app-shell`, plus an inline boot script in the root layout. See `webview-integration.md`.
- Web header, footer and bottom nav are hidden in the app, and all sticky offsets collapse to the safe area.
- Every hard-coded sticky/scroll offset (`top-[117px]`, `top-30/34/44`, `scroll-mt-43/44/[172px]`) is replaced with the layout tokens.
- The mobile bottom nav renders once in the public layout instead of being copied into 21 pages. Listing pages that lacked it (exams, notes, tutors, coaching) now have it, which matches the bottom padding the layout already reserved.
- `viewport-fit=cover`, plus safe-area padding on the header.
- Native bridge: `ready`, `route`, `title` and `openExternal` messages.

## 5. Roadmap

| Phase | Scope | Notes |
|-------|-------|-------|
| 0 | WebView foundation | ✅ This change |
| 1 | Mobile sticky action bar on every detail page; shared enquiry / brochure / counselling form; `/search` and `/counselling` | ✅ Done — see §6 |
| 2 | College sub-routes (`/college/[slug]/…`) with a shared layout and tab bar; then exam and course | ✅ Colleges done (§7). Exam and course still single-page |
| 3 | Stream layer (`/[stream]` hubs, stream-scoped listings, stream-aware nav and home) | Needs a stream taxonomy in the data model |
| 4 | Real API in `services/api` (shared by web and native), ISR on detail pages | Replace mock `features/*/data` |
| 5 | Two-way bridge: native → web (auth token handoff, save/shortlist sync, share sheet) | Extend `NativeMessage` and add a `window.PathwayWeb` receiver |

## 6. Phase 1 — delivered

- **`MobileActionBar`** (`components/shared/mobile-action-bar.tsx`): sticky below `lg`, directly above the bottom nav (or the safe area in app mode), with a spacer so content isn't hidden.

  | Page | Actions |
  |------|---------|
  | College | Save · Brochure · **Enquire Now** |
  | Course | Save · View Colleges · **Free Counselling** |
  | Exam | Predict Rank · **Predict Colleges** (falls back to counselling) |
  | Scholarship | Save · Get Help · **Official Apply** |
  | Coaching | Save · **Enquire Now** |
  | Tutor | Save · Request Session (coming soon, same as desktop) |

- **Shared lead form** (`features/enquiries/components/enquiry-form.tsx` and `enquiry-dialog.tsx`) with three intents: `enquiry`, `brochure` (email required) and `counselling`. It validates a 10-digit Indian mobile number (accepting a +91 prefix) and shows inline errors. It is demo only: nothing is sent and a toast confirms. The college page's previously inert desktop "Enquire Now" / "Download Brochure" buttons now open it.
- **`/search`**: one index across colleges, courses, exams, scholarships, coaching, tutors, notes and tools, with word-prefix matching and title-weighted ranking. It has type chips with counts, groups of 4 with "See all", and empty/no-result states. Results link to a detail page when one exists, otherwise to the listing pre-filtered with `?q=` (never a 404). The page is `noindex`.
- **`/counselling`**: hero with the call-back form, how it works, topics and FAQs.

## 7. Phase 2 — college sub-pages (delivered)

| URL | Content |
|-----|---------|
| `/college/[slug]` | Overview, plus a summary of every other tab with a "View all" link |
| `/college/[slug]/courses` | Courses & fees |
| `/college/[slug]/admission` | Exams, eligibility, selection, important dates |
| `/college/[slug]/placement` | Placement metrics, recruiters |
| `/college/[slug]/reviews` | Reviews (data source not connected yet) |
| `/college/[slug]/facilities` | Facilities |
| `/college/[slug]/scholarships` | Scholarships |
| `/college/[slug]/faqs` | FAQs |

- **Shared layout** (`app/(public)/college/[slug]/layout.tsx` → `CollegeDetailShell`): breadcrumbs, identity header, tab bar, desktop sidebar, closing CTA and the mobile action bar. Only the tab content re-renders on navigation, so it feels like an app.
- **`DetailTabNav`** (`components/shared/detail-tab-nav.tsx`) is reusable for exam and course. Its tabs are real `<Link>`s. When the reader has already scrolled past the tab bar, switching tabs puts the new content right under it; otherwise scroll position is kept.
- **Tab config** (`features/colleges/config/college-tabs.ts`) gives each tab its own `<title>`, description and canonical URL. Static params come from `getCollegeDetailSlugs()`, and every tab is pre-rendered.
- **Legacy links**: `/college/x#placements` (and `#fees`, `#admissions`, …) forward to the matching sub-page.
- The per-course **Enquire** buttons now open the enquiry form with that course pre-selected.
- `metadataBase` is set from `NEXT_PUBLIC_SITE_URL`. **Set this env var in production**, or canonical URLs fall back to `http://localhost:3000`.
