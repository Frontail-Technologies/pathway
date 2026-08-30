# Education Discovery Platform — Claude Docs Package

Copy:

- `CLAUDE.md` to project root
- entire `docs/` folder to project root

Then give Claude this first instruction:

```text
Read CLAUDE.md and every document referenced by it.

Do not implement or modify anything yet.

Audit the current repository against:
- PROJECT_OVERVIEW.md
- DECISIONS.md
- DESIGN_SYSTEM.md
- COMPONENT_REGISTRY.md
- SCREEN_REGISTRY.md
- UI_SETUP_CHECKLIST.md

Report:
1. current architecture
2. existing components
3. existing routes
4. theme implementation
5. current homepage implementation
6. mobile implementation
7. mismatches against docs
8. missing dependencies/components
9. TypeScript/build status
10. exact recommended corrections

Do not restructure the repository.
Do not build any new screen.
```
