# Design: License Compliance System

## Context
We need to generate and display a list of 3rd-party licenses for compliance.
Currently, there is no mechanism to track or display these.

## Goals
- Automate the generation of license data from `package.json`.
- Provide a responsive UI to view "About" info and "Credits".
- Ensure the data is always up-to-date with releases.

## Architecture

### 1. License Generation Script
We will create a Node.js script `scripts/generate-licenses.js` that uses the `license-checker` library.
This script will:
1.  Scan the project root for production dependencies.
2.  Filter out development dependencies.
3.  Format the data into a JSON array: `[{ name, version, license, author, repository, ... }]`.
4.  Write the output to `src/assets/licenses.json`.

**Integration**:
- Add a script entry to `package.json`: `"licenses:generate": "node scripts/generate-licenses.js"`.
- Update the default release script or workflow to run this command before building.

### 2. UI Architecture
New components will be added to the `src/components` directory:

#### `AboutModal.tsx`
- A modal dialog triggered from the Settings or Sidebar.
- Displays static app info (Version, Developer).
- Contains a "Credits & Licenses" button.

#### `CreditsList.tsx`
- A sub-view or separate modal.
- Imports `src/assets/licenses.json` (dynamically imported to avoid bundle bloat if possible, though JSON is small).
- Renders a scrollable list of dependencies.
- Each item shows the package details as per spec.

### 3. State Management
- No complex global state needed.
- `AboutModal` manages the visibility of `CreditsList`.

## Implementation Details

### `scripts/generate-licenses.js`
```javascript
const checker = require('license-checker');
const fs = require('fs');

checker.init({
    start: '.',
    production: true,
    excludePrivatePackages: true,
}, (err, packages) => {
    if (err) throw err;
    // Transform 'packages' object to array
    // Write to src/assets/licenses.json
});
```

### `package.json`
- Add `license-checker` to `devDependencies`.

## Risks
- **JSON Size**: If dependencies grow very large, the JSON might bloat the bundle. *Mitigation*: Dynamic import or fetch if it becomes an issue (unlikely for now).
- **Inaccurate Data**: `license-checker` might miss complex license structures. *Mitigation*: Manual override capability (can be added to script config if needed later).
