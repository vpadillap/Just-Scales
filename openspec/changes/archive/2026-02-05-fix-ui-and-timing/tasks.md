# Tasks: UI & Timing

## 1. Audio Timing
- [x] Update `useAudioStore.ts` loop scheduling.
    - [x] Set `pauseDur` to "4n".
    - [x] Ensure Chord duration is "4n".

## 2. Desktop UI
- [x] Update `ScaleSharing.tsx` (ScaleImport).
    - [x] Import `isPlatform` from `@capacitor/core`.
    - [x] Conditional render: Only show `ScaleImport` scanner button if `isPlatform('hybrid')` (or `android`/`ios`).
    - [x] Ensure clipboard import is always visible or becomes default.
    - [x] Hide "OR PASTE TEXT" divider on non-native platforms.

## 3. Verification
- [-] **Timing**: Listen to a scale session. Verify gap is 1 beat (quarter note) instead of 2. (Skipped: Manual Audio Test)
- [-] **UI**: Verify "Scan QR" button is GONE on Desktop/Web but `QRScanner` component code remains valid. (Skipped: Verified Logic)
