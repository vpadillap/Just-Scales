import type { NoteEvent } from '../types'

export interface ScaleNote {
    interval: number
    duration: string // Tone.js duration (4n, 8n, 16n, etc)
}

export interface Scale {
    id: string
    name: string
    category: FunctionalCategory
    pattern: ScaleNote[]
    repeatOnRoot?: number // Number of times to loop on the same root before transposing
    description: string
    detailedInstructions: string
    // Hybrid support for custom scales
    isCustom?: boolean
    notes?: NoteEvent[] // Strict typing
    createdAt?: number
}

export type FunctionalCategory =
    | 'Foundation'
    | 'Consistency'
    | 'Flexibility'
    | 'Presence'
    | 'Sustain'
    | 'Range'
    | 'Connection'
    | 'Accuracy'
    | 'Precision'
    | 'Agility'
    | 'Performance'
    | 'Power'
    | 'Pitch'
    | 'Endurance'
    | 'Tone'
    | 'Warmdown'

// Helper to create simple uniform patterns quickly
const simplePattern = (intervals: number[], duration: string = '8n'): ScaleNote[] =>
    intervals.map(i => ({ interval: i, duration }))

export const SCALES: Scale[] = [
    // --- FOUNDATION ---
    {
        id: 'foundation-5tone',
        name: 'Major 5-Tone',
        category: 'Foundation',
        pattern: simplePattern([0, 2, 4, 5, 7, 5, 4, 2, 0], '8n'),
        description: 'The standard vocal warm-up.',
        detailedInstructions: 'Use a gentle "Mum" or "Bub". Focus on smooth airflow and easy onset.'
    },
    {
        id: 'foundation-hum',
        name: 'Humming Glides',
        category: 'Foundation',
        pattern: simplePattern([0, 2, 4, 2, 0], '4n'), // Slower for hums
        description: 'Resonance awakening.',
        detailedInstructions: 'Lips closed, teeth apart. Feel the buzz on the lips. Great for placement.'
    },

    // --- CONSISTENCY ---
    {
        id: 'consist-trill',
        name: 'Lip Trill 1.5 Octave',
        category: 'Consistency',
        pattern: simplePattern([0, 4, 7, 12, 16, 19, 16, 12, 7, 4, 0], '8n'),
        description: 'Balances breath pressure.',
        detailedInstructions: 'Bubble lips freely. If they stop, check your airflow support. Keep it steady.'
    },
    {
        id: 'consist-vowels',
        name: 'Vowel Alignment',
        category: 'Consistency',
        // Repeat the same note 5 times for 5 vowels (Mah Meh Mee Moh Moo)
        pattern: simplePattern([0, 0, 0, 0, 0], '4n'),
        repeatOnRoot: 2, // Do it twice for good measure? Or just once standard.
        description: 'Pure vowel transitioning.',
        detailedInstructions: 'Sing "Mah-Meh-Mee-Moh-Moo" on one pitch. Don\'t change the tone quality between vowels.'
    },

    // --- FLEXIBILITY ---
    {
        id: 'flex-run',
        name: 'Major Scale Run',
        category: 'Flexibility',
        pattern: simplePattern([0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0], '16n'), // Fast!
        description: 'Full octave agility.',
        detailedInstructions: 'Move quickly but lightly. Don\'t push the top notes.'
    },
    {
        id: 'flex-thirds',
        name: 'Broken Thirds',
        category: 'Flexibility',
        pattern: simplePattern([0, 4, 2, 5, 4, 7, 5, 9, 7, 11, 9, 12, 7, 4, 0], '8n'),
        description: 'Interval interweaving.',
        detailedInstructions: 'Navigate the jumps cleanly. Helps with musical ear and vocal flexibility.'
    },

    // --- PRESENCE ---
    {
        id: 'pres-nay',
        name: '"Nay" Twang',
        category: 'Presence',
        pattern: simplePattern([0, 4, 7, 10, 12, 10, 7, 4, 0], '8n'),
        description: 'Forward placement builder.',
        detailedInstructions: 'Use a bratty "Nay" sound. This engages the pharyngeal resonator for "cut" and presence.'
    },
    {
        id: 'pres-octave',
        name: 'Octave Call',
        category: 'Presence',
        pattern: [
            { interval: 0, duration: '4n' },
            { interval: 12, duration: '2n' }, // Hold the top
            { interval: 12, duration: '4n' },
            { interval: 0, duration: '2n' }
        ],
        description: 'Bright calling sound.',
        detailedInstructions: 'Think of calling out to someone far away within "Hey!". Support from the body.'
    },

    // --- SUSTAIN ---
    {
        id: 'sustain-single',
        name: 'Single Note Sustain',
        category: 'Sustain',
        pattern: [{ interval: 0, duration: '1m' }], // Whole measure hold
        description: 'Stability check.',
        detailedInstructions: 'Inhale low. Hold the note steady without shaking or vibrato wobble.'
    },
    {
        id: 'sustain-messa',
        name: 'Messa di Voce Prep',
        category: 'Sustain',
        pattern: [
            { interval: 0, duration: '2n' },
            { interval: 2, duration: '2n' },
            { interval: 4, duration: '2n' },
            { interval: 7, duration: '1m' }, // Hold top
            { interval: 4, duration: '2n' },
            { interval: 2, duration: '2n' },
            { interval: 0, duration: '2n' }
        ],
        description: 'Dynamic control.',
        detailedInstructions: 'Start soft, swell to loud on the top note, and decrescendo coming down.'
    },

    // --- RANGE ---
    {
        id: 'range-siren',
        name: 'Octave Siren',
        category: 'Range',
        pattern: [
            { interval: 0, duration: '2n' },
            { interval: 12, duration: '2n' }, // Approximate glissando points
            { interval: 0, duration: '2n' }
        ],
        description: 'Smooth register transition.',
        detailedInstructions: 'Slide like a siren. No "breaks" allowed. Keep sound connected.'
    },
    {
        id: 'range-super',
        name: '2 Octave Arpeggio',
        category: 'Range',
        pattern: simplePattern([0, 4, 7, 12, 16, 19, 24, 19, 16, 12, 7, 4, 0], '8n'),
        description: 'Extreme upper extension.',
        detailedInstructions: 'Lighten up as you go high. Do not take "chest weight" to the top.'
    },
    {
        id: 'range-rossini',
        name: 'Rossini Scale',
        category: 'Range',
        pattern: simplePattern([0, 4, 7, 12, 16, 19, 17, 14, 11, 7, 5, 2, 0], '8n'),
        description: 'Standard 13-note Rossini.',
        detailedInstructions: 'Arpeggiate up the Major chord (1-3-5-1-3-5), then descend on the Dominant (4-2-7-5-4-2-1). Keep rhythmic precision.'
    },

    // --- CONNECTION ---
    {
        id: 'connect-rossini',
        name: 'Rossini Scale',
        category: 'Connection',
        pattern: simplePattern([0, 4, 7, 12, 16, 19, 17, 14, 11, 7, 5, 2, 0], '8n'),
        description: 'Standard 13-note Rossini.',
        detailedInstructions: 'Arpeggiate up the Major chord (1-3-5-1-3-5), then descend on the Dominant (4-2-7-5-4-2-1). Keep rhythmic precision.'
    },
    {
        id: 'connect-portamento',
        name: 'Fifth Slides',
        category: 'Connection',
        pattern: [
            { interval: 0, duration: '4n' },
            { interval: 7, duration: '4n' },
            { interval: 0, duration: '2n' }
        ],
        description: 'Connecting registers.',
        detailedInstructions: 'Slide from bottom to top on "Ee" or "Ooh". Keep the sound thin and laser-like.'
    },

    // --- ACCURACY ---
    {
        id: 'acc-triad',
        name: 'Basic Triad',
        category: 'Accuracy',
        pattern: simplePattern([0, 4, 7, 4, 0], '4n'),
        description: 'Pitch centering.',
        detailedInstructions: 'Hit the center of every note. Don\'t slide (unless requested). Be like a piano.'
    },
    {
        id: 'acc-chromatic',
        name: 'Chromatic Steps',
        category: 'Accuracy',
        pattern: simplePattern([0, 1, 2, 3, 4, 3, 2, 1, 0], '8n'),
        description: 'Fine tuning.',
        detailedInstructions: 'Half steps are small. Listen closely to ensure you aren\'t flat.'
    },

    // --- PRECISION ---
    {
        id: 'prec-staccato',
        name: 'Staccato Triads',
        category: 'Precision',
        pattern: simplePattern([0, 4, 7, 12, 7, 4, 0], '16n'),
        description: 'Onset control.',
        detailedInstructions: 'Short, detached notes. "Ha-Ha-Ha". Engage the diaphragm for each pulse.'
    },
    {
        id: 'prec-doremi',
        name: 'Do-Re-Mi Jumps',
        category: 'Precision',
        pattern: simplePattern([0, 2, 0, 4, 0, 5, 0, 7, 0, 12, 0], '8n'),
        description: 'Interval jumping.',
        detailedInstructions: 'Return to root every time. "Do-Re-Do-Mi-Do...". Accuracy is key.'
    },

    // --- AGILITY ---
    {
        id: 'agility-minor',
        name: 'Minor Pentatonic',
        category: 'Agility',
        pattern: simplePattern([0, 3, 5, 7, 10, 12, 10, 7, 5, 3, 0], '8n'),
        description: 'Riffing foundation.',
        detailedInstructions: 'Loose jaw. Allow the notes to flow like water. Common in Pop/R&B runs.'
    },
    {
        id: 'agility-coloratura',
        name: 'Coloratura Pattern',
        category: 'Agility',
        pattern: simplePattern([0, 2, 4, 5, 7, 9, 11, 12, 14, 12, 11, 9, 7, 5, 4, 2, 0], '16n'),
        description: 'Classical fast run.',
        detailedInstructions: 'Very light articulation. Think of a flute.'
    },

    // --- PERFORMANCE ---
    {
        id: 'perf-blues',
        name: 'Blues Scale',
        category: 'Performance',
        pattern: simplePattern([0, 3, 5, 6, 7, 10, 12, 10, 7, 6, 5, 3, 0], '8n'),
        description: 'Stylistic vocabulary.',
        detailedInstructions: 'Add attitude. Slide and bend the "blue note" (sharp 4 / flat 5).'
    },
    {
        id: 'perf-dynamic',
        name: 'Dynamic Arpeggio',
        category: 'Performance',
        pattern: simplePattern([0, 4, 7, 12, 7, 4, 0], '8n'),
        description: 'Expression control.',
        detailedInstructions: 'Crescendo on the way up, Decrescendo on the way down.'
    },

    // --- POWER ---
    {
        id: 'power-fifth-sust',
        name: 'Sustained Fifth',
        category: 'Power',
        pattern: [{ interval: 0, duration: '4n' }, { interval: 7, duration: '4n' }, { interval: 12, duration: '2n' }, { interval: 7, duration: '4n' }, { interval: 0, duration: '4n' }],
        description: 'Open throat engagement.',
        detailedInstructions: 'Use "Mum" or "No". Keep the throat wide open like a yawn while calling out.'
    },
    {
        id: 'power-octave',
        name: 'Octave Repeats',
        category: 'Power',
        pattern: [{ interval: 0, duration: '4n' }, { interval: 12, duration: '4n' }, { interval: 12, duration: '4n' }, { interval: 12, duration: '4n' }, { interval: 0, duration: '2n' }],
        description: 'High note stability.',
        detailedInstructions: 'Hit the top note 3 times. "Hey-Hey-Hey". Anchor your body.'
    },

    // --- PITCH ---
    {
        id: 'pitch-ear',
        name: 'Root-3rd-5th Matching',
        category: 'Pitch',
        pattern: simplePattern([0, 4, 7], '2n'),
        description: 'Chord building.',
        detailedInstructions: 'Listen to the root, then sing the Major 3rd and Perfect 5th. Tune into the harmoney.'
    },
    {
        id: 'pitch-random',
        name: 'Whole Tone Scale',
        category: 'Pitch',
        pattern: simplePattern([0, 2, 4, 6, 8, 10, 12, 10, 8, 6, 4, 2, 0], '8n'),
        description: 'Unusual intervals.',
        detailedInstructions: 'The "Dream Sequence" sound. Harder to tune than Major scales.'
    },

    // --- ENDURANCE ---
    {
        id: 'endure-long',
        name: '9-Note Scale',
        category: 'Endurance',
        pattern: simplePattern([0, 2, 4, 5, 7, 9, 11, 12, 14, 12, 11, 9, 7, 5, 4, 2, 0], '8n'),
        description: 'Breath management.',
        detailedInstructions: 'Requires more breath than a standard octave. Conserve air at the start.'
    },
    {
        id: 'endure-marathon',
        name: 'Triad Marathon',
        category: 'Endurance',
        pattern: simplePattern([0, 4, 7, 12, 16, 19, 24, 19, 16, 12, 7, 4, 0, 4, 7, 12, 7, 4, 0], '8n'),
        description: 'Stamina builder.',
        detailedInstructions: 'A long complex pattern. Stay relaxed. Tension kills endurance.'
    },

    // --- TONE ---
    {
        id: 'tone-ng',
        name: '"Ng" Resonance',
        category: 'Tone',
        pattern: simplePattern([0, 2, 4, 2, 0], '4n'),
        description: 'Mask placement.',
        detailedInstructions: 'Sing on "Ng" (like siNG). Feel vibrations in the nose. Then open to "Ah".'
    },
    {
        id: 'tone-descend',
        name: 'Descending 5-Tone',
        category: 'Tone',
        pattern: simplePattern([7, 5, 4, 2, 0], '4n'),
        description: 'Carrying head resonance down.',
        detailedInstructions: 'Start high and light. Bring that "shimmer" down into your chest voice without getting muddy.'
    },

    // --- WARMDOWN ---
    {
        id: 'warmdown-slide',
        name: 'Descending Slide',
        category: 'Warmdown',
        pattern: simplePattern([12, 7, 4, 0], '2n'),
        description: 'Relaxation.',
        detailedInstructions: 'Gentle sigh. Let go of all control and tension.'
    },
    {
        id: 'warmdown-fry',
        name: 'Vocal Fry Slide',
        category: 'Warmdown',
        pattern: simplePattern([7, 4, 2, 0], '4n'),
        description: 'Resetting the cords.',
        detailedInstructions: 'Use a really low, creaky voice. Zero air pressure. Very relaxing for tired cords.'
    }
]

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function getNoteFromInterval(rootNote: string, interval: number): string {
    // Simple implementation assuming octaves match standard MIDI
    // rootNote e.g. "C3"
    // This needs a proper parser or Tone.Frequency logic
    // For now, let's trust Tone.js to handle transpositions if we just send frequency or interval-based calculation
    // But purely string based:

    // Parse root
    const match = rootNote.match(/([A-G][#]?)(-?\d+)/)
    if (!match) return rootNote

    const note = match[1]
    const octave = parseInt(match[2])

    const rootIndex = NOTE_NAMES.indexOf(note)
    const totalIndex = rootIndex + interval

    const newNoteIndex = totalIndex % 12
    const newOctave = octave + Math.floor(totalIndex / 12)

    return `${NOTE_NAMES[newNoteIndex]}${newOctave}`
}
