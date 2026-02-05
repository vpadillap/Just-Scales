# Design: Reliable Playback Scheduling

## Context
The "skipped first note" issue is caused by scheduling audio/visual events at `+0` relative to `Tone.Transport` immediately after starting it. If the audio context or Transport clock advances slightly before the event is scheduled (or if Tone.js drops "past" events aggressively in the current context state), the first event at `0` is missed.

## Architecture Changes
### `useAudioStore.ts`
- **Component**: `startSession` function.
- **Change**: Introduce a `INITIAL_BUFFER` constant (e.g., `0.1` seconds).
- **Logic**:
  - Unchanged: `Tone.Transport.start()`.
  - Changed: Initialize `accumulatedTime` (or the starting offset of the first loop) to `INITIAL_BUFFER` instead of `0`.
  - Effect: The first note is scheduled `0.1s` after Transport start.
  - Sync: Visuals are already scheduled using the same `time` variable, so they will automatically shift by `0.1s` and remain in sync.

## Detailed Design
1.  **Constants**:
    ```typescript
    const LOOKAHEAD = 0.1; // 100ms
    ```
2.  **`startSession`**:
    - Call `runLoop(LOOKAHEAD)` immediately.
    - This ensures the first sequence starts at `0 + 0.1s`.

3.  **`runLoop(initialOffset)`**:
    - **Scheduling**: Events are scheduled at `+${accumulatedTime}`.
    - **Accumulated Time**: Starts at `initialOffset`.
    - **Recursive Call**:
        - Calculate `restartTime` (the theoretical start of the next loop).
        - Schedule the *next* `runLoop` call at `restartTime - LOOKAHEAD`.
        - Pass `LOOKAHEAD` to the recursive `runLoop` call.
        - Result: The code runs 0.1s early, but schedules notes 0.1s later relative to that moment, landing exactly on `restartTime`.

## Verification
- **Manual**: Play scale. Verify first note (visual & audio) is present.
- **Regression**: Verify looping doesn't have an awkward extra gap (though 100ms is small).

## Alternatives Considered
- **Tone.Transport.start('+0.1')**: Starts transport in future. Requires scheduling at 0 (absolute). But `runLoop` uses relative `+` scheduling. Mixing relative/absolute is complex.
- **Tone.context.lookahead**: Adjusting global lookahead. Risky for latency.
- **Explicit absolute scheduling**: Rewrite `runLoop` to strictly use absolute transport time. More robust but higher refactor effort. The `offset` method is minimally invasive.
