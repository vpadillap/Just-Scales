import { useEffect } from 'react'
import { useAudioStore } from '@/stores/useAudioStore'
import * as Tone from 'tone'

export const useKeyboardShortcuts = (scale: any) => {
    const { direction, setDirection, currentRoot, setRoot, startSession, sessionStatus } = useAudioStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            if (e.key === 'ArrowUp') {
                e.preventDefault()
                if (direction === 'ASC') {
                    // Already Up -> Move Root Up + Restart
                    shiftRoot(1)
                } else {
                    // Switch Direction -> Restart
                    setDirection('ASC')
                    // Logic says "If already pointing that direction then move root... and restart".
                    // If NOT pointing, just switch? User says "switch the direction".
                    // User didn't explicitly say restart on switch, but "restart sound immediately" applies to the "If already pointing" clause.
                    // However, immediate feedback is good.
                    // I'll restart on direction switch too if playing?
                    // "Arrow keys ... should switch the direction. If already pointing ... then move root ... and restart."
                    // Implies basic switch doesn't necessarily restart, but moving root DOES.
                    // But usually changing settings while playing stops it.
                    // I will just switch direction. If playing, it might need restart to take effect? 
                    // My previous `useEffect` in SessionDashboard STOPS session on change.
                    // So switching direction will STOP it.
                    // The user wants "restart immediately".
                    // That implies CONTINUOUS play.
                    // So if I move root, I should `startSession` again immediately.
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                if (direction === 'DESC') {
                    shiftRoot(-1)
                } else {
                    setDirection('DESC')
                }
            } else if (e.code === 'Space') {
                e.preventDefault()
                // Toggle Play/Stop? Not requested but useful.
            }
        }

        const shiftRoot = (semitones: number) => {
            // Calculate new root
            // We need a helper or just Tone logic
            // Tone.Frequency(root).transpose(semitones).toNote()
            // But we need to keep it within range?
            // And `currentRoot` in store logic.
            const newRoot = Tone.Frequency(currentRoot).transpose(semitones).toNote()
            setRoot(newRoot)
            startSession(scale) // Restart immediately
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [direction, currentRoot, scale, sessionStatus, startSession, setDirection, setRoot])
}
