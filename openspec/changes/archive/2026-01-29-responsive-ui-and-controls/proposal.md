# Goal
To improve the usability of the application on various screen sizes and enable quicker interaction via keyboard shortcuts.

# Why
-   **Responsiveness**: Currently, the application layout may require scrolling on smaller screens or not fully utilize the viewport on larger ones. The user specifically requested that the main content always fits within the viewport, with only the sidebar scrolling if necessary. This ensures controls and visualizations are always accessible without scrolling.
-   **Efficiency**: Users often need to start/stop playback quickly while practicing. A spacebar shortcut is a standard and expected interaction pattern for audio applications.

# What Changes
1.  **Layout Refactor**: Modify the main application container to use a flex/grid layout that constrains the main content area to the viewport height (`100vh`), ensuring it scales appropriately. The sidebar will remain scrollable if its content exceeds the height.
2.  **Global Keyboard Listener**: Implement a listener for the Spacebar key to toggle the session playback state (Start/Stop).

# Capabilities
### viewport-fitting-layout
The core interface elements (piano, visualizer, controls) scale to fit within the visible viewport, preventing the need for vertical scrolling in the main area.

### global-shortcuts
The application responds to global keyboard events (specifically Spacebar) to control playback.

# Impact
-   **User Interface**: Significant changes to the top-level layout structure (CSS/Tailwind classes).
-   **User Experience**: "App-like" feel with no window scrolling; faster control via keyboard.
-   **Codebase**: Updates to `App.tsx` or main layout containers; addition of a `useKeyboardControls` hook or similar logic in `SessionControls`.
