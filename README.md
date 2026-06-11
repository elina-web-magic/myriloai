# Myrilo AI - Prompt Testing Environment

Myrilo AI is a dedicated web application designed for prompt engineering and testing. It allows developers and AI researchers to experiment, evaluate, and optimize their prompts iteratively. The application provides an isolated, retro-styled environment to rigorously test AI interactions, specifically integrated with the Claude API.

## Design Aesthetic

The application features a strict **Windows 95 retro aesthetic**. It utilizes classic gray borders, sharp window bevels, and pixelated typography (e.g., `Pixelify Sans` or `MS Sans Serif`) to evoke nostalgia. The `98.css` library powers the core visual components, creating an authentic 90s OS experience.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: Vercel Postgres & Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: 98.css & Tailwind CSS

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Development Workflow

When contributing to this repository, please adhere to Semantic Branching and Conventional Commits.

- **Branch Naming**: Use prefixes like `feat/`, `fix/`, or `chore/` (e.g., `feat/windows-95-ui`).
- **Commits**: Use the `<type>(<scope>): <message>` format (e.g., `feat(auth): init Prisma schema`).
