# S Rörteam Oy Ab – demo website

One-page demo site for S Rörteam Oy Ab (VVS / LVI, Närpes). Built by Fusion Sites.

- Next.js (App Router) + Tailwind CSS v4 + framer-motion
- Static export (`output: "export"`) → `./out`, served by Cloudflare Workers static assets (`wrangler.jsonc`)
- Swedish by default, Finnish via `?lang=fi` (client-side toggle)
- `noindex` while it is a demo

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # writes ./out
npx wrangler deploy
```

## Content

All texts (SV + FI), contacts and photo URLs live in `src/lib/content.ts`.

To confirm with the customer before going live:
- Service list and descriptions (cards are marked "Exempel – bekräftas")
- Photos are Unsplash placeholders, hotlinked; a branded fallback shows if one fails to load. Replace with the company's own photos.
- Gallery: 6 placeholder tiles ("Bild kommer"). Add the client's photos to `public/gallery/` and set `src` (and `alt` in SV/FI) in the `gallery` list in `src/lib/content.ts`. Any number of photos works.
- The quote form is front-end only and does not send anything yet.
