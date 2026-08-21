# Target Alpha Canada website

This is a dependency-light, static ES-module website. Content is kept in `src/content`; page composition is in `src/pages`; reusable interface pieces are in `src/components`; and all visual rules are in `src/styles`.

The generated `app.js` bundle also lets the root `index.html` run when it is opened directly from Finder. Route navigation automatically switches to hash-based URLs in that mode.

## Run locally

```bash
npm run dev
```

Open `http://localhost:4173`.

## Validate and build

```bash
npm run check
npm run build
```

The production site is generated in `dist/`. Every preserved Target Alpha route receives its own `index.html`, and the build also creates `sitemap.xml`, `robots.txt`, and `404.html`.

For annual content-editing instructions, see [MAINTENANCE.md](./MAINTENANCE.md).
