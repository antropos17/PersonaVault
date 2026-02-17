# AI Mistakes Log — Do NOT Repeat

- **node_modules/ was committed to git** — always check .gitignore first
- **Uses innerHTML without escaping** — XSS risk
- **Adds features not requested** — ONLY do what is asked
- **Removes existing CSS when "improving"** — loses hover states, transitions
- **Uses inline onclick handlers** instead of addEventListener
- **Forgets to export functions/data** that other modules need
- **Breaks mobile layout** when restructuring CSS
- **Uses generic AI aesthetics** (purple gradients, Inter font) — NO AI slop
- **Changes colors instead of using CSS custom properties** from tokens.css
- **Creates files over 300 lines** — split them
