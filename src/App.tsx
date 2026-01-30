import { useState, useEffect, useMemo } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { SessionControls } from '@/components/SessionDashboard'
import { PianoVisualizer } from '@/components/PianoVisualizer'
import { ScaleCreator } from '@/components/ScaleCreator'
import { CategoryManager } from '@/components/CategoryManager'
import { ScaleImport, ScaleExport } from '@/components/ScaleSharing'
import { SCALES, type Scale } from '@/data/scales'
import { useGlobalShortcuts } from '@/hooks/useGlobalShortcuts'
import { Capacitor } from '@capacitor/core'
import { useScaleStore } from '@/stores/useScaleStore'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Foundation')
  const [showScaleCreator, setShowScaleCreator] = useState(false)
  const [editingScale, setEditingScale] = useState<Scale | undefined>(undefined)
  const [showCategoryManager, setShowCategoryManager] = useState(false)

  // Sharing State
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)

  // Store Data
  const { scales: customScales, categories: customCategories } = useScaleStore()

  // Merge Scales & Fix Visualizer Crash
  const allScales = useMemo(() => {
    // Normalize custom scales to match Scale interface (NoteEvent[] -> ScaleNote[])
    const normalizedCustomScales = customScales.map(s => {
      // If pattern already exists (legacy), use it
      if ((s as any).pattern) return s as unknown as Scale;

      const notes = s.notes || []
      const firstNote = notes.find(n => n.type === 'note' && n.pitch)
      let pattern: any[] = []

      if (firstNote && firstNote.pitch) {
        pattern = notes.filter(n => n.type === 'note').map(n => ({
          interval: 0, // Visualizer adaptation
          duration: n.duration
        }))
      }

      return {
        ...s,
        pattern: pattern.length > 0 ? pattern : []
      } as unknown as Scale
    })

    return [...SCALES, ...normalizedCustomScales]
  }, [customScales])

  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0])

  // Global Keyboard Shortcuts
  useGlobalShortcuts(selectedScale)

  // Platform Detection
  useEffect(() => {
    const platform = Capacitor.getPlatform()
    document.body.classList.add(`platform-${platform}`)
    if (window.navigator.userAgent.includes('Electron')) {
      document.body.classList.add('platform-electron')
      document.body.classList.add('platform-win32')
    }
  }, [])

  // Filter Scales
  const filteredScales = useMemo(() => {
    return allScales.filter(s => s.category === selectedCategory)
  }, [allScales, selectedCategory])

  // Effect to reset scale if current one isn't in new category
  useEffect(() => {
    if (!filteredScales.find(s => s.id === selectedScale.id) && filteredScales.length > 0) {
      setSelectedScale(filteredScales[0])
    }
  }, [filteredScales, selectedCategory, selectedScale])

  return (
    <MainLayout
      currentCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      customCategories={customCategories.filter(c => !['Major', 'Minor', 'Pentatonic', 'Blues', 'Modes', 'Foundation', 'Consistency', 'Tone', 'Pitch', 'Flexibility', 'Agility', 'Range', 'Precision', 'Accuracy', 'Sustain', 'Connection', 'Presence', 'Endurance', 'Power', 'Performance', 'Warmdown'].includes(c))}
      onManageCategories={() => setShowCategoryManager(true)}
      onImport={() => setShowImport(true)}
      onNewScale={() => {
        setEditingScale(undefined)
        setShowScaleCreator(true)
      }}
    >
      <div className="h-screen w-full flex flex-col bg-surface-base overflow-hidden">

        {/* Top Area: Dashboard & Controls */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <div className="w-full h-full px-4 md:px-8 pt-4 pb-4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">

            {/* Scale Selector */}
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
              <div className="flex-1 overflow-x-auto pb-2 no-scrollbar px-2 w-full flex justify-start space-x-2">
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
                {filteredScales.length === 0 && (
                  <span className="text-slate-400 text-sm italic px-4 py-2">No scales in this category.</span>
                )}
              </div>
            </div>

            {/* Controls Header & Actions */}
            <div className="mb-6 flex flex-col gap-4">
              <SessionControls
                scale={selectedScale}
                onShare={() => setShowExport(true)}
                onEdit={selectedScale.isCustom ? () => {
                  setEditingScale(selectedScale)
                  setShowScaleCreator(true)
                } : undefined}
              />
            </div>
          </div>
        </div>

        {/* Mobile Floating Action Bar (Import / New) */}
        <div className="absolute bottom-[130px] right-6 flex flex-col gap-4 md:hidden z-20">
          <button
            onClick={() => setShowImport(true)}
            className="w-12 h-12 bg-white text-slate-500 rounded-full shadow-lg border border-slate-200 flex items-center justify-center active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button
            onClick={() => {
              setEditingScale(undefined)
              setShowScaleCreator(true)
            }}
            className="w-14 h-14 bg-neon-pink-500 text-white rounded-full shadow-lg shadow-neon-pink-500/30 flex items-center justify-center active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Bottom Area: Visualizer */}
        <div
          className="shrink-0 border-t border-surface-mid bg-surface-base z-10 w-full max-w-full"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
        >
          <PianoVisualizer />
        </div>

      </div>

      {/* Modals */}
      {showScaleCreator && (
        <ScaleCreator
          existingScale={editingScale}
          onClose={() => {
            setShowScaleCreator(false)
            setEditingScale(undefined)
          }}
          onSave={() => {
            // Refresh logic handled by store subscription
          }}
        />
      )}

      {showCategoryManager && (
        <CategoryManager onClose={() => setShowCategoryManager(false)} />
      )}

      {showImport && (
        <ScaleImport
          onImport={(scale) => {
            const { addScale, addCategory, categories } = useScaleStore.getState()
            if (!categories.includes(scale.category)) {
              addCategory(scale.category)
            }
            addScale(scale)
            setSelectedCategory(scale.category)
            setShowImport(false)
          }}
          onClose={() => setShowImport(false)}
        />
      )}

      {showExport && (
        <ScaleExport scale={selectedScale} onClose={() => setShowExport(false)} />
      )}

    </MainLayout>
  )
}

export default App
