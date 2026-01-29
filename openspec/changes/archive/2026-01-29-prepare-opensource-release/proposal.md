# Proposal: Open Source Preparation (AGPLv3)

## Goal
Prepare "Just Scales" for public open-source release on GitHub, ensuring legal compliance, developer usability, and a defined release process.

## Requirements
1.  **Licensing**: Apply the **GNU Affero General Public License v3.0 (AGPL-3.0)** to ensuring source availability for network deployments.
2.  **Repository Hygiene**: Implement a robust `.gitignore` for a Modern Web/Electron/Node stack.
3.  **Documentation**:
    -   `README.md`: Clear instructions for users (how to use) and developers (how to compile/run).
    -   `CONTRIBUTING.md`: Guidelines for community contributions.
    -   `RELEASING.md`: Documented release workflow.
4.  **Release Automation**: Define a workflow (e.g. GitHub Actions or script) to streamline releases.

## Justification
Open-sourcing allows community redistribution and improvement. AGPLv3 is chosen to ensure that improvements to this web-based software remain open source, even if deployed as a service.
