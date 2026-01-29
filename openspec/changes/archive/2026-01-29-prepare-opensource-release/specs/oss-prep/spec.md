# Specification: Open Source Standards

## Requirement: AGPLv3 License
The repository MUST contain a file named `LICENSE` containing the full text of the GNU Affero General Public License version 3.

## Requirement: Git Exclusion
The `.gitignore` MUST exclude:
-   `node_modules/`
-   Build artifacts (`dist/`, `build/`, `out/`)
-   Environment files (`.env`, `.env.local`)
-   OS metadata (`.DS_Store`, `Thumbs.db`)
-   IDE configs (optional, but recommended `.vscode/` or `*.swp`)
-   Agent artifacts (`.agent/`, `.gemini/` if applicable, though `openspec` might be committed)

## Requirement: README Content
The `README.md` MUST include:
1.  **Project Title & Description**.
2.  **License Badge** (AGPLv3).
3.  **Installation**: `npm install`
4.  **Development**: `npm run dev` / `npm run electron:dev`
5.  **Building**: How to create the executable.

## Requirement: Release Policy & Workflow
The project MUST adhere to a strict release policy documented in `RELEASING.md`.

### 1. Semantic Versioning
-   **Minor Bump (X.Y.0)**: New features, content, or skills.
-   **Patch Bump (X.0.Z)**: Bug fixes, docs, or maintenance.
-   **Major Bump (X.0.0)**: Breaking changes to file formats or data structures.

### 2. Changelog Standards
The `CHANGELOG.md` file MUST:
-   Follow the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.
-   Include `## [Unreleased]` section at top.
-   Include `## [X.Y.Z] - YYYY-MM-DD` entries.
-   Include categorization: `### Added`, `### Changed`, `### Fixed`.
-   Include comparison links at the footer (e.g., `[v1.0.1]: .../compare/v1.0.0...v1.0.1`).

### 3. Git Release Workflow
The release process MUST involve:
1.  **Commit**: Message format `docs: release vX.Y.Z`.
2.  **Tag**: Annotated git tag `vX.Y.Z`.
3.  **Push**: `git push --tags`.
4.  **GitHub Release**: Use `gh release create` (or manual) with properly formatted notes derived from the Changelog.

## Requirement: Release Automation
The project MUST include a script (e.g., `scripts/release.js` or `npm run release`) OR detailed command-line instructions in `RELEASING.md` to perform the tagging and pushing steps safely.
