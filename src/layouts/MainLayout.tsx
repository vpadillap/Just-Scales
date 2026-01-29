import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MainLayoutProps {
    children: React.ReactNode
    currentCategory?: string
    onSelectCategory?: (category: string) => void
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentCategory, onSelectCategory }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Grouped categories for the sidebar (SwiftScales Port)
    const CATEGORY_GROUPS = [
        {
            name: 'The Basics',
            items: ['Foundation', 'Consistency', 'Tone', 'Pitch']
        },
        {
            name: 'Technical',
            items: ['Flexibility', 'Agility', 'Range', 'Precision', 'Accuracy']
        },
        {
            name: 'Control',
            items: ['Sustain', 'Connection', 'Presence', 'Endurance']
        },
        {
            name: 'Performance',
            items: ['Power', 'Performance', 'Warmdown']
        }
    ]

    const SidebarContent = () => (
        <>
            <div className="p-6 shrink-0 flex justify-between items-center">
                <h1 className="text-2xl font-black text-neon-pink-500 tracking-tighter">
                    SCALES
                </h1>
                {/* Close Button Mobile */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden p-2 text-slate-400 hover:text-slate-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 custom-scrollbar">
                {CATEGORY_GROUPS.map((group) => (
                    <div key={group.name} className="mb-6">
                        <h3 className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">{group.name}</h3>
                        <div className="space-y-1">
                            {group.items.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        onSelectCategory?.(category)
                                        setIsSidebarOpen(false) // Close on select (mobile)
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-r-lg transition-all font-bold flex items-center relative
                                    ${currentCategory === category
                                            ? 'bg-neon-pink-50 text-neon-pink-600 border-l-4 border-neon-pink-500'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'}
                                `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <div className="h-screen w-full bg-surface-base text-text-primary overflow-hidden flex flex-col font-sans select-none relative">
            {/* Title Bar Drag Region */}
            <div className="h-[50px] w-full bg-surface-base fixed top-0 left-0 z-40 flex items-center px-4 app-drag-region border-b border-surface-mid justify-between md:justify-start">
                <span className="text-lg font-black text-neon-pink-500 tracking-widest uppercase md:mr-4">JUST SCALES</span>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden text-slate-500 hover:text-neon-pink-500 no-drag p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 flex pt-[50px] min-h-0 relative">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-64 bg-surface-base border-r border-surface-mid flex-col h-full min-h-0 shrink-0">
                    <SidebarContent />
                </aside>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute inset-0 bg-black z-50 md:hidden"
                            />
                            {/* Sidebar Drawer */}
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-2xl z-50 flex flex-col border-r border-surface-mid md:hidden"
                            >
                                <SidebarContent />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Content */}
                <main className="flex-1 relative overflow-hidden bg-surface-base min-h-0 flex flex-col">
                    {children}
                </main>
            </div>
        </div>
    )
}
