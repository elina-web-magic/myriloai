# Myrilo AI — Global AI Agent Rules

## 1. Project Context

Myrilo AI is an Agentic LLM Evaluation Platform (LLM-as-a-Judge) designed for rapid iteration and testing of prompts against datasets.
Design system: Aurora Glass (Cyan, Sky, Violet, glassmorphism cards, light/dark mode support).

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (Strict mode)
- **Database:** PostgreSQL + Prisma v7.8.0 (with `@prisma/adapter-pg` and `pg` pool)
- **Auth:** NextAuth (Auth.js) v4 via GitHub OAuth
- **Styling:** TailwindCSS v4 + BEM methodology for custom classes (e.g., `.app__logo-icon`)
- **Background Jobs:** Inngest
- **Tooling:** Biome (linter/formatter), Knip (dead code elimination)

## 3. Coding Guidelines

- **STRICT TYPING:** No `any`. Use `unknown` if unsure. Never use `// biome-ignore lint/suspicious/noExplicitAny`.
- **Arrow Functions:** Prefer arrow functions instead of `function` declarations in app code and component helpers.
- **Semicolons:** End statements with `;`. Keep formatter/editor settings aligned so semicolons are auto-inserted on save.
- **BEM Naming:** Apply BEM for all custom CSS classes in React components (e.g., `scenario-card__header`).
- **BEM Coverage:** Give each meaningful element its own BEM class instead of styling only through anonymous utility chains.
- **Prisma Singleton:** Always import `prisma` from `src/lib/prisma.ts`.
- **Prisma Client Import:** Never import `PrismaClient` from `@prisma/client`. Always use `import { PrismaClient } from '@/generated/prisma'` in app code. Scripts outside `src/` (e.g. `prisma/seed.ts`) must use the equivalent relative path `@/generated/prisma` because the `@/` alias is not available there.
- **Prisma Types:** Do not import `Prisma` namespace types from `@prisma/client` in app code. Use `import type { Prisma } from '@/generated/prisma'` when the namespace is needed, or prefer narrow runtime types such as `import type { JsonValue } from '@/generated/prisma/runtime/client'` when only JSON typing is required.
- **Type Placement:** Put cross-project reusable types in a global `src/types.ts`. Put component-local types in a sibling `types.ts` inside that component folder.
- **Utility Placement:** Move helper functions out of components into `utils/` files. Use global utils for shared logic and component-scoped `utils/<theme>/` files only when the logic is truly local to that component.
- **Hooks Placement:** Move custom hooks into dedicated `hooks/` folders. Keep shared browser/runtime hooks under global `src/hooks/` (for example: timers, resize, debounce, interval-related hooks).
- **Import Paths:** Use alias imports such as `@/lib/auth` instead of deep relative paths like `../../../../lib/auth`.
- **UI Primitives:** Prefer Shadcn UI primitives (`Button`, `Card`, inputs, dialogs, typography wrappers where available) over raw HTML elements when an equivalent shared UI primitive already exists.
- **Early Returns:** Use early returns to avoid deep nesting (if-else).
- **Icons:** Use `lucide-react` for standard UI icons and `next/image` for custom SVGs.
- **Prompt Engineering:** Decouple logic from syntax, never force LLMs to do exact math, prevent context dilution by passing only necessary metadata.

## 4. Agent Workflow & Behavior

- **Iterative execution:** NEVER write an entire phase at once. Break work into micro-steps.
- **Documentation:** Always consult `implementation_plan.md` and `task.md` before making architectural decisions.
- **Tracking:** Remind the user to update `task.md` when a step is fully complete.
- **Task Completion Tracking:** When a concrete task/checkbox is fully completed, immediately update the corresponding checkbox in `TASK.md` to `[x]`.
- **Nano-Task Tracking:** Every implementation action completed in a single output must also be represented in `TASK.md` as its own child checkbox with an extended number, for example `1.1.d.1`, `1.1.d.2`, `4.0.k.1`.
- **Progress Output Format:** After each completed micro-step, report the **step number**, **step title**, **phase**, and a short explanation of changes **for each touched file**, not just a file list.
- **Progress Header:** In every substantive progress output, include a header in this structure:
  - `Phase: <phase title>`
  - `Step: <step title>`
  - `Task: <task checkbox number>. <task title>`
  Use the numbering and titles from `TASK.md` / `docs/IMPLEMENTATION_PLAN.md`, not an ad hoc sequential "Step 16" style label.
- **Progress Footer:** In every substantive progress output, end with this 12-point footer format:
  — *Execution Questions:*
  1. `Are there any questions regarding the implementation?`
  2. `Are there any remarks or feedback?`
  3. `Are there any theoretical questions?`
  — *Plan Navigation:*
  4. `Should we return to a skipped step - <part number> <sub-step number> <step_number> <title>?`
  5. `Should we move to the next step <next_part_number> <next_sub-step_number> <step_number> <title>?`
  — *Git — Branch:*
  6. `Create a new branch for the completed tasks and switch to it? (format: feat/<scope>, fix/<scope>, chore/<scope> — e.g. feat/aurora-ui)`
  — *Git — Commit:*
  7. `Commit the changes? (format: <type>(<scope>): <message> — e.g. feat(ui): add Dialog primitive)`
  8. `Create a commit amend (update the last commit)? (command: git commit --amend --no-edit)`
  — *Git — Push:*
  9. `Push the new branch? (command: git push --set-upstream origin <branch-name>)`
  10. `Push? (command: git push)`
  11. `Force push after amend? (command: git push --force-with-lease)`
  — *Pull Request:*
  12. `Generate a Markdown description and Title for a PR in English?`
- **Next Step Semantics:** In footer item 5, always reference the **next planned step after the last fully completed accepted task in the agreed execution order**. Item 5 must not point to the skipped task from item 4 unless that skipped task is also the actual next task after the latest completed one.
- **Branch Naming:** Use prefixes `feat/`, `fix/`, or `chore/` followed by a short kebab-case scope (e.g., `feat/aurora-ui`, `fix/prisma-import`, `chore/ladle-config`). Always branch off from `main` unless otherwise agreed.
- **Commits:** Use the Conventional Commits format `<type>(<scope>): <message>` (e.g., `feat(ui): add Dialog primitive`, `chore(ladle): add config and scripts`). Keep messages in English, imperative mood, ≤72 chars.
- **Checklist Numbering:** When editing `TASK.md` or adding tracking checklists to `docs/IMPLEMENTATION_PLAN.md`, every checkbox must have an explicit hierarchical number such as `1.1.a`.
- **Permission:** After each micro-step, ALWAYS ask the numbered next-step footer question above.
- **Terminal:** Use `pnpm` instead of `npm` for installing packages and running scripts.

---
<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---
name: lazyweb
description: Use Lazyweb design research skills and MCP tools for competitive UI analysis, quick references, design improvement, creative ideas, and A/B test research.
version: 1.0.0
tags:

- design-research
- ui-references
- mcp

---

## Lazyweb

Use Lazyweb before designing, critiquing, or changing product UI when the agent needs real app screenshots, competitor references, best practices, quick examples, creative cross-category ideas, paywall optimization guidance, signup optimization, CTA guidance, or mobile growth and monetization A/B test context.

Research before design work. Every design must be grounded in references before implementation. Do not rely on the model's generic design taste. Use Lazyweb MCP to find design references.

For heavier design research work, use the Lazyweb skills below. Route to the matching installed Lazyweb skill and follow that skill from the top:

- Design research, best practices, competitive analysis, or "what do top apps do" -> lazyweb-design-research
- Quick examples, screenshots, or UI references without a full report -> lazyweb-quick-references
- Improve, critique, or compare an existing design -> lazyweb-design-improve
- Creative, unconventional, cross-category ideas -> lazyweb-design-brainstorm
- Paywall redesign, critique, or conversion optimization -> lazyweb-paywall-optimization
- Rewrite, evaluate, or stress-test one paywall CTA button -> lazyweb-paywall-cta
- Signup or registration screen optimization -> lazyweb-signup-optimization
- A/B tests, experiments, pricing, trials, lifecycle, or monetization strategy -> lazyweb-ab-test-research
- Design best practices for a specific craft topic -> lazyweb-design-best-practices
- Updating local Lazyweb skills, reinstalling Lazyweb, or syncing agentic IDEs -> lazyweb-update
- Anything UI-related that fits none of the above -> lazyweb

Use Lazyweb MCP tools for evidence whenever they are available. Start by confirming lazyweb_get_workflows exists, then call lazyweb_get_workflows with operation=list and task_context="first run Lazyweb capabilities". Do not use lazyweb_get_flows for the first-run capability guide; it is only for ordered product journeys.
