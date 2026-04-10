# Diggerz

This workspace now includes a deployable Vite + React app based on the existing `DIGGERZ_Unified_i18n.jsx` component.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Notes

- The app entrypoint is `src/App.jsx`.
- Vite config is in `vite.config.js`.
- Old built assets and `asset-manifest.json` have been removed, and the new root `index.html` now loads the Vite app.

## GitHub Pages

This repository is configured to deploy from the `dist/` folder to the `gh-pages` branch when `main` is pushed.

To use GitHub Pages:

1. Push to `main`.
2. Enable GitHub Pages in repository settings using the `gh-pages` branch.
3. The app will build automatically and publish the `dist/` output.

## Vercel

This repo also includes `vercel.json` for Vercel deployment.

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `.`

If your project is connected in Vercel, pushing to the linked branch will trigger automatic deployment.
