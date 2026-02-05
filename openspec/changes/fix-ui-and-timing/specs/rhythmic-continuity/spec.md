# Spec: Rhythmic Continuity

## 1. Requirements

### 1.1 Equal Spacing
The silence (pauses) between musical elements must be rhythmic and consistent with the chord duration.

- **Scenario: Transition Scale to Chord**
    - **GIVEN** the scale notes have finished playing
    - **THEN** the silence before the chord plays must be equal to the chord's duration (e.g., if Chord is quarter note, silence is quarter note).

- **Scenario: Transition Chord to Next Scale**
    - **GIVEN** the chord has finished playing
    - **THEN** the silence before the next scale repetition starts must be equal to the chord's duration.

### 1.2 Configuration
- Default Chord Duration: Quarter Note ("4n").
- Default Pause Duration: Quarter Note ("4n").
