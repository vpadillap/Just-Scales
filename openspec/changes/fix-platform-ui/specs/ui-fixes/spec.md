# Spec: UI Fixes

## 1. Android SafeArea
**Problem**: Content overlaps the status bar on Android.
**Solution**: Apply padding to the top of the root container or header using CSS safe-area environment variables.
**Implementation**:
-   Target the main app layout (e.g., `App.tsx` or a global layout component).
-   Add `padding-top: env(safe-area-inset-top)`.
-   Ensure the status bar is transparent or styled appropriately in `capacitor.config.ts` or `styles.xml`.

## 2. Android Horizontal Scroll
**Problem**: Scale names are cropped.
**Solution**: Enable horizontal scrolling for the scale name container.
**Implementation**:
-   Identify the component rendering the scale name (likely a list item or card header).
-   Apply CSS: `overflow-x: auto`, `white-space: nowrap`.
-   Hide scrollbar if desired (`::-webkit-scrollbar { display: none; }`).

## 3. Windows Titlebar
**Problem**: Content overlaps window controls (minimize/maximize/close) on Windows.
**Solution**: Reserve space at the top-right corner.
**Implementation**:
-   Identify if the app uses a custom titlebar or standard frame.
-   If custom titlebar (frameless): Add a placeholder `div` or padding-right to the titlebar component.
-   CSS: `padding-right: 140px` (approx width of controls) specifically for Windows builds (detect platform via `window.navigator.userAgent` or electron preload).
-   Or use a CSS class `.platform-win32` applied to `body`.
