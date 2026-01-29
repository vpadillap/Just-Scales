# Proposal: Binary Releases & Configuration

## Goal
Enable and document the creation of installable binaries (Windows .exe, etc.) for GitHub Releases, ensuring users can easily run the application without Node.js.

## Requirements
1.  **Build Configuration**: Configure `electron-builder` in `package.json` for Windows (NSIS).
2.  **Documentation**: Update `RELEASING.md` to explicitly include "Attach Binaries" step or automation usage.
3.  **Specs**: Update `oss-prep` spec to mandate binary availability.

## Justification
Users are requesting a downloadable application. The current build script exists but lacks specific target configuration (like icons, installer settings), resulting in default unoptimized builds.
