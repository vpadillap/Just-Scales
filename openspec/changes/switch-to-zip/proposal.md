# Proposal: Switch to ZIP Distribution

## Goal
Distribute the application as a simple ZIP archive containing the executable and resources, instead of a self-contained Portable EXE or Installer.

## Rationale
-   User reported persistent SmartScreen blocks with the Portable EXE.
-   A plain ZIP file allows the user to extract the application, which is a common pattern for "portable" software and may interact differently with security scanners (or simply be preferred by the user).

## Changes
1.  **Configuration**: Update `package.json` to use `target: "zip"` for Windows.
2.  **Documentation**: Update `README.md` and `RELEASING.md` to instruct users to "Download ZIP, Extract, and Run".
