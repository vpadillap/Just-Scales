import React, { useMemo } from 'react'
import { useAudioStore } from '@/stores/useAudioStore'
import { NOTE_NAMES } from '@/data/scales'

export const PianoVisualizer: React.FC = () => {
    const { currentNote, playNote } = useAudioStore()

    // Generate 88 keys from A0 to C8
    const keys = useMemo(() => {
        const k = []

        // A0, A#0, B0
        k.push({ note: 'A0', isBlack: false })
        k.push({ note: 'A#0', isBlack: true })
        k.push({ note: 'B0', isBlack: false })

        for (let o = 1; o < 8; o++) {
            NOTE_NAMES.forEach(n => {
                if (n === 'C' && o === 8) return // Stop at C8
                const isBlack = n.includes('#')
                k.push({ note: `${n}${o}`, isBlack })
            })
        }
        k.push({ note: 'C8', isBlack: false })
        return k
    }, [])

    return (
        <div className="w-full h-[18vh] min-h-[100px] max-h-[160px] overflow-x-auto bg-slate-950 flex relative items-start justify-center pt-1 border-t border-slate-800 shrink-0">
            {/* High Contrast Scrollable Strip */}
            <div className="flex gap-1 px-4 h-full items-start">
                {keys.map((key) => (
                    <div
                        key={key.note}
                        onMouseDown={() => playNote(key.note, '8n')}
                        className={`
                        flex-shrink-0 transition-all duration-100 rounded-b shadow-sm border cursor-pointer hover:shadow-md
                        ${key.isBlack
                                ? 'w-6 h-[60%] -mx-3 z-10 bg-black border-slate-800 text-xs text-white font-bold pt-2 flex justify-center hover:bg-slate-900 rounded-b-md'
                                : 'w-10 h-full bg-white border-slate-300 z-0 text-slate-900 font-bold flex items-end justify-center pb-2 hover:bg-slate-100 rounded-b-md'}
                        ${currentNote === key.note ? '!bg-neon-pink-500 !border-neon-pink-600 shadow-neon-pink-500/50 scale-95 translate-y-1 text-white' : ''}
                    `}
                    >
                        <span className="opacity-50 text-[10px] select-none pointer-events-none">{key.note}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
