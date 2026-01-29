# Story
"As a singer, I want to see the 'shape' of the scale as a graph of dots so that I can visualize the pitch changes and prepare for upcoming intervals."

# Scenarios

## Scenario: Visualizing a Scale Pattern
- **GIVEN** the session is active with a specific scale (e.g., Major Scale)
- **WHEN** the scale loads or the root changes
- **THEN** the visualizer renders a sequence of dots
- **AND** the vertical position of each dot corresponds to its pitch relative to the root
- **AND** the horizontal position corresponds to its sequence index

## Scenario: Handling Range Restrictions
- **GIVEN** the scale has a wide range (e.g., 2 octaves)
- **WHEN** the dots are rendered
- **THEN** they should fit within the vertical bounds of the visualizer container
- **AND** scale appropriately so high/low notes act as the bounds

# Requirements

### Requirement: Pitch Mapping
The system MUST calculate a normalized vertical position (0-100%) for each note in the pattern based on its semitone distance from the lowest note in the sequence.

### Requirement: Horizontal Distribution
The system MUST distribute dots evenly across the available width, or proportionally based on note duration if rhythm is variable (though even spacing is acceptable for V1).

### Requirement: Responsive Scaling
The visualizer MUST adjust its drawing coordinates if the container size changes (e.g. window resize).
