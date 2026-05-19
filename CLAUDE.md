# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` / `npm start` — start the Astro dev server (http://localhost:4321)
- `npm run build` — produce a static build in `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run astro -- <cmd>` — run any Astro CLI command (e.g. `astro check`, `astro add`)

There are no linters, formatters, or tests configured. Verify changes by running `npm run dev` and exercising the affected pages.

## Architecture

Astro 4 static site. Single dependency (`astro`), no UI framework integration, no Tailwind — styling is hand-written CSS in `src/styles/global.css`, applied globally via `Layout.astro`.

### Routing

File-based under `src/pages/`:
- `index.astro` — single-page landing (`/`) with all sections: hero, featured figure, research, work, education, certifications, languages.
- `projects/[...slug].astro` and `posts/[...slug].astro` — dynamic detail pages, both `prerender = true` with `getStaticPaths` driven by content collections. Accessible by direct URL; the index links to ORCID externally for papers (via `external_url`).

The site is fully static; the dynamic routes resolve at build time. The header's `work` and `research` links are in-page anchor jumps (`#work`, `#research`), not separate routes — the landing already shows everything inline.

### Content collections

`src/content/config.ts` registers two collections:

- `projects` — required: `title`, `description`, `image`, `platform`, `stack`. Optional: `worksImage1`, `worksImage2`, `website`, `github`. Renders via `MarkdownWorksLayout`, which conditionally shows the optional fields.
- `posts` — required: `title`, `author`, `date`, `image`. Optional: `external_url` (validated as a URL). When `external_url` is set, `posts.astro` makes the card link out (target=_blank, ORCID etc.) instead of routing to the internal `posts/[...slug]` page. The internal route still exists as a fallback.

When adding a new project or paper: drop a `.md` file in the appropriate folder with matching frontmatter — no other registration is needed.

### Layouts

Three-level nesting:
1. `Layout.astro` — base shell. Loads global CSS, preloads self-hosted fonts from `/public/fonts/` (Hanken Grotesk + JetBrains Mono, latin + latin-ext subsets via `@font-face` in `global.css`), `<ViewTransitions />`, header, footer, and the theme-init script. No external font CDN.
2. `MarkdownPostsLayout.astro` / `MarkdownWorksLayout.astro` — wrap `Layout.astro` and render frontmatter badges around the markdown `<slot />`. Each detail route picks the corresponding layout.
3. Page-level `.astro` files render content into the chosen layout.

### Theme toggle

Light is the default (warm-paper aesthetic); dark mode is opt-in via the `dark` class on `<html>`, persisted in `localStorage.theme` (`'light'` or `'dark'`). Initial state respects `prefers-color-scheme` when no stored preference exists. Two scripts coordinate this:
- `Layout.astro` runs `colorMode()` on initial load and on `astro:after-swap` (so the theme survives View Transitions).
- `ThemeIcon.astro` (inline script, `is:inline`) handles the click toggle and the very first paint to avoid a flash.

If you add new pages or refactor the head, preserve the `astro:after-swap` listener — without it, the theme resets on every client-side navigation.

### Design system

Working-paper / spec-sheet voice. OKLCH tokens in `:root` (warm-tinted paper neutrals, hue 70) with `.dark` overrides. Single accent (deep terracotta, `oklch(0.50 0.16 30)`) reserved for links and the one signature mark in the hero. Fluid type scale via `clamp()`. Sections separated by 1px rules, no shadows, no rounded corners. See [PRODUCT.md](PRODUCT.md) for register and anti-references.

### Assets

All images live in `public/` and are referenced by absolute paths (e.g. `/blog.webp`). Do **not** prefix with `/public/` — Astro serves `public/` at the site root.

### Content language

The site is in English. The owner has flagged eventual i18n with a Spanish toggle as a future task — keep new copy in English until that lands.
