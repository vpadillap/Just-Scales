# Proposal: Switch to Portable Build

## Goal
Configure the project to distribute a standalone Portable Executable (`.exe`) instead of an NSIS installer.

## Changes
1.  **Configuration**: Update `package.json` to use `target: "portable"` for Windows. Remove NSIS config.
2.  **Documentation**: Update `README.md` and `RELEASING.md` to refer to the "Portable Executable".

## Rationale
-   User requested a portable exe.
-   Portable builds are often simpler to distribute for small tools and requires no installation process.
