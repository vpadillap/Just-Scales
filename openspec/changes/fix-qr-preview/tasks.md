# Tasks: Fix QR Preview

## 1. Implementation
- [x] Update `QRScanner.tsx` to handle Native Transparency.
    - [x] Use `Capacitor.isNativePlatform()` check.
    - [x] Set `document.body` and `html` background to 'transparent'.
    - [x] Hide main app root or ensure it is transparent if needed? (Actually, if `QRScanner` is mounted on top, we just need `QRScanner` background to be transparent and the body behind it).
    - [x] Remove `bg-black/50` from `QRScanner` root div (use `bg-transparent`).
    - [x] Restore styles on cleanup.

## 2. Layering Fixes (New)
- [x] Make `ScaleSharing.tsx` modal background transparent when scanning.
- [x] Make Global App Background transparent when scanning.
- [ ] **Ghost UI Fixes (Current)**:
    - [x] Update `ScaleSharing.tsx`: Remove `backdrop-blur-sm` when scanning.
    - [x] Update `App.tsx`: Add `id="main-app-content"` to the Dashboard container.
    - [x] Update `index.css`:
        - [x] Hide `#main-app-content` when `scanning-active`.
        - [x] Hide `aside` (Sidebar) when `scanning-active`.
        - [x] Hide `.app-drag-region` (TitleBar) when `scanning-active`.
        - [x] Ensure `ScaleImport` remains visible.

## 2. Verification
- [x] Verify logic (transparency application).
- [-] Build and Manual Test (Android). (Skipped: Requires Native Device)
