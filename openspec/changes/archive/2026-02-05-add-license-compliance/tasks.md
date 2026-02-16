# Tasks: License Compliance

## 1. Setup & Core Logic
- [x] Install `license-checker` as a dev dependency.
- [x] Create `scripts/generate-licenses.js` to scan production dependencies and output JSON.
    - [x] Configure `checker.init` with `production: true`, `excludePrivatePackages: true`.
    - [x] Transform output to standard JSON format (`src/assets/licenses.json`).
- [x] Add `licenses:generate` script to `package.json`.
- [x] Verify script generates correct JSON for current dependencies.

## 2. UI Implementation
- [x] Create `src/components/AboutModal.tsx`.
    - [x] Display App Name, Version, and Developer info.
    - [x] Add "Credits & Licenses" button.
- [x] Create `src/components/CreditsList.tsx` (or sub-view in AboutModal).
    - [x] Import `src/assets/licenses.json`.
    - [x] Render scrollable list of dependencies.
    - [x] Show Name, Version, License, Author, Repository for each.
- [x] Integrate `AboutModal` into the main application (e.g., Settings menu or Sidebar).

## 3. Integration & Release
- [x] Update `package.json` `scripts` to ensure `licenses:generate` runs before build/release.
    - [x] e.g., Update `build` or `release` script to include `npm run licenses:generate`.
- [x] Verify `npm run release` (or equivalent) triggers the license generation.
- [x] Verify the built app contains the generated license data.

## 4. Verification
- [x] Manual test: Open About modal, click Credits, verify list.
- [x] Manual test: Verify links to repositories work.
- [x] Automated test: Verify the JSON file is created/updated on build.

## 5. Fixes & Polish
- [x] Fix `scripts/generate-licenses.cjs`: Ensure strictly ONLY production dependencies are included (exclude dev/build tools).
- [x] Refine `AboutModal.tsx`:
    - [x] Match app typography and color palette strictly (Neon Pink accents, slate/dark mode consistency).
    - [x] Improve layout and component hierarchy.
- [x] Refine `CreditsList.tsx`:
    - [x] Improve styling of license items to behave like native app list items.
- [x] Verify manual test: Ensure no devMain/build dependencies appear in the list.
