# Agent Instructions

This repo contains a personal website built with TypeScript 6, React 19, React Router 7, and Vite 8.

## Package Manager

This project uses `pnpm` as its package manager.

## Scripts

Add dependency:

```bash
pnpm add <package-name>
```

Add development dependency:

```bash
pnpm add -D <package-name>
```

Format files:

```bash
pnpm fmt
```

Run type checking and linting:

```bash
pnpm check
```

Build the project:

```bash
pnpm build
```

## UI Design

Minimal, quiet, and content-first.

- Preserve the site's current visual language.
- Prefer simple layouts, restrained spacing, and clear hierarchy over decorative UI.
- Use the existing color tokens and typography defaults before introducing new visual primitives.
- Avoid gradients, shadows, badges, pills, and animated ornament.
- Keep interaction states subtle: small hover/focus changes are preferred over dramatic transitions.
- Favor readable text, consistent alignment, and generous whitespace.
- On responsive changes, simplify layout instead of adding more UI chrome.

## Code Style

- Prefer the simplest implementation that fits the current codebase.
- Keep components small and direct; avoid abstractions until they clearly remove repeated logic.
- Follow existing naming, file structure, and composition patterns before inventing new ones.
- Use CSS Modules for component-specific styling and keep styles colocated with the component.
- Prefer straightforward React and TypeScript over clever helpers, custom hooks, or indirection.
- Add dependencies only when they materially simplify the solution.
- Keep props, state, and effects minimal; derive values instead of storing redundant state.
- Avoid overly defensive code: do not add guards or fallbacks for impossible or unsupported states.
- Write code that is easy to delete, easy to scan, and easy to change.
