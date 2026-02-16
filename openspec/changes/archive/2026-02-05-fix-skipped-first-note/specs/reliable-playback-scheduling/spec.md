# Spec: Reliable Playback Scheduling

## Background
The application currently experiences a random issue where the first note of a scale run is skipped (audio and visual). This suggests a race condition or scheduling window issue when initializing the Tone.js transport or scheduling events at `Tone.now()` or `0`.

## Requirements
### Functional
- **Guaranteed First Note**: The first note of any sequence MUST play audibly and trigger visual feedback.
- **Synchronized Start**: Audio and Visualizer MUST start in sync.
- **Resilience**: Scheduling logic must handle cases where `Tone.now()` advances between calculation and scheduling.

### Non-Functional
- **Latency**: Startup latency should remain low (<100ms perceivable delay is acceptable if it guarantees reliability).

## API & Logic
### Scheduling Strategy
- **Lookahead/Buffering**: Instead of scheduling at `Tone.now()`, schedule at `Tone.now() + 0.1` (or similar small buffer) to ensure the time is in the future.
- **Visualizer Sync**: The visualizer's "start" trigger must respect the same timestamp as the audio.

### Data Structures
No new data structures, but `SessionControls.tsx` (or the playback engine) needs to manage:
- `startTime`: content-relative timestamp.

## Scenarios
- **Cold Start**: User presses play for the first time. Audio context might be waking up.
- **Restart**: User stops and immediately plays again.
- **Looping**: (If applicable) Loop points must be seamless, but this spec focuses on the *start*.

## Constraints
- Must work within existing `Tone.js` architecture.
- Visualizer checks `Tone.Transport.seconds` or similar; ensure it doesn't miss the first frame if it starts at 0.1s.
