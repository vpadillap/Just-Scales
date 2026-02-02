
# Proposal: Fix Windows ZIP Compatibility

## Problem
The generated ZIP release artifacts (e.g., `Just Scales-1.2.2-win.zip`) are incompatible with the native Windows File Explorer extraction tool. The archives can be opened with third-party tools like WinRAR or 7-Zip, but fail to open or extract using Windows' built-in compressed folder support. This suggests a configuration issue in the `electron-builder` packing settings, potentially related to compression methods (Deflate vs Store), Host OS attributes, or file headers.

## Capabilities
### zip-configuration
Identify and implement the correct `electron-builder` configuration to ensure generated ZIP files are fully compatible with Windows File Explorer. This involves:
- Investigating current compression settings (Deflate/Store).
- adjusting build targets or arguments to produce standard, compatible ZIP archives.
- Verifying extraction with native Windows tools.

## Impact
- **Native Usability:** Windows users can extract the portable application without needing third-party software.
- **Distribution Quality:** Ensures a professional, friction-free download and installation experience for the portable version.
