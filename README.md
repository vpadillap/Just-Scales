# Just Scales 🎹

> A simple, open-source vocal practicing tool for singers. Precision scales, customizable routines(WIP), and visual feedback.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Features
-   **Precision Playback**: Accurate timing and pitch for vocal exercises.
-   **Visualizers**: Real-time piano and frequency visualization.
-   **Customizable**: Adjust BPM, Key, and Pattern.
-   **Responsive**: Fits any screen, from desktop to mobile (off-canvas controls).

## Installation

### Windows
1.  Go to the [Latest Release](https://github.com/user/JustScales/releases/latest) page.
2.  Download the **Portable Executable** (`.exe`).
3.  Run the file (no installation required).
4.  *(Optional)* Move it to your preferred folder or desktop.

> **Note:** If Windows SmartScreen prevents execution ("Windows protected your PC"):
> 1. Click **More info**.
> 2. Click **Run anyway**.
> *This happens because the app is open-source and not digitally signed with a paid certificate yet.*

### Mac / Linux
Currently, you must build from source (see Development).

## Development

### Prerequisites
-   Node.js (LTS)
-   NPM

### Setup
```bash
# Clone the repo
git clone https://github.com/user/JustScales.git
cd JustScales

# Install dependencies
npm install
```

### Running Locally
Start the Electron app in development mode with hot-reload:
```bash
npm run electron:dev
```

### Building
To create the executable for your OS:
```bash
npm run electron:build
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Release Process
See [RELEASING.md](RELEASING.md) for versioning and release policies.

## License
Licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0). See [LICENSE](LICENSE).
