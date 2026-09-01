/**
 * Shared grid-column template reused by every data row so columns stay
 * pixel-aligned as the comparison body scrolls horizontally. Mobile uses
 * fixed widths (attribute column readable, college columns ~200px per the
 * mobile comparison spec); desktop switches to a fluid `minmax(0,1fr)`
 * 3-column layout within the ~180–220px attribute column target. The
 * `print:` variant always uses the fluid layout regardless of screen size,
 * since the printed comparison must lay out at the paper's full width.
 *
 * The sticky college header does NOT use this directly — see the note on
 * `COMPARE_GRID_COLS_DATA` below for why, and keep both in sync.
 */
export const COMPARE_GRID_COLS =
  'grid-cols-[132px_repeat(3,200px)] lg:grid-cols-[200px_repeat(3,minmax(0,1fr))] print:grid-cols-[160px_repeat(3,minmax(0,1fr))]'

/**
 * The college-header row cannot sit inside the body's `overflow-x-auto`
 * container: an element with non-visible `overflow-x` forces the browser
 * to also treat its `overflow-y` as non-visible (a real CSS coupling rule,
 * not a Tailwind quirk), which makes that element the sticky-positioning
 * reference for any sticky descendant — and since this wrapper never
 * actually scrolls internally (nothing constrains its height), a sticky
 * child inside it never receives any scroll delta and just behaves like a
 * plain static element, silently breaking "stick beneath the global
 * header" entirely. So the header row lives outside that container and
 * instead mirrors the body's `scrollLeft` via a CSS transform on this
 * college-columns-only grid, with its attribute-label cell kept as a
 * separate, non-transformed sibling (see `COMPARE_ATTR_COL_WIDTH`). These
 * two constants must stay pixel-identical to `COMPARE_GRID_COLS`'s
 * college columns and attribute column respectively, or the header and
 * body columns will drift apart.
 */
export const COMPARE_GRID_COLS_DATA = 'grid-cols-[repeat(3,200px)] lg:grid-cols-[repeat(3,minmax(0,1fr))] print:grid-cols-[repeat(3,minmax(0,1fr))]'

export const COMPARE_ATTR_COL_WIDTH = 'w-33 lg:w-50 print:w-40'

/**
 * Mobile-only (< md) comparison grid — a fundamentally different row shape
 * from the desktop matrix above, not just a narrower version of it: there
 * is no shared attribute column at all, since squeezing "attribute + 3
 * colleges" into a 375–430px viewport is illegible. Each of the 3 fixed
 * 176px columns instead carries its own inline `label` + `value`. Two
 * columns (352px) fill almost exactly a typical mobile viewport's content
 * width, so exactly two colleges show at once and a third — if selected —
 * is reached by horizontal swipe, mirroring the desktop transform-synced
 * sticky-header technique (see `MobileComparisonHeaderRow`). Desktop/tablet
 * (`md:` and up) keeps the unchanged attribute+3-column matrix instead —
 * see the `hidden md:block` / `md:hidden` split in `CollegeComparePage`.
 */
export const MOBILE_COMPARE_GRID_COLS = 'grid-cols-[repeat(3,176px)]'

/** Matches `MOBILE_COMPARE_GRID_COLS`'s per-column width — kept as its own constant so header/body stay pixel-identical. */
export const MOBILE_COMPARE_COL_WIDTH = 'w-44'
