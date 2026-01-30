import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScaleStore } from '../stores/useScaleStore'

interface CategoryManagerProps {
    onClose: () => void
}

const DEFAULT_CATEGORIES = ['Major', 'Minor', 'Pentatonic', 'Blues', 'Modes']

export const CategoryManager: React.FC<CategoryManagerProps> = ({ onClose }) => {
    const { categories, addCategory, deleteCategory } = useScaleStore()
    const [newCategory, setNewCategory] = useState('')

    const handleAdd = () => {
        if (!newCategory.trim()) return
        addCategory(newCategory.trim())
        setNewCategory('')
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        Manage Categories
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-neon-pink-500 outline-none font-bold placeholder:text-slate-400"
                            placeholder="New Category"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={!newCategory.trim()}
                            className="px-4 bg-neon-pink-500 hover:bg-neon-pink-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-2 pr-1">
                        {categories.filter(c => !DEFAULT_CATEGORIES.includes(c)).length === 0 && (
                            <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest py-8">No custom categories</p>
                        )}

                        <AnimatePresence>
                            {categories.filter(c => !DEFAULT_CATEGORIES.includes(c)).map(category => (
                                <motion.div
                                    key={category}
                                    layout
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex justify-between items-center bg-white border border-slate-100 p-3 rounded-xl shadow-sm"
                                >
                                    <span className="font-bold text-slate-700">{category}</span>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
