# Tasks

- [x] 1. Core Audio State Updates <!-- id: audio-core -->
    - [x] 1.1 Add `currentStepIndex` to `useAudioStore` state interface.
    - [x] 1.2 Update `startSession` and `runLoop` to calculate and schedule `currentStepIndex` updates via `Tone.Draw`.
    - [x] 1.3 Ensure `stopSession` resets `currentStepIndex` to -1 or null.

- [x] 2. Component Implementation <!-- id: component -->
    - [x] 2.1 Create `DotGraphVisualizer.tsx` component structure.
    - [x] 2.2 Implement `calculateDotPositions` helper to map scale pattern to relative X/Y coordinates (handling Unrolled Sequence).
    - [x] 2.3 Render SVG circle elements based on calculated positions.
    - [x] 2.4 Connect `framer-motion` to animate the dot matching `currentStepIndex`.

- [x] 3. Integration & UI <!-- id: integration -->
    - [x] 3.1 Import `DotGraphVisualizer` into `SessionDashboard.tsx`.
    - [x] 3.2 Place visualizer in the UI (e.g., replacing placeholder graphic or as new section).
    - [x] 3.3 Verify responsive sizing (dots scale with container).

- [x] 4. Verification <!-- id: verify -->
    - [x] 4.1 Verify dots align with note pitch (Higher pitch = Higher Y).
    - [x] 4.2 Verify "Light Up" sync latency is acceptable.
    - [x] 4.3 Verify full unrolled sequence is shown for repeating scales.
