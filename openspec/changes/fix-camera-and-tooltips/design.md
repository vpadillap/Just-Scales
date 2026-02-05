
# Design: Camera Fixes & Tooltip Editing

## 1. Architecture Changes

### ScaleSharing Refactor (Live Scanning)
- **Goal:** Replace `Camera.getPhoto()` with live scanning via `@capacitor-mlkit/barcode-scanning`.
- **Component:** `src/components/ScaleSharing.tsx`
- **Library:** `@capacitor-mlkit/barcode-scanning`.
- **Logic:**
    - The plugin handles the camera UI on mobile (native layer) and dom elements on web.
    - We need to handle permissions (`BarcodeScanner.requestPermissions()`).
    - We need to handle the scan loop (`BarcodeScanner.scan()`).
    - On web/Electron, the plugin injects a video element. We need to ensure the modal Z-index/transparency allows this or handles the DOM placement correctly.

### ScaleCreator Update (Tooltips)
- **Goal:** Allow users to input instructions.
- **UI:** Add a `<textarea>` below the category selector in `ScaleCreator.tsx`.
- **State:** Add `instructions` to local state.
- **Data:** Persist `instructions` to the `Scale` object in `src/data/scales.ts` or `src/types.ts`.

## 2. Component Design

### `components/QRScanner.tsx` (Wrapper)
Since `@capacitor-mlkit` has specific listener logic, a wrapper component is useful to keep the modal clean.
```tsx
// Pseudocode
const QRScanner = ({ onScan, onError }) => {
  useEffect(() => {
     // Start Scan
     BarcodeScanner.addListener('barcodeScanned', (result) => {
        onScan(result.barcode.rawValue);
     });
     BarcodeScanner.startScan();
     return () => BarcodeScanner.stopScan(); // Cleanup
  }, []);

  // For Web: Render a placeholder div if the plugin requires it, or rely on plugin's default UI overlay
  return <div id="qr-scanner-container" ... />
}
```

### `components/ScaleSharing.tsx` (Update)
- Remove `Camera` import.
- Import `QRScanner` (or implement logic directly).
- Switch state `scanning` to render the scanner view.

## 3. Verification
- **Android:** Verify `AndroidManifest.xml` permissions for Camera are set (Capacitor usually handles this, but ML Kit might need `implementation` lines in `build.gradle`).
- **Electron:** Verify the web fallback works.
