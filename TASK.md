# Myrilo AI — Task Tracker

## Phase 2: CI/CD & Developer Experience

- `[x]` Install and initialize Husky (`pnpm dlx husky init`) & `lint-staged`
- `[x]` Configure `.husky/pre-commit` hook (fast formatting with Biome)
- `[x]` Configure `.husky/pre-push` hook (deep checks with Biome, Knip, TypeScript)
- `[x]` Create `.github/workflows/ci.yml` (GitHub Actions Pipeline)

## Phase 3: Database Foundation

- `[x]` Implement PrismaClient singleton
- `[x]` Update Prisma schema with new models and multi-tenancy
- `[x]` Add startup assertion for ENV vars in auth
- `[x]` Create `prisma/seed.ts`

## Phase 4: Core Evaluation Engine

- `[ ]` API route for evaluation using Inngest
- `[ ]` Inngest worker function (Claude integration, caching, rate limits)
- `[ ]` Evaluator Agent (rubric, dimension reading)

## Phase 5: Core Shell Components

- `[ ]` HeaderBar
- `[ ]` PromptInputZone

## Phase 6: Results Dashboard & Detail View

- `[ ]` Dashboard query integration
- `[ ]` DetailSplitPane

## Phase 7: Prompt Chaining Engine

- `[ ]` ChainBuilder UI

## Phase 8: Collections, Categories & Snippets

- `[ ]` CollectionManager, CategorySelector, SnippetAutocomplete

## Phase 9: Evaluator Overrides

- `[ ]` OverrideModal

## Phase 10: API Keys & Run Comparison

- `[ ]` API Key Management UI
- `[ ]` Run Comparison View
