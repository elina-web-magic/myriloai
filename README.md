# Myrilo AI - Prompt Testing Environment

Myrilo AI is a dedicated web application designed for prompt engineering, testing, and evaluation. It allows developers and AI researchers to experiment, chain, evaluate, and optimize their prompts iteratively. The application provides an advanced environment with an LLM-as-a-judge evaluation engine, specifically integrated with the Claude API.

## Design Aesthetic

The application features a modern **Dual-Theme Cyan-Sky-Violet Aurora** (Aurora Liquid Glass) design. It utilizes high-transparency frosted glass cards, dynamic neon sphere glows, and a sleek triadic gradient palette (Cyan-Mint, Sky, Violet). The UI seamlessly adapts between dark and light themes, powered by Shadcn UI and Tailwind CSS, using crisp modern typography like `Inter` and `JetBrains Mono`.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: Vercel Postgres & Prisma ORM
- **Authentication**: NextAuth.js
- **Evaluation Engine**: Inngest (Durable Queues)
- **Styling**: Shadcn UI & Tailwind CSS
- **Tooling**: Biome, Knip, Ladle

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Development Workflow

When contributing to this repository, please adhere to Semantic Branching and Conventional Commits.

- **Branch Naming**: Use prefixes like `feat/`, `fix/`, or `chore/` (e.g., `feat/aurora-ui`).
- **Commits**: Use the `<type>(<scope>): <message>` format (e.g., `feat(auth): init Prisma schema`).
