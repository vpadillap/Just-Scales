# Goal
Build **JustScales**, a free, open-source, modern Windows desktop application that replicates and improves upon the functionality of "SwiftScales" (Android). It will serve as a portable, powerful virtual vocal coach and piano simulator, featuring a "modern clean minimalist" UI with premium aesthetics (glassmorphism, animations).

# Context
The user wants a Windows equivalent of SwiftScales, a vocal training app that simulates a piano coach. Existing solutions are often mobile-only, paid, or lack modern UX. **JustScales** aims to be the superior, free alternative.

**Key Requirements:**
*   **Platform**: Windows Desktop.
*   **Cost**: 100% Free, Open Source, No Ads, No Memberships.
*   **Aesthetics**: Wow-factor UI, modern typography, fluid animations, dark mode/neon accents.

# Design Proposals

## Architecture
We will use a modern web-based desktop stack to ensure rapid development of the UI and audio capabilities while maintaining cross-platform potential (focused on Windows).

*   **Runtime**: [Electron](https://www.electronjs.org/) (for native window management and unlimited system access).
*   **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) (fast, component-based).
*   **Language**: TypeScript (for type safety and maintainability).
*   **Styling**: [TailwindCSS](https://tailwindcss.com/) (rapid styling) + `framer-motion` (animations) + `glassmorphism` techniques.
*   **Audio Engine**: [Tone.js](https://tonejs.github.io/) (Web Audio API wrapper) for synthesized piano/orchestral sounds, scheduling, and real-time playback control.
*   **State Management**: Zustand or React Context (for routine/scale state).
*   **Persistence**: `electron-store` or local file system (JSON) for saving user routines/settings.

## Core Features
Derived from SwiftScales analysis:

### 1. Virtual Vocal Coach / Piano Simulator
*   **Realistic Piano**, Sawtooth, or customizable instrument sounds.
*   **Visual Keyboard**: 88-key scrolling view that highlights notes being played.

### 2. Scale Categories & Library
The app organizes content by **Functional Goals** (mimicking SwiftScales) while identifying the underlying musical scale.

**Functional Categories (The "Why"):**
*   **Warming Up**: Gentle vocal fold activation (Lip Trills, Humming).
*   **Breathing & Support**: Engagement of the diaphragm and breath management.
*   **Range Extension**: Safely expanding high and low registers.
*   **Agility & Flexibility**: Fast melismatic runs and intervals.
*   **Power & Resonance**: Building projected, healthy volume (Belting, Mix).
*   **Articulation & Diction**: Tongue and jaw relaxation, vowel clarity.
*   **Ear Training**: Pitch matching and interval recognition.
*   **Connection (Mix)**: Bridging chest and head voice smoothly.
*   **Cool Down**: Relaxing the voice after heavy use.
*   **Style**: Jazz, Pop, or Classical specific ornaments.

**Scale Properties:**
Each scale entry will display:
*   **Functional Name**: e.g., "Foundation I".
*   **Musical Name**: e.g., "Major Pentatonic".
*   **Description**: "Good for basic pitch accuracy."

### 3. Practice Session Controls (The "Coach")
*   **Session Dashboard**:
    *   **BPM Selector**: Dial/Slider to set tempo (defaults to suggested).
    *   **Preview Button**: Plays the scale one time through (listening mode).
    *   **Start Button**: Begins the interactive session (Play -> User Repeat).
*   **Instructional Metadata**:
    *   **Detailed Tooltips**: Rich text explanations available on hover or click.
    *   **Content Example**: "This scale is commonly used with **Lip Trills** throughout the range to balance the larynx and encourage consistent airflow."
    *   **Usage Goals**: Explaining *why* a scale is used (e.g., "Connection", "Agility") and *how* to execute it.
    *   On-screen text/tips: "Keep your jaw loose", "Focus on breath support".
    *   *Future*: Audio clips of instructions.

### 4. Routine & Playlist Management (Crucial)
*   **Structure**: A `Routine` is an ordered list of `Scale` entries, each with its own override settings (duration, keys, starting note).
*   **Pre-set Routines**: "Morning Warmup (10m)", "Full Workout (30m)", "High Range Extender".
*   **Custom Routines**:
    *   **Builder UI**: Drag-and-drop interface to build a playlist.
    *   **Settings per Step**: User can define "Start on C3, go up to G4" for *Scale A* in the routine.
    *   **Auto-Advance**: Option to automatically play the next scale after a pause.

### 5. Tools & Utilities
*   **Pitch Pipe**: Simple tool to play reference notes or chords.
*   **Recorder**: Integrated audio recorder to capture the session + user's voice for playback/review.
*   **Metronome**: Visual and audio click track.

## User Interface Design (UI/UX)
*   **Theme**: Modern Clean Minimalist. **FLAT DESIGN**.
*   **Constraints**:
    *   **NO GRADIENTS**. Use solid, high-contrast flat colors.
    *   **NO WHITE-ON-WHITE**. Ensure distinct separation between layers (Surface vs Background).
*   **Color Palette** (Neon / Flat):
    *   `neon_pink`: #f72585 (Primary Brand)
    *   `raspberry_plum`: #b5179e
    *   `indigo_bloom`: #7209b7
    *   `ultrasonic_blue`: #560bad
    *   `true_azure`: #480ca8
    *   `vivid_royal`: #3a0ca3
    *   `bright_indigo`: #3f37c9
    *   `electric_sapphire`: #4361ee
    *   `blue_energy`: #4895ef
    *   `sky_aqua`: #4cc9f0
    *   **Usage**: Use these as solid accent colors against `surface-base` (White) and `surface-dark` (Slate-900).
*   **Interactions**:
    *   Large, touch-friendly, solid flat buttons.
    *   Immediate visual feedback (active states).
    *   **Piano Visualizer**: High contrast keys (e.g., Dark container, White keys, deep black sharps). Active notes pop with solid flat color.

# Risks / Trade-offs
*   **Audio Latency**: Web Audio API is generally performant, but high-load visualizations + audio synthesis on lower-end Windows machines could introduce slight jitter. *Mitigation: Optimize Tone.js scheduling and use `requestAnimationFrame` strictly for UI.*
*   **Complexity of Custom Scales**: Building a UI for custom scale definition that isn't confusing is a UX challenge. *Mitigation: Start with simple interval selection, adding advanced "piano roll" editing later.*
