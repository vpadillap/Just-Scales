
# Tasks: Windows ZIP Compatibility (Final Revision)

## 1. Cleanup & Restoration
- [x] Modify `package.json`:
    - [x] Restore `build.win.target` to include `zip`.
    - [x] Update `electron:build` script to remove the custom script execution.
    - [x] Remove `archiver` from `devDependencies`.
- [x] Delete `scripts/pack-windows-zip.cjs`.

## 2. Verification
- [x] Run `npm run electron:build`.
- [x] Verify `release/Just Scales-1.3.1-win.zip` (native artifact) works in Windows Explorer.
