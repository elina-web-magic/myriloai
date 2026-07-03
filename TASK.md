# Myrilo AI — Task Tracker

## Current Status

- **Current implementation track:** `PART II → 1. Design System — Cyan-Sky-Violet Aurora`
- **Current implementation phase in sequence:** `Phase 1: Design System Adaptation (Aurora Glass)`
- **Phase 1 status:** `in progress`
- **Important:** a phase is complete only when I explicitly tell you it is complete

---

## PART II — Implementation Tracking

### 1. Design System — Cyan-Sky-Violet Aurora

#### 1.1. Shadcn UI Installation

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

#### 1.2. Component Catalog (Ladle)

1. ✅ Add Ladle configuration
    1. ✅ Create `.ladle/config.mjs` with stories glob, port 61000, dark default, a11y addon
    1. ✅ Add `ladle:serve` and `ladle:build` scripts to `package.json`
1. ✅ Add first stories for shell primitives
1. ✅ Add first stories for dashboard primitives
    1. ✅ Create `ResultsDashboard` Ladle story with persisted sample data
    1. ✅ Create `DetailSplitPane` Ladle story with persisted sample data
    1. ✅ Create `ResultsDashboard` empty-state Ladle story
    1. ✅ Create `ResultsDashboard` demo-state Ladle story

#### 1.3. Chosen Aesthetic

1. ✅ Apply Cyan-Sky-Violet Aurora direction to the shell
1. ✅ Refine light theme card styling away from flat white blocks
1. ⬜️ Finalize global visual token mapping for all core surfaces
    1. ✅ Add shared interactive surface tokens and map `GlassCard` hover to them

#### 1.4. Theme Switching

1. ✅ Add manual theme toggle in `HeaderBar`
1. ✅ Store manual preference in local storage
1. ✅ Keep tooltip-based theme switch copy
1. ⬜️ Re-verify auto OS detection behavior against current implementation

#### 1.5. Score System Colors

1. ✅ Apply score-color states in dashboard and detail view
1. ⬜️ Normalize all score-color usage through shared design tokens

#### 1.6. Typography

1. ✅ Use Inter + JetBrains Mono in shell/dashboard UI
1. ⬜️ Audit remaining typography styles against the plan

#### 1.7. Brand Signatures (preserved)

1. ✅ Keep branded header direction
1. ⬜️ Re-check gradient brand treatment and neon sphere behavior after later refactors

#### 1.8. ADR-Driven Front-End Refinements

1. ✅ Improve contrast for theme toggle, tabs, and shell surfaces
1. ✅ Improve light-theme background blending
1. ⬜️ Verify `will-change` usage is scoped only to animated elements
1. ⬜️ Move hover shadow token into theme config if still needed
1. ⬜️ Run a dedicated contrast verification pass for muted text tokens
1. ⬜️ Re-check dark/light scope parity for aurora background elements

#### 1.9. Results Shell UX Decision (Design Research, 2026-06-22)

1. ✅ Research chat-vs-dashboard direction and save Lazyweb report
1. ✅ Add UX decision to `docs/IMPLEMENTATION_PLAN.md`
1. ✅ Separate composer mode and review mode in page hierarchy
1. ✅ Make summary cards visible only after a real persisted run exists
1. ✅ Make reasoning the primary review mode in detail view
1. ✅ Keep raw output as secondary inspection mode
1. ⬜️ Continue aligning shell components with dashboard-first evaluator UX

---

### 2. Local Sandboxing & Validation Contracts

#### 2.1. Zero-Cost Local Setup & i18n

1. ⬜️ Introduce `NODE_ENV=development` switch to return mock objects from local static registry.
    1. ✅ Route dashboard report data through local static registry in development
1. ⬜️ Integrate localized text management.

#### 2.2. Zod Schema & Error Mocks

1. ⬜️ Draft global validation contract.
    1. ⬜️ Build `mock_prompt_as_request.json`
    1. ⬜️ Build `mock_missing_context.json`
    1. ⬜️ Build `mock_format_error.json`
    1. ⬜️ Build `mock_misjudgment_warning.json`
    1. ⬜️ Build `mock_enterprise_case.json`

---

### 3. Database Schema — v4

#### Phase 3: Database Foundation

##### `[NEW] lib/prisma.ts`

1. ✅ Implement PrismaClient singleton

##### `[MODIFY] schema.prisma`

1. ✅ Update schema with current core models and multi-tenancy structure
1. ⬜️ Add/verify full Collections, Categories, and Snippets model set from plan
1. ⬜️ Add/verify `maxTotalTokens` on `EvaluationRun`

##### `[MODIFY] auth.ts (or Auth config)`

1. ✅ Add startup assertion for required auth env vars

##### `[NEW] prisma/seed.ts`

1. ✅ Create seed script
1. ⬜️ Seed default Categories
1. ⬜️ Seed reusable Snippets
1. ⬜️ Add/verify richer demo seed for live dashboard mode if needed

---

### 3. Full Feature Map — Execution Tracking

#### Phase 3: Core Shell Components (MVP-1)

**Goal:** Prompt Input & Editing

##### `[NEW] components/HeaderBar.tsx`

1. ✅ Build header shell
1. ✅ Add theme toggle UX
1. ⬜️ Re-check final brand polish against Phase 1 after design-system completion

##### `[NEW] components/PromptInputZone.tsx`

1. ✅ Replace misleading System Prompt / User Prompt split with better UX direction
1. ✅ Add collapse / expand behavior
1. ✅ Keep advanced settings separated from main writing flow
1. ✅ Add simulated run-state feedback
1. ⬜️ Continue migrating controls to shared UI primitives

##### `[NEW] Context Guardrails`

1. ⬜️ Add local token weight counter to text areas and block execution if > 8,000 tokens
1. ⬜️ Rework prompt view into segmented control grid ("Prompt Structure", "Ground Truth", "Evaluation Matrix")

#### Phase 4: Results Dashboard & Detail View (MVP-3, MVP-4)

**Goal:** Complete dashboard UI to view results from DB

##### `[MODIFY] app/page.tsx`

1. ✅ Replace static-only dashboard flow with DB-backed query + fallback logic
1. ✅ Separate `Compose Run` and `Review Workspace` sections
1. ⬜️ Keep refining page shell hierarchy if Phase 1 research suggests more changes

##### `[MODIFY] components/ResultsDashboard.tsx`

1. ✅ Add demo/live empty state behavior
1. ✅ Hide summary cards until a real persisted run exists
1. ✅ Keep dashboard-first review structure
1. ⬜️ Add chart treatment only if still required by updated UX direction

##### `[NEW] components/DetailSplitPane.tsx`

1. ✅ Build split detail pane
1. ✅ Make reasoning primary and raw output secondary
1. ✅ Replace raw copy button with shared `Button`
1. ⬜️ Continue replacing equivalent raw controls with shared UI primitives
    1. ✅ Replace detail tabs in `DetailSplitPane` with shared `Button`
    1. ✅ Replace scenario selection items in `ResultsDashboard` with shared `Button`

#### Phase 5: Evaluation Engine (MVP-2, MVP-5)

**Goal:** End-to-end evaluation with Claude API + re-test workflow

##### `[NEW] app/api/evaluate/step/route.ts`

1. ⬜️ Create single-step execution endpoint
1. ⬜️ Add Claude API integration
1. ⬜️ Enforce `maxTotalTokens`
1. ⬜️ Enforce `Scenario` immutability rules

##### `[NEW] lib/evaluator.ts`

1. ⬜️ Implement evaluator agent
1. ⬜️ Read scoring dimensions dynamically from `Scenario.scoringMetrics`
1. ⬜️ Restrict override criteria to explicit use cases

##### `[NEW] Human-in-the-Loop Interactivity`

1. ⬜️ Visual Override Score workflow with text notes for log traces

#### Phase 6: Prompt Chaining Engine

##### `[NEW] components/ChainBuilder.tsx`

1. ⬜️ Build multi-step chain UI
1. ⬜️ Add step add/remove/reorder behavior
1. ⬜️ Validate supported template variables

#### Phase 7: Collections, Categories & Snippets (MVP-6, MVP-7, MVP-8)

##### `[NEW] components/CollectionManager.tsx`

1. ⬜️ Create collection CRUD UI

##### `[NEW] components/CategorySelector.tsx`

1. ⬜️ Create category selector UI

##### `[NEW] components/SnippetAutocomplete.tsx`

1. ⬜️ Add slash-trigger snippet autocomplete

#### Phase 8: Evaluator Overrides & Advanced Config

##### `[NEW] components/OverrideModal.tsx`

1. ⬜️ Create override library CRUD UI

---

#### Phase 10: Observability Tracking & Operational Security

##### `[NEW] components/TraceabilityAnalytics.tsx`

1. ⬜️ Build diagnostic feed illustrating requests, prompts, responses, and latency.

##### `[MODIFY] Middleware / API Access Controls`

1. ⬜️ Replace IP-based rules with clerk-managed user constraints.

---

## Documentation / Standards Alignment

- `D.1` `[x]` Sync `AGENTS.md` with current code standards
- `D.2` `[x]` Move `Code Standards` under `3. Code Quality, Tooling & 2026 Best Practices`
- `D.3` `[x]` Add structured micro-step reporting rule for agent output
- `D.4` `[ ]` Keep `TASK.md` synchronized with `docs/IMPLEMENTATION_PLAN.md` after each accepted step
