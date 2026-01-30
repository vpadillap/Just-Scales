# Tasks: Custom Scales & Sharing

## 1. Setup & Core Data

- [x] 1.1 Install dependencies: `qrcode.react`, `@capacitor/camera`, `@capacitor-community/barcode-scanner`.
- [x] 1.2 Create `Scale` and `NoteEvent` interfaces in `src/types.ts` (or similar shared location).
- [x] 1.3 Implement `useScaleStore` with persistence middleware in `src/stores/useScaleStore.ts`.
- [x] 1.4 Add basic store actions: `addScale`, `updateScale`, `deleteScale`, `addCategory`, `deleteCategory`.

## 2. Scale Creator UI

- [x] 2.1 Create basic `ScaleCreator` component layout (Name, Category inputs).
- [x] 2.2 Implement visual note sequence editor using `framer-motion` for list transitions.
- [x] 2.3 Implement note/silence addition logic with duration selection.
- [x] 2.4 Connect `ScaleCreator` to `useScaleStore` to save new scales.
- [x] 2.5 Add "Edit" mode to `ScaleCreator` for modifying existing scales.

## 3. Scale Management & Storage

- [x] 3.1 Create `CategoryManager` component to Release/delete custom categories.
- [x] 3.2 Update main Scale Selector UI to display custom categories and scales.
- [x] 3.3 Ensure custom scales data persists across page reloads (verify `localStorage`).

## 4. Sharing Features

- [x] 4.1 Implement `ScaleExport` component: Generate JSON string and render QR code using `qrcode.react`.
- [x] 4.2 Implement `ScaleImport` component: Text area for JSON paste + validation logic.
- [x] 4.3 Add Camera scanning functionality for QR Import using `@capacitor-community/barcode-scanner` (with fallback or safe failure on web).

## 5. Android Fixes & Polish

- [x] 5.1 Fix "View Instructions" tooltip on Android (ensure it works on touch/click, not just hover).
- [x] 5.2 Verify tooltip behavior on mobile emulation.
- [x] 5.3 Apply "visually appealing" styling touches to new components (gradients, glassmorphism if consistent with app theme).
- [x] 5.4 (Refinement) Standardize `ScaleCreator` styling to match app aesthetic (gradients, fonts, spacing).
- [x] 5.5 (Refinement) Add Audio Preview to `ScaleCreator` (Play Note on click, Play Full Scale).
- [x] 5.6 (Refinement) Add Visualizer Preview (DotGraph) to `ScaleCreator`.
