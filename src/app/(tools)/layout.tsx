// Route group only — no URL segment. Student Tools live here in two sub-groups
// (also URL-less), each with its own shell:
//   (workspace)     — full-viewport application shell, no public header/footer
//                     (Resume Builder; see docs/PAGE_PATTERNS.md "Student Tool Workspace")
//   (student-tools) — normal public header/footer around a scrollable tool page
//                     (College Predictor, Rank Predictor, Psychometric Test)
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
