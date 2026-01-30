# Specification: About & Credits UI

## Requirement: About Section
The app MUST provide an "About" section accessible from the main navigation or settings area.

### Scenario: Viewing About information
- **WHEN** the user navigates to the About section
- **THEN** it displays:
  - App Name ("Just Scales")
  - App Version (synced with package.json)
  - Developer/Author Information
  - A button/link to "View Open Source Licenses" or "Credits"

## Requirement: Credits Display
The app MUST display a list of all 3rd-party open source software used in production.

### Scenario: Opening Credits
- **WHEN** the user taps "Credits" or "View Licenses"
- **THEN** a modal or screen appears listing all dependencies (generated from the `license-workflow`)
- **AND** for each dependency, it shows:
  - Package Name
  - License Type
  - Author
  - Link to repository (if available)

## Requirement: Dynamic Content Loading
The credits list MUST be loaded dynamically from the generated asset file, ensuring no manual hardcoding of credits in the UI code.

### Scenario: Loading credits
- **WHEN** the Credits view initializes
- **THEN** it fetches/imports the generated JSON/Text file
- **AND** renders the list based on that data
