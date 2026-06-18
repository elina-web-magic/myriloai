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
- **BEM Naming:** Apply BEM for all custom CSS classes in React components (e.g., `scenario-card__header`).
- **Prisma Singleton:** Always import `prisma` from `src/lib/prisma.ts`.
- **Early Returns:** Use early returns to avoid deep nesting (if-else).
- **Icons:** Use `lucide-react` for standard UI icons and `next/image` for custom SVGs.
- **Prompt Engineering:** Decouple logic from syntax, never force LLMs to do exact math, prevent context dilution by passing only necessary metadata.

## 4. Agent Workflow & Behavior

- **Iterative execution:** NEVER write an entire phase at once. Break work into micro-steps.
- **Documentation:** Always consult `implementation_plan.md` and `task.md` before making architectural decisions.
- **Tracking:** Remind the user to update `task.md` when a step is fully complete.
- **Permission:** After each micro-step, ALWAYS ask: "Does this look good, and can we proceed to the next step?"
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
