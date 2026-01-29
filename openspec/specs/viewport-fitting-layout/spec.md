# Story
"As a user on a laptop or desktop, I want the piano, visualizer, and controls to fit perfectly on my screen without me having to scroll, so that I can see the entire session context at once while practicing."

# Scenarios

## Scenario: Window Resize
- **GIVEN** the application is open
- **WHEN** I resize the browser window (or application window)
- **THEN** the Piano, Visualizer, and Controls resize proportionally to fit the available vertical space
- **AND** no vertical scrollbar appears on the main content area

## Scenario: Vertical Overflow (Sidebar)
- **GIVEN** the window is short
- **AND** the sidebar has many menu items
- **WHEN** the content exceeds the viewport height
- **THEN** only the Sidebar shows a vertical scrollbar
- **AND** the main content area remains fixed to the viewport height

## Scenario: Small Mobile Screens
- **GIVEN** the viewport is very small (e.g., mobile phone in portrait)
- **WHEN** there is physically not enough space to show components
- **THEN** stack elements vertically
- **AND** allow scrolling (fallback behavior for < 768px height/width if needed, or stick to "always fit" if feasible) -> *Requirement: Prioritize "fit" for desktop/tablet; scroll fallback for mobile.*

# Requirements

### Requirement: Full Viewport Layout
The main application container MUST use `height: 100vh` and `overflow: hidden` to constrain the layout to the viewport.

### Requirement: Flex/Grid Distribution
The main content area (Visualizer + Controls + Piano) MUST use a flex col or grid layout that distributes available vertical space effectively.
-   Piano: Fixed or proportional height (e.g. bottom 25%).
-   Visualizer: Fills available remaining space.
-   Controls: Fixed or compact height.

### Requirement: Sidebar Independence
The sidebar MUST be independently scrollable (`overflow-y: auto`) if its content exceeds the viewport height.

### Requirement: No Global Scroll
The `body` or root app container MUST NOT have a vertical scrollbar on standard desktop viewports (> 768px height).
