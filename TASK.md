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

- `1.1.a` `[x]` Install and use base shared `Button` primitive
- `1.1.b` `[x]` Install and adapt remaining base primitives (`Card`, `Input`, `Textarea`, `Dialog`, `Select`)
- `1.1.b.1` `[x]` Add shared `Card` primitive in `src/components/ui/card.tsx`
- `1.1.b.2` `[x]` Add shared `Textarea` primitive and wire it into `PromptInputZone`
- `1.1.b.3` `[x]` Add shared `Input` primitive and wire it into `PromptInputZone`
- `1.1.b.4` `[x]` Add shared `Select` primitive and wire it into `PromptInputZone`
- `1.1.b.5` `[x]` Add shared `Dialog` primitive and wire it into `PromptInputZone`
- `1.1.c` `[x]` Adapt Shadcn surfaces to Aurora Glass tokens
- `1.1.c.1` `[x]` Align shared `Badge` variants to Aurora Glass surface tokens
- `1.1.c.2` `[x]` Align `GlassCard` to explicit Aurora Glass token classes
- `1.1.c.3` `[x]` Align `Button` outline, ghost, and link variants to Aurora Glass tokens
- `1.1.c.4` `[x]` Align `Card` shadow styling to Aurora Glass token shadows
- `1.1.c.5` `[x]` Align `Button` default and secondary variants to Aurora Glass shadow tokens
- `1.1.c.6` `[x]` Align `Dialog` primitive (Backdrop, Popup, Header, Close, Footer) to Aurora Glass tokens
- `1.1.d` `[x]` Replace raw HTML controls with shared UI primitives where equivalent primitives already exist
- `1.1.d.1` `[x]` Replace copy action in `DetailSplitPane` with shared `Button`
- `1.1.d.2` `[x]` Replace detail tabs in `DetailSplitPane` with shared `Button`
- `1.1.d.3` `[x]` Replace lifecycle state pills in `PromptInputZone` with shared `Button`
- `1.1.d.4` `[x]` Replace theme toggle in `HeaderBar` with shared `Button`
- `1.1.d.5` `[x]` Replace scenario selection items in `ResultsDashboard` with shared `Button`

#### 1.2. Component Catalog (Ladle)

- `1.2.a` `[x]` Add Ladle configuration
- `1.2.a.1` `[x]` Create `.ladle/config.mjs` with stories glob, port 61000, dark default, a11y addon
- `1.2.a.2` `[x]` Add `ladle:serve` and `ladle:build` scripts to `package.json`
- `1.2.b` `[ ]` Add first stories for shell primitives
- `1.2.c` `[ ]` Add first stories for dashboard primitives

#### 1.3. Chosen Aesthetic

- `1.3.a` `[x]` Apply Cyan-Sky-Violet Aurora direction to the shell
- `1.3.b` `[x]` Refine light theme card styling away from flat white blocks
- `1.3.c` `[ ]` Finalize global visual token mapping for all core surfaces

#### 1.4. Theme Switching

- `1.4.a` `[x]` Add manual theme toggle in `HeaderBar`
- `1.4.b` `[x]` Store manual preference in local storage
- `1.4.c` `[x]` Keep tooltip-based theme switch copy
- `1.4.d` `[ ]` Re-verify auto OS detection behavior against current implementation

#### 1.5. Score System Colors

- `1.5.a` `[x]` Apply score-color states in dashboard and detail view
- `1.5.b` `[ ]` Normalize all score-color usage through shared design tokens

#### 1.6. Typography

- `1.6.a` `[x]` Use Inter + JetBrains Mono in shell/dashboard UI
- `1.6.b` `[ ]` Audit remaining typography styles against the plan

#### 1.7. Brand Signatures (preserved)

- `1.7.a` `[x]` Keep branded header direction
- `1.7.b` `[ ]` Re-check gradient brand treatment and neon sphere behavior after later refactors

#### 1.8. ADR-Driven Front-End Refinements

- `1.8.a` `[x]` Improve contrast for theme toggle, tabs, and shell surfaces
- `1.8.b` `[x]` Improve light-theme background blending
- `1.8.c` `[ ]` Verify `will-change` usage is scoped only to animated elements
- `1.8.d` `[ ]` Move hover shadow token into theme config if still needed
- `1.8.e` `[ ]` Run a dedicated contrast verification pass for muted text tokens
- `1.8.f` `[ ]` Re-check dark/light scope parity for aurora background elements

#### 1.9. Results Shell UX Decision (Design Research, 2026-06-22)

- `1.9.a` `[x]` Research chat-vs-dashboard direction and save Lazyweb report
- `1.9.b` `[x]` Add UX decision to `docs/IMPLEMENTATION_PLAN.md`
- `1.9.c` `[x]` Separate composer mode and review mode in page hierarchy
- `1.9.d` `[x]` Make summary cards visible only after a real persisted run exists
- `1.9.e` `[x]` Make reasoning the primary review mode in detail view
- `1.9.f` `[x]` Keep raw output as secondary inspection mode
- `1.9.g` `[ ]` Continue aligning shell components with dashboard-first evaluator UX

---

### 2. Database Schema — v4

#### Phase 2: Database Foundation

##### `[NEW] lib/prisma.ts`

- `2.0.a` `[x]` Implement PrismaClient singleton

##### `[MODIFY] schema.prisma`

- `2.0.b` `[x]` Update schema with current core models and multi-tenancy structure
- `2.0.c` `[ ]` Add/verify full Collections, Categories, and Snippets model set from plan
- `2.0.d` `[ ]` Add/verify `maxTotalTokens` on `EvaluationRun`

##### `[MODIFY] auth.ts (or Auth config)`

- `2.0.e` `[x]` Add startup assertion for required auth env vars

##### `[NEW] prisma/seed.ts`

- `2.0.f` `[x]` Create seed script
- `2.0.g` `[ ]` Seed default Categories
- `2.0.h` `[ ]` Seed reusable Snippets
- `2.0.i` `[ ]` Add/verify richer demo seed for live dashboard mode if needed

---

### 3. Full Feature Map — Execution Tracking

#### Phase 3: Core Shell Components (MVP-1)

**Goal:** Prompt Input & Editing

##### `[NEW] components/HeaderBar.tsx`

- `3.0.a` `[x]` Build header shell
- `3.0.b` `[x]` Add theme toggle UX
- `3.0.c` `[ ]` Re-check final brand polish against Phase 1 after design-system completion

##### `[NEW] components/PromptInputZone.tsx`

- `3.0.d` `[x]` Replace misleading System Prompt / User Prompt split with better UX direction
- `3.0.e` `[x]` Add collapse / expand behavior
- `3.0.f` `[x]` Keep advanced settings separated from main writing flow
- `3.0.g` `[x]` Add simulated run-state feedback
- `3.0.h` `[ ]` Continue migrating controls to shared UI primitives

#### Phase 4: Results Dashboard & Detail View (MVP-3, MVP-4)

**Goal:** Complete dashboard UI to view results from DB

##### `[MODIFY] app/page.tsx`

- `4.0.a` `[x]` Replace static-only dashboard flow with DB-backed query + fallback logic
- `4.0.b` `[x]` Separate `Compose Run` and `Review Workspace` sections
- `4.0.c` `[ ]` Keep refining page shell hierarchy if Phase 1 research suggests more changes

##### `[MODIFY] components/ResultsDashboard.tsx`

- `4.0.d` `[x]` Add demo/live empty state behavior
- `4.0.e` `[x]` Hide summary cards until a real persisted run exists
- `4.0.f` `[x]` Keep dashboard-first review structure
- `4.0.g` `[ ]` Add chart treatment only if still required by updated UX direction

##### `[NEW] components/DetailSplitPane.tsx`

- `4.0.h` `[x]` Build split detail pane
- `4.0.i` `[x]` Make reasoning primary and raw output secondary
- `4.0.j` `[x]` Replace raw copy button with shared `Button`
- `4.0.k` `[ ]` Continue replacing equivalent raw controls with shared UI primitives
- `4.0.k.1` `[x]` Replace detail tabs in `DetailSplitPane` with shared `Button`
- `4.0.k.2` `[x]` Replace scenario selection items in `ResultsDashboard` with shared `Button`

#### Phase 5: Evaluation Engine (MVP-2, MVP-5)

**Goal:** End-to-end evaluation with Claude API + re-test workflow

##### `[NEW] app/api/evaluate/step/route.ts`

- `5.0.a` `[ ]` Create single-step execution endpoint
- `5.0.b` `[ ]` Add Claude API integration
- `5.0.c` `[ ]` Enforce `maxTotalTokens`
- `5.0.d` `[ ]` Enforce `Scenario` immutability rules

##### `[NEW] lib/evaluator.ts`

- `5.0.e` `[ ]` Implement evaluator agent
- `5.0.f` `[ ]` Read scoring dimensions dynamically from `Scenario.scoringMetrics`
- `5.0.g` `[ ]` Restrict override criteria to explicit use cases

#### Phase 6: Prompt Chaining Engine

##### `[NEW] components/ChainBuilder.tsx`

- `6.0.a` `[ ]` Build multi-step chain UI
- `6.0.b` `[ ]` Add step add/remove/reorder behavior
- `6.0.c` `[ ]` Validate supported template variables

#### Phase 7: Collections, Categories & Snippets (MVP-6, MVP-7, MVP-8)

##### `[NEW] components/CollectionManager.tsx`

- `7.0.a` `[ ]` Create collection CRUD UI

##### `[NEW] components/CategorySelector.tsx`

- `7.0.b` `[ ]` Create category selector UI

##### `[NEW] components/SnippetAutocomplete.tsx`

- `7.0.c` `[ ]` Add slash-trigger snippet autocomplete

#### Phase 8: Evaluator Overrides & Advanced Config

##### `[NEW] components/OverrideModal.tsx`

- `8.0.a` `[ ]` Create override library CRUD UI

---

## Documentation / Standards Alignment

- `D.1` `[x]` Sync `AGENTS.md` with current code standards
- `D.2` `[x]` Move `Code Standards` under `3. Code Quality, Tooling & 2026 Best Practices`
- `D.3` `[x]` Add structured micro-step reporting rule for agent output
- `D.4` `[ ]` Keep `TASK.md` synchronized with `docs/IMPLEMENTATION_PLAN.md` after each accepted step
