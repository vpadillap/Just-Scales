import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScaleStore, DEFAULT_CATEGORIES } from '../stores/useScaleStore'
import { useAudioStore } from '../stores/useAudioStore'
import { DotGraphVisualizer } from './DotGraphVisualizer'
import type { Scale as StoreScale, NoteEvent } from '../types'
import type { Scale as DataScale } from '../data/scales'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as Tone from 'tone'

interface ScaleCreatorProps {
    existingScale?: DataScale
    onClose: () => void
    onSave?: () => void
}

const DURATIONS = [
    { label: 'Whole', value: '1m' },
    { label: 'Half', value: '2n' },
    { label: 'Quarter', value: '4n' },
    { label: 'Eighth', value: '8n' },
    { label: 'Sixteenth', value: '16n' },
]

export const ScaleCreator: React.FC<ScaleCreatorProps> = ({ existingScale, onClose, onSave }) => {
    const { addScale, updateScale, categories, addCategory } = useScaleStore()
    const { playNote, playScale: playFullScale } = useAudioStore()

    const [name, setName] = useState(existingScale?.name || '')
    const [category, setCategory] = useState(existingScale?.category || 'Major')
    const [newCategory, setNewCategory] = useState('')
    const [isCreatingCategory, setIsCreatingCategory] = useState(false)
    const [notes, setNotes] = useState<NoteEvent[]>(existingScale?.notes || [])

    // Editor State
    const [selectedDuration, setSelectedDuration] = useState('4n')
    const [currentPitch, setCurrentPitch] = useState('C4')

    const handleSave = () => {
        if (!name.trim()) return

        const scaleData = {
            name,
            category: isCreatingCategory ? newCategory : category,
            notes
        }

        if (isCreatingCategory && newCategory) {
            addCategory(newCategory)
        }

        if (existingScale) {
            updateScale(existingScale.id, scaleData)
        } else {
            addScale(scaleData)
        }

        onSave?.()
        onClose()
    }

    const addEvent = (type: 'note' | 'rest') => {
        const newEvent: NoteEvent = {
            type,
            duration: selectedDuration,
            pitch: type === 'note' ? currentPitch : undefined
        }
        setNotes([...notes, newEvent])
        if (type === 'note') playNote(currentPitch, selectedDuration)
    }

    const removeEvent = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index))
    }

    const handlePreviewScale = () => {
        const sequence = notes
            .filter(n => n.type === 'note' && n.pitch)
            .map(n => n.pitch!)

        if (sequence.length > 0) {
            playFullScale(sequence, selectedDuration)
        }
    }

    const visualizerScale = useMemo<DataScale | null>(() => {
        if (notes.length === 0) return null

        const firstNote = notes.find(n => n.type === 'note')
        if (!firstNote || !firstNote.pitch) return null

        const rootMidi = Tone.Frequency(firstNote.pitch).toMidi()

        const pattern = notes
            .filter(n => n.type === 'note' && n.pitch)
            .map(n => ({
                interval: Tone.Frequency(n.pitch!).toMidi() - rootMidi,
                duration: n.duration
            }))

        return {
            id: 'preview',
            name: name || 'Preview',
            category: 'Preview',
            pattern,
            description: '',
            detailedInstructions: ''
        } as unknown as DataScale
    }, [notes, name])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-surface-base border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {existingScale ? 'Edit Scale' : 'New Scale'}
                        </h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                            Custom Vocal Exercise
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-surface-base">

                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Scale Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:ring-2 focus:ring-neon-pink-500 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="e.g. My Morning Warmup"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Category</label>
                                {!isCreatingCategory ? (
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 appearance-none focus:ring-2 focus:ring-neon-pink-500 outline-none font-bold cursor-pointer"
                                            >
                                                {categories.filter(c => !DEFAULT_CATEGORIES.includes(c) && !['Major', 'Minor', 'Pentatonic', 'Blues', 'Modes'].includes(c)).map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsCreatingCategory(true)}
                                            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors font-bold whitespace-nowrap"
                                        >
                                            + New
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            autoFocus
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-neon-pink-500 outline-none font-bold"
                                            placeholder="Category Name"
                                        />
                                        <button
                                            onClick={() => setIsCreatingCategory(false)}
                                            className="px-4 py-2 text-slate-400 hover:text-slate-600 font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visualizer Preview */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 h-[200px] relative overflow-hidden flex flex-col shadow-sm">
                            <div className="absolute top-3 left-4 z-10 flex gap-2 items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Preview</span>
                            </div>

                            {/* Controls */}
                            <div className="absolute top-3 right-3 z-10">
                                <button
                                    onClick={handlePreviewScale}
                                    disabled={notes.length === 0}
                                    className="flex items-center gap-2 px-4 py-1.5 bg-neon-pink-500 hover:bg-neon-pink-600 text-white rounded-full text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-neon-pink-500/20 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play
                                </button>
                            </div>

                            <div className="flex-1 w-full h-full relative">
                                {visualizerScale ? (
                                    <DotGraphVisualizer scale={visualizerScale} />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm font-bold italic">
                                        Add notes to visualize pattern
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Note Editor */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Structure</h3>

                            <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200">
                                {DURATIONS.map(d => (
                                    <button
                                        key={d.value}
                                        onClick={() => setSelectedDuration(d.value)}
                                        className={clsx(
                                            "px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all",
                                            selectedDuration === d.value
                                                ? "bg-neon-pink-500 text-white shadow-sm"
                                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sequence List */}
                        <div className="bg-white rounded-2xl p-4 min-h-[160px] overflow-x-auto custom-scrollbar border border-slate-200 shadow-inner flex items-center relative">
                            <div className="flex gap-3 px-2 items-center h-full">
                                <AnimatePresence mode="popLayout">
                                    {notes.map((event, i) => (
                                        <motion.div
                                            key={i}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                            onClick={() => event.type === 'note' && event.pitch && playNote(event.pitch, event.duration)}
                                            className={twMerge(
                                                "relative group flex-shrink-0 w-20 h-28 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md",
                                                event.type === 'rest'
                                                    ? "bg-slate-50 border-slate-200 border-dashed"
                                                    : "bg-white border-slate-200 hover:border-neon-pink-300"
                                            )}
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeEvent(i); }}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-white text-slate-400 hover:text-red-500 border border-slate-200 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-sm z-10"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>

                                            {event.type === 'note' ? (
                                                <>
                                                    <div className="w-8 h-8 rounded-full bg-neon-pink-50 flex items-center justify-center mb-2 border border-neon-pink-100 group-hover:border-neon-pink-300 transition-colors">
                                                        <span className="text-xs text-neon-pink-500 font-bold">♪</span>
                                                    </div>
                                                    <span className="text-lg font-black text-slate-800">{event.pitch}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{DURATIONS.find(d => d.value === event.duration)?.label}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-2 border border-slate-200">
                                                        <span className="text-xs text-slate-400 font-bold">—</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rest</span>
                                                    <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-wider">{DURATIONS.find(d => d.value === event.duration)?.label}</span>
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {notes.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <p className="text-slate-400 text-sm font-bold">Sequence is empty</p>
                                        <p className="text-slate-300 text-xs mt-1">Add notes or rests below</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input Controls */}
                        <div className="space-y-4">
                            {/* Pitch Selector */}
                            <div className="p-4 bg-white rounded-2xl border border-slate-200">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Select Pitch</label>
                                <div className="flex flex-wrap gap-2">
                                    {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(note => {
                                        const notePitch = note + '4';
                                        const isSelected = currentPitch === notePitch;
                                        return (
                                            <button
                                                key={note}
                                                onClick={() => {
                                                    setCurrentPitch(notePitch)
                                                    playNote(notePitch, '8n')
                                                }}
                                                className={clsx(
                                                    "w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm border",
                                                    isSelected
                                                        ? "bg-neon-pink-500 text-white border-neon-pink-500 shadow-neon-pink-500/20 scale-110 z-10"
                                                        : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-slate-300 hover:text-slate-700"
                                                )}
                                            >
                                                {note}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => addEvent('note')}
                                    className="flex-1 py-4 rounded-xl bg-neon-pink-50 border-2 border-neon-pink-200 text-neon-pink-700 font-black text-sm hover:bg-neon-pink-100 hover:border-neon-pink-300 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 uppercase tracking-wide"
                                >
                                    <span className="text-xl leading-none">+</span>
                                    Add Note
                                </button>
                                <button
                                    onClick={() => addEvent('rest')}
                                    className="flex-1 py-4 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 uppercase tracking-wide"
                                >
                                    <span className="text-xl leading-none">+</span>
                                    Add Rest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-slate-200 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-slate-500 hover:text-slate-800 font-bold transition-colors text-xs uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name.trim() || notes.length === 0}
                        className="px-8 py-3 bg-neon-pink-500 hover:bg-neon-pink-600 text-white font-black rounded-xl shadow-lg shadow-neon-pink-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-100 text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Scale
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
