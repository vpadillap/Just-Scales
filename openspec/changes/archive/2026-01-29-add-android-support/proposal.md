# Proposal: Add Android Support

## Goal
Enable the creation of an Android application from the existing web codebase, fulfilling the requirement for a "portable experience" with minimal code divergence.

## Architecture
We will use **[Capacitor](https://capacitorjs.com/)** to wrap the existing React/Vite application.
-   **Why Capacitor?**: It allows us to keep the code 99% identical to the web version. It provides a native runtime that loads the web app, while offering access to native APIs if needed.
-   **Maintenance**: Shared logic, UI, and state. Only the build step differs.

## Proposed Changes
1.  **Dependencies**: Install `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`.
2.  **Configuration**: Initialize Capacitor (`capacitor.config.ts`) pointing to the `dist` folder.
3.  **Platform**: Add the Android platform (`native/android`).
4.  **Scripts**: Add `android:dev` and `android:build` scripts to `package.json` to streamline the workflow.
5.  **Release Workflow**:
    -   Update `RELEASING.md` to include steps for generating the Android APK (via Android Studio or Gradle).

## Requirements
-   **Android Studio**: The user/developer must have Android Studio installed to compile the final `.apk` or `.aab`.
-   **Gradle**: Used under the hood by Capacitor.

## Alternatives Considered
-   **React Native**: Would require rewriting the UI (View/Text instead of div/span). Rejected due to "same codebase" requirement.
-   **Cordova**: Older technology, Capacitor is the modern successor with better Vite support.
