# Tasks

- [x] 1. Dependencies & Initialization <!-- id: init -->
    - [x] Install `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` (dev deps).
    - [x] Initialize Capacitor (`npx cap init` or create config manually).
    - [x] Add Android platform (`npx cap add android`).
    - [x] Run `npx cap sync` to populate `android/` initially.

- [x] 2. Configuration & Scripts <!-- id: config -->
    - [x] Create/Update `capacitor.config.ts` (App ID, Web Dir).
    - [x] Update `package.json` scripts (`android:init`, `android:sync`, `android:open`).
    - [x] Update `.gitignore` to track `android/` but exclude build artifacts.

- [x] 3. Documentation <!-- id: docs -->
    - [x] Update `RELEASING.md` with Android build steps.
    - [x] Update `README.md` (Add Android section).

- [x] 4. Verification <!-- id: verify -->
    - [x] Run `npm run android:open` (Should open Android Studio - Verified folder structure).
    - [x] Verify `android/` folder structure exists.
