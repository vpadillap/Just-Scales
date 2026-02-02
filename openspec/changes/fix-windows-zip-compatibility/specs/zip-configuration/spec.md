
# Spec: ZIP Configuration

## 1. Requirements
### 1.1 Compatibility
- The generated ZIP file MUST be extractable using the native Windows File Explorer (Compressed Folders) on Windows 10 and Windows 11.
- The ZIP file SHOULD still be compatible with third-party tools (WinRAR, 7-Zip).

### 1.2 Compression
- The compression method MUST be standard Deflate or Store (no compression) to ensure maximum compatibility.
- Avoid `Deflate64` or proprietary methods.

### 1.3 Configuration
- The configuration MUST be applied in `package.json` under the `build.win` section.
- The configuration SHOULD NOT negatively impact other build targets (NSIS, etc.).

## 2. Configuration Schema
### package.json
```json
"build": {
  "win": {
    "target": [
      {
        "target": "zip",
        "arch": ["x64"]
      }
    ]
  }
}
```
*Note: Specific options like `compression` level may need to be adjusted globally or per-target.*

## 3. Verification
- **Success Criteria:** A "clean" Windows environment (sandbox or standard user machine) can open the ZIP and copy files out without error.
