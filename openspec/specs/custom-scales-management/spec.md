
# Spec: Custom Scales Management

## 1. Requirements

### 1.1 Create New Scale
Users can create a new custom scale by defining notes, lengths, and silences.

- **Scenario: Add notes and silences**
    - **WHEN** user selects "Create Scale"
    - **THEN** user is presented with a visually appealing and easy-to-use interface to add note sequences and silence intervals
    - **AND** user can assign specific lengths to each note/silence

### 1.2 Local Storage
Custom scales are stored locally on the device for persistent access.

- **Scenario: Save a new scale**
    - **WHEN** user saves a newly created scale
    - **THEN** the scale is persisted to local storage
    - **AND** the scale appears in the user's library

### 1.3 Category Management
Users can create custom categories and assign scales to them.

- **Scenario: Create new category**
    - **WHEN** user defines a new category name in the Manager
    - **THEN** the category is created and available for scale assignment

- **Scenario: Assign scale to category**
    - **WHEN** user saves or edits a scale
    - **THEN** user can select either a default or custom category

### 1.4 Edit Custom Scale
Users can modify existing custom scales.

- **Scenario: Edit Name and Content**
    - **WHEN** user opens an existing custom scale for editing
    - **THEN** user can modify the name, notes, lengths, and category
    - **AND** changes are saved to the existing record
