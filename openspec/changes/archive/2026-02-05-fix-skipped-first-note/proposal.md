# Proposal: Fix Skipped First Note

## Goal
Eliminate the issue where the first note of a scale run is randomly skipped during playback. This issue affects both the audio output and the visualizer, making it a logic/scheduling issue rather than just an audio glitch.

## Why
- **Reliability**: Users rely on the app for precise vocal practice; missing notes disrupts the flow.
- **User Experience**: Random bugs are frustrating and lower confidence in the tool.
- **Polished Feel**: Ensuring rock-solid playback start is essential for a music app.

## Evaluation
- **Success Criteria**:
  - The first note plays audibly 100% of the time on start/restart.
  - The visualizer highlights the first note 100% of the time.
  - No regression in playback timing or responsiveness.

## Proposed Changes
### Logic & Scheduling
- Investigate `SessionControls` (or relevant playback controller) for race conditions between `Tone.js` transport start and the scheduling of the first note.
- Verify if `Tone.now()` buffering is sufficient to preventing scheduling notes in the past (which Tone.js drops).
- Ensure the state update driving the visualizer (e.g., `currentNote` or active index) is synchronized with the audio start event.

## Capabilities
<!-- List the high-level capabilities this change adds or modifies -->
- [ ] `reliable-playback-scheduling`

## Impact
- **Risk**: Low. Mostly adjusting timing/initialization logic.
- **Performance**: Negligible.
- **Platform**: Verification needed on both Web/Android, though likely a shared JS logic issue.
