# Custom Scales & Sharing

## Goal
Enable users to create, store, and share custom scales with notes, lengths, and silences. Additionally, allow organizing scales into categories and fix the "view instructions" tooltip on Android.

## Why
Users currently cannot expand the library of scales beyond the built-in ones. Creating custom scales facilitates personal practice routines and creative exploration. Sharing allows for community engagement and simplified transfer of scales between devices. The Android tooltip fix addresses a broken UI interaction.

## Capabilities

- `custom-scales-management`
    - Create and edit scales with notes, note lengths, and silences.
    - Store scales locally on the device.
    - Organize scales into custom or default categories.
    - Edit existing custom scales (name, category, content).
- `scale-sharing`
    - Share scales via QR code (encoded text).
    - Share scales via text string (copy/paste).
    - Import scales from QR code or text string.
- `android-ui-fixes`
    - Fix the "view instructions" tooltip on Android devices to ensure it opens correctly on tap.

## Modified Capabilities
<!-- No existing capabilities are changing requirements, mostly new additions. -->

## Impact
- **UI**: New screens for Scale Creator/Editor, Category Manager, and Import/Export dialogs.
- **Storage**: Persistent local storage (e.g., localStorage or IndexedDB) for user-created scales and categories.
- **Android**: Touch event handling fixes for tooltips.
