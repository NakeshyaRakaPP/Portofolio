# Migration Notes — Vanilla → React

## What changed

- Main page migrated from static HTML to React components.
- RELASKA case study migrated to React.
- E-commerce case study migrated to React.
- 404 page migrated to React.
- Dark/light theme is React state with `localStorage` persistence.
- Mobile navbar collapse no longer depends on Bootstrap JavaScript.
- Reveal, counter, cursor, parallax, and magnetic-text behavior moved into isolated React hooks.
- Tools & Technologies is a React state-driven interactive playground.
- Tools data, project data, social links, and case studies are separated from markup.
- GitHub Pages deployment workflow added.
- Existing CSS visual language is retained and reorganized into smaller semantic stylesheets.

## Intentionally NOT added yet

- Choose Your Perspective.
- EN/ID language switch.
- New animation libraries.
- React Router.

Those features are intentionally isolated for the next iteration so the migration itself has a stable baseline.

## Why no React Router?

This portfolio deploys as static GitHub Pages. Each current public URL remains a real HTML entry (`index.html`, `case-study-relaska.html`, `case-study-ecommerce.html`, `404.html`) but React renders the page body. This keeps existing URLs working without SPA rewrite hacks or hash URLs.
