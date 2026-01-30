import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Scale } from '@/data/scales'
import { useAudioStore } from '@/stores/useAudioStore'

// Helper to calculate unrolled sequence steps
// Should match logic in runLoop!
// Helper to calculate unrolled sequence steps
// Should match logic in runLoop!
const getUnrolledSequence = (scale: Scale): { note: string, interval: number }[] => {
    const repeatCount = scale.repeatOnRoot || 1
    const seq: { note: string, interval: number }[] = []

    const pattern = scale.pattern || []

    // If no pattern but we have notes (custom scale), we might want to try to visualize them?
    // But ideally parsing logic should happen upstream in App.tsx or useScaleStore

    for (let r = 0; r < repeatCount; r++) {
        pattern.forEach(p => {
            // We can calculate the absolute semitone interval from the base root
            // This simplifies visualization height mapping
            // But runLoop calculates actual notes. Let's do semitones relative to currentRoot for visual height.
            seq.push({ note: '', interval: p.interval || 0 }) // note string not strictly needed for height if we trust interval
        })
    }
    return seq
}

interface DotGraphVisualizerProps {
    scale: Scale
}

export const DotGraphVisualizer: React.FC<DotGraphVisualizerProps> = ({ scale }) => {
    const { currentStepIndex, currentRoot } = useAudioStore()

    // 1. Calculate Positions
    const dots = useMemo(() => {
        const sequence = getUnrolledSequence(scale)

        // Find Min/Max for Y-Axis Normalization
        const intervals = sequence.map(s => s.interval)
        const minInterval = Math.min(...intervals)
        const maxInterval = Math.max(...intervals)
        const range = maxInterval - minInterval || 1 // Avoid divide by zero

        return sequence.map((step, index) => {
            // Normalized Y (0 to 1). Higher pitch = Higher Y (1)
            // But in SVG, 0 is top. So we invert.
            // 1 = Top (Max Pitch), 0 = Bottom (Min Pitch)
            const normalizedPitch = (step.interval - minInterval) / range

            return {
                index,
                interval: step.interval,
                normalizedPitch // 0.0 (Low) to 1.0 (High)
            }
        })
    }, [scale, currentRoot])

    // 2. Render Check
    if (!dots.length) return null

    return (
        <div className="w-full h-full relative flex items-center justify-center p-2">
            <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${dots.length * 30} 100`}
            >
                {dots.map((dot, i) => {
                    const isActive = currentStepIndex === dot.index
                    const cx = (i * 30) + 15
                    // Y Range: 15 padding top/bottom -> 70 height
                    const cy = 100 - ((dot.normalizedPitch * 70) + 15)

                    return (
                        <motion.circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={isActive ? 10 : 6}
                            initial={false}
                            animate={{
                                fill: isActive ? '#f72585' : '#cbd5e1', // neon-pink-500 : slate-300
                                opacity: isActive ? 1 : 0.5,
                                scale: isActive ? 1.3 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    )
                })}
            </svg>
        </div>
    )
}
