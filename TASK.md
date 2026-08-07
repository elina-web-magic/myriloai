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
1. ⬜️ Re-check final brand polish against Phase 8 after design-system completion

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

#### Local Sandbox Runtime

1. ✅ Introduce environment-gated mock mode backed by a local static registry (explicit `ALLOW_MOCK_DATA` flag instead of `NODE_ENV` alone)
    1. ✅ Route dashboard report data through local static registry
    1. ✅ Add environment guard that forbids mock mode in production (`static-registry.ts` throws at import time if `ALLOW_MOCK_DATA=true` and `NODE_ENV=production`)
    1. ✅ Expand static registry usage to evaluate submit and response parsing flows
        1. ✅ Add mock evaluation fixture, registry submit helper, and `/api/evaluate/submit` route for offline request/response parsing
    1. ✅ Add explicit mock-source logging for offline responses
        1. ✅ Log `[Mock Registry] Response served for ...` from `static-registry.ts` for dashboard and submit flows
1. ✅ Integrate localized text management (deferred — see Phase 12)

#### Validation Contract & Error Model

1. ✅ Draft global bi-directional validation contract with Zod
    1. ✅ Define `EvaluationRequest` schema
    1. ✅ Define `EvaluationResponse` schema
    1. ✅ Define `DashboardResult` schema
    1. ✅ Define `StandardizedError` schema and TS type
        1. ✅ Add shared `zod` contracts in `src/lib/contracts/evaluation.ts` and reusable inferred types in `src/types.ts`
    1. ✅ Refactor UI error rendering to consume structured error objects
        1. ✅ Keep `StandardizedError` as client state and render severity, code, field, and details in `PromptInputZone`

#### MVP Mock Scenarios

1. ✅ Build minimum MVP mock scenario set
    1. ✅ Build `success_perfect` fixture
    1. ✅ Build `error_malformed_json` fixture
    1. ✅ Build `error_missing_context` fixture
        1. ✅ Add mock scenario selector to `PromptInputZone` and route all three scenarios through `static-registry.ts`
1. ✅ Defer non-MVP mock scenarios explicitly
    1. ✅ Defer `success_partial` until post-MVP
    1. ✅ Defer `error_provider_timeout` until post-MVP
    1. ✅ Defer `error_prompt_injection` until post-MVP
        1. ✅ Track deferred post-MVP scenarios in the dev mock layer to keep the sandbox roadmap explicit

---

### Phase 3: Vitest + Testing Library

#### Testing Foundation

1. ✅ Add Vitest test runner and Testing Library baseline
    1. ✅ Configure `vitest` for app code and jsdom-based component tests
    1. ✅ Configure Testing Library helpers and shared test setup
1. ✅ Add first high-value component and contract tests for Phase 2 flows
    1. ✅ Cover `PromptInputZone` structured error rendering
    1. ✅ Cover evaluation contract parsing and mock registry submit flow
1. ✅ Define testing conventions for future phases
    1. ✅ Document where component tests, contract tests, and sandbox tests should live

---

### Phase 4: Database Foundation

#### `[NEW] lib/prisma.ts`

1. ✅ Implement PrismaClient singleton

#### `[MODIFY] schema.prisma`

1. ✅ Update schema with current core models and multi-tenancy structure
1. ✅ Add/verify full Collections, Categories, and Snippets model set from plan
1. ✅ Add/verify `maxTotalTokens` on `EvaluationRun`
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
1. ✅ Seed reusable Snippets
1. ✅ Add/verify richer demo seed for live dashboard mode if needed

---

### Phase 5: Evaluation Engine (MVP-2, MVP-5)

**Goal:** End-to-end evaluation with Claude API + re-test workflow

#### `[NEW] app/api/evaluate/step/route.ts`

1. ✅ Create single-step execution endpoint
1. ✅ Add Claude API integration
1. ✅ Enforce `maxTotalTokens`
1. ✅ Enforce `Scenario` immutability rules

#### `[NEW] lib/evaluator.ts`

1. ✅ Implement evaluator agent
1. ✅ Read scoring dimensions dynamically from `Scenario.scoringMetrics`
1. ✅ Restrict override criteria to explicit use cases
1. ✅ Implement panel-of-judges scoring (PoLL pattern: 2–3 diverse cheap models + majority/average vote) instead of a single judge — see `docs/ARCHITECTURE_RESEARCH_AUDIT.md` §3.1
    1. ✅ Refactor `evaluateResponse` to accept an array of models and run `Promise.all`
    2. ✅ Implement `aggregatePanelResults` logic
    3. ✅ Update API route to supply the Anthropic PoLL panel and set `judgeModel` to `'poll-anthropic-v1'`
1. ✅ Decide Zod schema field order (`reasoning`/`evidence` before numeric `scores`) and prompted-JSON-with-retry vs. constrained decoding for the judge call (Switched to XML + Regex parsing)

#### `[NEW] Human-in-the-Loop Interactivity`

1. ✅ Implement Visual Override Score workflow with text notes for log traces
    1. ✅ Add `overrideSubmitSchema` to Zod contracts
    2. ✅ Create `POST /api/evaluate/override` endpoint for logging traces
    3. ✅ Add `Override Score` dialog and action button to `DetailSplitPane`

#### `[MODIFY] Error Factory & Logger Adaptation`

1. ✅ Create `src/lib/errors.ts` to centralize `StandardizedError` definitions
1. ✅ Update `src/lib/logger/types.ts` to support `code`, `severity`, `field`, `details`
1. ✅ Update `Logger.serializeError` in `logger.ts` to map `StandardizedError` fields
1. ✅ Refactor `PromptInputZone.tsx` and API routes to use the new Error Factory

---

### Phase 6: Evaluation Guardrails & Safety Layer

**Goal:** Wrap the evaluation engine with layered safety controls (input → dialog → output rails)

#### `[NEW] lib/guardrails/input-rails.ts`

1. ✅ Implement payload size validation
    1. ✅ Enforce max scenario input size (characters + estimated tokens)
    1. ✅ Enforce max dataset import size (row count + total payload)
    1. ✅ Return structured `StandardizedError` with code `INPUT_TOO_LARGE` on violation
1. ✅ Implement prompt injection detection (server-side)
    1. ✅ Add regex/keyword heuristic scanner for known injection patterns in scenario content
    1. ✅ Flag detected injections as warnings and persist flags on `EvaluationResult`
    1. ✅ Add XML-tag fencing utility for wrapping untrusted scenario input and model output
    1. ✅ Extend injection scanner with missing high-risk patterns (from `docs/GUARDRAILS_GUIDE.md`)
        1. ✅ `authority-escalation` — fake `SYSTEM:` / `ADMIN:` / `[DEVELOPER MODE]` / `Anthropic override:` headers (Guide #7, Risk 8)
        1. ✅ `instruction-substitution` — `from now on you must`, `your real task is`, `your actual task` (Guide #2, Risk 8)
        1. ✅ `meta-instruction-to-judge` — `skip the rubric`, `do not penalize`, `ignore quality issues` (Guide #15, Risk 9)
        1. ✅ `fake-rubric-injection` — `according to (the )?evaluation guidelines`, `scoring rule` inside payload (Guide #16, Risk 8)
        1. ✅ `judge-impersonation` — `As the evaluator`, `Evaluation: PASS`, `I confirm.*verdict` (Guide #31, Risk 8)
        1. ✅ `self-assessment-injection` — `\[APPROVED\]`, `already passed review`, `Verified by expert` (Guide #17, Risk 7)
        1. ✅ `fake-conversation-turns` — `^Human:`, `^Assistant:`, `<\|im_start\|>` role markers (Guide #14, Risk 7)
        1. ✅ `homoglyph-normalization` — NFKC + strip zero-width chars (U+200B, U+FEFF) before all pattern matching (Guide #8, Risk 7)
        1. ✅ `hypothetical-wrapper` — `hypothetical|fictional|imagine` + constraint-removal phrase (Guide #18, Risk 6)
        1. ✅ `test-simulation-framing` — `sandbox mode`, `test mode`, `simulation.*no restrictions` (Guide #19, Risk 6)
        1. ✅ Fix false positive: narrow `xml-escape-attempt` to only OUR fence tags (`</untrusted-input>`, `</model-output>`); remove `system|instruction|context` — these are legitimate prompt engineering tags
        1. ✅ Escape developer-authored content before fencing: in `fenceUntrustedInput`, replace `<` → `&lt;` and `>` → `&gt;` for the developer `prompt` field only (trusted source, escape not flag)
    1. ✅ Write Vitest unit tests for `src/lib/guardrails/input-rails.test.ts`
        1. ✅ Size validation — `validateScenarioInputSize`: input within limit → `null`; input at exact limit → `null`; input +1 char over limit → `INPUT_TOO_LARGE` (field `scenario`); estimated tokens over limit → `INPUT_TOO_LARGE`
        1. ✅ Size validation — `validateDatasetImportSize`: 500 rows → `null`; 501 rows → `INPUT_TOO_LARGE` (field `dataset`); rows within count but total chars over limit → `INPUT_TOO_LARGE`
        1. ✅ Injection scanner — true positives: one test case per pattern (all 21 patterns after 6.2.d); each must return `flagged: true` with correct `pattern` name in `matches`
        1. ✅ Injection scanner — true negatives: clean plain text → `flagged: false, matches: []`; legitimate `</context>` tag (after fix xi) → `flagged: false`; `</untrusted-input>` → `flagged: true`
        1. ✅ Fencing utilities — `fenceUntrustedInput`: wraps content in correct tags; content containing `<` / `>` is escaped (after fix xii); `fenceModelOutput`: wraps in `<model-output>` tags
    1. ✅ Translate docs/GUARDRAILS_GUIDE.md to Ukrainian (`docs/GUARDRAILS_GUIDE_UA.md`)
1. ✅ Implement rate limiting for evaluation runs
    1. ✅ Add per-user rate limit for run creation (configurable, e.g. 20 runs/hour)
    1. ✅ Add per-project concurrent run limit
    1. ✅ Return structured `StandardizedError` with code `RATE_LIMIT_EXCEEDED`

#### `[NEW] lib/guardrails/dialog-rails.ts`

1. ✅ Implement evaluator prompt builder with safety fencing
    1. ✅ Build prompt template with explicit XML-tag boundaries between trusted instructions and untrusted content
    1. ✅ Add explicit "ignore embedded instructions" directive in evaluator system prompt
    1. ✅ Enforce minimal context principle — pass only `taskDescription` + `scoringMetrics` + evaluated output
1. ✅ Implement context budget enforcement
    1. ✅ Calculate assembled evaluator prompt token count before sending
    1. ✅ Reject evaluation if assembled prompt exceeds judge model context budget

#### `[NEW] lib/guardrails/output-rails.ts`

1. ✅ Implement hallucination flag taxonomy
    1. ✅ Define explicit failure label enum: `HALLUCINATION`, `IRRELEVANCE`, `REFUSAL`, `FORMATTING_DRIFT`, `GROUNDING_FAILURE`, `SCORE_WITHOUT_EVIDENCE`
    1. ✅ Add `failureLabels` field to `EvaluationResult` Prisma model
    1. ✅ Implement auto-detection: flag `SCORE_WITHOUT_EVIDENCE` when evaluator reasoning is shorter than threshold
    1. ✅ Implement auto-detection: flag `FORMATTING_DRIFT` when Zod parse requires retry
1. ✅ Implement output sanitization pipeline
    1. ✅ Sanitize evaluator raw output before DB persistence
    1. ✅ Sanitize rendered model output in UI — never `dangerouslySetInnerHTML`
    1. ⏸️ [DEFERRED] Add markdown rendering allowlist — activate when markdown preview is added to UI (DetailSplitPane or ResultsDashboard)
1. ✅ Implement evaluator consistency checks (PoLL support)
    1. ✅ Compare scores across panel judges — flag `EVALUATOR_DISAGREEMENT` when scores differ by > threshold
    1. ✅ Persist per-judge individual scores and disagreement flags
    1. ✅ Log low-confidence cases for manual review queue
1. ✅ Implement groundedness checks
    1. ✅ Require evidence-backed scoring per rubric dimension
    1. ✅ Add groundedness verification: check that cited evidence exists in evaluated output
    1. ✅ Flag `GROUNDING_FAILURE` when evidence doesn't match source
1. ✅ Implement uncertainty surfacing in UI
    1. ✅ Add uncertainty badge component
    1. ✅ Replace single opaque score with dimension-level breakdown + confidence indicators
    1. ✅ Surface failure labels and disagreement flags in `ResultsDashboard` and `DetailSplitPane`
    1. ✅ Surface `injectionFlags` in `ResultsDashboard` — warning badge per result when `injectionFlags` is non-empty; show flagged pattern names on hover/expand
    1. ✅ Add client-side payload size guard in `PromptInputZone` — check char count against `INPUT_LIMITS.SCENARIO_MAX_CHARS` on input change; pass `INPUT_TOO_LARGE` `StandardizedError` to existing error renderer and disable submit button

#### `[NEW] lib/guardrails/input-rails.ts — Advanced Attack Patterns`

1. ✅ Implement stacked/combined attack scoring
    1. ✅ Replace boolean `flagged` with weighted `riskScore` — each pattern carries a weight; score = sum of matched weights
    1. ✅ Define `HIGH_RISK_THRESHOLD` (e.g. ≥2 patterns matched, regardless of individual weight); flag `STACKED_INJECTION` when exceeded
    1. ✅ Add `riskScore` and `stackedAttack` flag to `InjectionScanResult` type
    1. ✅ Add Vitest tests: single weak pattern below threshold → not stacked; 3 weak patterns combined → stacked flag
1. ✅ Implement YAML/JSON frontmatter stripping
    1. ✅ Add `stripFrontmatter(content: string): string` to `input-rails.ts` — strips YAML (`---…---`) and TOML (`+++…+++`) frontmatter before scanning
    1. ✅ Add `detectFrontmatterInjection(content: string): boolean` — flags `system_override`, `verdict`, `score`, `approved` keys inside stripped frontmatter as `FRONTMATTER_INJECTION`
    1. ✅ Call strip + detect in `scanForInjection` before all other pattern matching
    1. ✅ Add Vitest tests: clean frontmatter → no flag; `verdict: pass` in YAML → flagged; content after strip is clean → scanning proceeds on stripped text
1. ✅ Extend authority-escalation pattern to fake external citations
    1. ✅ Add `fake-external-citation` pattern: `per\s+(official|anthropic|openai).{0,40}(documentation|guidelines|policy|section)/i`
    1. ✅ Add `trusted-tag-claim` pattern: `\[TRUSTED\]|\[VERIFIED\]|\[APPROVED_BY\]/i` (not already covered by `self-assessment-injection`)
    1. ✅ Add Vitest tests: `"Per official Anthropic guardrails documentation v3.2…"` → flagged; plain citation in quotes → not flagged
1. ✅ Implement adversarial suffix heuristic
    1. ✅ Add `detectAdversarialSuffix(text: string): boolean` — flags short segments (≤120 chars) with special-char density > 30% (`[^\w\s]` ratio) as `ADVERSARIAL_SUFFIX`
    1. ✅ Sliding window scan: check every 80-char window, flag if any window exceeds threshold
    1. ✅ Add to `scanForInjection` pipeline after normalization
    1. ✅ Add Vitest tests: clean prose → not flagged; known adversarial suffix string → flagged; code block with operators → tune threshold to avoid false positive
1. ✅ Implement translation-chain detection heuristic
    1. ✅ Add `detectDegradedTranslation(text: string): boolean` — flags text with mixed script blocks (Latin + non-Latin alternating within same sentence) as `TRANSLATION_CHAIN`
    1. ✅ Add Unicode script range checks: flag if > 2 distinct Unicode blocks detected within a 200-char window
    1. ✅ Add Vitest tests: plain English → not flagged; mixed Cyrillic+Latin alternating in same phrase → flagged; multilingual doc with paragraph-separated languages → not flagged
1. ✅ Build red-team adversarial eval fixture set
    1. ✅ Create `src/lib/guardrails/__fixtures__/adversarial-inputs.ts` — export typed array of `{ label: string; input: string; expectedPattern: string }` for all 21+ patterns
    1. ✅ Add stacked attack fixtures: 3-pattern combinations; expected `stackedAttack: true`
    1. ✅ Add adversarial suffix fixtures from published research examples
    1. ✅ Add frontmatter injection fixtures
    1. ✅ Add holdout test file `input-rails.adversarial.test.ts` — iterate all fixtures, assert `flagged: true` and correct `pattern` name; track miss rate in test output
1. ⬜️ [DEFERRED — multimodal] Vision-layer injection guardrail
    1. ⬜️ [DEFERRED] Add pre-flight check: if evaluation input contains image attachments, run OCR extract before `scanForInjection`
    1. ⬜️ [DEFERRED] Flag `VISUAL_INJECTION` when OCR text triggers any existing injection pattern
    1. ⬜️ Note: activate only when multimodal inputs are added to the evaluation pipeline

#### `[DEFERRED] Retrieval Rails`

1. ⬜️ [DEFERRED] Retrieval rail: groundedness source verification against RAG context
1. ⬜️ [DEFERRED] Retrieval rail: poisoned context exclusion filter
1. ⬜️ [DEFERRED] Content moderation model (Llama Guard via Ollama)

---

### Phase 7: Results Dashboard & Detail View (MVP-3, MVP-4)

**Goal:** Complete dashboard UI to view results from DB

#### `[MODIFY] app/page.tsx`

1. ✅ Replace static-only dashboard flow with DB-backed query + fallback logic
1. ✅ Separate `Compose Run` and `Review Workspace` sections
1. ✅ Move `PromptInputZone` to top of main content column (above Review Workspace)
1. ✅ Add Console Panel as fixed right-side panel for run status and raw output
1. ⬜️ Keep refining page shell hierarchy if Phase 8 research suggests more changes

#### `[MODIFY] components/ResultsDashboard.tsx`

1. ✅ Add demo/live empty state behavior
1. ✅ Hide summary cards until a real persisted run exists
1. ✅ Keep dashboard-first review structure
1. ✅ Add chart treatment only if still required by updated UX direction
    1. ✅ Install `recharts` v3
    1. ✅ Create `ScoreChart` component (`src/components/dashboard/ScoreChart.tsx`) — per-dimension avg bar chart with color-coded bars
    1. ✅ Render `ScoreChart` in `ResultsDashboard` between summary cards and scenario list (live data only)

#### `[NEW] components/DetailSplitPane.tsx`

1. ✅ Build split detail pane
1. ✅ Make reasoning primary and raw output secondary
1. ✅ Replace raw copy button with shared `Button`
1. ⬜️ Continue replacing equivalent raw controls with shared UI primitives
    1. ✅ Replace detail tabs in `DetailSplitPane` with shared `Button`
    1. ✅ Replace scenario selection items in `ResultsDashboard` with shared `Button`

---

### Phase 8: Design System — Cyan-Sky-Violet Aurora

#### Shadcn UI Installation

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

#### Component Catalog (Ladle)

1. ✅ Add Ladle configuration
    1. ✅ Create `.ladle/config.mjs` with stories glob, port 61000, dark default, a11y addon
    1. ✅ Add `ladle:serve` and `ladle:build` scripts to `package.json`
1. ✅ Add first stories for shell primitives
1. ✅ Add first stories for dashboard primitives
    1. ✅ Create `ResultsDashboard` Ladle story with persisted sample data
    1. ✅ Create `DetailSplitPane` Ladle story with persisted sample data
    1. ✅ Create `ResultsDashboard` empty-state Ladle story
    1. ✅ Create `ResultsDashboard` demo-state Ladle story

#### Chosen Aesthetic

1. ✅ Apply Cyan-Sky-Violet Aurora direction to the shell
1. ✅ Refine light theme card styling away from flat white blocks
1. ⬜️ Finalize global visual token mapping for all core surfaces
    1. ✅ Add shared interactive surface tokens and map `GlassCard` hover to them

#### Theme Switching

1. ✅ Add manual theme toggle in `HeaderBar`
1. ✅ Store manual preference in local storage
1. ✅ Keep tooltip-based theme switch copy
1. ⬜️ Re-verify auto OS detection behavior against current implementation

#### Score System Colors

1. ✅ Apply score-color states in dashboard and detail view
1. ⬜️ Normalize all score-color usage through shared design tokens

#### Typography

1. ✅ Use Inter + JetBrains Mono in shell/dashboard UI
1. ⬜️ Audit remaining typography styles against the plan

#### Brand Signatures (preserved)

1. ✅ Keep branded header direction
1. ⬜️ Re-check gradient brand treatment and neon sphere behavior after later refactors

#### ADR-Driven Front-End Refinements

1. ✅ Improve contrast for theme toggle, tabs, and shell surfaces
1. ✅ Improve light-theme background blending
1. ⬜️ Verify `will-change` usage is scoped only to animated elements
1. ⬜️ Move hover shadow token into theme config if still needed
1. ⬜️ Run a dedicated contrast verification pass for muted text tokens
1. ⬜️ Re-check dark/light scope parity for aurora background elements

#### Results Shell UX Decision (Design Research, 2026-06-22)

1. ✅ Research chat-vs-dashboard direction and save Lazyweb report
1. ✅ Add UX decision to `docs/IMPLEMENTATION_PLAN.md`
1. ✅ Separate composer mode and review mode in page hierarchy
1. ✅ Make summary cards visible only after a real persisted run exists
1. ✅ Make reasoning the primary review mode in detail view
1. ✅ Keep raw output as secondary inspection mode
1. ✅ Move `PromptInputZone` to top of main content column (above Review Workspace)
1. ✅ Add Console Panel as fixed right-side panel for run status and raw output
1. ⬜️ Continue aligning shell components with dashboard-first evaluator UX

#### UI + Project Structure Bug Fixes

##### 8.UI.1 Layout — Grid Width Distribution

1. ✅ Fix `className="app"` static `lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(22rem,0.7fr)]` to react to collapsed states of `ResultsDashboard` and `ConsoleSidebar` (e.g. via CSS custom properties or dynamic Tailwind class composition)

##### 8.UI.2 Review Workspace Width

1. ✅ Align Review Workspace block width to match the prompt input zone block width

##### 8.UI.3 PromptInputZone Visual Nesting

1. ✅ Reduce `prompt-input-zone` visual nesting to max 2 layers
    1. ✅ Move "Manual Testing Completed" state indicator into `ConsoleSidebar`
    1. ✅ Remove the redundant layer from `PromptInputZone`

##### 8.UI.4 Ladle Stories — Light Theme Aurora Background

1. ✅ Fix all component stories in light theme: add Aurora gradient background (currently absent)

##### 8.UI.5 Glass Effect

1. ✅ Audit and fix glass effect rendering on every component (backdrop-filter, bg-opacity tokens, border highlights)

##### 8.Structure.1 BEM Classes

1. ✅ Audit every component and add BEM-style classes to all meaningful elements that currently lack them

##### 8.Structure.2 Inline Styles Extraction

1. ✅ Remove inline `style={{}}` from all components; replace with Tailwind utility classes or extract to a component-scoped `style.css` / page-level CSS file keyed by BEM class

##### 8.Structure.3 Functions → Helpers / Utils

1. ✅ Move any function defined inside a component to a helper file
    1. ✅ Place shared/repeated functions in the global `src/utils/` or `src/lib/` folder
    1. ✅ Place component-local functions in a `utils.ts` (or `helpers.ts`) file co-located with the component

##### 8.Structure.4 Arrow Functions

1. ✅ Replace all `function` declarations inside app code and component helpers with arrow function equivalents

##### 8.Structure.5 Types & Interfaces Extraction

1. ✅ Move all types and interfaces out of component bodies
    1. ✅ Place repeated/shared types in `src/types.ts`
    1. ✅ Place component-local types in a sibling `types.ts` inside the component folder

##### 8.Structure.6 Constants Extraction

1. ⬜️ Move magic values and constant literals into a shared `src/constants.ts` or a component-scoped `constants.ts`

##### 8.Structure.7 Extract Review Workspace Header into a Component

1. ✅ Extract the `app__section-header` block (eyebrow + h2 + description) from `src/app/page.tsx` into a dedicated component (e.g. `src/components/shell/ReviewWorkspaceHeader.tsx`)

##### 8.Structure.8 Extract Main Content Column into a Component

1. ✅ Extract the full `app-wrapper` block from `src/app/page.tsx` (wraps `MobileHeader`, `PromptInputZone`, and the `GlassCard` Review Workspace) into a dedicated component (e.g. `src/components/shell/MainContentColumn.tsx`)

##### 8.Structure.9 Update Rules in Implementation Plan & AGENTS.md

1. ⬜️ Add the rules defined in this bug-fix block to `docs/IMPLEMENTATION_PLAN.md`
1. ⬜️ Add or update the corresponding rules in `AGENTS.md` (Coding Guidelines section)

---

### Phase 9: Prompt Chaining Engine

#### `[NEW] components/ChainBuilder.tsx`

1. ⬜️ Build multi-step chain UI
1. ⬜️ Add step add/remove/reorder behavior
1. ⬜️ Validate supported template variables

---

### Phase 10: Collections, Categories & Snippets (MVP-6, MVP-7, MVP-8)

#### `[NEW] components/CollectionManager.tsx`

1. ⬜️ Create collection CRUD UI

#### `[NEW] components/CategorySelector.tsx`

1. ⬜️ Create category selector UI

#### `[NEW] components/SnippetAutocomplete.tsx`

1. ⬜️ Add slash-trigger snippet autocomplete

---

### Phase 11: Evaluator Overrides & Advanced Config

#### `[NEW] components/OverrideModal.tsx`

1. ⬜️ Create override library CRUD UI

---

### Phase 12: Observability Tracking & Operational Security

#### `[NEW] components/TraceabilityAnalytics.tsx`

1. ⬜️ Build diagnostic feed illustrating requests, prompts, responses, and latency.

#### `[MODIFY] Middleware / API Access Controls`

1. ⬜️ Replace IP-based rules with clerk-managed user constraints.

---

### Phase 13: Localization Pipeline (i18n)

1. ⬜️ Keep i18n out of MVP scope
1. ✅ Introduce localized text management after sandboxing, contracts, and structured error rendering are stable
    1. ✅ Add local `en/de` copy dictionaries plus locale provider and store sync
    1. ✅ Add `app/[locale]` routing with `/` redirecting to `/de`
    1. ✅ Add `DE/EN` language switching in the left sidebar
    1. ✅ Localize `PromptInputZone`, `ResultsDashboard`, `DetailSplitPane`, sidebar, run states, and error copy
    1. ✅ Add locale-aware mock evaluation fixtures and pass locale through `/api/evaluate/submit`
    1. ✅ Update the judge prompt to evaluate German and English responses without language bias
    1. ✅ Verify localization changes with Vitest and environment-limited manual route checks

---

## Documentation / Standards Alignment

- `D.1` `✅` Sync `AGENTS.md` with current code standards
- `D.2` `✅` Move `Code Standards` under `3. Code Quality, Tooling & 2026 Best Practices`
- `D.3` `✅` Add structured micro-step reporting rule for agent output
- `D.4` `✅` Keep `TASK.md` synchronized with `docs/IMPLEMENTATION_PLAN.md` after each accepted step
