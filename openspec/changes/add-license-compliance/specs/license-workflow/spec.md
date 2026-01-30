# Specification: Automated License Scanning

## Requirement: Automated scanning of production dependencies
The system MUST include an automated workflow to scan all production dependencies and generate a consolidated attribution file.

### Scenario: Running the license scan
- **WHEN** the license scan script is executed (manually or via CI)
- **THEN** it searches for all production dependencies in `package.json`
- **AND** it extracts the License Type, Author, Repository, and Custom Copyright Text for each
- **AND** it generates a single output file (e.g., `src/data/licenses.json` or `src/assets/licenses.txt`) containing this data
- **AND** it excludes `devDependencies`

## Requirement: Standardized Output Format
The generated attribution file MUST follow a consistent, machine-readable format to be easily consumed by the UI.

### Scenario: Generating JSON output
- **GIVEN** a set of scanned dependencies
- **WHEN** the output is generated
- **THEN** it is formatted as a JSON array where each entry contains:
  - `name`: Package name
  - `version`: Package version
  - `license`: License type (MIT, Apache, etc.)
  - `author`: Author string
  - `repository`: Repository URL
  - `licenseText`: Full text of the license (if available/required)

## Requirement: Release Integration
The scanning process MUST be part of the release workflow.

### Scenario: Building a release
- **WHEN** the `npm run release` command is executed
- **THEN** the license scan runs BEFORE the build step
- **AND** if the scan fails, the release process aborts
