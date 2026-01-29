- [x] 1. Core Logic Fixes <!-- id: core-fixes -->
  - [x] **Categories**: Update `MainLayout.tsx` to handle `currentCategory` and `onSelectCategory` props.
  - [x] **App Navigation**: Wire up `selectedCategory` state in `App.tsx` to filter `SCALES`.
  - [x] **Session Loop**: Refactor `useAudioStore.ts` `startSession` to reliably loop (Play -> Wait -> Transpose) and handle Stop.
  - [x] **Transition Logic**: Implement 'Guide Chord' playback between loop iterations (Scale -> Wait -> Guide -> Wait -> Next).



- [x] 2. Visual Overhaul (Flat White) <!-- id: visual-overhaul -->
  - [x] **MainLayout**: Remove gradients, ensure white sidebar, neon active states.
  - [x] **SessionDashboard**: Remove gradients/shadows from Play Button and containers. Enforce flat design.
  - [x] **Direction UI**: Ensure current direction (ASC/DESC) is explicitly clear (e.g. text label or distinct active state).

  - [x] **PianoVisualizer**: Updates keys to flat colors, high contrast background.

- [x] 3. Feedback Iteration <!-- id: feedback -->
  - [x] **Timing**: Fix BPM pause logic (Inverse relationship: Higher BPM = Shorter Pause).
  - [x] **Colors**: Refactor `SessionDashboard` colors from scratch (Cards / Contrast). Make Play Button visible.
  - [x] **Range**: Extend Root Selector from A1 to C8.
  - [x] **Direction**: Add explicit visual indicator for current direction (Big Label/Icon).
  - [x] **Tooltips**: Fix transparency issues (Solid Background).
