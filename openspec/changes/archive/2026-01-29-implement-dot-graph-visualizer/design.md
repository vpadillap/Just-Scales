# Context
The user wants a visual representation of the scale similar to "Swiftscales", where points (dots) represent notes in pitch and time. As the scale plays, the current note should light up. This requires a new UI component `DotGraphVisualizer` and tighter integration with the audio engine's state to track progress within a pattern sequence.

# Goals / Non-Goals
**Goals:**
- Render a static graph of dots representing the scale pattern (Pitch vs Index).
- Highlight the active dot in real-time (<50ms latency).
- Integrate seamlessly into `SessionDashboard`.

**Non-Goals:**
- Interactive editing of the graph (it is read-only).
- distinct rhythms visualization beyond simple index spacing (V1 assumes uniform or handled spacing).

# Milestones
1.  **State Management Update**: enhance `useAudioStore` or usage to track `currentNoteIndex` or a unique ID for the current event in the sequence.
2.  **Component Implementation**: Build `DotGraphVisualizer` using SVG or Framer Motion.
3.  **Integration**: Embed in `SessionDashboard`.

# Details

## Decision: Dot Graph Representation
We will use a mapping where:
-   **X-Axis**: Sequence Step (Unrolled). If `repeatOnRoot` is > 1, the graph shows ALL repetitions linearly.
    -   *Example*: Pattern [1,3,5] repeated twice becomes [1,3,5, 1,3,5]. The graph shows 6 dots.
-   **Y-Axis**: Interval from Root (semitones).
-   **Normalization**: The Y-axis will be normalized range [Min, Max] of the full sequence.

## Decision: Synchronization Mechanism
The `useAudioStore` currently tracks `currentNote` (string), which is ambiguous.
**We will add `currentStepIndex`** to the store.
-   `runLoop` generates the full `fullPatternSequence`.
-   As it schedules notes, it will schedule updates to `currentStepIndex` (0, 1, 2... TotalLength-1).
-   The Visualizer strictly highlights the dot at `currentStepIndex`.

## Decision: Technology
-   **SVG**: Best for resolution independence and simple coordinate mapping.
-   **Framer Motion**: For the "light up" animation (e.g., `animate={{ scale: 1.5, opacity: 1 }}`).

# Risks / Trade-offs
-   **Latency**: React state updates via `Tone.Draw` are generally fast enough, but if main thread is busy, visuals might lag audio.
    *   *Mitigation*: Keep the visualizer component lightweight.
-   **Range Extremes**: A scale spanning 3 octaves might look squashed vertically.
    *   *Mitigation*: Set a minimum vertical step size visually.
