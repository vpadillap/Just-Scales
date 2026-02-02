
# Design: Windows ZIP Compatibility

## 1. Overview
This design addresses the issue where generated ZIP artifacts are incompatible with the native Windows File Explorer. The solution involves configuring `electron-builder` to use a compatibility-focused compression mode (Store) for Windows targets.

## 2. Configuration Changes
### package.json
We will modify the `build` configuration in `package.json`.

#### Current State
```json
"win": {
  "target": "zip",
  ...
}
```

#### New State
```json
"win": {
  "target": [
    {
      "target": "zip",
      "arch": ["x64"]
    }
  ],
  "compression": "store", 
  ...
}
```
**Rationale for "store":**
- "Store" (no compression) guarantees that the archive uses the simplest ZIP format features.
- It eliminates issues related to `Deflate64` or high-compression dictionaries that native Windows tools often fail to handle.
- While file size increases, the robustness of the portable artifact is prioritized.

## 3. Alternatives Considered
### "Normal" Compression
- **Pros:** Smaller file size.
- **Cons:** Still risks compatibility issues if `electron-builder`'s underlying 7-zip executable optimizes aggressively.

### "7z" Target
- **Pros:** Better compression.
- **Cons:** Requires users to have 7-Zip installed (native support only in very recent Win11, and inconsistent). User specifically wants ZIP compatibility.

## 4. Implementation Steps
1. Modify `package.json` to add `compression: "store"` to the Windows build config.
2. Ensure the target is explicitly defined as `zip`.
3. Run a build (`npm run electron:build`).
4. Verify the artifact.
