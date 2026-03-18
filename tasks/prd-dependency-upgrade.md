# PRD: Update All Dependencies to Latest Compatible Versions

## Introduction

Update every dependency in the project to its newest compatible version to stay current with security patches and bug fixes. This includes major version bumps for Next.js (15→16), Zod (3→4), ESLint (9→10), and Vite (6→8), along with minor/patch bumps for all remaining packages. Redundant packages will be cleaned up during the process.

## Goals

- Update all dependencies and devDependencies to their latest compatible versions
- Migrate code to accommodate breaking changes (Zod 4, ESLint 10, Next 16)
- Remove redundant or deprecated packages
- Update pnpm packageManager to latest 10.x
- Ensure `pnpm typecheck`, `pnpm lint`, and `pnpm build` all pass

## User Stories

### US-001: Update package.json dependency versions
**Description:** As a developer, I want all dependency version specifiers updated so the project uses the latest packages.

**Acceptance Criteria:**
- [ ] `dependencies` in `package.json` updated to target versions (see table below)
- [ ] `devDependencies` in `package.json` updated to target versions (see table below)
- [ ] `packageManager` field updated to `pnpm@10.32.1`
- [ ] Redundant package `tailwindcss-animate` removed (replaced by `tw-animate-css`)

**Target dependency versions:**

| Package | Current | Target |
|---------|---------|--------|
| `next` | ^15.2.3 | ^16.1.7 |
| `react` | ^19.0.0 | ^19.2.4 |
| `react-dom` | ^19.0.0 | ^19.2.4 |
| `zod` | ^3.24.2 | ^4.3.6 |
| `next-auth` | 5.0.0-beta.25 | 5.0.0-beta.30 |
| `@auth/drizzle-adapter` | ^1.7.2 | ^1.11.1 |
| `@t3-oss/env-nextjs` | ^0.12.0 | ^0.13.10 |
| `@tailwindcss/vite` | ^4.0.17 | ^4.2.1 |
| `@tanstack/react-query` | ^5.69.0 | ^5.90.21 |
| `@trpc/client` | ^11.0.0 | ^11.13.4 |
| `@trpc/react-query` | ^11.0.0 | ^11.13.4 |
| `@trpc/server` | ^11.0.0 | ^11.13.4 |
| `drizzle-orm` | ^0.41.0 | ^0.45.1 |
| `lucide-react` | ^0.484.0 | ^0.577.0 |
| `superjson` | ^2.2.1 | ^2.2.6 |
| `tailwind-merge` | ^3.0.2 | ^3.5.0 |
| `tw-animate-css` | ^1.2.4 | ^1.4.0 |
| `vite` | ^6.2.3 | ^8.0.0 |

| Dev Package | Current | Target |
|-------------|---------|--------|
| `typescript` | ^5.8.2 | ^5.9.3 |
| `eslint` | ^9.23.0 | ^10.0.3 |
| `eslint-config-next` | ^15.2.3 | ^16.1.7 |
| `@next/eslint-plugin-next` | ^15.2.4 | ^16.1.7 |
| `@eslint/eslintrc` | ^3.3.1 | ^3.3.5 |
| `tailwindcss` | ^4.0.17 | ^4.2.1 |
| `@tailwindcss/postcss` | ^4.0.15 | ^4.2.1 |
| `@types/node` | ^20.14.10 | ^25.5.0 |
| `@types/react` | ^19.0.0 | ^19.2.14 |
| `@types/react-dom` | ^19.0.0 | ^19.2.3 |
| `drizzle-kit` | ^0.30.5 | ^0.31.10 |
| `postcss` | ^8.5.3 | ^8.5.8 |
| `prettier` | ^3.5.3 | ^3.8.1 |
| `prettier-plugin-tailwindcss` | ^0.6.11 | ^0.7.2 |
| `typescript-eslint` | ^8.27.0 | ^8.57.1 |
| `eslint-plugin-react-hooks` | ^5.2.0 | ^7.0.1 |

### US-002: Migrate Zod 3 to Zod 4
**Description:** As a developer, I want Zod upgraded to v4 with all code migrated so that schema validation continues working correctly.

**Acceptance Criteria:**
- [ ] `import { ZodError } from "zod"` in `src/server/api/trpc.ts` updated if Zod 4 changes the export location — verify `.flatten()` method still works
- [ ] `import { z } from "zod"` in `src/env.js` still works with Zod 4 (basic schemas: `z.string()`, `z.enum()`, `z.string().url()`, `z.string().optional()`)
- [ ] `import { z } from "zod"` in `src/server/api/routers/post.ts` still works with Zod 4 (basic schemas: `z.object()`, `z.string()`, `z.string().min(1)`)
- [ ] `@t3-oss/env-nextjs` v0.13.x is compatible with Zod 4 (confirmed: peer dep accepts `^4.0.0`)
- [ ] `pnpm typecheck` passes with no Zod-related errors

### US-003: Migrate ESLint 9 to ESLint 10
**Description:** As a developer, I want ESLint upgraded to v10 with config updated so linting works correctly.

**Acceptance Criteria:**
- [ ] ESLint config file (likely `eslint.config.mjs`) updated for ESLint 10 compatibility
- [ ] `eslint-config-next` upgraded to ^16.1.7 (matches Next 16)
- [ ] `@next/eslint-plugin-next` upgraded to ^16.1.7
- [ ] `eslint-plugin-react-hooks` upgraded to ^7.0.1 — check for any rule name changes or config format changes
- [ ] `typescript-eslint` upgraded to ^8.57.1
- [ ] `pnpm lint` passes with no errors (or only pre-existing warnings)

### US-004: Migrate Next.js 15 to Next.js 16
**Description:** As a developer, I want Next.js upgraded to v16 so the app uses the latest framework version.

**Acceptance Criteria:**
- [ ] `next.config.js` reviewed and updated for any Next 16 breaking changes
- [ ] App Router routes (`src/app/`) continue to work (no removed/changed APIs)
- [ ] API routes (`src/app/api/auth/[...nextauth]/route.ts`, `src/app/api/trpc/[trpc]/route.ts`) continue to work
- [ ] `pnpm build` completes successfully

### US-005: Update remaining packages and clean up
**Description:** As a developer, I want all remaining packages updated and redundant ones removed.

**Acceptance Criteria:**
- [ ] `tailwindcss-animate` removed from `package.json` (redundant with `tw-animate-css`)
- [ ] Any imports of `tailwindcss-animate` in CSS or config files updated to use `tw-animate-css` equivalent
- [ ] All remaining packages updated to versions in the table above
- [ ] `packageManager` field set to `pnpm@10.32.1`

### US-006: Install and verify
**Description:** As a developer, I want to run install and all verification commands to confirm the upgrade is complete.

**Acceptance Criteria:**
- [ ] `pnpm install` completes without errors
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes

## Functional Requirements

- FR-1: All dependency versions in `package.json` must be updated to the target versions specified in US-001
- FR-2: All source files importing from `zod` must be verified/updated for Zod 4 compatibility
- FR-3: ESLint configuration must be updated to work with ESLint 10 and all updated plugins
- FR-4: The `tailwindcss-animate` package must be removed if `tw-animate-css` fully replaces it
- FR-5: The `packageManager` field must reflect the latest pnpm 10.x version
- FR-6: All three verification commands (`typecheck`, `lint`, `build`) must pass after the upgrade

## Non-Goals

- No new features or functionality added
- No refactoring beyond what's required for breaking changes
- No migration off of next-auth v5 beta (stable hasn't been released yet)
- No changes to application logic, UI, or database schema
- No test suite creation (project doesn't currently have tests)

## Technical Considerations

- **Zod 4 compatibility:** Zod 4 provides a compatibility layer for `z.*` imports but `ZodError` may need to be imported from `zod/v4/core` or similar. The `.flatten()` method on `ZodError` is used in the tRPC error formatter and must continue to work.
- **ESLint 10:** This is a major version jump. The flat config format (`eslint.config.mjs`) should be used. Check if `@eslint/eslintrc` compat layer is still needed.
- **next-auth beta:** Staying on beta track (→ beta.30) since v5 stable hasn't shipped. The `@auth/drizzle-adapter` must remain compatible with this beta version.
- **Vite 8:** Major version bump from v6. The `@tailwindcss/vite` plugin must be compatible with Vite 8.
- **prettier-plugin-tailwindcss 0.7:** May have config changes from 0.6 — verify prettier config still works.

**Key files that will be modified:**
- `package.json` — version updates and package removal
- `src/server/api/trpc.ts` — Zod 4 `ZodError` import migration
- `src/env.js` — verify Zod 4 compatibility (may need no changes)
- `src/server/api/routers/post.ts` — verify Zod 4 compatibility (may need no changes)
- ESLint config file — ESLint 10 + plugin updates
- `src/styles/globals.css` — remove `tailwindcss-animate` import if present

## Success Metrics

- All three commands pass: `pnpm typecheck && pnpm lint && pnpm build`
- Zero dependency vulnerabilities introduced (check with `pnpm audit`)
- No runtime regressions in existing functionality

## Open Questions

- Does Vite 8 have compatibility issues with `@tailwindcss/vite` v4.2.1? If so, Vite may need to stay at a lower major version.
- Does `eslint-plugin-react-hooks` v7 rename or remove any rules used in the current config?
- Are there any Next.js 16 breaking changes that affect the minimal `next.config.js` or App Router patterns used?
