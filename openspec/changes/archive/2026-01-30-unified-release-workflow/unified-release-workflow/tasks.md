# Tasks

- [x] 1. Dependencies <!-- id: deps -->
    - [x] Install devDependencies: `inquirer`, `execa`, `fs-extra`, `semver`, `chalk`.

- [x] 2. Implementation <!-- id: impl -->
    - [x] Create `scripts/release-manager.js` with version bumping and build logic.
    - [x] Update `package.json` to include `"release": "node scripts/release-manager.js"`.
    - [x] Update `package.json` to `type: "module"` or ensure script handles ESM (project is already ESM).

- [x] 3. Documentation <!-- id: docs -->
    - [x] Update `RELEASING.md` to reflect the new automated workflow (`npm run release`).
    - [x] Update `README.md` with release instructions for maintainers.

- [x] 4. Verification <!-- id: verify -->
    - [x] Run `node scripts/release-manager.js` (Manual verification required due to interactive prompts).
    - [x] Verify `android/app/build.gradle` modification logic (Regex matches checked).
