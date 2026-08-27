# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (localhost:3000)
npm run build     # production build
npm run lint      # ESLint
npx tsc --noEmit  # type-check only (no test runner configured)
```

## Architecture

### Routing & i18n

Next.js 16 App Router with `next-intl` v4. Two locales: `vi` (Vietnamese) and `en` (English). Default locale is `en` served without a prefix (`localePrefix: 'as-needed'`).

- All pages live under `app/[locale]/` — locale is resolved in `app/[locale]/layout.tsx`
- Translation namespaces are loaded per-request in `i18n/request.ts` and served via `<NextIntlClientProvider>`
- Translation files: `lang/{vi,en}/*.json` and `lang/{vi,en}/about/*.json`
- Navigation helpers use `i18n/navigation.ts` (typed Link, useRouter, etc. wrapping next-intl)
- Route path constants live in `constants/routes.ts` — always use these instead of hardcoded strings

### Data Layer

Repository → Service → Page Server Component (no client-side fetching).

```
lib/supabase/server.ts          createClient() — SSR Supabase client via cookies
lib/repositories/               raw Supabase queries, typed with Database["public"]["Tables"]
lib/services/                   thin orchestration layer over repositories
lib/types/database.types.ts     generated Supabase types (source of truth for DB shape)
lib/mock-data/                  typed mock rows matching database.types.ts (for dev/fallback)
```

The repository always selects `project_images(id, url, "order", is_cover, alt_text)` via a nested select — images are always fetched with their parent project, never separately.

### Bilingual Data Convention

Database columns come in `_vi` / `_en` pairs (`title_vi`, `title_en`, `description_vi`, `description_en`, etc.). The `_vi` field is always required; `_en` is nullable. `location` and `location_en` are both required strings.

### Service Types

`service_type` on `projects` is a `string[]` column validated by the DB function `is_valid_service_type`. The three valid values — also used in `constants/service.ts` and `constants/routes.ts` — are:

- `"shoringConstruction"`
- `"larsenPile"`
- `"kingpostFabrication"`

### project_images.order — Fractional Indexing

`order` is `double precision` (not integer) to allow single-row updates when reordering. To insert between two positions use `(prevOrder + nextOrder) / 2`. Renormalize to consecutive integers periodically as a background task when precision nears floating-point limits (~1e-15 gap).

### Components

- `components/sections/` — full-page sections composed into page files (Hero, Services, FeaturedProjects, etc.)
- `components/layout/` — Header and Footer (always in the locale layout)
- `components/shared/` — animation wrappers (AnimatedSection, PageTransition, RevealOnScroll, StaggerContainer) and SectionLabel
- `components/ui/` — shadcn/ui primitives; add new ones with `npx shadcn add <component>`

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. All design tokens (brand navy `#0A4D9C`, accent yellow `#FFCB05`, neutrals) are declared as CSS custom properties inside `@theme {}` in `app/globals.css`. Dark mode uses `prefers-color-scheme: dark` automatically — no class toggling needed. Fonts: `Be_Vietnam_Pro` + `Inter` (Google Fonts, injected on `<html>` by the locale layout).

### Key Breaking Changes from Prior Next.js

This version has significant API differences. Before writing any code, read the relevant guide in `node_modules/next/dist/docs/`.

- **Caching model is inverted**: pages are dynamic by default. Route segment configs (`dynamic`, `revalidate`, `fetchCache`) are replaced by the `use cache` directive and `cacheLife()` function when `cacheComponents` is enabled in `next.config.ts`.
- **Instant navigation requires `unstable_instant`**: routes using Suspense boundaries with cached data must export `unstable_instant` — without it, navigations silently block. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.
- The hint in `node_modules/next/dist/docs/index.md` flags slow navigations as a common pitfall.

### References

- Project portfolio content (slides): `.claude/docs/HSNL.pdf`
- Supabase local: `supabase/` (migrations in `supabase/migrations/`, seed in `supabase/seed.sql`)

<!-- rtk-instructions v2 -->

# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:

```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)

```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)

```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)

```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)

```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)

```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)

```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)

```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)

```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)

```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands

```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category         | Commands                       | Typical Savings |
| ---------------- | ------------------------------ | --------------- |
| Tests            | vitest, playwright, cargo test | 90-99%          |
| Build            | next, tsc, lint, prettier      | 70-87%          |
| Git              | status, log, diff, add, commit | 59-80%          |
| GitHub           | gh pr, gh run, gh issue        | 26-87%          |
| Package Managers | pnpm, npm, npx                 | 70-90%          |
| Files            | ls, read, grep, find           | 60-75%          |
| Infrastructure   | docker, kubectl                | 85%             |
| Network          | curl, wget                     | 65-70%          |

Overall average: **60-90% token reduction** on common development operations.

<!-- /rtk-instructions -->
