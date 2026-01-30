export interface NoteEvent {
    type: 'note' | 'rest';
    pitch?: string; // e.g., "C4", "F#5" (only for notes)
    duration: string; // e.g., "4n", "8n", "1m" (Tone.js notation)
}

export interface Scale {
    id: string; // UUID
    name: string;
    category: string;
    notes: NoteEvent[];
    isCustom: boolean; // true for user-created
    createdAt: number;
}
