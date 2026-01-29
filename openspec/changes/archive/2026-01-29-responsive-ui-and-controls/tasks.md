# Tasks

- [ ] 1. Layout Refactor <!-- id: layout -->
    - [x] 1.1 Update `App.tsx` root container to force `h-screen`, `w-screen`, `overflow-hidden`, and `flex` layout.
    - [x] 1.2 Constraint Sidebar to fixed width and `overflow-y-auto` (independent scrolling).
    - [x] 1.3 Refactor `SessionDashboard.tsx` content area to `flex-1`, `flex-col`, `overflow-hidden` (or `overflow-y-auto` only if 100% necessary, but goal is fit).
    - [x] 1.4 Update `DotGraphVisualizer` container in dashboard to shrink/grow (`flex-1`).

- [ ] 2. Global Shortcuts <!-- id: shortcuts -->
    - [x] 2.1 Create `src/hooks/useGlobalShortcuts.ts` hook.
    - [x] 2.2 Implement `keydown` listener for Spacebar with `preventDefault` (prevent scroll) and focus checks (ignore inputs).
    - [x] 2.3 Integrate hook into `SessionDashboard` or `App` to toggle `useAudioStore` playback.

- [ ] 3. Verification <!-- id: verify -->
    - [x] 3.1 Verify Sidebar scrolls independently while Main Content stays fixed on small vertical screens.
    - [x] 3.2 Verify Spacebar toggles playback without scrolling the page.
    - [x] 3.3 Verify typing in BPM input does NOT trigger playback toggle.
