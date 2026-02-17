# Technical Implementation Plan — 15 Steps

**Base file:** persona-vault-v15-a11y.html
**Layout:** Scroll-based landing page (NOT sidebar app)
**Style:** v13 preferred (DNA helix, drift demo, collectibles, GSAP, top nav)
**Best from v14:** theme toggle, i18n, passport economics, earnings calc

## Phase 1: Scaffold (Steps 1-3)
1. Project init: package.json, vite.config.js, .editorconfig, LICENSE, README stub
2. Design tokens: extract all CSS variables into src/styles/tokens.css
3. HTML shell: clean index.html importing CSS + JS modules

## Phase 2: Extract CSS (Steps 4-6)
4. base.css — resets, layout, grids, sections, responsive
5. nav.css — top nav, sub-nav, mobile menu
6. cards.css + components.css + passport.css

## Phase 3: Extract JS (Steps 7-11)
7. data.js — all arrays as ES module exports
8. nav.js + theme.js + i18n.js
9. cards.js + search.js
10. modals.js + scroll.js + utils.js
11. passport.js + effects.js (canvas, GSAP, DNA helix)

## Phase 4: Clean & Ship (Steps 12-15)
12. Rename cryptic CSS → semantic (BEM-lite)
13. Remove all inline styles → CSS files
14. Open source files: CONTRIBUTING, CODE_OF_CONDUCT, issue templates
15. README with screenshots, quick start, architecture
