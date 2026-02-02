
# Tasks: Windows ZIP Compatibility

## 1. Configuration
- [x] Modify `package.json`: 
    - [x] Locate `build.win`.
    - [x] Update `target` to explicitly specify `zip` with `x64`.
    - [x] Add `"compression": "store"`.

## 2. Verification
- [x] Run `npm run electron:build`.
- [x] Verify the output ZIP in `release/`.
- [x] (Manual) Attempt to open ZIP with Windows Explorer.
