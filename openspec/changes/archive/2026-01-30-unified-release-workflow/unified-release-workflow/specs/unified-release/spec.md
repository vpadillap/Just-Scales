# Specification: Unified Release Workflow

## 1. Requirement: Automated Release Orchestration
The project MUST have a single entry point script (`npm run release`) that orchestrates the entire release process for all platforms.

### 1.1 Script Capabilities
The orchestrator (e.g., `release-manager.js`) MUST:
-   Accept an interactive or argument-based version bump (patch, minor, major).
-   Update version numbers in all required files.
-   Execute build commands for all platforms.
-   Collect artifacts into a specific directory.
-   Perform Git operations (commit, tag).

## 2. Requirement: Version Synchronization
The version number MUST be synchronized across:
-   `package.json` (`version` field).
-   `android/app/build.gradle`:
    -   `versionName` MUST match `package.json`.
    -   `versionCode` MUST be incremented by 1 from the previous value.
-   `CHANGELOG.md`: The `[Unreleased]` section MUST be renamed to `[Version] - Date`.

## 3. Requirement: Build & Package
### 3.1 Windows
-   MUST use `electron-builder` to generate ZIP/EXE.
-   Artifacts MUST be moved from `release/` to `release/vX.Y.Z/`.

### 3.2 Android
-   MUST use Gradle wrapper (`gradlew`) to build the release variant (`assembleRelease`).
-   MUST run `cap sync` before building to ensure web assets are current.
-   Artifacts (`.apk`) MUST be moved to `release/vX.Y.Z/`.

## 4. Requirement: Output Structure
The final release directory structure MUST be:
```
release/
  v1.2.0/
    JustScales-1.2.0-win.zip
    JustScales-1.2.0.exe
    app-release-unsigned.apk (or signed if configured)
```
The `release/` directory MUST remain ignored by Git.
