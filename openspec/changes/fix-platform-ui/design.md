# Design: Platform UI Fixes

## Component: Main Layout (SafeArea & Titlebar)
**Goal**: Handle Android Status Bar overlap and Windows Titlebar control overlap.

### Implementation Strategy
1.  **Global CSS Variables**: Define `--safe-area-top` variables.
    ```css
    :root {
      --safe-area-top: env(safe-area-inset-top, 0px);
    }
    body.platform-win32 {
      --titlebar-height: 32px; /* Reserve space */
    }
    ```
2.  **Layout Component**:
    -   Identify the top-most container (likely in `App.tsx` or `Layout.tsx`).
    -   Apply `padding-top: var(--safe-area-top)`.
    -   For Windows: If using a custom drag region, push the content down or add padding-right to the specific header component to avoid window controls.
    -   **Detection**: Use `Capacitor.getPlatform()` or `window.navigator.userAgent` to detect "android" vs "win32" and apply a class to `document.body` on mount.

## Component: Scale Selector (Horizontal Scroll)
**Goal**: Allow horizontal scrolling for scale selection chips.

### Component Logic
1.  **Container**: The parent `div` of the scale options.
    -   `display: flex`
    -   `overflow-x: auto` (enable scroll)
    -   `overflow-y: hidden`
    -   `scrollbar-width: none` (hide scrollbar for aesthetics)
    -   `gap: 8px` (ensure spacing)
    -   `padding-right: 16px` (ensure last item isn't flush with edge)

### CSS Updates
We will modify `index.css` or Tailwind classes directly on the component.

## Files to Modify
1.  `src/App.tsx` (Platform detection + Layout padding)
2.  `src/components/ScaleSelector.tsx` (or equivalent) (Scroll behavior)
3.  `src/index.css` (Global styles if needed)
