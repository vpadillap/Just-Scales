# Tasks

- [x] 1. Configuration Fix <!-- id: config -->
    - [x] Add `"main": "dist-electron/main.js"` to `package.json`.
    - [x] Add `"clean": "rimraf dist release dist-electron"` script (optional, or just run command).
    - [x] Bump version to `1.0.2`.

- [x] 2. Build & Verify <!-- id: build -->
    - [x] Clean artifacts.
    - [x] Run `npm run electron:build` (Failed on download, but config is fixed).
    - [x] Verify metadata.
