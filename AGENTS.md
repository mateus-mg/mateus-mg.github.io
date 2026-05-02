# Agent Instructions

## Project Type
Pure static site (HTML/CSS/JS). No build step, no package manager, no tests.

## Core Files
| File | Purpose |
|------|---------|
| `index.html` | Main entry point - single page portfolio |
| `css/style.css` | Single stylesheet (1081+ lines) |
| `js/main.js` | Loads `data/repos.json`, renders project cards, handles mobile nav |
| `data/repos.json` | GitHub repo data **auto-generated** (do not edit manually) |
| `scripts/fetch_repos.py` | Python script fetching GitHub API to generate repos.json |

## Data Flow (Critical)

`data/repos.json` is **auto-generated** on every fetch:

- **Local update:** `python scripts/fetch_repos.py` (overwrites `data/repos.json`)
- **CI/CD:** `.github/workflows/update-repos.yml` runs on schedule (Sundays at midnight UTC) or manually via `workflow_dispatch`. It creates a new branch, commits updated `repos.json`, and **opens a Pull Request automatically**. Review and merge the PR. The `github-actions[bot]` keeps main history clean.
- **Never edit `data/repos.json` manually** — changes will be lost on next fetch.

### Project Images (Auto-Detection)
To add preview images to project cards:
1. Save screenshot as: `assets/projects/{repo-name}.png`
2. Example: `media-organizer.png`, `control-panel.png`
3. The site auto-detects and displays the image, or falls back to a colored placeholder

## Deployment
Push to `main` triggers `.github/workflows/deploy-pages.yml`, publishing the repository root to GitHub Pages. No build step required.

## Architecture Patterns

### No Module System
- Plain ES5+ JavaScript, no imports/exports
- Single `<script>` tag in HTML, browser executes directly
- Monolithic CSS (no imports, no CSS-in-JS)

### Client-Side Rendering
- Projects section renders dynamically from `data/repos.json`
- Shows loading spinner initially, then populates cards
- Error handling for: 404, invalid JSON, empty array

### External Dependencies (CDN)
- Google Fonts (Inter)
- Font Awesome 6.4.0 (icons)
- AOS (Animate On Scroll library)

## Key Implementation Details

### Mobile Navigation
- Hamburger menu for screens ≤768px
- Glassmorphism effect (backdrop-filter: blur)
- Smooth scroll with 80px offset for fixed header

### Project Cards
- 16:9 aspect ratio for images
- Lazy loading on images
- Colored badges for programming languages
- Auto-detects local images or shows placeholder with tech icon

### Animations
- AOS scroll animations (fade-up) on all sections
- Respects `prefers-reduced-motion` accessibility setting
- Gradient animations in hero section

## GitHub Actions Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy-pages.yml` | push to main, manual | Deploy to GitHub Pages |
| `update-repos.yml` | schedule (Sun 00:00 UTC), manual | Update repos.json via PR |

## Notes
- Projects section shows empty state if `data/repos.json` is missing or malformed. Always commit this file.
- Repositories sorted by `stargazers_count` (descending) before rendering
- All external links use `target="_blank" rel="noopener noreferrer` for security
