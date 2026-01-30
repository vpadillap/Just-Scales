# Design: Unified Release Script

## High-Level Architecture
We will implement a Node.js script `scripts/release-manager.js` processed by `node`.

## Component Design

### 1. Dependencies
-   `inquirer` (v9+, ESM): For interactive prompts (Select version bump).
-   `fs-extra`: For simplified file operations (JSON read/write, copy/move).
-   `execa`: For running shell commands (`npm`, `gradlew`).
-   `semver`: For version increment logic.
-   `chalk`: For colored terminal output.

### 2. File Updates Logic
-   **Package.json**: Read -> `semver.inc` -> Write.
-   **Build.gradle**:
    -   Read file as string.
    -   Regex `versionName "X.Y.Z"` -> Replace.
    -   Regex `versionCode \d+` -> Parse, Increment, Replace.
-   **CHANGELOG.md**:
    -   Read file.
    -   Replace `## [Unreleased]` with:
        ```markdown
        ## [Unreleased]

        ## [X.Y.Z] - YYYY-MM-DD
        ```

### 3. Build Sequence
1.  **Web**: `execa('npm', ['run', 'build'])`
2.  **Windows**: `execa('npm', ['run', 'electron:build'])`
3.  **Android**:
    -   `execa('npx', ['cap', 'sync'])`
    -   `execa('./gradlew', ['assembleRelease'], { cwd: 'android' })`

### 4. Artifact Collection
-   Target: `release/vX.Y.Z/`
-   **Source**:
    -   Windows: `release/*.exe`, `release/*.zip`
    -   Android: `android/app/build/outputs/apk/release/app-release-unsigned.apk`
-   **Action**: Copy/Move files to Target. Renaming APK to `JustScales-X.Y.Z.apk` is optional but nice.

## Implementation Steps
1.  Install devDependencies.
2.  Create `scripts/release-manager.js`.
3.  Add `release` script to `package.json`.
