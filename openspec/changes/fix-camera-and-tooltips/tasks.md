
# Tasks: Camera Fixes & Tooltip Editing

## 1. Dependencies & Setup
- [x] Install `@capacitor-mlkit/barcode-scanning`.
    - Run `npm install @capacitor-mlkit/barcode-scanning`.
    - **Android:** Check `android/app/build.gradle` and `AndroidManifest.xml` (ML Kit requires no extra setup usually, but verify docs).
    - **Electron:** Verify strictly if this plugin works out of the box or needs `index.html` changes for the web implementation fallback.

## 2. Live QR Scanner
- [x] Create `src/components/QRScanner.tsx` (or implement in `ScaleSharing`).
    - Initialize `BarcodeScanner`.
    - Handle `requestPermissions`.
    - Implement `startScan` and `stopScan` cleanup.
    - Handle `barcodeScanned` listener.
- [x] Refactor `src/components/ScaleSharing.tsx`.
    - Replace `Camera.getPhoto` logic with the new Scanner logic.
    - Ensure the UI adapts (e.g., hide other elements or show a "Stop Scanning" button).

## 3. Tooltip Editing
- [x] Update Data Model (`src/types.ts`).
    - Add `instructions?: string` to `Scale` interface.
- [x] Update `src/components/ScaleCreator.tsx`.
    - Add "Instructions / Tooltip" textarea field.
    - Bind to `instructions` state.
    - include `instructions` in the saved object.

## 4. Verification
- [x] **Tooltip Persistence:** Create scale, add instructions, save, edit again -> text validates. (Verified by code review & pre-existing display logic)
- [-] **Scanning (Simulated/Web):** Test in browser/Electron if the plugin uses `html5-qrcode` fallback correctly. (Skipped: Env limitation)
- [-] **Scanning (Android):** Build and sync (`npx cap sync android`). Verify native camera opens and scanning triggers the import. (Skipped: Manual on device)
