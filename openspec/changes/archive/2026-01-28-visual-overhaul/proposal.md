# Proposal: Visual Overhaul & Core Fixes

## Problem
The current application implementation has diverged from the desired "Flat Minimalist" aesthetic, using unwanted gradients and suffering from low contrast (white-on-white). Additionally, core features like Category Navigation and the Play Button (Session Loop) are currently non-functional or buggy.

## Solution
We will implement a comprehensive visual overhaul and fix the identified functional regressions in a single coordinated effort.

### Scope
1.  **Visual Overhaul**:
    *   Enforce a strict "Flat White" theme (No Gradients).
    *   Apply the specific Neon Color Palette for accents.
    *   Ensure high contrast for all UI elements (Session Dashboard, Piano Visualizer).
    *   Remove all shadowed/gradient buttons and replace with solid flat designs.

2.  **Core Bug Fixes**:
    *   **Categories**: Wire up the Sidebar to correctly filter the Scale List.
    *   **Play Button**: Debug and fix the `useAudioStore` session loop to ensure reliable start/stop/transpose behavior.

### Deliverables
*   Updated `MainLayout` (Functional Categories).
*   Refactored `SessionDashboard` (Flat Design).
*   Refactored `PianoVisualizer` (High Contrast).
*   Patched `useAudioStore.ts` (Reliable Loop).

## Risks
*   **Audio Logic**: `Tone.js` scheduling can be tricky; simplifying the loop logic in `useAudioStore` is critical to prevent race conditions.
