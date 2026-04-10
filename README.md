# Diggerz

This workspace now includes a deployable Vite + React app based on the existing `DIGGERZ_Unified_v5 (2).jsx` component.

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

## Realtime Survey Database

This app now supports real-time survey result storage with Firebase Firestore.

1. Copy `.env.example` to `.env`.
2. Fill in your Firebase web app values:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Create Firestore collection: `survey_results`.
4. Restart the Vite dev server.

When configured, every survey submission is saved in real time and visible in the app's `RESPONSES` view.

### Firestore Rules (Production Minimal)

Use the rules in [firestore.rules](firestore.rules) for a safer production baseline:

- Only `create` is allowed on `survey_results` (no update/delete).
- Payload is validated (`archKey`, `scores`, `answers`, `submittedAt`, `createdAt`).
- `createdAt` must be server time.
- All other collections are blocked by default.

Apply quickly from Firebase Console:

1. Open Firestore Database > Rules.
2. Replace rules with content from [firestore.rules](firestore.rules).
3. Publish.

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
