import { describe, it, expect } from 'vitest'
import { getNoteFromInterval, SCALES } from '@/data/scales'

describe('Scale Logic', () => {
    it('correctly maps intervals to notes', () => {
        // C3 + 0 semitones = C3
        expect(getNoteFromInterval("C3", 0)).toBe("C3")
        // C3 + 2 semitones = D3
        expect(getNoteFromInterval("C3", 2)).toBe("D3")
        // C3 + 12 semitones = C4
        expect(getNoteFromInterval("C3", 12)).toBe("C4")
        // C3 + 7 semitones = G3
        expect(getNoteFromInterval("C3", 7)).toBe("G3")
    })

    it('handles cross-octave logic', () => {
        // B3 + 1 semitone = C4
        expect(getNoteFromInterval("B3", 1)).toBe("C4")
    })

    it('verifies Foundation scales exist', () => {
        const major5 = SCALES.find(s => s.id === 'f-maj-5')
        expect(major5).toBeDefined()
        expect(major5?.category).toBe('Foundation')
        expect(major5?.intervals.length).toBeGreaterThan(0)
    })
})
