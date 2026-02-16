# Proposal: Fix Android Camera Permissions

## 1. Why
- **Bug**: User reports "camera permission denied" message on Android, but the app never asks for permission.
- **Root Cause**: `AndroidManifest.xml` is missing the `<uses-permission android:name="android.permission.CAMERA" />` declaration. The OS automatically rejects permission requests if they are not declared in the manifest.

## 2. What Changes
- Add `CAMERA` permission to `android/app/src/main/AndroidManifest.xml`.
- Ensure `QRScanner.tsx` handles the permission request flow (logic already exists, but now it will actually trigger the OS dialog).

## 3. Capabilities
- **Scanning**: Android users can grant camera permission and scan QR codes.

## 4. Impact
- **Components**: `AndroidManifest.xml`.
- **Risk**: None.
