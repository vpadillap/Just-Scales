
# Design: Windows ZIP Compatibility (Revision 5)

## 1. Problem Analysis
Beyond `@capacitor/android`, the `@capacitor/camera` package also contains platform specific resources (Android/iOS) that are causing issues (path length or file locks) during the Windows build.
Since the Electron build uses the web implementation (bundled by Vite), these native packages do not need to be in `dependencies` (which `electron-builder` copies to the output).

## 2. Revised Solution: Aggressive Dependency Cleanup
1.  **Move `@capacitor/android` to `devDependencies`** (Confirmed fix for core issue).
2.  **Move `@capacitor/camera` to `devDependencies`**.
3.  **Ensure `@capacitor/core` remains** (as it is likely the runtime bridge, though often bundled too).

## 3. Configuration Changes
### package.json
- Move: `"@capacitor/android": "^8.0.2"` -> `devDependencies`.
- Move: `"@capacitor/camera": "^8.0.0"` -> `devDependencies`.

## 4. Verification
- Run `npm run electron:build`.
- Verify the generated ZIP.
- **Runtime Check:** Ensure the app still launches (Vite should have bundled the necessary JS).
