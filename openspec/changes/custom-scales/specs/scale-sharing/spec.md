## ADDED Requirements

### Requirement: Share via QR Code
Users can share a custom scale by generating a QR code containing the scale data.

#### Scenario: Generate QR Code
- **WHEN** user selects "Share via QR" for a specific scale
- **THEN** a QR code representing the scale data is displayed on screen

### Requirement: Share via Text String
Users can share a custom scale by generating a text string representation.

#### Scenario: Copy Text String
- **WHEN** user selects "Share via Text"
- **THEN** a text representation of the scale is copied to the clipboard

### Requirement: Import via QR Code (Camera)
Users can import a scale by scanning a QR code using the device camera.

#### Scenario: Scan QR Code
- **WHEN** user selects "Import from QR"
- **THEN** the device camera opens
- **WHEN** a valid scale QR code is scanned
- **THEN** the scale is imported and saved to the library

### Requirement: Import via Text String
Users can import a scale by pasting a text string.

#### Scenario: Paste Text String
- **WHEN** user selects "Import from Text"
- **AND** pastes a valid scale string
- **THEN** the scale is imported and saved to the library
