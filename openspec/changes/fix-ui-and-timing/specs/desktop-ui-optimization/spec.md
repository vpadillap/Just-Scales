# Spec: Desktop UI Optimization

## 1. Requirements

### 1.1 Disable QR Import on Windows
The QR Code scanning feature (Import) is designed for mobile devices with rear cameras and is awkward/broken on Desktop/Electron.

- **Scenario: Import Scale on Windows**
    - **GIVEN** the application is running in Electron (Windows)
    - **WHEN** the user opens the "Import Scale" dialog (or Sharing screen)
    - **THEN** the "Scan QR Code" button is HIDDEN or DISABLED
    - **AND** the "Import from Clipboard/Text" option is prominent

### 1.2 Preserve QR Export
- **Scenario: Share Scale**
    - **WHEN** the user wants to Share/Export a scale
    - **THEN** the QR Code for the scale IS displayed (allowing mobile users to scan the desktop screen).
