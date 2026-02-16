# Tasks: Fix Skipped First Note

- [x] Refactor `startSession` relative scheduling <!-- id: 0 -->
  - [x] Update `runLoop` to accept an `initialOffset` parameter
  - [x] Pass `0.1` (100ms constant) to the first `runLoop` call
  - [x] Pass `0` to recursive `runLoop` calls
- [x] Implement Lookahead Scheduling for Loops <!-- id: 2 -->
  - [x] Update recursive `Tone.Transport.scheduleOnce` to fire `0.1s` early
  - [x] Pass `0.1` (buffer) to the recursive `runLoop` call
- [ ] Verify fix <!-- id: 1 -->
  - [ ] Play a scale from cold start - confirm first note plays
  - [ ] Play a scale, stop, play again - confirm first note plays
  - [ ] Verify visualizer sync is maintained
