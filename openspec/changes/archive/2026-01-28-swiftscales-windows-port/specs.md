# Story
"As a singer, I want to practice specific vocal skills (like pitch accuracy or agility) using guided interactive piano scales so that I can improve my voice without a human coach."

# Scenarios

## Scenario: Practicing "Foundation" Scales
Given the user is on the Session Dashboard
When they select the "Foundation" category
Then the list shows "Major (5-tone)", "Major (Octave)", "Minor (Natural)"
And selecting "Major (5-tone)" loads the session
When they press "Start"
Then the piano plays a 5-tone ascending and descending pattern (Root -> 5th -> Root)
And highlights the keys primarily in the C3-C5 range (adjustable)

## Scenario: Viewing Technique Instructions
Given the user selects a "Warmup" scale
When the session loads
Then they can hover over an "Info" icon or the Scale Title
And a tooltip appears with detailed instructions: "This is usually used in lip trills through the whole vocal range to achieve..."
And the text explains the specific vocal goal (e.g., "Connection")

## Scenario: Practicing "Flexibility" (Agility)
Given the user selects "Flexibility" -> "Agility"
When the session starts
Then the piano plays fast tempo patterns (e.g., 16th notes)
And the default BPM is set higher (e.g., 100 BPM)
And the pattern covers wider intervals (triads, octaves)

## Scenario: Using the Pitch Pipe
Given the user is in the Tools menu
When they click "Pitch Pipe"
Then a circular interface appears with 12 chromatic notes
When they click "C"
Then a continuous sine/piano wave of note C plays until released (or toggled off)

## Scenario: Creating a Custom Routine
Given the user is in the "Routines" tab
When they click "New Routine"
Then they can drag and drop scales from the Library into a timeline
And they can name the routine "Morning Warmup"
And saving it persists it to the local store

# Logic

## Audio Engine (Tone.js)
*   **Synth**: Used for 'Piano' sound (sampler with healthy sustain).
*   **Scheduler**: Exact timing for scale playback.
*   **Scale Logic**:
    *   `scaleDefinition`: Array of semitone intervals (e.g., Major = [0, 2, 4, 5, 7, 9, 11, 12]).
    *   `playPattern(root, scale, speed)`: Function to schedule note events.

## State Management (Zustand)
*   `useSessionStore`: Tracks current scale, root note, BPM, isPlaying status.
*   `useRoutineStore`: Tracks user-created playlists.

## Functional Categories Mapping
*   **Foundation**: Simple stepwise motion (Major/Minor).
*   **Consistency**: Long tones, chromatic steps.
*   **Flexibility**: Arpeggios, wide intervals.
*   **Presence/Power**: Scales emphasizing open vowels (UI tip).
*   **Warmdown**: Descending-only patterns, soft dynamic.

# Functional Requirements
1.  **Latency**: Audio must start within <50ms of visual cue.
2.  **Responsiveness**: UI must scale from 800x600 to 4k.
3.  **Offline**: Must work 100% without internet.
