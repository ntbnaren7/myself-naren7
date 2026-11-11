# Repository Guidelines

## Project Structure

Portfolio7 is a desktop-first React and TypeScript portfolio built with Vite. `src/main.tsx` mounts `src/App.tsx`, which composes the page and manages theme and dialog state. Page sections live in `src/components/sections/`, shared controls in `src/components/ui/`, and hooks in `src/hooks/`.

Edit portfolio content in `src/data/`, including `portfolio.ts`, `socials.ts`, and the static GitHub activity snapshots. Keep section IDs in sync with the navigation entries in `portfolio.ts`. Shared styles and theme tokens live in `src/styles/`. Put published images, fonts, icons, and resume files in `public/`. Use `assets-to-use/` for local staging.

## Development Commands

- `npm ci` installs dependencies from `package-lock.json`.
- `npm run dev` starts the local Vite server on `127.0.0.1` with hot reload.
- `npm run typecheck` runs the strict TypeScript checks.
- `npm run build` checks TypeScript and builds the static site into `dist/`.
- `npm run preview` serves the built site locally.
- `npm run format` runs Prettier over `src/` and the root files listed in `package.json`.

## Coding Style

Use two-space indentation, double quotes, and semicolons in TypeScript. Follow existing names such as `ProjectsSection.tsx` for page components, `useActiveSection.ts` for hooks, and `social-hover-card.css` for stylesheets. Use existing CSS theme tokens and shared UI components when extending a section. Tailwind and shadcn theme mappings live in `src/styles/shadcn.css`.

## Testing

The repository has no automated test runner or coverage target. Run `npm run build` before opening a pull request. For UI changes, check the affected flow in both themes and at desktop and narrow viewport widths. For interactive changes, exercise keyboard navigation and check reduced-motion behavior where relevant.

## Commits and Pull Requests

Recent feature commits use `feat:` followed by a summary of the change. In the pull request description, explain what changed and how you verified it. Link related issues when available and include screenshots for visual changes.
