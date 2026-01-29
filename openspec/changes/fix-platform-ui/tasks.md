# Tasks

- [ ] 1. Platform Detection & Global Styles <!-- id: platform-setup -->
    - [ ] Update `App.tsx` to detect platform and add body class (`platform-win32` / `platform-android`).
    - [ ] Update `index.css` to define `--safe-area-top` and Windows-specific variables.

- [ ] 2. Layout & SafeArea <!-- id: layout-safe-area -->
    - [ ] Apply `padding-top: var(--safe-area-top)` to the main app container.
    - [ ] Add Windows titlebar spacer/padding (if custom titlebar used).

- [ ] 3. Scale Selector Scroll <!-- id: scale-scroll -->
    - [ ] Identify Scale Selector component.
    - [ ] Apply `overflow-x: auto`, `scrollbar-width: none` to the list container.
    - [ ] Verify padding/gap ensures accessibility.
