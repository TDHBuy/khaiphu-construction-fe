---
name: debug-routes
description: Start the dev server, test all app routes, collect runtime errors, and produce a prioritized fix plan.
---

You are running a full route-health check on this Next.js project. Follow these steps exactly and do not skip any.

## Step 1 — Discover all routes

Glob `app/**/(page|layout|error|loading).tsx` to build the full route tree. For `[locale]` segments, assume both `en` and `vi`. Map each file to its URL path(s).

## Step 2 — Start the dev server

Run `npm run dev` in the background (use `run_in_background: true`). Wait ~8 seconds for it to be ready by checking `http://localhost:3000` with curl. If port 3000 is busy, find the actual port from the output.

## Step 3 — Test every route

For each discovered URL, use the `browse:browser` skill or `curl -s -o /dev/null -w "%{http_code}" <url>` to:
- Verify the HTTP status code (200, 404, 500, etc.)
- Capture any page-level error text (Next.js error overlay, thrown error messages)

Use `en` as the locale prefix (e.g. `/en`, `/en/about/company-profile`, `/en/about/vision-mission`).

## Step 4 — Collect build/runtime errors

Check terminal output from the dev server for:
- Compilation errors (module not found, type errors)
- Hydration mismatches
- Missing translation keys (next-intl warnings)
- Unhandled promise rejections
- `useClient`/`useServer` boundary violations

Also run `npm run build 2>&1` if you need to surface static analysis errors.

## Step 5 — Produce the fix plan

Output a structured report:

### Route Status Table

| Route | Status | Error Summary |
|-------|--------|---------------|
| /en   | ✅ 200 | none |
| ...   | ...    | ...  |

### Errors Found

For each error:
- **Error**: exact message or stack
- **File**: path:line if known
- **Severity**: CRITICAL / WARNING / INFO
- **Root Cause**: one-line explanation

### Fix Plan

Numbered list ordered by severity. For each item:
1. **What to fix** — specific file and change needed
2. **Why** — root cause in one sentence
3. **How** — concrete code change or command

Do not implement any fixes — only plan them. End with: "Run `/fix-routes` to apply these fixes" as a reminder for a future step.
