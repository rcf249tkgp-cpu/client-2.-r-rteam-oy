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

All texts (SV + FI), contacts, photo paths and the gallery list live in `src/lib/content.ts`.

Design: Schibsted Grotesk (headlines) + Inter (body), off-white / deep navy base with Rörteam blue as the accent. Shared building blocks (buttons, section headings, reveal/count-up animations, the hero "water line") are in `src/components/ui.tsx`.

Photos: stock photos from Unsplash (Unsplash License), downloaded into `public/images/` and colour-graded as one set (WebP). Replace them with the company's own photos when available; keep the same file names or update `photos` / `gallery` in `content.ts`.

To confirm with the customer before going live:
- Service list and descriptions (marked "Exempel – bekräftas")
- Gallery photos are examples (marked "Exempelbilder – ersätts med egna bilder")
- The quote form is front-end only and does not send anything yet.
