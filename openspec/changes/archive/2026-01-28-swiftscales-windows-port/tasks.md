# Tasks

- [/] 1. Project Initialization <!-- id: init -->
  - [x] Initialize Electron + React + Vite + TypeScript project
  - [x] Configure `electron-builder`
  - [x] Install dependencies: `tone`, `zustand`, `tailwindcss`, `framer-motion`
  - [x] Set up Tailwind CSS with 'JustScales' theme (Dark/Neon)

- [/] 2. Audio Engine Core <!-- id: audio -->
  - [x] Create `useAudioStore` (Zustand)
  - [x] Initialize Tone.js Synth (PolySynth with Piano timbre fallback to Sawtooth)
  - [x] Implement `playNote(note, duration)` function
  - [x] Implement `schedulePattern(notes, bpm)` function

- [x] 3. Scale Logic & Library <!-- id: scales -->
  - [x] Define `Scale` interface (name, intervals, category, techniqueTags)
  - [x] Implement "Foundation" scales data (Major 5-tone, Octave, Minor)
  - [x] Implement `ScaleGenerator` utility to map intervals to notes based on Root

- [x] 4. UI Implementation <!-- id: ui -->
  - [x] Create `MainLayout` (Sidebar + Content Area)
  - [x] Build `PianoVisualizer` component (Canvas or DIVs)
  - [x] Build `SessionControls` component (BPM, Play/Stop)
  - [x] Build `InstructionPanel` to display Technique Tags & Usage Context

- [x] 5. Verification <!-- id: verify -->
  - [x] Verify Audio Playback (Manual Test: Click Start -> Hear Scale)
  - [x] Verify Visual Feedback (Keys light up in sync)
  - [x] Verify Technique Tags display correctly for "Foundation" scales
  - [x] Fix: Rossini Scale Pattern (13-notes)
  - [x] Fix: UI Responsiveness (Sidebar/Piano Overflow)
  - [x] Feat: Keyboard Shortcuts & BPM Input

- [ ] 6. Comprehensive Content (Phase 2) <!-- id: content-p2 -->
  - [ ] Implement all 10 Functional Categories (Warming Up, Agility, etc.)
  - [ ] Update `scales.ts` with full scale definitions

- [ ] 7. Routines Feature (Phase 2) <!-- id: routines-p2 -->
  - [ ] Implement `Routine` data structure
  - [ ] Build Routine Builder UI (Playlist management)
