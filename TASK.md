# Myrilo AI — Task Tracker

## Current Status

- **Current implementation track:** `PART II → Phase 2: Local Sandboxing & Validation Contracts`
- **Current implementation phase in sequence:** `Phase 2: Local Sandboxing & Validation Contracts`
- **Phase 2 status:** `in progress`
- **Important:** a phase is complete only when I explicitly tell you it is complete

---

## PART II — Implementation Tracking

### Phase 1: Core Shell Components (MVP-1)

**Goal:** Prompt Input & Editing

#### `[NEW] components/HeaderBar.tsx`

1. ✅ Build header shell
1. ✅ Add theme toggle UX
1. ⬜️ Re-check final brand polish against Phase 6 after design-system completion

#### `[NEW] components/PromptInputZone.tsx`

1. ✅ Replace misleading System Prompt / User Prompt split with better UX direction
1. ✅ Add collapse / expand behavior
1. ✅ Keep advanced settings separated from main writing flow
1. ✅ Add simulated run-state feedback
1. ⬜️ Continue migrating controls to shared UI primitives

#### `[NEW] Context Guardrails`

1. ⬜️ Add local token weight counter to text areas and block execution if > 8,000 tokens
1. ⬜️ Rework prompt view into segmented control grid ("Prompt Structure", "Ground Truth", "Evaluation Matrix")

---

### Phase 2: Local Sandboxing & Validation Contracts

#### 2.1. Local Sandbox Runtime

1. ✅ Introduce environment-gated mock mode backed by a local static registry (explicit `ALLOW_MOCK_DATA` flag instead of `NODE_ENV` alone)
    1. ✅ Route dashboard report data through local static registry
    1. ✅ Add environment guard that forbids mock mode in production (`static-registry.ts` throws at import time if `ALLOW_MOCK_DATA=true` and `NODE_ENV=production`)
    1. ✅ Expand static registry usage to evaluate submit and response parsing flows
        1. ✅ Add mock evaluation fixture, registry submit helper, and `/api/evaluate/submit` route for offline request/response parsing
    1. ✅ Add explicit mock-source logging for offline responses
        1. ✅ Log `[Mock Registry] Response served for ...` from `static-registry.ts` for dashboard and submit flows
1. ✅ Integrate localized text management (deferred — see Phase 11)

#### 2.2. Validation Contract & Error Model

1. ✅ Draft global bi-directional validation contract with Zod
    1. ✅ Define `EvaluationRequest` schema
    1. ✅ Define `EvaluationResponse` schema
    1. ✅ Define `DashboardResult` schema
    1. ✅ Define `StandardizedError` schema and TS type
        1. ✅ Add shared `zod` contracts in `src/lib/contracts/evaluation.ts` and reusable inferred types in `src/types.ts`
    1. ✅ Refactor UI error rendering to consume structured error objects
        1. ✅ Keep `StandardizedError` as client state and render severity, code, field, and details in `PromptInputZone`

#### 2.3. MVP Mock Scenarios

1. ⬜️ Build minimum MVP mock scenario set
    1. ⬜️ Build `success_perfect` fixture
    1. ⬜️ Build `error_malformed_json` fixture
    1. ⬜️ Build `error_missing_context` fixture
1. ⬜️ Defer non-MVP mock scenarios explicitly
    1. ⬜️ Defer `success_partial` until post-MVP
    1. ⬜️ Defer `error_provider_timeout` until post-MVP
    1. ⬜️ Defer `error_prompt_injection` until post-MVP

---

### Phase 3: Database Foundation

#### `[NEW] lib/prisma.ts`

1. ✅ Implement PrismaClient singleton

#### `[MODIFY] schema.prisma`

1. ✅ Update schema with current core models and multi-tenancy structure
1. ⬜️ Add/verify full Collections, Categories, and Snippets model set from plan
1. ⬜️ Add/verify `maxTotalTokens` on `EvaluationRun`
1. ✅ Fix multi-tenancy holes in `Category` and `EvaluatorOverride` (flagged in `docs/MYRILO_AI_ARCHITECTURE.md` and `docs/ARCHITECTURE_RESEARCH_AUDIT.md`)
    1. ✅ Add `projectId` to `Category`, relation to `Project`, unique constraint changed to `@@unique([projectId, name])`
    1. ✅ Add `projectId` to `EvaluatorOverride`, relation to `Project`, indexed
    1. ✅ Generate and apply Prisma migration for the tenancy fix (`20260706122244_tenant_scoping_and_snapshot_discipline`, baselined against the live dev database, `Category` rows backfilled to the sole existing `Project`)
1. ✅ Extend snapshot discipline to judge model and rubric version (`docs/ARCHITECTURE_RESEARCH_AUDIT.md` §3.5)
    1. ✅ Add `judgeModel` to `EvaluationRun` (pinned Evaluator Agent model id, required, no hardcoded default)
    1. ✅ Add `rubricSnapshot` to `EvaluationResult` (snapshot of `Scenario.scoringMetrics` at evaluation time)

#### `[MODIFY] auth.ts (or Auth config)`

1. ✅ Add startup assertion for required auth env vars

#### `[NEW] prisma/seed.ts`

1. ✅ Create seed script
1. ✅ Seed default Categories
    1. ✅ Fix `Category` upsert to use compound `projectId_name` key after tenancy scoping change
1. ⬜️ Seed reusable Snippets
1. ⬜️ Add/verify richer demo seed for live dashboard mode if needed

---

### Phase 4: Evaluation Engine (MVP-2, MVP-5)

**Goal:** End-to-end evaluation with Claude API + re-test workflow

#### `[NEW] app/api/evaluate/step/route.ts`

1. ⬜️ Create single-step execution endpoint
1. ⬜️ Add Claude API integration
1. ⬜️ Enforce `maxTotalTokens`
1. ⬜️ Enforce `Scenario` immutability rules

#### `[NEW] lib/evaluator.ts`

1. ⬜️ Implement evaluator agent
1. ⬜️ Read scoring dimensions dynamically from `Scenario.scoringMetrics`
1. ⬜️ Restrict override criteria to explicit use cases
1. ⬜️ Implement panel-of-judges scoring (PoLL pattern: 2–3 diverse cheap models + majority/average vote) instead of a single judge — see `docs/ARCHITECTURE_RESEARCH_AUDIT.md` §3.1
1. ⬜️ Decide Zod schema field order (`reasoning`/`evidence` before numeric `scores`) and prompted-JSON-with-retry vs. constrained decoding for the judge call — see `docs/ARCHITECTURE_RESEARCH_AUDIT.md` §3.2

#### `[NEW] Human-in-the-Loop Interactivity`

1. ⬜️ Visual Override Score workflow with text notes for log traces

---

### Phase 5: Results Dashboard & Detail View (MVP-3, MVP-4)

**Goal:** Complete dashboard UI to view results from DB

#### `[MODIFY] app/page.tsx`

1. ✅ Replace static-only dashboard flow with DB-backed query + fallback logic
1. ✅ Separate `Compose Run` and `Review Workspace` sections
1. ⬜️ Keep refining page shell hierarchy if Phase 6 research suggests more changes

#### `[MODIFY] components/ResultsDashboard.tsx`

1. ✅ Add demo/live empty state behavior
1. ✅ Hide summary cards until a real persisted run exists
1. ✅ Keep dashboard-first review structure
1. ⬜️ Add chart treatment only if still required by updated UX direction

#### `[NEW] components/DetailSplitPane.tsx`

1. ✅ Build split detail pane
1. ✅ Make reasoning primary and raw output secondary
1. ✅ Replace raw copy button with shared `Button`
1. ⬜️ Continue replacing equivalent raw controls with shared UI primitives
    1. ✅ Replace detail tabs in `DetailSplitPane` with shared `Button`
    1. ✅ Replace scenario selection items in `ResultsDashboard` with shared `Button`

---

### Phase 6: Design System — Cyan-Sky-Violet Aurora

#### 6.1. Shadcn UI Installation

1. ✅ Install and use base shared `Button` primitive
1. ✅ Install and adapt remaining base primitives (`Card`, `Input`, `Textarea`, `Dialog`, `Select`)
    1. ✅ Add shared `Card` primitive in `src/components/ui/card.tsx`
    1. ✅ Add shared `Textarea` primitive and wire it into `PromptInputZone`
    1. ✅ Add shared `Input` primitive and wire it into `PromptInputZone`
    1. ✅ Add shared `Select` primitive and wire it into `PromptInputZone`
    1. ✅ Add shared `Dialog` primitive and wire it into `PromptInputZone`
1. ✅ Adapt Shadcn surfaces to Aurora Glass tokens
    1. ✅ Align shared `Badge` variants to Aurora Glass surface tokens
    1. ✅ Align `GlassCard` to explicit Aurora Glass token classes
    1. ✅ Align `Button` outline, ghost, and link variants to Aurora Glass tokens
    1. ✅ Align `Card` shadow styling to Aurora Glass token shadows
    1. ✅ Align `Button` default and secondary variants to Aurora Glass shadow tokens
    1. ✅ Align `Dialog` primitive (Backdrop, Popup, Header, Close, Footer) to Aurora Glass tokens
    1. ✅ Align `Button` destructive variant to Aurora Glass tokens
1. ✅ Replace raw HTML controls with shared UI primitives where equivalent primitives already exist
    1. ✅ Replace copy action in `DetailSplitPane` with shared `Button`
    1. ✅ Replace detail tabs in `DetailSplitPane` with shared `Button`
    1. ✅ Replace lifecycle state pills in `PromptInputZone` with shared `Button`
    1. ✅ Replace theme toggle in `HeaderBar` with shared `Button`
    1. ✅ Replace scenario selection items in `ResultsDashboard` with shared `Button`

#### 6.2. Component Catalog (Ladle)

1. ✅ Add Ladle configuration
    1. ✅ Create `.ladle/config.mjs` with stories glob, port 61000, dark default, a11y addon
    1. ✅ Add `ladle:serve` and `ladle:build` scripts to `package.json`
1. ✅ Add first stories for shell primitives
1. ✅ Add first stories for dashboard primitives
    1. ✅ Create `ResultsDashboard` Ladle story with persisted sample data
    1. ✅ Create `DetailSplitPane` Ladle story with persisted sample data
    1. ✅ Create `ResultsDashboard` empty-state Ladle story
    1. ✅ Create `ResultsDashboard` demo-state Ladle story

#### 6.3. Chosen Aesthetic

1. ✅ Apply Cyan-Sky-Violet Aurora direction to the shell
1. ✅ Refine light theme card styling away from flat white blocks
1. ⬜️ Finalize global visual token mapping for all core surfaces
    1. ✅ Add shared interactive surface tokens and map `GlassCard` hover to them

#### 6.4. Theme Switching

1. ✅ Add manual theme toggle in `HeaderBar`
1. ✅ Store manual preference in local storage
1. ✅ Keep tooltip-based theme switch copy
1. ⬜️ Re-verify auto OS detection behavior against current implementation

#### 6.5. Score System Colors

1. ✅ Apply score-color states in dashboard and detail view
1. ⬜️ Normalize all score-color usage through shared design tokens

#### 6.6. Typography

1. ✅ Use Inter + JetBrains Mono in shell/dashboard UI
1. ⬜️ Audit remaining typography styles against the plan

#### 6.7. Brand Signatures (preserved)

1. ✅ Keep branded header direction
1. ⬜️ Re-check gradient brand treatment and neon sphere behavior after later refactors

#### 6.8. ADR-Driven Front-End Refinements

1. ✅ Improve contrast for theme toggle, tabs, and shell surfaces
1. ✅ Improve light-theme background blending
1. ⬜️ Verify `will-change` usage is scoped only to animated elements
1. ⬜️ Move hover shadow token into theme config if still needed
1. ⬜️ Run a dedicated contrast verification pass for muted text tokens
1. ⬜️ Re-check dark/light scope parity for aurora background elements

#### 6.9. Results Shell UX Decision (Design Research, 2026-06-22)

1. ✅ Research chat-vs-dashboard direction and save Lazyweb report
1. ✅ Add UX decision to `docs/IMPLEMENTATION_PLAN.md`
1. ✅ Separate composer mode and review mode in page hierarchy
1. ✅ Make summary cards visible only after a real persisted run exists
1. ✅ Make reasoning the primary review mode in detail view
1. ✅ Keep raw output as secondary inspection mode
1. ⬜️ Continue aligning shell components with dashboard-first evaluator UX

---

### Phase 7: Prompt Chaining Engine

##### `[NEW] components/ChainBuilder.tsx`

1. ⬜️ Build multi-step chain UI
1. ⬜️ Add step add/remove/reorder behavior
1. ⬜️ Validate supported template variables

---

### Phase 8: Collections, Categories & Snippets (MVP-6, MVP-7, MVP-8)

##### `[NEW] components/CollectionManager.tsx`

1. ⬜️ Create collection CRUD UI

##### `[NEW] components/CategorySelector.tsx`

1. ⬜️ Create category selector UI

##### `[NEW] components/SnippetAutocomplete.tsx`

1. ⬜️ Add slash-trigger snippet autocomplete

---

### Phase 9: Evaluator Overrides & Advanced Config

##### `[NEW] components/OverrideModal.tsx`

1. ⬜️ Create override library CRUD UI

---

### Phase 10: Observability Tracking & Operational Security

##### `[NEW] components/TraceabilityAnalytics.tsx`

1. ⬜️ Build diagnostic feed illustrating requests, prompts, responses, and latency.

##### `[MODIFY] Middleware / API Access Controls`

1. ⬜️ Replace IP-based rules with clerk-managed user constraints.

---

### Phase 11: Localization Pipeline (i18n)

1. ⬜️ Keep i18n out of Phase 5 MVP scope
1. ⬜️ Introduce localized text management after sandboxing, contracts, and structured error rendering are stable

---

## Documentation / Standards Alignment

- `D.1` `[x]` Sync `AGENTS.md` with current code standards
- `D.2` `[x]` Move `Code Standards` under `3. Code Quality, Tooling & 2026 Best Practices`
- `D.3` `[x]` Add structured micro-step reporting rule for agent output
- `D.4` `[ ]` Keep `TASK.md` synchronized with `docs/IMPLEMENTATION_PLAN.md` after each accepted step
