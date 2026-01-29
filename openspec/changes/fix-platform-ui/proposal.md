# Proposal: Fix Platform UI Issues

## Why
The application has user interface issues on specific platforms that degrade usability:
1.  **Android**: Content overlaps the status bar (SafeArea issue).
2.  **Android**: Scale names are cropped because they don't fit the width, and horizontal scrolling is missing.
3.  **Windows**: Content overlaps the window controls (minimize, maximize, close) due to custom titlebar/drag region configuration.

## What Changes
We will adjust the UI layout and CSS to ensure proper spacing and scrolling behavior on target platforms.

1.  **Android SafeArea**: Apply `env(safe-area-inset-top)` padding to the main container or header to avoid status bar overlap.
2.  **Android Horizontal Scroll**: Enable horizontal scrolling for scale name containers (e.g., using `overflow-x-auto`) to allow full visibility of long names.
3.  **Windows Titlebar**: Add padding or a dedicated titlebar spacer to the top right of the window on Windows builds to prevent content from occupying the space reserved for window controls.

## Capabilities
-   **ui-fixes**: Implementation of platform-specific CSS/layout adjustments.

## Impact
-   **User Experience**: Significantly improved usability on Android and Windows.
-   **Visual**: Cleaner layout with no overlapping elements.
