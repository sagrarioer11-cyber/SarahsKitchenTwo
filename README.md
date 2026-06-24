# Sarah's Kitchen

Frontend alterno para Sarah's Kitchen construido con Vite, React, TypeScript y Tailwind CSS.

## What this app includes

- Public storefront with home, menu, cart, checkout, confirmation, tracking, about and FAQ pages
- Admin area for products and orders
- Local persistence for catalog, cart and orders
- Responsive layout with a polished food-first UI

## Tech Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- React Router
- Context API

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Local Setup

1. Install dependencies with `npm install`.
2. Run `npm run dev` for local development.
3. Use `npm run build` before publishing.

## Deployment Notes

- The app is Vercel-ready through `vercel.json`.
- SPA routing is configured to fall back to `index.html`.
- The next deployment step is to link this repository to a Vercel project and deploy the `main` branch.

## Project Memory

The `memory_bank` folder stores progress notes, architecture summaries and lessons learned so the frontend can be resumed cleanly later.
