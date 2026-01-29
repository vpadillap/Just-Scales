# Tasks

- [x] 1. Platform Detection & Global Styles <!-- id: platform-setup -->
    - [x] Update `App.tsx` to detect platform and add body class (`platform-win32` / `platform-android`).
    - [x] Update `index.css` to define `--safe-area-top` and Windows-specific variables.

- [x] 2. Layout & SafeArea <!-- id: layout-safe-area -->
    - [x] Apply `padding-top: var(--safe-area-top)` to the main app container.
    - [x] Add Windows titlebar spacer/padding (if custom titlebar used).

- [x] 3. Scale Selector Scroll <!-- id: scale-scroll -->
    - [x] Identify Scale Selector component.
    - [x] Apply `overflow-x: auto`, `scrollbar-width: none` to the list container.
    - [x] Verify padding/gap ensures accessibility.
