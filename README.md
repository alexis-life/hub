# alexischao.com — hub

The landing page for alexischao.com — links out to the family of subdomains (cysa, data, budget, map, threats, toolkit, anime). Vite + React, single page, no routing.

This repo is also the **canonical host for `theme.css`**, served at `https://alexischao.com/theme.css`. Every subdomain links that URL directly rather than keeping a local copy.

## Adding or editing a site card

Edit `src/data/sites.json` — one object per site:

```json
{ "name": "map", "url": "https://map.alexischao.com", "description": "places visited & wishlisted", "status": "in progress" }
```

`status` is one of `live`, `in progress`, or `planned`. `planned` cards render but aren't clickable.

This file is also the target of the external `vault-sync` script's "hub" job — don't rename it or move it out of `src/data/`.

## Editing theme.css

Edit `theme.css` at the repo root. When you change it:
1. Bump the version in the file's header comment.
2. Bump the `?v=` query string in `index.html` here.
3. Bump the `?v=` query string in every subdomain's `<link>` tag.

The query string is a cache-buster — skipping it means browsers may keep serving the stale version.

## Deploy

Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages automatically.

## DNS

DNS is managed on Cloudflare. The apex (`alexischao.com`) has 4 A records pointing at GitHub Pages' IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), all set to **DNS only** (not proxied) so GitHub can issue its HTTPS certificate. `www.alexischao.com` is a CNAME to this org's Pages domain. Only one repo can hold the `alexischao.com` custom domain in GitHub Pages settings at a time.

## Local dev

```bash
npm install
npm run dev
```
