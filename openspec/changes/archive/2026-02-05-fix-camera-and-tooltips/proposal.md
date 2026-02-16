
# Proposal: Camera Fixes & Tooltip Editing

## 1. Goal
Fix the QR code scanning experience to support **live in-app detection** (replacing the faulty "take picture" flow) and enable users to add/edit instruction tooltips when creating custom scales.

## 2. Issues & Solution

### 2.1 Live QR Code Detection (Fixing the Scanning UX)
**Current State:**
The app currently uses `Camera.getPhoto()`, which forces the user to take a still photo. Users report that after taking the picture, the app incorrectly displays "User cancelled photos app" or "No scale found" errors.

**Solution:**
Replace the external photo capture with the **@capacitor-mlkit/barcode-scanning** plugin.
- **Why:** It provides native-performance scanning on Android/iOS (using Google ML Kit) and a reliable web-based fallback (using `html5-qrcode`) for Electron/Web. This offers a single, maintained API for all platforms.
- **Implementation:**
    - Install `@capacitor-mlkit/barcode-scanning`.
    - Create a `QRScanner` component that handles the scanning lifecycle (start/stop scan, permission checks).
    - Embed this component in the `ScaleSharing.tsx` modal.

### 2.2 Tooltip Editing
**Current State:**
`ScaleCreator.tsx` allows editing Name and Category but lacks a field for instructions.

**Solution:**
- **Data Model:** Add optional `instructions` (string) field to the `Scale` type.
- **UI:** Add a "Tooltip / Instructions" text area to `ScaleCreator.tsx`.
- **Display:** Ensure this tooltip is accessible when playing the scale.

## 3. Impact
- **Modules:** `ScaleSharing.tsx`, `ScaleCreator.tsx`, `useScaleStore.ts`.
- **Dependencies:** Add `@capacitor-mlkit/barcode-scanning`.
