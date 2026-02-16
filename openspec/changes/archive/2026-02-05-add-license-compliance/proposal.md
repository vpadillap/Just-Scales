# Proposal: License Compliance & Attribution

## Why
As a developer distributing software, I must ensure compliance with open-source licenses (MIT, Apache, etc.) used by production dependencies. Failure to properly attribute authors can lead to legal issues and violates the spirit of open source. Currently, the app lacks a user-facing way to view license information or credits.

Manually maintaining a credits file is error-prone; if a dependency is added or removed, the credits often get out of sync. Therefore, we need an automated system to generate this attribution data from the actual `package.json` dependencies and integrated it into the app.

## What Changes

### 1. Automated License Scanning Workflow
- A script/workflow that runs primarily during the release process (but can be run independently).
- Scans production dependencies (likely using `license-checker` or similar).
- Generates a structured text file or JSON containing:
    - Package Name & Version
    - License Type
    - Author/Publisher
    - License Text/Link
- Uses a consistent template for output.
- Ensures that if a package is removed, it disappears from the output on the next run.

### 2. User Interface (About & Credits)
- **About Section**: A new small button/section in the app to show developer info ("About Just Scales").
- **Credits Popup**: Triggered from the About section, displaying the generated license text/attribution list.

### 3. Release Integration
- The automated scanning workflow must be orchestrated as a mandatory step in the release pipeline to ensure no release goes out without up-to-date attribution.

## Capabilities

### `license-workflow`
Automated scanning of `node_modules` to generate a standardized attribution document (e.g., `src/assets/licenses.txt` or JSON) based on production dependencies.

### `about-ui`
UI components for the "About" section and the logic to load and display the generated credits/licenses.

## Impact
- **New Dependency**: `license-checker` (or similar) added to `devDependencies`.
- **New UI**: About Modal / Credits Modal.
- **Build Process**: Modified release workflow to include the scan step.
- **Compliance**: Ensures legal compliance with dependency licenses.
