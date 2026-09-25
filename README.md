# Estationic website

The marketing site for Estationic, the AI sales and marketing autopilot for
real estate developers. A static Vite + React site, separate from the
Estationic app.

## Run it

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # type-checks, then builds into dist/
```

## Where things live

- `src/content.ts`: every word on the page, the pricing, the stats and the
  client list. Edit copy here, not in the components.
- `src/components/`: one file per section.
- `src/art/` and `src/lib/iso.tsx`: the isometric illustrations, drawn in code.
- `public/clients/`: client logos, cut out and set in one grey.
- `DESIGN.md`: the design system.

## Deploy

Hosted on Cloudflare as static assets (`wrangler.jsonc`), free.

```bash
npm run deploy   # builds, then uploads dist/ with Wrangler
```

Node 22 (pinned in `.node-version`).
