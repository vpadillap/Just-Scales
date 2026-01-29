# Proposal: Dot Graph Visualizer

## Goal
Implement a visual "dot graph" indicator that represents the melodic contour of the current scale. This visualizer will display a sequence of dots corresponding to the notes in the run, where the vertical position represents pitch and the horizontal position represents time/sequence. As the scale plays, the corresponding dots should light up to provide real-time visual feedback.

## Why
Visualizing the "shape" of the melody helps singers anticipate pitch changes and understand the structure of the exercise. This feature mimics the effective visual feedback found in "Swiftscales", enhancing the training experience by combining auditory and visual learning.

## What Changes
1.  **New Component**: Create a `DotGraphVisualizer` component.
2.  **Audio Integration**: Connect the visualizer to the `useAudioStore` to track `currentNote` and the active scale pattern.
3.  **UI Update**: Integrate this visualizer into the `SessionDashboard`, likely above or replacing the current "Sound Reference" card or as a new overlay.

## Capabilities

### `dot-graph-rendering`
Ability to render a series of dots based on a `Scale` pattern.
-   **Input**: `Scale` object (intervals), `currentRoot`.
-   **Ref**: Calculate relative pitch height for each note.
-   **Layout**: Distribute dots horizontally. Map pitch to vertical y-axis.

### `real-time-feedback`
Ability to highlight the "active" dot when a note is played.
-   **Sync**: React to `currentNote` changes from `useAudioStore`.
-   **Animation**: "Light up" effect (brightness/color change) for the active note. Previous notes could stay dim or fade.

## Impact
-   **Files**: `src/components/DotGraphVisualizer.tsx` (New), `src/components/SessionDashboard.tsx` (Modify).
-   **Dependencies**: `framer-motion` (for smooth animations), `useAudioStore`.
-   **Risks**: Ensuring accurate sync with audio; handling complex scales (many notes) visually within the screen width.
