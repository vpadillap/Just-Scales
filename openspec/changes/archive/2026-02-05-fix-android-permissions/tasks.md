# Tasks: Fix Android Camera Permissions

## 1. Manifest Update
- [x] Add `CAMERA` permission to `android/app/src/main/AndroidManifest.xml`.

## 2. Verification
- [x] Verify `AndroidManifest.xml` contains `android.permission.CAMERA`.
- [x] Build Android (`npm run android:sync` / `release`). (Sync ran successfully)
