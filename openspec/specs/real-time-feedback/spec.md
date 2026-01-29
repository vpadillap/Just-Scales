# Story
"As a singer, I want the dots to light up as I sing (or as the piano plays) so that I know exactly which note in the sequence I am currently on."

# Scenarios

## Scenario: Active Note Highlighting
- **GIVEN** the scale is playing
- **WHEN** the audio engine triggers a new note
- **THEN** the corresponding dot in the visualizer changes visual state (e.g., becomes brighter, changes color)
- **AND** the previously active dot reverts to its inactive state (or a "visited" state)

## Scenario: Stop/Reset
- **GIVEN** the session is playing
- **WHEN** the user stops the session
- **THEN** all dots revert to the inactive state (no current highlight)

# Requirements

### Requirement: Store Subscription
The visualizer MUST subscribe to the `useAudioStore` `currentStepIndex` to detect which note is active.

### Requirement: Unrolled Step Index
The system MUST track the `currentStepIndex` corresponding to the unrolled sequence (including repetitions).
-   Index 0 = First note of the first repetition.
-   Index N = Last note of the last repetition.
-   The visualizer MUST highlight the dot at `currentStepIndex` as the "Active" note.


### Requirement: Low Latency
The visual update MUST occur within <50ms of the audio event to ensure perceived synchronization.
