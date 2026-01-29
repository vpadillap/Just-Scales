import React, { useMemo } from 'react'
import { useAudioStore } from '@/stores/useAudioStore'
import type { Scale } from '@/data/scales'
import { DotGraphVisualizer } from './DotGraphVisualizer'

interface SessionControlsProps {
    scale: Scale
}

export const SessionControls: React.FC<SessionControlsProps> = ({ scale }) => {
    const {
        bpm, setBpm,
        currentRoot, setRoot,
        direction, setDirection,
        startSession, stopSession,
        sessionStatus
    } = useAudioStore()

    const [localBpm, setLocalBpm] = React.useState<string>(bpm.toString())

    // Sync local BPM when store updates (e.g. via slider)
    React.useEffect(() => {
        setLocalBpm(bpm.toString())
    }, [bpm])

    const handleBpmBlur = () => {
        let val = parseInt(localBpm)
        if (isNaN(val)) val = 60
        const clamped = Math.max(60, Math.min(200, val))
        setBpm(clamped)
        setLocalBpm(clamped.toString())
    }

    const handleBpmKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur()
        }
    }

    // Stop session when scale changes or component unmounts
    React.useEffect(() => {
        stopSession()
        return () => stopSession()
    }, [scale.id, stopSession])

    // Notes for Root Selector - Extended Range A1 to C8
    const ROOTS = useMemo(() => {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const list = []
        // Simple generation from A1 to C8
        for (let oct = 1; oct <= 8; oct++) {
            for (let n of notes) {
                if (oct === 1 && (n === 'C' || n === 'C#' || n === 'D' || n === 'D#' || n === 'E' || n === 'F' || n === 'F#' || n === 'G' || n === 'G#')) continue; // Start at A1
                if (oct === 8 && n !== 'C') break; // End at C8
                list.push(`${n}${oct}`)
            }
        }
        return list
    }, [])

    // Ensure currentRoot is valid, else default to C3 or first available
    /* Effect or Check could go here, but store handles string value mostly fine */

    const handleStartStop = () => {
        if (sessionStatus === 'PLAYING' || sessionStatus === 'WAITING') {
            stopSession()
        } else {
            startSession(scale)
        }
    }

    return (
        <div className="flex flex-col items-center w-full h-full max-w-screen-2xl mx-auto rounded-3xl gap-2 md:gap-3">

            {/* Header Card (Flex Init) */}
            <div className="shrink-0 text-center space-y-1 relative w-full bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="px-4 py-1 rounded-full bg-neon-pink-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {scale.category}
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{scale.name}</h2>
                <p className="text-slate-500 max-w-md mx-auto text-xs md:text-sm truncate">{scale.description}</p>

                {/* Instruction - Always visible or explicit toggle? Keeping tooltip but solid */}
                <div className="group relative inline-block">
                    <button className="text-[10px] font-bold text-neon-pink-600 uppercase tracking-widest hover:underline cursor-help">
                        View Instructions
                    </button>
                    {/* Solid Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 md:w-96 p-6 rounded-xl bg-slate-900 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left border border-slate-700">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 border-l border-t border-slate-700"></div>
                        <p className="text-sm leading-relaxed text-slate-300 relative z-10">
                            {scale.detailedInstructions}
                        </p>
                    </div>
                </div>
            </div>

            {/* Visualizer Card (Flex Grow) */}
            <div className="flex-1 w-full min-h-[100px] bg-white rounded-2xl border border-slate-200 relative flex items-center justify-center shadow-sm overflow-hidden">
                <div className="absolute inset-0 w-full h-full p-2">
                    <DotGraphVisualizer scale={scale} />
                </div>
            </div>

            {/* Controls Container - High Contrast Grid (Flex Shrink) */}
            <div className="shrink-0 grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4 w-full items-center p-1 md:p-2">

                {/* Left: Settings Card */}
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm h-full justify-center">
                    {/* Root */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start Note</label>
                        <select
                            value={currentRoot}
                            onChange={(e) => setRoot(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-neon-pink-500 transition-all cursor-pointer"
                        >
                            {ROOTS.map(note => (
                                <option key={note} value={note}>{note}</option>
                            ))}
                        </select>
                    </div>

                    {/* BPM */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo</label>
                            <div className="flex items-baseline gap-1">
                                <input
                                    type="number"
                                    min="60"
                                    max="200"
                                    value={localBpm}
                                    disabled={sessionStatus !== 'IDLE'}
                                    onChange={(e) => setLocalBpm(e.target.value)}
                                    onBlur={handleBpmBlur}
                                    onKeyDown={handleBpmKeyDown}
                                    className="w-12 bg-transparent font-mono text-neon-pink-600 font-bold text-lg text-right border-b border-dashed border-neon-pink-300 focus:outline-none focus:border-neon-pink-500 disabled:opacity-50"
                                />
                                <span className="text-[10px] text-slate-400 font-bold">BPM</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="60"
                            max="200"
                            value={bpm}
                            disabled={sessionStatus !== 'IDLE'}
                            onChange={(e) => setBpm(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-neon-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>


                {/* Center: Play Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleStartStop}
                        className={`
                        w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-2xl border-4
                        ${(sessionStatus === 'PLAYING' || sessionStatus === 'WAITING')
                                ? 'bg-red-500 border-red-400 text-white shadow-red-500/30'
                                : 'bg-neon-pink-500 border-neon-pink-400 text-white shadow-neon-pink-500/30'}
                      `}
                    >
                        {(sessionStatus === 'PLAYING' || sessionStatus === 'WAITING') ? (
                            <>
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md mb-2 shadow-sm" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Stop</span>
                            </>
                        ) : (
                            <>
                                <div className="ml-1 md:ml-1.5 w-0 h-0 border-l-[18px] md:border-l-[24px] border-l-white border-y-[9px] md:border-y-[12px] border-y-transparent mb-2 drop-shadow-sm" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Start</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Right: Direction Card */}
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm h-full justify-center items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full text-left">Direction</span>

                    <div className="flex gap-2 w-full">
                        <button
                            onClick={() => setDirection('ASC')}
                            className={`flex-1 py-3 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center
                                ${direction === 'ASC'
                                    ? 'bg-neon-pink-500 border-neon-pink-500 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 shadow-sm'}
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase">Up</span>
                        </button>

                        <button
                            onClick={() => setDirection('DESC')}
                            className={`flex-1 py-3 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center
                                ${direction === 'DESC'
                                    ? 'bg-neon-pink-500 border-neon-pink-500 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 shadow-sm'}
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase">Down</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
