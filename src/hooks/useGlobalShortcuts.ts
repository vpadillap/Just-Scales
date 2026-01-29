import { useEffect } from 'react'
import { useAudioStore } from '@/stores/useAudioStore'
import type { Scale } from '@/data/scales'

export const useGlobalShortcuts = (scale: Scale) => {
    const { sessionStatus, startSession, stopSession } = useAudioStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                // Ignore if active element is an input
                const activeTag = document.activeElement?.tagName.toLowerCase()
                if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable) {
                    return
                }

                e.preventDefault() // Stop scroll

                if (sessionStatus === 'PLAYING' || sessionStatus === 'WAITING') {
                    stopSession()
                } else {
                    startSession(scale)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [sessionStatus, scale, startSession, stopSession])
}
