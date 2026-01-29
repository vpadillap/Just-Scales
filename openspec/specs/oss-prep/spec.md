# Specification: Open Source Standards

## Requirement: Binary Distribution
The project MUST provide compiled binaries for at least the primary development OS (Windows) attached to each GitHub Release.

### Electron Builder Configuration
The `package.json` MUST contain explicit `build` configuration including:
-   `appId`: Unique identifier (e.g., `com.example.justscales`).
-   `productName`: "Just Scales".
-   `win`: Target `zip` (ZIP Archive) to minimize complexities (SmartScreen, etc).
-   `directories`: Output to `dist` or similar.

### Release Workflow Addition
The `RELEASING.md` workflow MUST include a step to:
1.  Run the build command `npm run electron:build`.
2.  Locate the artifacts (e.g. `.exe` files).
3.  Upload these artifacts to the GitHub Release entry.
