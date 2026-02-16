# Proposal: Windows UI & Audio Timing Fixes

## 1. Why
- **Windows UI Improvements**: The "Scan QR" button on Windows shows a "not implemented in web" message, which is confusing for a native-like app experience. Since the camera might not be available or desired on Desktop, effectively disabling the *import* scanning UI on Windows (while keeping Export/Display) is requested.
- **Audio Timing Polish**: There is an awkward silence/gap between the scale notes ending and the final chord, and between the chord and the next scale repetition. The user requests this gap be standardized (likely equal to the chord duration).

## 2. What Changes

### 2.1 Window UI (QR Import)
- Detect if running in Electron/Windows.
- Hide or disable the "Scan QR Code" button in `ScaleImport` component.
- Ensure "Import text from Clipboard" or "Paste" remains available as the primary method on Desktop.

### 2.2 Audio Timing
- Investigate `useAudioStore` / `Tone.js` sequencing.
- Adjust the scheduling of the `chord` event to occur immediately after the last note (or with controlled spacing).
- Adjust the scheduling of the *next* iteration to occur after the chord with specific duration (equal to chord length).

## 3. Capabilities
- **Desktop UI Optimization**: Windows users see a cleaner import interface without broken scanner buttons.
- **Rhythmic Continuity**: The transition between scale -> chord -> next scale feels musical and rhythmic.

## 4. Impact
- **Components**: `ScaleSharing.tsx` (UI), `useAudioStore.ts` (Logic).
- **Risk**: Low. Audio timing changes need verification to avoid overlapping or stiff phrasing.
