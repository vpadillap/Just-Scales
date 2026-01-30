# Proposal: Fix Release Metadata & SmartScreen Warning

## Goal
Fix incorrect publisher information in the installer and document the Windows SmartScreen warning for unsigned applications.

## Changes
1.  **Metadata**: Update `package.json` with explicit `copyright` and `build.win.publisherName`.
2.  **Documentation**: Update `RELEASING.md` or `README.md` to include a "Troubleshooting Installation" section explaining SmartScreen.

## Rationale
-   Users reported seeing "GitHub" as the organization instead of the author. Explicit configuration overrides defaults.
-   Unsigned binaries trigger Windows SmartScreen. Documentation must guide users through this until code signing is implemented.
