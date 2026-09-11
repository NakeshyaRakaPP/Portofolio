# RAKA Portfolio — React/Vite Rebuild

React rebuild of Raka's portfolio. The visual language from the stable vanilla HTML/CSS/JS version is preserved, while interaction state and content are now organized into reusable components and data files.

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

## Where to edit things

| Need to change | File |
|---|---|
| Tool name / proficiency / description | `src/data/tools.js` |
| Project cards | `src/data/projects.js` |
| Case study content | `src/data/caseStudies.js` |
| Social links | `src/data/socials.js` |
| Hero markup | `src/components/Hero/Hero.jsx` |
| Tools interaction | `src/components/Tools/ToolsSection.jsx` |
| Project UI | `src/components/Projects/Projects.jsx` |
| Navbar behavior | `src/components/Navbar/Navbar.jsx` |
| Responsive behavior | `src/styles/responsive.css` |
| Global colors/tokens | `src/styles/variables.css` |

## Tool logos

Temporary neutral SVG placeholders are included so the project never displays broken images. Replace these files with the real logos while keeping the same filenames:

```text
src/img/tools/
  figma.svg
  mysql.svg
  bootstrap.svg
  laravel.svg
  java.svg
  blender.svg
  rapidminer.svg
  web.svg
```

## GitHub Pages

A GitHub Actions workflow already exists at `.github/workflows/deploy-pages.yml`.

1. Push the project to the `main` branch.
2. In GitHub: **Settings → Pages → Source → GitHub Actions**.
3. Push again or run the workflow manually.
4. Later, add the custom domain from GitHub Pages settings after buying the domain.

`vite.config.js` uses relative asset paths so the build works both from a GitHub Pages repository path and from a future custom domain.

## Architecture rule

The project follows one rule: **small changes should stay small**. Content lives in `data/`, UI lives in `components/`, reusable browser behavior lives in `hooks/`, and CSS remains separated by visual area.
