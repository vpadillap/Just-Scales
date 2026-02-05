# Design: UI and Timing Fixes

## 1. Audio Timing
- **File**: `src/stores/useAudioStore.ts`
- **Approach**:
    - Define `CHORD_DURATION = "4n"`.
    - Update `pauseDur` to equal `Tone.Time(CHORD_DURATION).toSeconds()`.
    - Ensure `synth.triggerAttackRelease` uses `CHORD_DURATION`.
    - This changes the sequence from `[Scale] -> 2n -> [Chord 4n] -> 2n -> [Next]` to `[Scale] -> 4n -> [Chord 4n] -> 4n -> [Next]`.

## 2. Desktop UI
- **File**: `src/components/ScaleSharing.tsx`
- **Approach**:
    - Check for `window.electron` or `@capacitor/core` platform to detect Desktop/Web vs Native.
    - Actually, `Capacitor.getPlatform()` returns 'web' for Electron usually, or we can check `isPlatform('electron')`.
    - **Better**: Detect if `BarcodeScanner` is available/supported?
    - **Simpler**: Just check if `isPlatform('hybrid')` (Mobile) vs 'web'.
    - If NOT 'hybrid' (i.e., it's web or electron), hide the scanner button.
    - Since "web" implementation of scanner exists but is undesired here, existing `isPlatform` check is best.
    - `import { isPlatform } from '@capacitor/core'`
    - Show "Scan QR" only if `isPlatform('hybrid')` (iOS/Android).
