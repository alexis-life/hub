# alexischao.com — hub

The landing page for alexischao.com — links out to the family of subdomains (cysa, data, budget, map, threats, toolkit, anime). Vite + React, single page, no routing.

This repo is also the **canonical host for `theme.css`**, served at `https://alexischao.com/theme.css`. Every subdomain links that URL directly rather than keeping a local copy.

## Adding or editing a site card

Edit `src/data/sites.json` — one object per site:

```json
{ "name": "map", "url": "https://map.alexischao.com", "description": "places visited & wishlisted", "status": "staging" }
```

`status` is one of `live`, `staging`, `in progress`, or `planned`. `staging` is for sites that are deployed and clickable but still running on placeholder/dummy data. `planned` cards render but aren't clickable.

This file is also the target of the external `vault-sync` script's "hub" job — don't rename it or move it out of `src/data/`.

## Editing theme.css

Edit `theme.css` at `public/theme.css`. When you change it:
1. Bump the version in the file's header comment.
2. Bump the `?v=` query string in `index.html` here.
3. Bump the `?v=` query string in every subdomain's `<link>` tag.
4. If you change or add `.ax-*` classes, update `public/kitchen-sink.html` to match — it's both the visual spec and the regression test. Check it live at `https://alexischao.com/kitchen-sink.html` after deploying.

The query string is a cache-buster — skipping it means browsers may keep serving the stale version.

### theme.css v2.0.0

The theme is now v2.0.0 and ships a full `.ax-*` component layer (header, tabs, buttons, cards, stat cards, section bars, badges, chips, inputs) — not just color tokens. Every subdomain should link `?v=2.0.0` and build pages out of `.ax-*` classes rather than writing custom header/card/button/tab CSS. See `public/kitchen-sink.html` for the reference implementation of every class.

**New-site checklist:**
1. `<link rel="stylesheet" href="https://alexischao.com/theme.css?v=2.0.0" />`
2. Build markup from `.ax-*` classes only (`ax-header`, `ax-title`, `ax-subtitle`, `ax-tabs`/`ax-tab`, `ax-btn`, `ax-card`, `ax-stat`, `ax-section-bar`, `ax-badge`, `ax-chip`, `ax-input`) — no local header/card/button/tab styles.
3. `curl -o public/favicon.ico https://alexischao.com/favicon.ico` and `curl -o public/apple-touch-icon.png https://alexischao.com/apple-touch-icon.png`.

## Deploy

Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages automatically.

## DNS

DNS is managed on Cloudflare. The apex (`alexischao.com`) has 4 A records pointing at GitHub Pages' IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), all set to **DNS only** (not proxied) so GitHub can issue its HTTPS certificate. `www.alexischao.com` is a CNAME to this org's Pages domain. Only one repo can hold the `alexischao.com` custom domain in GitHub Pages settings at a time.

## Local dev

```bash
npm install
npm run dev
```
