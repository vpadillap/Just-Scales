import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Scale } from '../types'

interface ScaleState {
    scales: Scale[]
    categories: string[]

    // Actions
    addScale: (scale: Omit<Scale, 'id' | 'createdAt' | 'isCustom'>) => void
    updateScale: (id: string, updates: Partial<Scale>) => void
    deleteScale: (id: string) => void

    addCategory: (category: string) => void
    deleteCategory: (category: string) => void

    // Getters
    getScalesByCategory: (category: string) => Scale[]
}

export const DEFAULT_CATEGORIES = [
    'Foundation', 'Consistency', 'Tone', 'Pitch',
    'Flexibility', 'Agility', 'Range', 'Precision', 'Accuracy',
    'Sustain', 'Connection', 'Presence', 'Endurance',
    'Power', 'Performance', 'Warmdown'
]

// Helper to generate UUID if library not available/preferred, but we can use crypto.randomUUID() in modern envs
const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    return Math.random().toString(36).substring(2, 15)
}

export const useScaleStore = create<ScaleState>()(
    persist(
        (set, get) => ({
            scales: [],
            categories: DEFAULT_CATEGORIES,

            addScale: (scaleData) => {
                const newScale: Scale = {
                    ...scaleData,
                    id: generateId(),
                    createdAt: Date.now(),
                    isCustom: true
                }
                set((state) => ({ scales: [...state.scales, newScale] }))
            },

            updateScale: (id, updates) => {
                set((state) => ({
                    scales: state.scales.map(s => s.id === id ? { ...s, ...updates } : s)
                }))
            },

            deleteScale: (id) => {
                set((state) => ({
                    scales: state.scales.filter(s => s.id !== id)
                }))
            },

            addCategory: (category) => {
                set((state) => {
                    if (state.categories.includes(category)) return state
                    return { categories: [...state.categories, category] }
                })
            },

            deleteCategory: (category) => {
                set((state) => ({
                    categories: state.categories.filter(c => c !== category)
                }))
            },

            getScalesByCategory: (category) => {
                return get().scales.filter(s => s.category === category)
            }
        }),
        {
            name: 'justscales-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
