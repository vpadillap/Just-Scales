import { create } from 'zustand'
import * as Tone from 'tone'
import { Synth } from '@/audio/Synth'

interface AudioState {
    isPlaying: boolean
    bpm: number
    isReady: boolean
    currentNote: string | null
    currentStepIndex: number | null
    currentRoot: string
    direction: 'ASC' | 'DESC'
    sessionStatus: 'IDLE' | 'PLAYING' | 'WAITING'

    // Actions
    initAudio: () => Promise<void>
    setBpm: (bpm: number) => void
    setRoot: (root: string) => void
    setDirection: (dir: 'ASC' | 'DESC') => void

    startSession: (scale: any) => Promise<void>
    stopSession: () => void

    playNote: (note: string, duration?: string) => void
    stopNote: (note?: string) => void
    playScale: (notes: string[], interval?: string) => void
}

let synth: Synth | null = null;
let sessionLoopId: any = null;

export const useAudioStore = create<AudioState>((set, get) => ({
    isPlaying: false,
    bpm: 120, // Default BPM
    isReady: false,
    currentNote: null,
    currentStepIndex: null,
    currentRoot: 'C3',
    direction: 'ASC',
    sessionStatus: 'IDLE',

    initAudio: async () => {
        if (get().isReady) return
        await Tone.start()
        synth = new Synth()
        await Tone.loaded() // Ensure buffers are loaded
        set({ isReady: true })
        console.log("Audio Context Started & Buffers Loaded")
    },

    setBpm: (bpm) => {
        set({ bpm })
        Tone.Transport.bpm.value = bpm
    },

    setRoot: (root) => set({ currentRoot: root }),
    setDirection: (direction) => set({ direction }),

    start: async () => { }, // unused

    // --- Session Engine ---

    startSession: async (scale) => {
        const { initAudio, stopSession } = get()
        stopSession() // Clear any existing
        await initAudio()

        set({ sessionStatus: 'PLAYING' })
        Tone.Transport.start()

        // Start the Loop
        const runLoop = () => {
            const { sessionStatus, currentRoot } = get()
            if (sessionStatus === 'IDLE') return

            set({ sessionStatus: 'PLAYING', isPlaying: true })

            // 1. Generate Pattern Instances
            const { repeatOnRoot, pattern } = scale
            // @ts-ignore
            const repeatCount = repeatOnRoot || 1
            const fullPatternSequence: { note: string, duration: string }[] = []

            for (let r = 0; r < repeatCount; r++) {
                // @ts-ignore
                pattern.forEach((p: any) => {
                    const note = Tone.Frequency(currentRoot).transpose(p.interval).toNote()
                    fullPatternSequence.push({ note, duration: p.duration })
                })
            }

            // 2. Schedule Playback
            let accumulatedTime = 0
            // Schedule relative to Transport time

            fullPatternSequence.forEach((item, index) => {
                const durationSec = Tone.Time(item.duration).toSeconds()

                // Audio & Visuals scheduled on Transport
                Tone.Transport.schedule((time) => {
                    synth?.triggerAttackRelease(item.note, item.duration, time)
                    Tone.Draw.schedule(() => {
                        set({ currentNote: item.note, currentStepIndex: index })
                    }, time)
                    Tone.Draw.schedule(() => {
                        const { currentNote, currentStepIndex } = get()
                        if (currentNote === item.note) set({ currentNote: null })
                        if (currentStepIndex === index) set({ currentStepIndex: null })
                    }, time + durationSec)
                }, `+${accumulatedTime}`)

                accumulatedTime += durationSec
            })

            // 3. Schedule Intervals (Guide Chord -> Next)
            const pauseDur = Tone.Time("2n").toSeconds()
            const guideDur = Tone.Time("4n").toSeconds()

            // A. Play Guide Chord
            const guideTime = accumulatedTime + pauseDur
            Tone.Transport.scheduleOnce((time) => {
                if (get().sessionStatus === 'IDLE') return
                set({ isPlaying: false, sessionStatus: 'WAITING' })

                // Calc Next Root
                const { direction, currentRoot: r } = get()
                const semitones = direction === 'ASC' ? 1 : -1
                const nextRoot = Tone.Frequency(r).transpose(semitones).toNote()

                // Play Chord
                const rootFreq = Tone.Frequency(nextRoot)
                const chord = [rootFreq.toNote(), rootFreq.transpose(4).toNote(), rootFreq.transpose(7).toNote()]
                synth?.triggerAttackRelease(chord, "4n", time)

                // Flash Next Root
                Tone.Draw.schedule(() => set({ currentNote: nextRoot }), time)
                Tone.Draw.schedule(() => { if (get().currentNote === nextRoot) set({ currentNote: null }) }, time + guideDur)

            }, `+${guideTime}`)

            // B. Restart Loop
            const restartTime = guideTime + guideDur + pauseDur
            Tone.Transport.scheduleOnce(() => {
                const { sessionStatus, direction, currentRoot: r } = get()
                if (sessionStatus === 'IDLE') return

                // Commit Root
                const semitones = direction === 'ASC' ? 1 : -1
                const nextRoot = Tone.Frequency(r).transpose(semitones).toNote()
                set({ currentRoot: nextRoot })

                runLoop()
            }, `+${restartTime}`)
        }

        runLoop()
    },

    stopSession: () => {
        set({ sessionStatus: 'IDLE', isPlaying: false, currentNote: null, currentStepIndex: null })
        Tone.Transport.stop()
        Tone.Transport.cancel() // Clear scheduled events
        if (sessionLoopId) {
            clearTimeout(sessionLoopId)
            sessionLoopId = null
        }
        synth?.releaseAll()
    },


    playNote: (note, duration = '8n') => {
        const { initAudio } = get()
        if (!synth) {
            initAudio() // Auto-init on interaction
            return
        }

        synth?.triggerAttackRelease(note, duration)
        set({ currentNote: note })

        setTimeout(() => {
            if (get().currentNote === note) {
                set({ currentNote: null })
            }
        }, Tone.Time(duration).toSeconds() * 1000)
    },

    stopNote: (note) => {
        if (get().currentNote === note) {
            set({ currentNote: null })
        }
    },

    playScale: (_notes: string[], _interval = '4n') => { }
}))
