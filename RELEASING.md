# Release Policy & Workflow

This project adheres to strict **Semantic Versioning** and follows a documented Git release workflow.

## Versioning Policy

We use [Semantic Versioning 2.0.0](https://semver.org/).

-   **Major (X.0.0)**: Breaking changes (e.g., incompatible data formats, removal of core features).
-   **Minor (1.X.0)**: New features, skills, or significant content additions (backward compatible).
-   **Patch (1.0.X)**: Bug fixes, documentation updates, dependencies, maintenance.

## Release Workflow

### 1. Unified Automated Release
Run the release script:
```bash
npm run release
```
This script will interactively:
1.  Ask for the version bump (Patch/Minor/Major).
2.  Update `package.json`, `android/app/build.gradle` (code & name), and `CHANGELOG.md`.
3.  Run all builds:
    -   Web (`vite`)
    -   Windows (`electron-builder`)
    -   Android (`gradlew assembleRelease`)
4.  Collect all artifacts into `release/vX.Y.Z/`.
5.  Commit and Tag the release.

### 2. Push & Publish
After the script finishes:
1.  Push the commit and tags:
    ```bash
    git push && git push --tags
    ```
2.  Create the release on GitHub (step 5 below).

### 3. GitHub Release
Create the release on GitHub.
```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "See CHANGELOG.md for details."
```

### 4. Attach Binaries
Upload the artifacts found in `release/vX.Y.Z/`:
-   `JustScales-X.Y.Z-win.zip` (Windows)
-   `JustScales-X.Y.Z.exe` (Windows)
-   `JustScales-X.Y.Z.apk` (Android)

### 6. Attach Binaries
After the release is created on GitHub:
1.  Locate the build artifacts in the `release/` directory (e.g., `Just Scales Setup 1.0.0.exe`).
2.  Edit the release on GitHub.
3.  Upload the following artifact types as assets:
    -   **Windows**: ZIP Archive (`.zip`) (via `electron-builder`)
4.  Save the release.

## Build Verification
Before releasing, always verify a clean build:
```bash
npm run build
# OR
npm run electron:build
```

## Android Release
1.  Run the build:
    ```bash
    npm run build
    npm run android:sync
    ```
2.  Open in Android Studio:
    ```bash
    npm run android:open
    ```
3.  In Android Studio:
    -   Go to **Build** -> **Generate Signed Bundle / APK**.
    -   Select **APK** or **Android App Bundle**.
    -   Create a new keystore key (keep this safe!).
    -   Build the `release` variant.
4.  Locate the output (usually `android/app/release/app-release.apk`).
5.  Upload this to GitHub Releases or Google Play Console.
