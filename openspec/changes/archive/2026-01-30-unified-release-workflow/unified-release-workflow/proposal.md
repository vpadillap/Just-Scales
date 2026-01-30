# Proposal: Unified Release Workflow

## Goal
Establish a single, automated workflow to build and package release artifacts for all platforms (Windows, Android) into a centralized, gitignored versioned directory.

## Requirements
1.  **Multi-Platform Build**:
    -   Build Windows (ZIP/EXE via Electron Builder).
    -   Build Android (APK via Capacitor/Gradle).
2.  **Centralized Output**:
    -   All artifacts moved to `release/vX.Y.Z/`.
3.  **Automation**:
    -   Single script `npm run release` processing the workflow.
    -   Updates `package.json`, `CHANGELOG.md` (header), and `android/app/build.gradle`.

## Proposed Changes
1.  **Scripts**:
    -   Create `scripts/release-manager.js` (Node.js).
    -   **Dependencies**: `execa` (for robust shell execution), `fs-extra` (for file ops), `open` (to open directory).
2.  **Workflow**:
    1.  **Input**: Developer selects bump type (patch/minor/major).
    2.  **Versioning**:
        -   Bump `package.json`.
        -   Bump `android/app/build.gradle` (`versionName` & `versionCode`).
    3.  **Docs**:
        -   Update `CHANGELOG.md` date/version header.
    4.  **Build**:
        -   Web: `npm run build`.
        -   Windows: `npm run electron:build`.
        -   Android: `npx cap sync` -> `./gradlew assembleRelease`.
    5.  **Package**:
        -   Create `release/vX.Y.Z/`.
        -   Move Windows artifacts (`release/*.exe`, `*.zip`).
        -   Move Android APK (`android/app/build/outputs/apk/release/*.apk`).
    6.  **Git**:
        -   Add modified files.
        -   Commit `release: vX.Y.Z`.
        -   Tag `vX.Y.Z`.
    7.  **Finish**: Open release folder.

## Android Specifics
-   We need to handle `versionCode` incrementing (regex parsing).
-   We assume `assembleRelease` works (might need `signingConfigs` or defaults to unsigned "release" apk which needs signing later? No, standard Gradle release build produces unsigned if no config, or we instruct user). *Decision: We will stick to `assembleDebug` if no keys, OR just `assembleRelease` and warn if it fails?*
-   *Better:* Just run the build. If it fails due to keys, the script stops.

## Updates
-   `package.json`: Add `devDependencies` (`execa`, `fs-extra`, `open`, `semver`).
-   `README.md`: Document `npm run release`.
