# Design: Custom Scales & Sharing

## Context
Users currently rely on built-in scales. This change enables the creation, local storage, and sharing of custom defined scales. It also includes an unrelated fix for Android tooltips.

## Goals / Non-Goals
**Goals:**
- Enable creation of scales with custom notes, durations, and silences.
- Persist custom scales locally.
- Organize scales into user-defined categories.
- Enable sharing via QR code and text string.
- Fix Android "view instructions" tooltip.
- Ensure improved UI aesthetics ("visually appealing").

**Non-Goals:**
- Cloud synchronization of scales (beyond what `localStorage` might offer if backed up).
- Public community repository of scales (P2P sharing only).

## Decisions

### Data Model
We will introduce a `Scale` interface to represent custom scales.
```typescript
interface NoteEvent {
  type: 'note' | 'rest';
  pitch?: string; // e.g., "C4", "F#5" (only for notes)
  duration: string; // e.g., "4n", "8n", "1m" (Tone.js notation)
}

interface Scale {
  id: string; // UUID
  name: string;
  category: string;
  notes: NoteEvent[];
  isCustom: boolean; // true for user-created
  createdAt: number;
}
```

### State Management
We will use a new Zustand store `useScaleStore` with the `persist` middleware to save data to `localStorage`.
- **Store Actions**: `addScale`, `updateScale`, `deleteScale`, `addCategory`, `deleteCategory`.
- **Selectors**: `getScalesByCategory`, `getAllCategories`.

### UI Architecture
- **Scale Creator**: A form-based interface with a visual representation of the note sequence. Users can add "events" (Note or Rest) in order.
    - Uses `framer-motion` for smooth list updates.
- **Sharing**:
    - **Export**: Generate a JSON string of the `Scale` object.
    - **QR**: Use `qrcode.react` to render the JSON string as a QR code.
- **Import**:
    - **Text**: Simple text area to paste JSON.
    - **QR**: Use `@capacitor/camera` to scan. We might need a QR scanning library compatible with Capacitor or a web-based one if running in browser (though requirement implies mobile/camera).

### Dependencies
- **New**:
    - `qrcode.react`: For generating QR codes.
    - `@capacitor/camera`: For accessing the camera on mobile.
    - `jsqr` or similar (if raw camera stream processing is needed) OR use a Capacitor QR scanner plugin (e.g., `@capacitor-community/barcode-scanner` or standard camera + decoder). We will stick to standard camera + a JS decoder like `jsqr` to keep it platform agnostic if possible, or use the specialized plugin. **Decision**: Use `@capacitor-community/barcode-scanner` or similar for native performance if available, otherwise `jsqr` for web fallback.

### Android Tooltip Fix
The existing tooltip issue is likely due to hover/touch event conflicts. We will explicitly handle `onClick` or `onTouchEnd` for mobile devices to toggle visibility instead of relying on `:hover` CSS or mouse events.

## Risks
- **Data Size**: QR codes have data limits. Complex scales might generate dense QR codes. We should minify the JSON before encoding (short keys).
- **Camera Permissions**: Need to handle permission flows gracefully on Android/iOS.
