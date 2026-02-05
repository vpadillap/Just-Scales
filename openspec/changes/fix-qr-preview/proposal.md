# Proposal: Fix QR Scanner Live Preview

## 1. Why
- **Bug**: On Android, the QR Scanner UI appears over a "blank" (black/grey) background instead of the live camera feed.
- **Root Cause**: The `@capacitor-mlkit/barcode-scanning` plugin renders the camera view *behind* the WebView on native platforms. The WebView's HTML/Body and the App's UI (e.g., `SessionDashboard` background) are opaque, effectively blocking the camera feed.
- **Current State**: `QRScanner.tsx` applies a `bg-black/50` overlay, but doesn't handle WebView transparency or hide the underlying App UI.

## 2. What Changes
- **Transparency Logic**:
    - When scanning starts, set `document.documentElement`, `document.body`, and the App container to `transparent`.
    - Ensure the `QRScanner` component itself has a TRANSPARENT background (or a specific overlay that doesn't block the whole screen).
- **UI Overlay**:
    - Instead of `bg-black/50` full screen, use a simpler UI or a "cutout" overlay (if possible) or just a transparent full-screen container with UI elements (close button, scan frame) floating on top.
    - Given the user's screenshot, the frame and button are visible. We just need to see the camera behind them.
- **Cleanup**: Restore background opacity when scanning stops or component unmounts.

## 3. Capabilities
- **Live Preview**: Users will see the camera feed while scanning on Android.

## 4. Impact
- **Components**: `QRScanner.tsx`.
- **Global**: Changes `document.body` style temporarily.
