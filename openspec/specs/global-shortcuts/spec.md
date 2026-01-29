# Story
"As a user practicing scales, I want to start and stop the session by pressing the Spacebar, so that I don't have to reach for my mouse or touch screen constantly."

# Scenarios

## Scenario: Toggle Playback
- **GIVEN** the session is in IDLE or WAITING state
- **WHEN** I press the Spacebar
- **THEN** the session starts (or resumes)
- **AND** the Spacebar default browser action (page scroll) is prevented

## Scenario: Stop Playback
- **GIVEN** the session is PLAYING
- **WHEN** I press the Spacebar
- **THEN** the session stops
- **AND** returns to IDLE state

## Scenario: Input Focus Exception
- **GIVEN** I am typing in a text input (e.g., editing BPM manually)
- **WHEN** I press the Spacebar
- **THEN** the character " " is typed into the input
- **AND** the session playback state DOES NOT change

# Requirements

### Requirement: Spacebar Listener
The application MUST listen for the `keydown` event on the `window` object for the Spacebar key (`code: "Space"` or `key: " "`).

### Requirement: Prevent Default Scroll
When the Spacebar is pressed and serves as a playback toggle, the application MUST call `event.preventDefault()` to stop the browser from scrolling the page.

### Requirement: Toggle Logic
-   If `sessionStatus` is `PLAYING` or `WAITING` -> Call `stopSession()`.
-   If `sessionStatus` is `IDLE` -> Call `startSession()`.

### Requirement: Focus Safety
The shortcut MUST be ignored if `document.activeElement` is an `<input>`, `<textarea>`, or other editable element, to allow normal typing.
