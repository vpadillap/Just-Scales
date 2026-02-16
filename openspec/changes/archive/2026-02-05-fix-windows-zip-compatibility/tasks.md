# Tasks: Fix Windows Zip Compatibility

## 1. Configuration
- [x] Configure `electron-builder` to exclude android files.
    - Update `package.json` -> `build` -> `files` or `asarUnpack`.
    - Exclude `**/android/**`, `**/*.gradle`, `**/ios/**`.
    - Verify `dist-electron` and `dist` are included.

## 2. Verification
- [ ] Verify build artifacts.
    - Run `npm run electron:build` (or `release`).
    - Check if `win-unpacked` or zip contains android files.
