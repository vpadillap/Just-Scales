
# Tasks: Windows ZIP Compatibility (Revision 5)

## 1. Dependency Cleanup
- [x] Modify `package.json`:
    - [x] Move `@capacitor/android` to `devDependencies`.
    - [x] Move `@capacitor/camera` to `devDependencies`.

## 2. Verification
- [x] Run `npm run electron:build`.
- [x] Verify `release/Just Scales-1.3.0-win.zip` works.
