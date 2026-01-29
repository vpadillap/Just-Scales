# Design: Android Support

## 1. Component Design

### Capacitor Configuration
-   **File**: `capacitor.config.ts`
-   **Settings**:
    ```typescript
    import { CapacitorConfig } from '@capacitor/cli';

    const config: CapacitorConfig = {
      appId: 'com.justscales.app',
      appName: 'Just Scales',
      webDir: 'dist',
      bundledWebRuntime: false
    };

    export default config;
    ```
-   **Rationale**: Matches the Electron `appId` for consistency. Points to `dist` since Vite builds their by default.

### Package Scripts
-   **New Scripts**:
    -   `"android:dev"`: `"concurrently \"npm run dev\" \"cap sync android --watch\""` -> Allows live reload if configured, or just syncing. Actually, minimal script is just `cap open android`.
    -   Let's stick to the spec:
        -   `"android:init"`: `"cap add android"`
        -   `"android:sync"`: `"cap sync android"`
        -   `"android:open"`: `"cap open android"`

### File Structure Changes
-   **New Directory**: `android/` (Root level). Contains the native Android Gradle project.
-   **Ignored Files**:
    -   `android/app/build/`
    -   `android/.gradle`

## 2. Implementation Strategy

### Step 1: Dependencies & Init
1.  Install packages: `npm install @capacitor/core @capacitor/cli @capacitor/android`.
2.  Initialize Capacitor: `npx cap init` (or manual file creation).
3.  Add Android platform: `npx cap add android`.

### Step 2: Configuration & Scripts
1.  Create `capacitor.config.ts`.
2.  Update `package.json` scripts.
3.  Update `.gitignore`.

### Step 3: Documentation
1.  Update `development.md` (or README) with Android instructions.
2.  Update `RELEASING.md`.

## 3. Verification Plan
-   **Manual**:
    1.  Run `npm run android:open`.
    2.  Verify Android Studio opens the project.
    3.  (Optional) Run on emulator if available (User didn't specify they have it set up, but we assume "As a dev" they might).
