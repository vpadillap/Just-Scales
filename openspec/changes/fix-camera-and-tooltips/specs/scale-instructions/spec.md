
# Spec: Scale Instructions

## 1. Requirements

### 1.1 Instruction Input
Users MUST be able to provide textual instructions when creating or editing a custom scale.

- **Scenario: Enter Directions**
    - **WHEN** user is in the "Create Scale" or "Edit Scale" form
    - **THEN** they see an optional "Instructions / Tooltip" text area
    - **AND** they can enter multi-line text (e.g., "Sing on 'Mum', keep jaw relaxed")

### 1.2 Persistence
- **Scenario: Save Instructions**
    - **WHEN** the scale is saved
    - **THEN** the entered text is stored with the scale data

### 1.3 Usage Display
- **Scenario: View Instructions**
    - **WHEN** the user selects the scale for practice
    - **THEN** the instructions are visible (e.g., via an info icon or directly in the UI)
