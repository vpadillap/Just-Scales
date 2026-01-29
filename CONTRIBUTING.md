# Contributing to JustScales

Thank you for your interest in contributing! "Just Scales" is open-source under the **AGPLv3** license.

## Getting Started

1.  **Fork** the repository.
2.  **Clone** your fork:
    ```bash
    git clone https://github.com/YOUR_USER/JustScales.git
    cd JustScales
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```

## Development

Run the development server (Vite + Electron):
```bash
npm run electron:dev
```

## Pull Request Guidelines

1.  **Atomic Commits**: Keep commits focused on specific changes.
2.  **Semantic Messages**: Use format `type: description` (e.g., `feat: add new piano sound`, `fix: resolve playback lag`).
3.  **No Direct Releases**: Do not bump version numbers in your PR. Maintainers handle releases.

## Code Style
-   We use **TypeScript** and **Global Store** (Zustand) patterns.
-   Styling is **Tailwind CSS**.
-   Ensure no console errors or warnings before submitting.

## License
By contributing, you agree that your contributions will be licensed under the **AGPL-3.0**.
