# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Public shop and blog

Main-project pages are `/shop` and `/blog`; business pages are `/business/:businessId/shop` and `/business/:businessId/blog`. Both use synchronized shared code owned by `sanjab-nestjs/packages/storefront-ui`. Main shop styling follows the existing `/store` POS page; `/store` retains its POS purchasing flow.

Configure `VITE_PUBLIC_API_URL` in the frontend environment. Empty uses a same-origin `/api` proxy. The production host must serve `index.html` for these deep routes. Use Node 22 for Vite builds. Customer login, cart/orders, purchased lessons, blog comments and product ratings use the existing backend customer APIs.

From the backend checkout, run `node scripts/sync-storefront-ui.mjs` after changing shared public/customer code; `--check` verifies synchronization. These shared files should not be independently edited in this checkout.
