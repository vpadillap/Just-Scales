# Requirements

### Requirement: Flat Minimalist Aesthetics
The application MUST use a strictly "Flat Design" aesthetic.
- **Backgrounds**: Pure White (`#ffffff`) or Semantic Surface colors. NO Gradients.
- **Buttons**: Solid flat colors. NO Shadows (unless subtle elevation), NO Gradients.
- **Visualizer**: High contrast. White keys on Dark background. Active notes use solid Neon colors.

### Requirement: Functional Categories
The Sidebar Categories MUST filter the displayed Scales in the Dashboard.
- Clicking a Category selects it.
- Selecting a Category filters `SCALES` list to only show matching items.
- Top-level `selectedScale` defaults to the first item of the new category.

### Requirement: Reliable Session Loop
The "Play" button MUST trigger a continuous practice loop.
- **Loop Logic**: Play Scale -> Wait (time proportional to current BPM) -> **Play Guide Chord (Target Root)** -> Wait (same time proportional to current BPM as before) -> Repeat (with New Root).
- **Controls**: Stop button must immediately halt sound and reset loop.
- **Direction**: User can toggle Ascending/Descending mid-loop.
- **Visual Feedback**: The current direction (ASC/DESC) MUST be clearly visible to the user at all times.

### Requirement: Guide Chord Logic
To support vocal training, the app must play a "Guide Chord" (Root-Major3-Perfect5) or at minimum the new Root Note during the transposition gap. This helps the singer attune to the new key before the scale starts.

### Requirement: Neon Color Palette
The application MUST use the specific Neon Palette for accents:
- Primary: `neon_pink` (#f72585)
- Secondary: `ultrasonic_blue`, `electric_sapphire`, etc. as defined in Design.
