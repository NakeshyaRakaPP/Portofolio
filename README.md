# RAKA Portfolio — React / Vite

Single-page portfolio for Nakeshya Raka Putra Priyatna, built with React + Vite. The homepage is designed as a sequence of cinematic chapters so every section feels like a different page while still living in one continuous scroll.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Design system

The latest visual system is centralized around:

- `src/styles/variables.css` — colors, typography, radii, shadows, shared tokens
- `src/styles/scene-system.css` — chapter framing, scene chrome, section identity, responsive scene behavior
- Poppins — display/headings
- Inter — body copy
- Tomkin Regular — metadata, chapter labels, system-style microcopy
- Amber accent on deep navy / graphite surfaces

## Main edit locations

| Need to change | File |
|---|---|
| Tool data | `src/data/tools.js` |
| Project cards / logo data | `src/data/projects.js` |
| Case study content | `src/data/caseStudies.js` |
| Social links | `src/data/socials.js` |
| Hero | `src/components/Hero/Hero.jsx` |
| About scroll story | `src/components/About/AboutScroll.jsx` |
| Tools interaction | `src/components/Tools/ToolsSection.jsx` |
| Projects / coverflow | `src/components/Projects/Projects.jsx` |
| Navbar | `src/components/Navbar/Navbar.jsx` |
| Contact transition | `src/components/Contact/Contact.jsx` |
| Global design tokens | `src/styles/variables.css` |
| Chapter / scene styling | `src/styles/scene-system.css` |

## GitHub Pages

The deployment workflow lives at `.github/workflows/deploy-pages.yml`.

1. Push to `main`.
2. In GitHub, set **Settings → Pages → Source → GitHub Actions**.
3. The workflow installs dependencies, builds Vite, and publishes `dist/`.

The repository is named `Portofolio`, so `vite.config.js` uses:

```js
base: '/Portofolio/'
```

Keep that value while the site is hosted at the GitHub Pages project URL.

## Architecture rule

**Luarnya eksperimental, dalamnya disiplin.** Content stays in `data/`, UI stays in `components/`, reusable browser behavior stays in `hooks/`, and section styling stays isolated by visual area.
