# Release Policy & Workflow

This project adheres to strict **Semantic Versioning** and follows a documented Git release workflow.

## Versioning Policy

We use [Semantic Versioning 2.0.0](https://semver.org/).

-   **Major (X.0.0)**: Breaking changes (e.g., incompatible data formats, removal of core features).
-   **Minor (1.X.0)**: New features, skills, or significant content additions (backward compatible).
-   **Patch (1.0.X)**: Bug fixes, documentation updates, dependencies, maintenance.

## Release Workflow

To perform a release, follow these steps exactly.

### 1. Update Changelog
1.  Open `CHANGELOG.md`.
2.  Move items from `[Unreleased]` to a new version section `[X.Y.Z] - YYYY-MM-DD`.
3.  Ensure links at the bottom of the file are updated for the diff comparison.

### 2. Commit Documents
```bash
git add CHANGELOG.md
git commit -m "docs: release vX.Y.Z"
```

### 3. Create Tag
Create an **annotated** tag.
```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
```

### 4. Push
Push both the commit and the tag.
```bash
git push && git push --tags
```

### 5. GitHub Release
Create the release on GitHub. You can use the CLI or the web interface.
```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "See CHANGELOG.md for details."
```

### 6. Attach Binaries
After the release is created on GitHub:
1.  Locate the build artifacts in the `release/` directory (e.g., `Just Scales Setup 1.0.0.exe`).
2.  Edit the release on GitHub.
3.  Upload the installer file(s) as assets.
4.  Save the release.

## Build Verification
Before releasing, always verify a clean build:
```bash
npm run build
# OR
npm run electron:build
```
