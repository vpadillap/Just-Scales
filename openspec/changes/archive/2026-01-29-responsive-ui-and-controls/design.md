# Context
The user wants a "native app" feel where the main interface never scrolls vertically on desktop, with the sidebar handling its own scrolling. Additionally, a global Spacebar shortcut for Play/Pause is required for efficient practicing.

# Goals / Non-Goals
**Goals:**
-   Constrain the main app container to `100vh`.
-   Implement independent scrolling for the Sidebar.
-   Ensure Piano, Visualizer, and Controls scale to fit the remaining vertical space in the Content Area.
-   Implement a safe global Spacebar listener for Play/Stop.

**Non-Goals:**
-   Redesigning the mobile layout entirely (we will stack vertically and allow scroll on small mobile screens as a fallback, but priority is Desktop "fit").

# Milestones
1.  **Layout Refactor**: Update `App.tsx` and `SessionDashboard.tsx` structure.
2.  **Visualizer Tuning**: Ensure `DotGraphVisualizer` accepts flexible height (e.g., `h-full` instead of fixed pixels).
3.  **Shortcuts**: Implement `useGlobalShortcuts` hook.

# Details

## Decision: Layout Architecture
We will use a standard "Sidebar + Main Content" flex layout constrained to the viewport.

**Structure:**
```tsx
// App.tsx
<div className="flex h-screen w-screen overflow-hidden bg-surface">
  <Sidebar className="w-64 flex-shrink-0 overflow-y-auto" />
  <main className="flex-1 flex flex-col h-full overflow-hidden relative">
     <ContentArea /> 
  </main>
</div>
```

**Content Area Distribution (`SessionDashboard`):**
To ensure "everything fits", we need a vertical flex container:
-   **Header**: Auto height.
-   **Visualizer**: `flex-1` (Takes whatever is left).
-   **Controls**: Auto height (Fixed size controls).
-   **Piano**: Fixed height or `flex-none` (e.g., `h-48`).

## Decision: Global Shortcuts Hook
We will create a custom hook `useGlobalShortcuts` to encapsulate the logic:
-   Listen to `keydown` on `window`.
-   Check `event.code === 'Space'`.
-   Check `document.activeElement` to ignore inputs.
-   `preventDefault` to stop scrolling.
-   Call `togglePlayback` from `useAudioStore`.

## Decision: Mobile Fallback
On screens `< 768px` (standard mobile), we will revert to `h-auto` and `overflow-y-auto` for the root, allowing natural scrolling, as 100vh is often too cramped for all components on a phone.

# Risks / Trade-offs
-   **Vertical Squash**: On short laptops (e.g., 13" Air), the Visualizer might get very short if Header/Controls/Piano take up too much space.
    *   *Mitigation*: Set a `min-height` for the visualizer and allow the *main area* to scroll internally if absolutely necessary, OR just let it squash (User requested "everything fits", so we prioritize fit, but `min-height` is a safety net).
-   **Implicit Focus**: If the user clicks a button (like "Start"), that button might keep focus. Pressing space might trigger the button *and* the global listener.
    *   *Mitigation*: The global listener should handle the toggle. If the button also triggers on space (standard HTML behavior), we need to ensure we don't double-trigger. `event.preventDefault()` in the global listener often handles this, but we should test. Actually, standard buttons fire `click` on Space.
    *   *Refinement*: If `document.activeElement` is a button, we might want to let the browser handle it, OR aggressively `preventDefault` and handle it manually. *Decision*: Aggressively `preventDefault` on Space for the global action to ensure consistent Play/Stop behavior regardless of which specific button has focus (unless it's a text input).
