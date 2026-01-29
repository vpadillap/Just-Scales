import { useState, useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { SessionControls } from '@/components/SessionDashboard'
import { PianoVisualizer } from '@/components/PianoVisualizer'
import { SCALES, type Scale } from '@/data/scales'
import { useGlobalShortcuts } from '@/hooks/useGlobalShortcuts'
import { Capacitor } from '@capacitor/core'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Foundation')
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0])

  // Global Keyboard Shortcuts
  useGlobalShortcuts(selectedScale)

  // Platform Detection
  useEffect(() => {
    const platform = Capacitor.getPlatform()
    document.body.classList.add(`platform-${platform}`)
    // Also detect windows if specifically desired separate from 'web' (sometimes Cap returns web for electron)
    // But usually we rely on userAgent for electron if Cap doesn't catch it
    if (window.navigator.userAgent.includes('Electron')) {
      document.body.classList.add('platform-electron')
      document.body.classList.add('platform-win32') // Assuming windows for now, or refine detection
    }
  }, [])

  // Update selected scale when category changes to first in list
  const filteredScales = SCALES.filter(s => s.category === selectedCategory)

  // Effect to reset scale if current one isn't in new category
  if (!filteredScales.find(s => s.id === selectedScale.id) && filteredScales.length > 0) {
    setSelectedScale(filteredScales[0])
  }

  return (
    <MainLayout
      currentCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
    >
      {/* Use style attribute for env() to ensure it works even if Tailwind arbitrary value parsing fails or is strict */}
      <div
        className="h-screen w-full flex flex-col bg-surface-base overflow-hidden"
      >

        {/* Top Area: Dashboard & Controls (Dynamic Flex) */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <div className="w-full h-full px-4 md:px-8 pt-4 pb-4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
            {/* Scale Selector */}
            <div className="mb-4 flex justify-start space-x-2 overflow-x-auto pb-2 no-scrollbar shrink-0 px-2 sm:justify-center">
              {filteredScales.map(scale => (
                <button
                  key={scale.id}
                  onClick={() => setSelectedScale(scale)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border
                      ${selectedScale.id === scale.id
                      ? 'bg-neon-pink-50 border-neon-pink-500 text-neon-pink-600 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'}
                    `}
                >
                  {scale.name}
                </button>
              ))}
            </div>

            <SessionControls scale={selectedScale} />
          </div>
        </div>

        {/* Bottom Area: Visualizer (Fixed Flex Item) */}
        <div
          className="shrink-0 border-t border-surface-mid bg-surface-base z-10 w-full max-w-full"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
        >
          <PianoVisualizer />
        </div>

      </div>
    </MainLayout>
  )
}

export default App
