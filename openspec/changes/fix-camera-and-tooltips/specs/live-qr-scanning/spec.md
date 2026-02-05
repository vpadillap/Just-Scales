
# Spec: Live QR Scanning

## 1. Requirements

### 1.1 In-App Scanning
The application MUST support scanning QR codes directly within the application interface without launching an external camera app.

- **Scenario: Start Scanning**
    - **WHEN** user clicks "Scan QR"
    - **THEN** a live camera feed appears within the modal
    - **AND** the app continuously checks frames for a valid QR code

### 1.2 Validation & Feedback
- **Scenario: Valid Code Detection**
    - **WHEN** a valid JustScales JSON QR code is detected
    - **THEN** the scanner automatically pauses/closes
    - **AND** the import dialog is populated or the scale is imported immediately

- **Scenario: Invalid Code**
    - **WHEN** an invalid QR code is scanned
    - **THEN** the scanner ignores it OR shows a temporary "Invalid format" toast (optional)
    - **BUT** does not crash or close the scanner
