# Design Context
The user requires a strict "Flat Minimalist" aesthetic with a White background and specific Neon accents. No gradients, no white-on-white low contrast. Core functionality (Categories, Play Loop) must be fixed.

## Architecture
- **Frontend**: React + TailwindCSS.
- **State**: Zustand (`useAudioStore`) for session logic.
- **Routing/Navigation**: React State (`selectedCategory` in App.tsx) due to simple single-window architecture.

## User Interface Design
### Theme: Flat White & Neon
- **Background**: `surface-base` (#ffffff) universally.
- **Text**: `text-primary` (#0f172a), `text-secondary` (#64748b).
- **Accents**: Neon Palette (below). Used for Active Buttons, Highlights, Visualizer Keys.

### Color Palette (Neon)
- `neon_pink`: #f72585
- `raspberry_plum`: #b5179e
- `indigo_bloom`: #7209b7
- `ultrasonic_blue`: #560bad
- `true_azure`: #480ca8
- `vivid_royal`: #3a0ca3
- `bright_indigo`: #3f37c9
- `electric_sapphire`: #4361ee
- `blue_energy`: #4895ef
- `sky_aqua`: #4cc9f0

### Components
- **MainLayout**: Sidebar with solid categories (Neon Pink active state).
- **SessionDashboard**:
    - **Buttons**: Flat circle/rounded-square. Solid color. No shadow/gradient.
    - **Inputs**: Simple borders.
- **PianoVisualizer**:
    - **Background**: Dark/Black for contrast against white keys.
    - **Keys**: White naturals, Black sharps.
    - **Active**: Neon Pink solid fill.

## Implementation Details
### Session Engine (`useAudioStore`)
- **Loop**: `runSessionLoop` recursive function.
- **State**: `sessionStatus` (IDLE, PLAYING, WAITING) controls flow.
- **Transpose**: `Tone.Frequency().transpose()` calculated at start of each loop iteration.
